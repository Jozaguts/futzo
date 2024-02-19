export interface Tournament {
  id?: number | null;
  league_id?: number| null;
  name: string;
  start_date?: Date | null;
  end_date?: Date | null;
  prize?: string | null;
  winner?: string | null;
  description?: string | null;
  status?: string | null;
  league?: string | null;
}