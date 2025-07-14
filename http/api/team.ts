export const getTeamBySlug = async (slug: string) => {
    const client = useSanctumClient();
    return await client(`/api/v1/admin/teams/${slug}?by_slug=true`);
}