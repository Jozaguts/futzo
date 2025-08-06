import { defineStore } from 'pinia';

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
import { useScheduleStore } from '~/store/useScheduleStore';
import * as gameAPI from '~/http/api/game';
import dayjs from 'dayjs';
import { useTeamStore } from '~/store/useTeamStore';
import { useToast } from '~/composables/useToast';
import { useSanctumClient } from '#imports';

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
        if (game.value?.options?.length) {
          gameDetailsRequest.value.day = game.value.options[0].available_intervals.day;
        }
      })
      .catch(() => {
        useToast().toast(
          'error',
          'Error al obtener el partido',
          'Hubo un error al intentar obtener los detalles del partido. Por favor, intente nuevamente más tarde.'
        );
      });
  };
  const reScheduleGame = async () => {
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
        useScheduleStore().schedulePagination.currentPage = 1;
        await useScheduleStore().getTournamentSchedules();
        useToast().toast('success', 'Partido reprogramado correctamente', 'El partido se ha reprogramado con éxito');
        showReScheduleDialog.value = false;
      })
      .catch(() => {
        useToast().toast(
          'error',
          'Error al reprogramar partido',
          'Hubo un error al intentar reprogramar el partido. Por favor, intente nuevamente más tarde.'
        );
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
      useToast().toast('success', 'Evento guardado correctamente', 'El evento del partido se ha guardado con éxito');
    } catch (error) {
      useToast().toast(
        'error',
        'Error al guardar el evento',
        'Hubo un error al intentar guardar el evento del partido. Por favor, intente nuevamente más tarde.'
      );
    } finally {
      dialogState.value.show = false;
    }
  };
  const removeSubstitution = async (substitution_id: number) => {
    return gameAPI.removeSubstitution(game.value.id, substitution_id).finally(() => {
      useToast().toast('success', 'Sustitución eliminada correctamente', 'La sustitución se ha eliminado con éxito');
    });
  };
  const removeCardEvent = async (gameEventId: number) => {
    return await gameAPI.removeCardEvent(game.value.id, gameEventId).finally(() => {
      useToast().toast('success', 'Tarjeta eliminada correctamente', 'La tarjeta se ha eliminado con éxito');
    });
  };
  const removeGoalEvent = async (gameEventId: number) => {
    return await gameAPI.removeGoalEvent(game.value.id, gameEventId).finally(() => {
      useToast().toast('success', 'Gol eliminado correctamente', 'El gol se ha eliminado con éxito');
    });
  };
  const markAsComplete = async () => {
    return await gameAPI
      .markAsComplete(game.value.id)
      .then(async () => {
        await getGameDetails();
      })
      .finally(() => {
        useToast().toast('success', 'Status del partido', 'El partido ha sido marcado completado éxito');
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
  };
});
