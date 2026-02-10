import type {League, LeagueType} from '~/models/league';
import type {User} from '~/models/User';
import {defineStore} from 'pinia';
import leagueAPI from '~/http/api/league';
import type {Tournament} from '~/models/tournament';

export const useLeaguesStore = defineStore('leaguesStore', () => {
  const leagues = ref<League[]>([]);
  const footballTypes = ref<LeagueType[]>([]);
  const leagueTournaments = ref<Tournament[]>([]);
  const user = useSanctumUser<User>();
  const isLogged = computed(() => !!user.value?.email || !!user.value?.phone);
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
  const isTestEnv = import.meta.env.MODE === 'test';
  const hasFetched = ref(false);
  watch(
    () => user.value,
    (currentUser) => {
      if (!import.meta.client && !isTestEnv) return;
      if (hasFetched.value) return;
      const logged = !!currentUser?.email || !!currentUser?.phone;
      if (!logged) return;
      fetchLeagues();
      getFootballTypes();
      hasFetched.value = true;
    },
    { immediate: true }
  );
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
