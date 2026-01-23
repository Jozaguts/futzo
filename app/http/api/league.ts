import type { League, LeagueType } from '~/models/league';
import type { Field } from '~/models/Location';
import type { Tournament } from '~/models/tournament';
const client = useSanctumClient();
const fetchLeagues = async () => {
  return await client<League[]>('/api/v1/admin/leagues');
};
const getFootballTypes = async () => {
  return await client<LeagueType[]>('/api/v1/admin/leagues/football/types');
};
const getLeagueLocations = async () => {
  return await client<Field[]>('/api/v1/admin/leagues/locations');
};
const getLeagueTournaments = async (leagueId: number) => {
  return await client<{ data: Tournament[] }>(`/api/v1/admin/leagues/${leagueId}/tournaments`);
};
export default {
  fetchLeagues,
  getFootballTypes,
  getLeagueLocations,
  getLeagueTournaments,
};
