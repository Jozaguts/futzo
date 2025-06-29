import {defineStore} from "pinia";
import type {Game, GameDetailsRequest} from "~/models/Game";

export const useGameStore = defineStore('gameStore', () => {
    const game = ref<Game>();
    const games = ref<Game[]>([]);
    const gameId = ref<number | null>(null);
    const gameReportDialog = ref(false);
    const showReScheduleDialog = ref(false);
    const gameDetailsRequest = ref<GameDetailsRequest>();

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
        fetchGame,
        getGame
    }
});