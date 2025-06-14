import type { League, LeagueType } from '~/models/league';
import { defineStore } from 'pinia';
import type { LocationStoreRequest } from '~/models/Location';

export const useLeaguesStore = defineStore('leaguesStore', () => {
  const leagues = ref<League[]>([]);
  const footballTypes = ref<LeagueType[]>([]);
  const fetchLeagues = async () => {
    const client = useSanctumClient();
    leagues.value = await client('/api/v1/admin/leagues');
  };
  const getFootballTypes = async () => {
    const client = useSanctumClient();
    footballTypes.value = await client('/api/v1/admin/leagues/football/types');
  };
  const getLeagueLocations = async () => {
    const client = useSanctumClient();
    return await client<LocationStoreRequest[]>(
      '/api/v1/admin/leagues/locations'
    );
  };
  onBeforeMount(async () => {
    await useLeaguesStore().fetchLeagues();
    await useLeaguesStore().getFootballTypes();
  });
  onMounted(async () => {
    await getFootballTypes();
  });
  return {
    leagues,
    getFootballTypes,
    fetchLeagues,
    footballTypes,
    getLeagueLocations,
  };
});
