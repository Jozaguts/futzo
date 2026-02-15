import {defineStore} from 'pinia';

import type {
    ActionGameReportState,
    DialogHandlerActionsNames,
    Game,
    GameDetailsRequest,
    GameEvent,
    GameTeam,
    GameTeamFormRequest,
    HeadAndSubsGamePlayers,
    TeamSubstitutions,
    TeamType,
} from '~/models/Game';
import type {PenaltyAttempt} from '~/models/Schedule';
import * as gameAPI from '~/http/api/game';
import dayjs from 'dayjs';
import {useToast} from '~/composables/useToast';
import {useSanctumClient, useTournamentStore} from '#imports';
import {ga4Event} from '~/utils/ga4';

export const useGameStore = defineStore('gameStore', () => {
  const game = ref<Game>(null as unknown as Game);
  const games = ref<Game[]>([]);
  const gameId = ref<number | null>(null);
  const gameReportDialog = ref(false);
  const showReScheduleDialog = ref(false);
  const gameDetailsRequest = ref<GameDetailsRequest>({} as GameDetailsRequest);
  const showFabBtn = shallowRef(false);
  const gameTeamFormRequest = ref<GameTeamFormRequest>({
    home: {
      name: '',
      goals: 0,
      goalsDetails: [],
    },
    away: {
      name: '',
      goals: 0,
      goalsDetails: [],
    },
  });
  const gamePlayers = ref<Record<TeamType, GameTeam>>({
    home: {
      team_id: 0,
      name: '',
      players: [],
      cards: [],
      goals: [],
    },
    away: {
      team_id: 0,
      name: '',
      players: [],
      cards: [],
      goals: [],
    },
  });
  const penaltyShootout = ref<{ decided: boolean; home: PenaltyAttempt[]; away: PenaltyAttempt[] }>({
    decided: false,
    home: [],
    away: [],
  });
  const resetPenaltyShootout = () => {
    penaltyShootout.value = {
      decided: false,
      home: [],
      away: [],
    };
    validateGoalsForm();
  };
  const toBoolean = (value: unknown): boolean => value === true || value === 1 || value === '1' || value === 'true';
  const normalizePenaltyAttempts = (attempts: any[], teamId: number): PenaltyAttempt[] =>
    (attempts ?? []).map((attempt: any, index: number) => {
      const rawScore = attempt?.score_goal;
      let score: boolean | null = null;
      if (rawScore !== null && rawScore !== undefined) {
        score = toBoolean(rawScore);
      }

      return {
        id: attempt?.id ?? null,
        player_id: attempt?.player_id ?? null,
        team_id: teamId,
        score_goal: score,
        kicks_number: attempt?.kicks_number ?? index + 1,
        player: attempt?.player ?? null,
      };
    });
  const sanitizePenaltyAttempts = (attempts: PenaltyAttempt[], teamId: number) =>
    attempts
      .filter((attempt) => attempt.player_id)
      .map((attempt, index) => ({
        player_id: attempt.player_id,
        team_id: teamId,
        score_goal: toBoolean(attempt.score_goal),
        kicks_number: attempt.kicks_number ?? index + 1,
      }));
  const buildShootoutPayload = () => {
    if (!game.value?.penalty_draw_enabled || !penaltyShootout.value.decided) {
      return null;
    }

    const homeTeamId = game.value?.home?.id;
    const awayTeamId = game.value?.away?.id;

    if (!homeTeamId || !awayTeamId) {
      return null;
    }

    const homeAttempts = sanitizePenaltyAttempts(penaltyShootout.value.home, homeTeamId);
    const awayAttempts = sanitizePenaltyAttempts(penaltyShootout.value.away, awayTeamId);

    if (!homeAttempts.length || !awayAttempts.length) {
      return null;
    }

    return {
      decided: true,
      home: homeAttempts,
      away: awayAttempts,
    };
  };
  const headAndSubsGamePlayers = ref<HeadAndSubsGamePlayers>({} as HeadAndSubsGamePlayers);
  const substitutions = ref<TeamSubstitutions>({
    home: [
      {
        player_in_id: null,
        player_out_id: null,
        minute: null,
      },
    ],
    away: [
      {
        player_in_id: null,
        player_out_id: null,
        minute: null,
      },
    ],
  });
  type GameActionFormRequest = {
    action: DialogHandlerActionsNames;
    body: any | null;
    disabled: boolean;
    loading: boolean;
  };
  const gameActionFormRequest = ref<GameActionFormRequest>({
    action: 'substitutions',
    body: null,
    disabled: true,
    loading: false,
  });
  const dialogState = ref<ActionGameReportState>({ show: false, title: '', subtitle: '', type: 'info' });
  const gameEvents = ref<Record<TeamType, GameEvent[]>>({
    home: [
      {
        id: null,
        player_id: null,
        type: null,
        minute: null,
        related_player_id: null,
      },
    ],
    away: [
      {
        id: null,
        player_id: null,
        type: null,
        minute: null,
        related_player_id: null,
      },
    ],
  });
  const hasIncompleteGoalEvent = (events: GameEvent[]) =>
    events.some((event) => {
      const hasPlayer = Boolean(event.player_id);
      const hasMinute = event.minute !== null && event.minute !== undefined;
      const hasAssist = Boolean(event.related_player_id);
      const hasUserInput = hasPlayer || hasMinute || hasAssist;

      if (!hasUserInput) {
        return false;
      }

      return !hasPlayer || !event.type || !hasMinute;
    });
  const isPenaltyDataValid = computed(() => {
    if (!game.value?.penalty_draw_enabled) {
      return true;
    }

    if (!penaltyShootout.value.decided) {
      return true;
    }

    if ((game.value?.home?.goals ?? 0) !== (game.value?.away?.goals ?? 0)) {
      return false;
    }

    const homeAttempts = penaltyShootout.value.home;
    const awayAttempts = penaltyShootout.value.away;

    if (!homeAttempts.length || !awayAttempts.length) {
      return false;
    }

    const hasInvalidAttempt = (attempts: PenaltyAttempt[]) =>
      attempts.some(
        (attempt) =>
          !attempt.player_id ||
          attempt.score_goal === null ||
          attempt.score_goal === undefined ||
          attempt.kicks_number === null
      );

    if (hasInvalidAttempt(homeAttempts) || hasInvalidAttempt(awayAttempts)) {
      return false;
    }

    const homeGoals = homeAttempts.reduce((total, attempt) => total + (toBoolean(attempt.score_goal) ? 1 : 0), 0);
    const awayGoals = awayAttempts.reduce((total, attempt) => total + (toBoolean(attempt.score_goal) ? 1 : 0), 0);

    return homeGoals !== awayGoals;
  });
  const validateGoalsForm = () => {
    if (gameActionFormRequest.value.action !== 'goals') {
      return;
    }

    const eventsInvalid =
      hasIncompleteGoalEvent(gameEvents.value.home) || hasIncompleteGoalEvent(gameEvents.value.away);
    const penaltyInvalid = !isPenaltyDataValid.value;

    gameActionFormRequest.value.disabled = eventsInvalid || penaltyInvalid;
  };
  const hydratePenaltyShootout = (gameData: Game) => {
    if (!gameData?.penalty_draw_enabled) {
      resetPenaltyShootout();
      validateGoalsForm();
      return;
    }

    const homeTeamId = gameData.home?.id ?? gamePlayers.value.home.team_id;
    const awayTeamId = gameData.away?.id ?? gamePlayers.value.away.team_id;
    const shootoutData = gameData.penalty_shootout ?? { home: [], away: [] };
    const summary = gameData.penalties ?? { decided: false };

    const homeAttempts = normalizePenaltyAttempts(shootoutData.home ?? [], homeTeamId);
    const awayAttempts = normalizePenaltyAttempts(shootoutData.away ?? [], awayTeamId);

    penaltyShootout.value.decided = Boolean(summary?.decided);
    if (penaltyShootout.value.decided) {
      penaltyShootout.value.home = homeAttempts.sort((a, b) => (a.kicks_number ?? 0) - (b.kicks_number ?? 0));
      penaltyShootout.value.away = awayAttempts.sort((a, b) => (a.kicks_number ?? 0) - (b.kicks_number ?? 0));
    } else {
      penaltyShootout.value.home = [];
      penaltyShootout.value.away = [];
    }

    validateGoalsForm();
  };
  watch(
    () => gameEvents.value.home,
    () => validateGoalsForm(),
    { deep: true }
  );
  watch(
    () => gameEvents.value.away,
    () => validateGoalsForm(),
    { deep: true }
  );
  watch(penaltyShootout, () => validateGoalsForm(), { deep: true });
  // headAndSubsGamePlayers.value?.away.players.
  const getGameTeamsPlayers = async () => {
    if (gameDetailsRequest.value?.game_id || game.value?.id) {
      return await gameAPI.getGamePlayers(gameDetailsRequest.value?.game_id || game.value?.id);
    }
  };
  const getGameDetails = async () => {
    if (dayjs(gameDetailsRequest.value?.date).isValid()) {
      gameDetailsRequest.value.date = dayjs(gameDetailsRequest.value?.date).format('YYYY-MM-DD');
    }
    await gameAPI
      .getGame(gameDetailsRequest.value?.game_id, gameDetailsRequest.value?.date, gameDetailsRequest.value?.field_id)
      .then((data) => {
        game.value = data as Game;
        hydratePenaltyShootout(game.value);
        const locationId = game.value?.details?.location?.id ?? null;
        if (locationId !== null) {
          gameDetailsRequest.value.location_id = locationId;
        }
        if (game.value?.options?.length) {
          gameDetailsRequest.value.day = game.value.options[0].available_intervals.day;
        }
      })
      .catch(() => {
        useToast().toast({
          type: 'error',
          msg: 'Error al obtener el partido',
          description:
            'Hubo un error al intentar obtener los detalles del partido. Por favor, intente nuevamente más tarde.',
        });
      });
  };
  const reScheduleGame = async () => {
    if (!gameDetailsRequest.value?.date) {
      useToast().toast({
        type: 'warning',
        msg: 'Selecciona una fecha',
        description: 'Debes seleccionar una fecha válida para reprogramar el partido.',
      });
      return;
    }
    if (!gameDetailsRequest.value?.field_id) {
      useToast().toast({
        type: 'warning',
        msg: 'Selecciona un campo',
        description: 'Debes seleccionar un campo para reprogramar el partido.',
      });
      return;
    }
    if (!gameDetailsRequest.value?.day) {
      useToast().toast({
        type: 'warning',
        msg: 'Selecciona una fecha válida',
        description: 'No pudimos determinar el día de la semana para reprogramar el partido.',
      });
      return;
    }
    if (!gameDetailsRequest.value?.selected_time) {
      useToast().toast({
        type: 'warning',
        msg: 'Selecciona una hora',
        description: 'Debes seleccionar una hora disponible para reprogramar el partido.',
      });
      return;
    }
    const client = useSanctumClient();
    client(`/api/v1/admin/games/${gameDetailsRequest.value?.game_id}/reschedule`, {
      method: 'PUT',
      body: {
        date: gameDetailsRequest.value?.date,
        field_id: gameDetailsRequest.value?.field_id,
        selected_time: gameDetailsRequest.value?.selected_time,
        day: gameDetailsRequest.value?.day,
      },
    })
      .then(async () => {
        useScheduleStore().schedulePagination.current_page = 1;
        await useScheduleStore().getTournamentSchedules();
        useToast().toast({
          type: 'success',
          msg: 'Partido reprogramado correctamente',
          description: 'El partido se ha reprogramado con éxito',
        });
        showReScheduleDialog.value = false;
      })
      .catch(() => {
        useToast().toast({
          type: 'error',
          msg: 'Error al reprogramar partido',
          description: 'Hubo un error al intentar reprogramar el partido. Por favor, intente nuevamente más tarde.',
        });
      });
  };
  const initializeGameReport = async (game_id: number) => {
    return await gameAPI.initializeGameReport(game_id);
  };
  const getHeadAndSubsGamePlayers = async () => {
    headAndSubsGamePlayers.value = await gameAPI.getHeadAndSubsGamePlayers(game.value.id);
    if (headAndSubsGamePlayers.value.home.substitutions.length) {
      substitutions.value.home = [];
      headAndSubsGamePlayers.value.home.substitutions.map((substitution) => {
        const alreadyExists = substitutions.value.home.some(
          (sub) => sub.player_in_id === substitution.player_in_id && sub.player_out_id === substitution.player_out_id
        );
        if (!alreadyExists) {
          substitutions.value.home.push({
            id: substitution.id,
            player_in_id: substitution.player_in_id,
            player_out_id: substitution.player_out_id,
            minute: substitution.minute,
          });
        }
      });
    }
    if (headAndSubsGamePlayers.value.away.substitutions.length) {
      substitutions.value.away = [];
      headAndSubsGamePlayers.value.away.substitutions.map((substitution) => {
        const alreadyExists = substitutions.value.away.some(
          (sub) => sub.player_in_id === substitution.player_in_id && sub.player_out_id === substitution.player_out_id
        );
        if (!alreadyExists) {
          substitutions.value.away.push({
            id: substitution.id,
            player_in_id: substitution.player_in_id,
            player_out_id: substitution.player_out_id,
            minute: substitution.minute,
          });
        }
      });
    }
  };
  const saveEventGameHandler = () => {
    let body: any = null;
    gameActionFormRequest.value.loading = true;
    try {
      if (gameActionFormRequest.value.action === 'goals') {
        body = {
          home: gameEvents.value.home.filter((event) => event.type && event.player_id && event.minute),
          away: gameEvents.value.away.filter((event) => event.type && event.player_id && event.minute),
        };
        const shootoutPayload = buildShootoutPayload();
        if (shootoutPayload) {
          body.shootout = shootoutPayload;
        }
        gameAPI
          .saveGoalsHandler(game.value.id, body)
          .then(() => {
            gameActionFormRequest.value.loading = false;
            gameActionFormRequest.value.disabled = true;
            gameActionFormRequest.value.body = null;
            gameActionFormRequest.value.action = 'cards';
          })
          .then(async () => {
            await getGameDetails();
          });
      }
      if (gameActionFormRequest.value.action === 'cards') {
        body = {
          home: gameEvents.value.home.filter((event) => event.type && event.player_id && event.minute),
          away: gameEvents.value.away.filter((event) => event.type && event.player_id && event.minute),
        };
        gameAPI.saveCardsHandler(game.value.id, body).then(() => {
          gameActionFormRequest.value.loading = false;
          gameActionFormRequest.value.disabled = true;
          gameActionFormRequest.value.body = null;
          gameActionFormRequest.value.action = 'substitutions';
        });
      }
      if (gameActionFormRequest.value.action === 'substitutions') {
        body = {
          home: substitutions.value.home.filter((sub) => sub.player_in_id && sub.player_out_id && sub.minute),
          away: substitutions.value.away.filter((sub) => sub.player_in_id && sub.player_out_id && sub.minute),
        };
        gameAPI.saveSubstitutionHandler(game.value.id, body).then(() => {
          gameActionFormRequest.value.loading = false;
          gameActionFormRequest.value.disabled = true;
          gameActionFormRequest.value.body = null;
          gameActionFormRequest.value.action = 'substitutions';
        });
      }
      initializeGameReport(game.value.id).then((initialize) => {
        useTeamStore().initReportHandler(initialize);
      });
      useToast().toast({
        type: 'success',
        msg: 'Evento guardado correctamente',
        description: 'El evento del partido se ha guardado con éxito',
      });
    } catch (error) {
      console.log({ error });
      useToast().toast({
        type: 'error',
        msg: 'Error al guardar el evento',
        description:
          'Hubo un error al intentar guardar el evento del partido. Por favor, intente nuevamente más tarde.',
      });
    } finally {
      dialogState.value.show = false;
    }
  };
  const removeSubstitution = async (substitution_id: number) => {
    return gameAPI.removeSubstitution(game.value.id, substitution_id).finally(() => {
      useToast().toast({
        type: 'success',
        msg: 'Sustitución eliminada correctamente',
        description: 'La sustitución se ha eliminado con éxito',
      });
    });
  };
  const removeCardEvent = async (gameEventId: number) => {
    return await gameAPI.removeCardEvent(game.value.id, gameEventId).finally(() => {
      useToast().toast({
        type: 'success',
        msg: 'Tarjeta eliminada correctamente',
        description: 'La tarjeta se ha eliminado con éxito',
      });
    });
  };
  const removeGoalEvent = async (gameEventId: number) => {
    return await gameAPI.removeGoalEvent(game.value.id, gameEventId).finally(() => {
      useToast().toast({
        type: 'success',
        msg: 'Gol eliminado correctamente',
        description: 'El gol se ha eliminado con éxito',
      });
    });
  };
  const markAsComplete = async () => {
    return await gameAPI
      .markAsComplete(game.value.id)
      .then(async () => {
        await getGameDetails();
        ga4Event('match_result_updated', {
          tournament_id: useTournamentStore().tournamentId?.value ?? null,
          game_id: game.value?.id ?? null,
          status: 'completed',
        });
      })
      .finally(() => {
        useToast().toast({
          type: 'success',
          msg: 'Status del partido',
          description: 'El partido ha sido marcado completado éxito',
        });
      });
  };
  return {
    game,
    games,
    gameId,
    gameReportDialog,
    showReScheduleDialog,
    gameDetailsRequest,
    gameTeamFormRequest,
    gamePlayers,
    showFabBtn,
    headAndSubsGamePlayers,
    substitutions,
    gameActionFormRequest,
    dialogState,
    gameEvents,
    penaltyShootout,
    isPenaltyDataValid,
    getGameDetails,
    getGameTeamsPlayers,
    reScheduleGame,
    initializeGameReport,
    getHeadAndSubsGamePlayers,
    saveEventGameHandler,
    removeSubstitution,
    removeCardEvent,
    removeGoalEvent,
    markAsComplete,
    resetPenaltyShootout,
    validateGoalsForm,
  };
});
