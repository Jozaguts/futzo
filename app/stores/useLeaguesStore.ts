import type { League, LeagueType } from '~/models/league';
import { defineStore } from 'pinia';
import type { Field } from '~/models/Location';
import leagueAPI from '~/http/api/league';
import type { Tournament } from '~/models/tournament';

export const useLeaguesStore = defineStore('leaguesStore', () => {
  const leagues = ref<League[]>([]);
  const footballTypes = ref<LeagueType[]>([]);
  const leagueTournaments = ref<Tournament[]>([]);
  const fetchLeagues = async () => {
    leagues.value = await leagueAPI.fetchLeagues();
  };
  const getFootballTypes = async () => {
    footballTypes.value = await leagueAPI.getFootballTypes();
  };
  const getLeagueLocations = async () => {
    return await leagueAPI.getLeagueLocations();
  };
  const getLeagueTournaments = async (leagueId: number) => {
    const response = await leagueAPI.getLeagueTournaments(leagueId);
    leagueTournaments.value = response.data ?? ([] as Tournament[]);
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
    footballTypes,
    leagueTournaments,
    getFootballTypes,
    fetchLeagues,
    getLeagueLocations,
    getLeagueTournaments,
  };
});
