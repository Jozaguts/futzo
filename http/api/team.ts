export const getTeamBy = async (term: number | string) => {
  const client = useSanctumClient();
  return await client(
    `/api/v1/admin/teams/${term}?by_slug=${typeof term === 'string'}`
  );
};
