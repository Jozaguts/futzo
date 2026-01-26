import type { SupportTicketForm } from '~/models/User';
import type { ResponseTicket, Tickets } from '~/models/Support';
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
export const responseTicket = async (data: ResponseTicket) => {
  const client = useSanctumClient();
  return await client(`/api/v1/support/tickets/${data.ticket_id}`, {
    method: 'PATCH',
    body: { response_message: data.response_message },
  });
};
