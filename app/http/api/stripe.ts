export type CreatePaymentIntentResponse = {
  client_secret: string;
  amount: number;
  currency: string;
  payment_intent_id: string;
  status: string;
};

export const createPaymentIntent = async (
  plan: string,
  period: 'month' | 'year'
): Promise<CreatePaymentIntentResponse> => {
  const client = useSanctumClient();
  return await client<CreatePaymentIntentResponse>(`/api/v1/payment-intents`, {
    method: 'POST',
    body: { plan, period },
  });
};
