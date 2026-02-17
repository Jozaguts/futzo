import {useRequestFetch, useRuntimeConfig, useSanctumClient} from '#imports';
import type {
    ExportType,
    PreRegisterTournamentResponse,
    Tournament,
    TournamentDetailKpis,
    TournamentStats,
} from '~/models/tournament';
import type {Game} from '~/models/Game';
import {parseBlobResponse} from '~/utils/prepareFormData';
import type {BracketPreview, ConfirmBracketPayload} from '~/models/Bracket';
import type {
    ScheduleRegenerationAnalysis,
    ScheduleRegenerationPayload,
    ScheduleRegenerationResult,
} from '~/models/Schedule';
import type {PublicTournamentStatusData} from '~/models/PublicTournament';

export const getTournamentPublicSchedule = async (slug: string, page: number, perPage: number = 3) => {
  const config = useRuntimeConfig();
  const requestFetch = useRequestFetch();
  return await requestFetch(
    `${config.public.baseURLBackend}/api/v1/public/tournaments/${slug}/schedule?page=${page}&perPage=${perPage}`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
};
export const getTournamentPublicDetails = async (slug: string) => {
  const config = useRuntimeConfig();
  const requestFetch = useRequestFetch();
  return await requestFetch<PublicTournamentStatusData>(
    `${config.public.baseURLBackend}/api/v1/public/tournaments/${slug}/details`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
};
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
export const getTournamentMetrics = async (tournamentId: number, range: 'lastMonth' = 'lastMonth') => {
  const client = useSanctumClient();
  return await client<{ data: TournamentDetailKpis }>(`/api/v1/admin/tournaments/${tournamentId}/metrics`, {
    query: { range },
  });
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
  const config = useRuntimeConfig();
  const requestFetch = useRequestFetch();
  return await requestFetch<PreRegisterTournamentResponse>(
    `${config.public.baseURLBackend}/api/v1/public/tournaments/${slug}/registrations/catalogs`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
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

export const getTournamentScheduleQRCode = async (tournamentId: number, key: string = 'tournament_status') => {
  const client = useSanctumClient();
  return await client<{ image: string; meta: { league_id: number; tournament_id: number; type: string } }>(
    `/api/v1/admin/tournaments/${tournamentId}/schedule/qr-code/generate`,
    {
      query: { key },
    }
  );
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

export const analyzeScheduleRegeneration = async (tournamentId: number, payload?: ScheduleRegenerationPayload) => {
  const client = useSanctumClient();
  const options: Record<string, unknown> = { method: 'POST' };
  if (payload && Object.keys(payload).length > 0) {
    options.body = payload;
  }
  return await client<ScheduleRegenerationAnalysis>(
    `/api/v1/admin/tournaments/${tournamentId}/regenerate-calendar`,
    options
  );
};

export const confirmScheduleRegeneration = async (tournamentId: number, payload?: ScheduleRegenerationPayload) => {
  const client = useSanctumClient();
  const options: Record<string, unknown> = { method: 'POST' };
  if (payload && Object.keys(payload).length > 0) {
    options.body = payload;
  }
  return await client<ScheduleRegenerationResult>(
    `/api/v1/admin/tournaments/${tournamentId}/confirm-regeneration`,
    options
  );
};

export type UpdateTournamentTeamCompetitionStatusPayload = {
  is_active: boolean;
  effective_round?: number;
};

export const updateTournamentTeamCompetitionStatus = async (
  tournamentId: number,
  teamId: number,
  payload: UpdateTournamentTeamCompetitionStatusPayload
) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/tournaments/${tournamentId}/teams/${teamId}/competition-status`, {
    method: 'PATCH',
    body: payload,
    meta: { toast: false },
  } as any);
};
