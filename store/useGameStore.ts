import { defineStore } from 'pinia';

import type {
  DialogHandlerActionsNames,
  Game,
  GameDetailsRequest,
  GameTeam,
  GameTeamFormRequest,
  HeadAndSubsGamePlayers,
  Substitution,
  TeamSubstitutions,
  TeamType,
} from '~/models/Game';
import { useScheduleStore } from '~/store/useScheduleStore';
import * as gameAPI from '~/http/api/game';
import dayjs from 'dayjs';

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
    },
    away: {
      team_id: 0,
      name: '',
      players: [],
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
  // headAndSubsGamePlayers.value?.away.players.
  const getGameTeamsPlayers = async () => {
    if (gameDetailsRequest.value?.game_id) {
      return await gameAPI.getGamePlayers(gameDetailsRequest.value?.game_id);
    }
  };
  const fetchGame = async (id: number) => {
    const client = useSanctumClient();
    game.value = await client(`/api/v1/admin/games/${id}`);
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
  };
  const saveEventGameHandler = () => {
    let body: any = null;
    if (gameActionFormRequest.value.action === 'substitutions') {
      body = {
        home: substitutions.value.home.filter((sub) => sub.player_in_id && sub.player_out_id && sub.minute),
        away: substitutions.value.away.filter((sub) => sub.player_in_id && sub.player_out_id && sub.minute),
      };
    }
    const response = gameAPI.saveEventGameHandler(game.value.id, body);
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
    fetchGame,
    getGameDetails,
    getGameTeamsPlayers,
    reScheduleGame,
    initializeGameReport,
    getHeadAndSubsGamePlayers,
    saveEventGameHandler,
  };
});
