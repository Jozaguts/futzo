import type {League} from "~/models/league";
import {defineStore} from "pinia";

export const useLeaguesStore = defineStore('leaguesStore', () => {
    const leagues = ref<League[]>([]);
    const fetchLeagues = async () => {
        const client = useSanctumClient();
        leagues.value = await client('/api/v1/admin/leagues');
    };
    return {
        leagues,
        fetchLeagues,
    };
});