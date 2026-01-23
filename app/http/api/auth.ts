import type { SupportTicketForm } from '~/models/User';

export const sendVerificationCode = async (value: string, areaCode: string, type: 'email' | 'phone') => {
  const client = useSanctumClient();
  value = type === 'phone' ? areaCode + value : value;
  return await client(`/verification-code/send`, {
    method: 'POST',
    body: { [type]: value },
  });
};
export const createTicket = async (body: SupportTicketForm) => {
  const client = useSanctumClient();
  return await client<{ ticket: string }>(`/api/v1/support/tickets`, {
    method: 'POST',
    body,
  });
};
