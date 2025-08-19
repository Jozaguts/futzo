import type { ExportType, Tournament, TournamentStats } from '~/models/tournament';
import type { Game } from '~/models/Game';
import { parseBlobResponse } from '~/utils/prepareFormData';

export const exportTournamentRoundScheduleAs = async (type: ExportType, tournamentId: number, round: any) => {
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
  parseBlobResponse(blob, `jornada-${round}-torneo-${tournamentId}`, type);
};
export const getStandings = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/standings`);
};
export const getBySlug = async (slug: string) => {
  const client = useSanctumClient();
  return await client<Promise<Tournament>>(`/api/v1/admin/tournaments/${slug}`);
};
export const getTournamentStats = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client<Promise<TournamentStats>>(`/api/v1/admin/tournaments/${tournamentId}/stats`);
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
  return await client<Promise<Game[]>>(`/api/v1/admin/tournaments/${tournamentId}/next-games`, {
    query: {
      limit,
    },
  });
};
export const exportStandingTournament = async (type: ExportType, tournament: Tournament) => {
  const client = useSanctumClient();
  const blob = await client<Promise<Blob>>(`/api/v1/admin/tournaments/${tournament.id}/standing/export`, {
    method: 'GET',
    query: {
      type,
    },
    responseType: 'blob' as 'json',
  });
  parseBlobResponse(blob, `${tournament.name}-tabla-de-posiciones`, type);
};
export const exportTournamentStatsTables = async (type: ExportType, tournament: Tournament) => {
  const client = useSanctumClient();
  const blob = await client<Promise<Blob>>(`/api/v1/admin/tournaments/${tournament.id}/stats/export`, {
    method: 'GET',
    query: {
      type,
    },
    responseType: 'blob' as 'json',
  });
  parseBlobResponse(blob, `${tournament.name}-estadísticas`, type);
};
