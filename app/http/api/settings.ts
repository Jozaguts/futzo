import {useRequestFetch, useRuntimeConfig, useSanctumClient} from '#imports';
import type {
  PlayerTransferLockSetting,
  PlayerVerificationMethod,
  PlayerVerificationSettings,
  TournamentConfigurationSettings,
} from '~/models/settings';

export const getPlayerTransferLocks = async () => {
  const client = useSanctumClient();
  return await client<PlayerTransferLockSetting[]>('/api/v1/admin/settings/players/transfer-locks');
};

export const updatePlayerTransferLock = async (tournamentId: number, player_lock_duration_days: number) => {
  const client = useSanctumClient();
  return await client<{ id: number; player_lock_duration_days: number }>(
    `/api/v1/admin/settings/players/transfer-locks/${tournamentId}`,
    {
      method: 'PUT',
      body: { player_lock_duration_days },
    }
  );
};

export const getPlayerVerificationSettings = async () => {
  const client = useSanctumClient();
  return await client<PlayerVerificationSettings>('/api/v1/admin/settings/players/verification');
};

export const getPlayerVerificationSettingsPublic = async (teamSlug: string) => {
  const config = useRuntimeConfig();
  const requestFetch = useRequestFetch();
  const encodedSlug = encodeURIComponent(teamSlug);
  return await requestFetch<PlayerVerificationSettings>(
    `${config.public.baseURLBackend}/api/v1/public/settings/players/verification?team_slug=${encodedSlug}`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
};

export const updatePlayerVerificationSettings = async (payload: PlayerVerificationSettings) => {
  const client = useSanctumClient();
  return await client<PlayerVerificationSettings>('/api/v1/admin/settings/players/verification', {
    method: 'PUT',
    body: payload,
  });
};

export const updateTournamentVerificationSettings = async (
  tournamentId: number,
  payload: {
    requires_player_verification: boolean | null;
    player_verification_method: PlayerVerificationMethod | null;
  }
) => {
  const client = useSanctumClient();
  return await client<{
    id: number;
    requires_player_verification: boolean | null;
    player_verification_method: PlayerVerificationMethod | null;
  }>(`/api/v1/admin/settings/tournaments/${tournamentId}/verification`, {
    method: 'PUT',
    body: payload,
  });
};

export const getTournamentConfiguration = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client<TournamentConfigurationSettings>(
    `/api/v1/admin/settings/tournaments/${tournamentId}/configuration`
  );
};

export const updateTournamentConfiguration = async (
  tournamentId: number,
  payload: TournamentConfigurationSettings
) => {
  const client = useSanctumClient();
  return await client<TournamentConfigurationSettings>(
    `/api/v1/admin/settings/tournaments/${tournamentId}/configuration`,
    {
      method: 'PUT',
      body: payload,
    }
  );
};
