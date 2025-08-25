export default async (identifier: string, plan: string, period: string) => {
  const client = useSanctumClient();
  try {
    return await client(`/api/v1/checkout`, {
      query: {
        identifier,
        plan,
        period,
      },
    });
  } catch (error) {
    console.error('Checkout Error: ', error);
  }
};
