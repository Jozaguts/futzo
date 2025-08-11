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
  if (blob.type.includes('image/')) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jornada-${round}-torneo-${tournamentId}.jpg`; // nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};
