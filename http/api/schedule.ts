export const fetchRoundByStatus = async (tournamentId: number, filter: string, page: number) => {
    const client = useSanctumClient();
    type Filters = { filterBy?: string, page: number }
    let query: Filters = {} as Filters
    if (filter) {
        query.filterBy = filter;
    }
    if (page) {
        query.page = page;
    }
    try {
        let url = `/api/v1/admin/tournaments/${tournamentId}/schedule`;
        const data = await client(url, {
            query
        });
        return data ?? [];
    } catch (error) {
        console.error("Error fetching rounds by status:", error);
        return [];
    }
}