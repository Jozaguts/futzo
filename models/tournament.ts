export interface Tournament {
  id: number;
  name: string;
  location: string;
  start_date: Date;
  end_date: Date;
  prize: string;
  winner: string;
  description: string;
  logo: File[];
  banner: File[];
  status: string;
}