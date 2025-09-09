export type CreatePaymentIntentResponse = {
  client_secret: string;
  amount: number;
  currency: string;
  payment_intent_id: string;
  status: string;
};

export const createPaymentIntent = async (
  plan: string,
  period: 'month' | 'year',
  email?: string
): Promise<CreatePaymentIntentResponse> => {
  const client = useSanctumClient();
  return await client<CreatePaymentIntentResponse>(`/api/v1/payment-intents`, {
    method: 'POST',
    body: { plan, period, email },
  });
};
export const createSubscriptionIntent = async (
  plan: string,
  period: 'month' | 'year',
  email?: string
): Promise<CreatePaymentIntentResponse> => {
  const client = useSanctumClient();
  return await client<CreatePaymentIntentResponse>(`/api/v1/subscriptions/intent`, {
    method: 'POST',
    body: { plan, period, email },
  });
};

export type BillingPortalResponse = { url: string };

export const createBillingPortalSession = async (user_id?: number): Promise<BillingPortalResponse> => {
  let request = '/api/v1/subscriptions/portal';
  if (user_id) {
    request = `/api/v1/subscriptions/?user_id=${user_id}`;
  }
  const client = useSanctumClient();
  return await client<BillingPortalResponse>(request);
};
