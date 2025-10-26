import { useSanctumClient } from '#imports';
import type { ExportType, PreRegisterTournamentResponse, Tournament, TournamentStats } from '~/models/tournament';
import type { Game } from '~/models/Game';
import { parseBlobResponse } from '~/utils/prepareFormData';
import type { BracketPreview, ConfirmBracketPayload } from '~/models/Bracket';

export const exportTournamentRoundScheduleAs = async (type: ExportType, tournamentId: number, round: any) => {
  const client = useSanctumClient();
  const blob = await client<Blob>(`/api/v1/admin/tournaments/${tournamentId}/schedule/rounds/${round}/export`, {
    method: 'GET',
    query: {
      type,
    },
    responseType: 'blob' as 'json',
  });
  parseBlobResponse(blob, `jornada-${round}-torneo-${tournamentId}`, type);
};
export const getStandings = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/standings`);
};
export const getBySlug = async (slug: string) => {
  const client = useSanctumClient();
  return await client<Tournament>(`/api/v1/admin/tournaments/${slug}`);
};
export const getTournamentStats = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client<TournamentStats>(`/api/v1/admin/tournaments/${tournamentId}/stats`);
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
  return await client<Game[]>(`/api/v1/admin/tournaments/${tournamentId}/next-games`, {
    query: {
      limit,
    },
  });
};
export const exportStandingTournament = async (type: ExportType, tournament: Tournament) => {
  const client = useSanctumClient();
  const blob = await client<Blob>(`/api/v1/admin/tournaments/${tournament.id}/standing/export`, {
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
  const blob = await client<Blob>(`/api/v1/admin/tournaments/${tournament.id}/stats/export`, {
    method: 'GET',
    query: {
      type,
    },
    responseType: 'blob' as 'json',
  });
  parseBlobResponse(blob, `${tournament.name}-estadísticas`, type);
};
export const initPreRegister = async (slug: string) => {
  const client = useSanctumClient();
  return await client<PreRegisterTournamentResponse>(`/api/v1/public/tournaments/${slug}/registrations/catalogs`);
};
export const getGroupStanding = async (tournamentId: number, phase_id?: number) => {
  const client = useSanctumClient();
  let url = `/api/v1/admin/tournaments/${tournamentId}/group-standings`;
  if (phase_id) {
    url += '?phase_id=' + phase_id;
  }
  return await client(url);
};
export const getTournamentRegistrationQRCode = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client<{ image: string }>(`/api/v1/admin/tournaments/${tournamentId}/registration/qr-code/generate`);
};

export const advanceTournamentPhase = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/phases/advance`, {
    method: 'POST',
  });
};

export const getBracketPreview = async (tournamentId: number, phase: string) => {
  const client = useSanctumClient();
  return await client<BracketPreview>(`/api/v1/admin/tournaments/${tournamentId}/bracket/preview`, {
    query: {
      phase,
    },
  });
};

export const confirmBracket = async (tournamentId: number, payload: ConfirmBracketPayload) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/bracket/confirm`, {
    method: 'POST',
    body: payload,
  });
};

export const getTournamentFields = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/fields`);
};
