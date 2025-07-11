export const getGamePlayers = async (gameId: number) => {
    const client = useSanctumClient();
    try {
        const data = await client(`/api/v1/admin/games/${gameId}/teams/players`);
        return data ?? [];
    } catch (error) {
        console.error("Error fetching game players:", error);
        return [];
    }
}

export const getGame = async (game_id: number, date: string, field_id: number) => {
    const client = useSanctumClient();
    return await client(`/api/v1/admin/games/${game_id}/details`, {
        query: {date, field_id}
    })
}