export interface Tournament {
  id: number;
  league_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  prize: string;
  winner: string;
  description: string;
  status: string;
}