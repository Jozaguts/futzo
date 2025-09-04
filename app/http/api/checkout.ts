export default (plan: string, period: string) => {
  const client = useSanctumClient();
  client<{ url: string }>(`/api/v1/checkout`, {
    query: {
      plan,
      period,
    },
  }).then((response) => {
    const link = document.createElement('a');
    link.href = response.url;
    link.click();
  });
};
