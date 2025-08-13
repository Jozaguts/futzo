import type { Team } from '~/models/Team';

export const exportTournamentRoundScheduleAs = async (type: 'excel' | 'img', tournamentId: number, round: any) => {
  const client = useSanctumClient();
  const blob = await client<Promise<Blob>>(
    `/api/v1/admin/tournaments/${tournamentId}/schedule/rounds/${round}/export`,
    {
      method: 'GET',
      query: {
        type,
      },
      responseType: 'blob' as 'json',
    }
  );
  if (blob instanceof Blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jornada-${round}-torneo-${tournamentId}.${type === 'img' ? 'jpg' : 'xls'}`; // nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};
export const getStandings = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/standings`);
};
export const getBySlug = async (slug: string) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${slug}`);
};
export const getTournamentStats = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/stats`);
};
export const getLastResults = async (tournamentId: number, limit = 3) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/last-results`, {
    query: {
      limit,
    },
  });
};
export const getNextGames = async (tournamentId: number, limit = 3) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/next-games`, {
    query: {
      limit,
    },
  });
};
