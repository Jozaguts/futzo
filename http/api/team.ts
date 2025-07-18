import type { Team } from '~/models/Team';
import type { TeamLineupAvailablePlayers } from '~/models/Player';
import type { FormationPlayer, Game, NextGames } from '~/models/Game';

export const getTeamBy = async (term: number | string) => {
  const client = useSanctumClient();
  return await client<Promise<Team>>(
    `/api/v1/admin/teams/${term}?by_slug=${typeof term === 'string'}`
  );
};
export const getDefaultLineupAvailableTeemPlayers = async (team: Team) => {
  const client = useSanctumClient();
  return await client<Promise<TeamLineupAvailablePlayers[]>>(
    `/api/v1/admin/teams/${team.id}/available-players`
  );
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
export const nextGames = async (teamId: number, limit: number = 3) => {
  const client = useSanctumClient();
  return await client<Promise<NextGames>>(
    `/api/v1/admin/teams/${teamId}/next-games?limit=${limit}`
  );
};
