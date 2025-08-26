export default async (identifier: string, plan: string, period: string) => {
  const client = useSanctumClient();
  return await client(`/api/v1/checkout`, {
    query: {
      identifier,
      plan,
      period,
    },
  });
};
