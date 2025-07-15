import type { Team } from '~/models/Team';

export const getTeamBy = async (term: number | string) => {
  const client = useSanctumClient();
  return await client<Promise<Team>>(
    `/api/v1/admin/teams/${term}?by_slug=${typeof term === 'string'}`
  );
};
