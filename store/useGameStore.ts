import {defineStore} from "pinia";
import type {Game} from "~/models/Game";

export const useGameStore = defineStore('gameStore', () => {
    const game = ref<Game>();
    const games = ref<Game[]>([]);
    const gameId = ref<number | null>(null);
    const gameReportDialog = ref(false);

    const fetchGame = async (id: number) => {
        const client = useSanctumClient();
        game.value = await client(`/api/v1/admin/games/${id}`);
    }
    return {
        game,
        games,
        gameId,
        gameReportDialog,
        fetchGame
    }
});