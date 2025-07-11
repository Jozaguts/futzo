import {defineStore} from "pinia";

import type {Game, GameDetailsRequest, GameTeam, GameTeamFormRequest, GameTeamsPlayers, ReScheduleFormState, TeamType} from "~/models/Game";
import {useScheduleStore} from "~/store/useScheduleStore";
import {getGame as _getGame, getGamePlayers} from "~/http/api/game";
import dayjs from "dayjs";

export const useGameStore = defineStore('gameStore', () => {
    const game = ref<Game>(null as unknown as Game);
    const games = ref<Game[]>([]);
    const gameId = ref<number | null>(null);
    const gameReportDialog = ref(false);
    const showReScheduleDialog = ref(false);
    const gameDetailsRequest = ref<GameDetailsRequest>({} as GameDetailsRequest);
    const showFabBtn = shallowRef(false);
    const reScheduleFormState = ref<ReScheduleFormState>({} as ReScheduleFormState);
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
    })
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
    const getGameTeamsPlayers = async () => {
        if (gameDetailsRequest.value?.game_id) {
            return await getGamePlayers(gameDetailsRequest.value?.game_id);
        }
    }
    const fetchGame = async (id: number) => {
        const client = useSanctumClient();
        game.value = await client(`/api/v1/admin/games/${id}`);
    }
    const getGameDetails = async () => {
        if (dayjs(reScheduleFormState.value?.date).isValid()) {
            reScheduleFormState.value.date = dayjs(reScheduleFormState.value?.date).format('YYYY-MM-DD');
        }
        await _getGame(reScheduleFormState.value?.game_id, reScheduleFormState.value?.date, reScheduleFormState.value?.field_id)
            .then((data) => {
                game.value = data as Game;
            })
            .catch(() => {
                useToast().toast('error', 'Error al obtener el partido', 'Hubo un error al intentar obtener los detalles del partido. Por favor, intente nuevamente más tarde.');
            })
    }
    const reScheduleGame = async () => {
        const client = useSanctumClient()
        client(`/api/v1/admin/games/${reScheduleFormState.value?.game_id}/reschedule`, {
            method: 'PUT',
            body: {
                date: reScheduleFormState.value?.date,
                field_id: reScheduleFormState.value?.field_id,
                selected_time: reScheduleFormState.value?.selected_time,
                day: reScheduleFormState.value?.day,
            }
        }).then(async () => {
            useScheduleStore().schedulePagination.currentPage = 1
            await useScheduleStore().getTournamentSchedules()
            useToast().toast('success', 'Partido reprogramado correctamente', 'El partido se ha reprogramado con éxito')
            showReScheduleDialog.value = false
        }).catch((error) => {
            useToast().toast('error', 'Error al reprogramar partido', 'Hubo un error al intentar reprogramar el partido. Por favor, intente nuevamente más tarde.')
        })
    }
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
        reScheduleFormState,
        fetchGame,
        getGameDetails,
        getGameTeamsPlayers,
        reScheduleGame
    }
});