import {defineStore} from "pinia";

import type {Game, GameDetailsRequest, GameTeam, GameTeamFormRequest, GameTeamsPlayers, TeamType} from "~/models/Game";

export const useGameStore = defineStore('gameStore', () => {
    const game = ref<Game>(null as unknown as Game);
    const games = ref<Game[]>([]);
    const gameId = ref<number | null>(null);
    const gameReportDialog = ref(false);
    const showReScheduleDialog = ref(false);
    const gameDetailsRequest = ref<GameDetailsRequest>();
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
        const client = useSanctumClient();
        if (gameId.value) {
            return await client(`/api/v1/admin/games/${gameId.value}/teams/players`);
        }
        return [];
    }
    const fetchGame = async (id: number) => {
        const client = useSanctumClient();
        game.value = await client(`/api/v1/admin/games/${id}`);
    }
    const getGame = async () => {
        const client = useSanctumClient();
        return await client(`/api/v1/admin/games/${gameId.value}?date=${gameDetailsRequest.value?.date}&field_id=${gameDetailsRequest.value?.field_id}`)
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
        fetchGame,
        getGame,
        getGameTeamsPlayers
    }
});