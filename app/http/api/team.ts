import type {
    Formation,
    PreRegisterTeamResponse,
    Team,
    TeamDetailMetricsResponse,
    TeamMetricsRange,
    TeamsPaginatedResponse,
} from '~/models/Team';
import type {TeamLineupAvailablePlayers} from '~/models/Player';
import type {FormationPlayer, LastGames, NextGames, TeamFormation} from '~/models/Game';
import type {IPagination} from '~/interfaces';

export const getTeamBy = async (term: number | string) => {
  const client = useSanctumClient();
  return await client<Team>(`/api/v1/admin/teams/${term}?by_slug=${typeof term === 'string'}`);
};
export const getDefaultLineupAvailableTeemPlayers = async (team: Team) => {
  const client = useSanctumClient();
  return await client<TeamLineupAvailablePlayers[]>(`/api/v1/admin/teams/${team.id}/available-players`);
};
export const getTeamMetrics = async (teamId: number, range: TeamMetricsRange = 'lastMonth') => {
  const client = useSanctumClient();
  return await client<TeamDetailMetricsResponse>(`/api/v1/admin/teams/${teamId}/metrics`, {
    query: { range },
  });
};
export const getTeamFormation = async (team: Team) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/teams/${team.id}/formation`);
};
export const updateDefaultLineup = async (
  player: TeamLineupAvailablePlayers,
  currentPlayer: FormationPlayer,
  field_location: number
) => {
  const client = useSanctumClient();
  return await client<TeamLineupAvailablePlayers[]>(
    `/api/v1/admin/teams/${player.team_id}/default-lineup-players/${currentPlayer.default_lineup_player_id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ player, field_location }),
    }
  );
};
export const addDefaultLineupPlayer = async (player: TeamLineupAvailablePlayers, field_location: number) => {
  const client = useSanctumClient();
  return await client<TeamLineupAvailablePlayers[]>(`/api/v1/admin/teams/${player.team_id}/default-lineup-players`, {
    method: 'POST',
    body: JSON.stringify({ player, field_location }),
  });
};
export const nextGames = async (teamId: number, limit: number = 3, order = 'asc') => {
  const client = useSanctumClient();
  return await client<NextGames>(`/api/v1/admin/teams/${teamId}/next-games?limit=${limit}&order=${order}`);
};
export const lastGames = async (teamId: number, limit: number = 3, order = 'asc') => {
  const client = useSanctumClient();
  return await client<LastGames[]>(`/api/v1/admin/teams/${teamId}/last-games?limit=${limit}&order=${order}`);
};
export const getFormations = async () => {
  const client = useSanctumClient();
  return await client<Formation[]>('/api/v1/admin/games/formations');
};
export const updateDefaultFormationType = async ($team_id: number, formation_id: number) => {
  const client = useSanctumClient();
  return await client<TeamFormation>(`/api/v1/admin/teams/${$team_id}/formation`, {
    method: 'PUT',
    body: JSON.stringify({ formation_id }),
  });
};
export const updateLineup = async (
  player: TeamLineupAvailablePlayers,
  currentPlayer: FormationPlayer,
  field_location: number
) => {
  const client = useSanctumClient();
  return await client<TeamLineupAvailablePlayers[]>(
    `/api/v1/admin/teams/${player.team_id}/lineup-players/${currentPlayer.lineup_player_id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ player, field_location }),
    }
  );
};
export const addLineupPlayer = async (
  player: TeamLineupAvailablePlayers,
  currentPlayer: FormationPlayer,
  field_location: number,
  game_id: number
) => {
  const client = useSanctumClient();
  return await client<TeamLineupAvailablePlayers[]>(
    `/api/v1/admin/teams/${player.team_id}/games/${game_id}/lineup-players`,
    {
      method: 'POST',
      body: JSON.stringify({ player, currentPlayer, field_location }),
    }
  );
};
export const updateGameTeamFormationType = async (team_id: number, game_id: number, formation_id: number) => {
  const client = useSanctumClient();
  return await client<TeamFormation>(`/api/v1/admin/teams/${team_id}/games/${game_id}/formation`, {
    method: 'PUT',
    body: JSON.stringify({ formation_id }),
  });
};
export const updateHomePreferences = async (
  teamId: number,
  payload: {
    home_location_id: number | null;
    home_day_of_week: number | null;
    home_start_time: string | null;
  }
) => {
  const client = useSanctumClient();
  return await client<Team>(`/api/v1/admin/teams/${teamId}/home-preferences`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};
export const initPreRegister = async (slug: string) => {
  const config = useRuntimeConfig();
  const requestFetch = useRequestFetch();
  return await requestFetch<PreRegisterTeamResponse>(
    `${config.public.baseURLBackend}/api/v1/public/teams/${slug}/registrations/catalogs`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
};
export const getTeams = async (pagination: IPagination, range: string = 'lastMonth') => {
  const client = useSanctumClient();
  return await client<TeamsPaginatedResponse>(
    `/api/v1/admin/teams?per_page=${pagination.per_page}&page=${pagination.current_page}&sort=${pagination.sort}&range=${range}`
  );
};
export const searchTeams = async (value: string = '') => {
  const client = useSanctumClient();
  return await client<TeamsPaginatedResponse>(`/api/v1/admin/teams/search?value=${value}`);
};
export const getTeamRegistrationQRCode = async (teamId: number) => {
  const client = useSanctumClient();
  return await client<{ image: string }>(`/api/v1/admin/teams/${teamId}/registration/qr-code/generate`);
};
