import type { AutocompletePrediction } from "~/interfaces";

export interface Tournament {
  id?: number | null;
  league_id?: number | null;
  name: string;
  start_date?: Date | null;
  end_date?: Date | null;
  prize?: string | null;
  winner?: string | null;
  description?: string | null;
  status?: string;
  league?: string | null;
  image: string;
}
export interface TournamentForm {
  name: string;
  image?: File | string;
  category_id: number;
  tournament_format_id: number;
  location: AutocompletePrediction;
  city: string;
  address: string;
  start_date: string;
  end_date: string;
  prize: string;
  winner: string;
  description: string;
  status: string;
}
export interface TournamentStoreRequest {
  id?: number;
  category_id: number;
  description: string;
  end_date: string;
  image?: File;
  name: string;
  prize: string;
  start_date: string;
  tournament_format_id: number;
  location: AutocompletePrediction;
}
export interface TournamentResponse {
  id: number;
  name: string;
  tournament_format_id: number;
  start_date: string;
  end_date: string;
  prize: string;
  winner: string;
  description: string;
  category_id: number;
  status: string;
  location: Location;
  format: Format;
  teams_count: null;
  players_count: null;
  games_count: null;
  image: string;
  thumbnail: null;
}

export interface Format {
  id: number;
  name: string;
  description: string;
  status: string;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface Location {
  id: number;
  name: string;
  city: string;
  address: string;
  availability: Availability;
  autocomplete_prediction: AutocompletePrediction;
}

export interface AutocompletePrediction {
  terms: Term[];
  types: string[];
  place_id: string;
  reference: string;
  description: string;
  matched_substrings: MatchedSubstring[];
  structured_formatting: StructuredFormatting;
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: MatchedSubstring[];
}

export interface Term {
  value: string;
  offset: number;
}

export interface Availability {
  friday: Day;
  monday: Day;
  sunday: Day;
  tuesday: Day;
  saturday: Day;
  thursday: Day;
  wednesday: Day;
}

export interface Day {
  end: string;
  start: string;
}

export interface ImageForm {
  file: File | null;
  name: string;
  size: number;
  hasError?: boolean;
  errors?: {
    name: string | null;
    description: string | null;
    action: string | null;
  };
}
