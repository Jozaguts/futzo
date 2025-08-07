import type { Team } from '~/models/Team';

export const exportTournamentRoundScheduleAs = async (type: 'excel' | 'img', tournamentId: number, round: any) => {
  const client = useSanctumClient();
  return await client<Promise<Team>>(`/api/v1/admin/tournaments/${tournamentId}/schedule/rounds/${round}/export`, {
    method: 'GET',
    query: {
      type,
    },
  });
};
