export type Tickets = {
  data: Datum[];
};

export type Datum = {
  id: string;
  user_id: number;
  league_id: number;
  tournament_id: number;
  contact_method: string;
  contact_value: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  last_message_at: null;
  closed_at: null;
  meta: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  public_messages: PublicMessage[];
  messages_count: number;
};

export type PublicMessage = {
  id: number;
  ticket_id: string;
  author_type: string;
  author_user_id: number;
  body: string;
  attachments: null;
  is_internal: boolean;
  read_at: null;
  created_at: Date;
  updated_at: Date;
};
