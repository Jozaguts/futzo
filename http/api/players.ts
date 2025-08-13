export function getPlayers() {}
export const search = async (search: string) => {
  const client = useSanctumClient();
  return await client(`/api/v1/admin/players`, {
    query: {
      search,
    },
  });
};
