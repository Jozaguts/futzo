import type { Player } from '~/models/Player';

export function getPlayers() {}
export const search = async (search: string) => {
  const client = useSanctumClient();
  return await client<Player[]>(`/api/v1/admin/players`, {
    query: {
      search,
    },
  });
};

export const updatePlayer = async (playerId: number, payload: Record<string, any>) => {
  const client = useSanctumClient();
  return await client<{ data: Player }>(`/api/v1/admin/players/${playerId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export const releasePlayer = async (playerId: number) => {
  const client = useSanctumClient();
  return await client<{ message: string }>(`/api/v1/admin/players/${playerId}/release`, {
    method: 'POST',
  });
};

export const uploadPlayerVerification = async (playerId: number, document: File, photo: File) => {
  const client = useSanctumClient();
  const formData = new FormData();
  formData.append('document', document);
  formData.append('photo', photo);
  return await client<{ message: string }>(`/api/v1/admin/players/${playerId}/verification`, {
    method: 'POST',
    body: formData,
  });
};

export const approvePlayerVerification = async (playerId: number) => {
  const client = useSanctumClient();
  return await client<{ message: string }>(`/api/v1/admin/players/${playerId}/verification/approve`, {
    method: 'POST',
  });
};

export const rejectPlayerVerification = async (playerId: number, notes: string) => {
  const client = useSanctumClient();
  return await client<{ message: string }>(`/api/v1/admin/players/${playerId}/verification/reject`, {
    method: 'POST',
    body: { notes },
  });
};
