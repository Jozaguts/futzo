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
