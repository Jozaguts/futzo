import type { League, LeagueType } from '~/models/league';
import type { Field } from '~/models/Location';
import type { Tournament } from '~/models/tournament';

const fetchLeagues = async () => {
  const client = useSanctumClient();
  return await client<League[]>('/api/v1/admin/leagues');
};
const getFootballTypes = async () => {
  const client = useSanctumClient();
  return await client<LeagueType[]>('/api/v1/admin/leagues/football/types');
};
const getLeagueLocations = async () => {
  const client = useSanctumClient();
  return await client<Field[]>('/api/v1/admin/leagues/locations');
};
const getLeagueTournaments = async (leagueId: number) => {
  const client = useSanctumClient();
  return await client<{ data: Tournament[] }>(`/api/v1/admin/leagues/${leagueId}/tournaments`);
};
export default {
  fetchLeagues,
  getFootballTypes,
  getLeagueLocations,
  getLeagueTournaments,
};
