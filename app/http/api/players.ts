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
