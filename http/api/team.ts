import type { Formation, Team } from '~/models/Team';
import type { TeamLineupAvailablePlayers } from '~/models/Player';
import type { FormationPlayer, NextGames, TeamFormation } from '~/models/Game';

export const getTeamBy = async (term: number | string) => {
  const client = useSanctumClient();
  return await client<Promise<Team>>(`/api/v1/admin/teams/${term}?by_slug=${typeof term === 'string'}`);
};
export const getDefaultLineupAvailableTeemPlayers = async (team: Team) => {
  const client = useSanctumClient();
  return await client<Promise<TeamLineupAvailablePlayers[]>>(`/api/v1/admin/teams/${team.id}/available-players`);
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
  return await client<Promise<TeamLineupAvailablePlayers[]>>(
    `/api/v1/admin/teams/${player.team_id}/default-lineup-players/${currentPlayer.default_lineup_player_id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ player, field_location }),
    }
  );
};
export const addDefaultLineupPlayer = async (player: TeamLineupAvailablePlayers, field_location: number) => {
  const client = useSanctumClient();
  return await client<Promise<TeamLineupAvailablePlayers[]>>(
    `/api/v1/admin/teams/${player.team_id}/default-lineup-players`,
    {
      method: 'POST',
      body: JSON.stringify({ player, field_location }),
    }
  );
};
export const nextGames = async (teamId: number, limit: number = 3, order = 'asc') => {
  const client = useSanctumClient();
  return await client<Promise<NextGames>>(`/api/v1/admin/teams/${teamId}/next-games?limit=${limit}&order=${order}`);
};
export const lastGames = async (teamId: number, limit: number = 3, order = 'asc') => {
  const client = useSanctumClient();
  return await client<Promise<NextGames>>(`/api/v1/admin/teams/${teamId}/last-games?limit=${limit}&order=${order}`);
};
export const getFormations = async () => {
  const client = useSanctumClient();
  return await client<Promise<Formation[]>>('/api/v1/admin/games/formations');
};
export const updateDefaultFormationType = async ($team_id: number, formation_id: number) => {
  const client = useSanctumClient();
  return await client<Promise<TeamFormation>>(`/api/v1/admin/teams/${$team_id}/formation`, {
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
  return await client<Promise<TeamLineupAvailablePlayers[]>>(
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
  return await client<Promise<TeamLineupAvailablePlayers[]>>(
    `/api/v1/admin/teams/${player.team_id}/games/${game_id}/lineup-players`,
    {
      method: 'POST',
      body: JSON.stringify({ player, currentPlayer, field_location }),
    }
  );
};
export const updateGameTeamFormationType = async (team_id: number, game_id: number, formation_id: number) => {
  const client = useSanctumClient();
  return await client<Promise<TeamFormation>>(`/api/v1/admin/teams/${team_id}/games/${game_id}/formation`, {
    method: 'PUT',
    body: JSON.stringify({ formation_id }),
  });
};
