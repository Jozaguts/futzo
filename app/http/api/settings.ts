import { useSanctumClient } from '#imports';
import type {
  PlayerTransferLockSetting,
  PlayerVerificationMethod,
  PlayerVerificationSettings,
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
