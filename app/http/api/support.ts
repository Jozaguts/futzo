import type { SupportTicketForm } from '~/models/User';
import type { Tickets } from '~/models/Support';
export const createTicket = async (body: SupportTicketForm) => {
  const client = useSanctumClient();
  return await client<{ ticket: string }>(`/api/v1/support/tickets`, {
    method: 'POST',
    body,
  });
};
export const fetchTickets = async () => {
  const client = useSanctumClient();
  return await client<Tickets>(`/api/v1/support/tickets`, {
    method: 'GET',
  });
};
