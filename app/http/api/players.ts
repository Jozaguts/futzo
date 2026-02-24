import type {Player} from '~/models/Player';
import type {Tag} from "~/types/shared";

export function getPlayers() {}
export const search = async (search: string) => {
  const client = useSanctumClient();
  return await client<Player[]>(`/api/v1/admin/players`, {
    query: {
      search,
    },
  });
};

export const updatePlayer = async (
  playerId: number,
  payload: Record<string, any> | FormData,
  method: 'PUT' | 'POST' = 'PUT'
) => {
  const client = useSanctumClient();
  return await client<{ data: Player }>(`/api/v1/admin/players/${playerId}`, {
    method,
    body: payload as any,
  });
};

export const releasePlayer = async (playerId: number) => {
  const client = useSanctumClient();
  return await client<{ message: string }>(`/api/v1/admin/players/${playerId}/release`, {
    method: 'POST',
  });
};

export const uploadPlayerVerification = async (playerId: number, document: File, photo?: File | null) => {
  const client = useSanctumClient();
  const formData = new FormData();
  formData.append('document', document);
  if (photo) {
    formData.append('photo', photo);
  }
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
export const getPlayerTags = async () =>{
  const client = useSanctumClient();
  return await client<Tag[]>('/api/v1/admin/players/tags')
}
export const createOrUpdatePlayerTag = async (tag: string) => {
  const client = useSanctumClient();
  return await client('/api/v1/admin/players/tags',{
    method: 'POST',
    body: JSON.stringify({tag})
  })
}
