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
export interface TournamentForm {
  name: string,
  category_id: number | null,
  tournament_format_id: number | null,
  image: ImageForm
}
export interface ImageForm {
  file: File | null,
  name: string,
  size: number,
  hasError?: boolean,
  errors?: {
    name: string | null,
    description: string | null,
    action: string | null,
  }
}