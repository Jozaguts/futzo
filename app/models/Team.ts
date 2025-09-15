import type { Position } from '~/models/Position';
import type { IPagination } from '~/interfaces';

export type TeamsPaginatedResponse = {
  data: Team[];
  meta: IPagination;
};

export type PreRegisterTeamResponse = {
  categories: Category[];
  positions: Position[];
  team: Team & { categories: Category[] };
  tournaments: Tournament[];
};

export type Formation = {
  id: number;
  name: string;
  goalkeeper: number;
  defenses: number;
  midfielders: number;
  forwards: number;
};
export interface FormSteps {
  current: CurrentStep;
  steps: TeamSteps;
}

export type TeamSteps = Record<
  CurrentStep,
  {
    number: number;
    completed: boolean;
    label: FormLabelStep;
    disable: boolean;
    back: Function;
    next: Function;
  }
>;
export type CurrentStep = 'createTeam' | 'createDt' | 'createOwner';
export type FormLabelStep = 'Crea un equipo' | 'Crea el DT' | 'Crea el presidente';

export type CreateTeamForm = {
  id?: number;
  name: string;
  // phone: string;
  // email: string;
  address: object;
  category_id: number;
  tournament_id: number;
  image: HTMLImageElement | File | string;
  colors: {
    home: {
      primary: string;
      secondary: string;
    };
    away: {
      primary: string;
      secondary: string;
    };
  };
  description: string;
};
export type CreateDtForm = {
  id?: number;
  name: string;
  phone: string;
  email: string;
  image: HTMLImageElement | File | string;
  iso_code?: number;
};
export type CreateOwnerForm = {
  id?: number;
  name: string;
  phone: string;
  email: string;
  image: HTMLImageElement | File | string;
  iso_code?: number;
};

export interface TeamStoreRequest {
  team: CreateTeamForm;
  coach: CreateDtForm;
  president: CreateOwnerForm;
}

export type Team = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: Address;
  slug: string;
  category: Category;
  tournament: Tournament;
  image: string;
  colors: Colors;
  description: string;
  president: User;
  coach: User;
};
export interface Address {
  terms: Term[];
  types: string[];
  place_id: string;
  reference: string;
  description: string;
  matched_substrings: MatchedSubstrings;
  structured_formatting: StructuredFormatting;
}

export interface MatchedSubstrings {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: MatchedSubstrings;
}

export interface Term {
  value: string;
  offset: number;
}

export interface Category {
  id: number;
  name: string;
  age_range: string;
  gender: string;
  created_at: null;
  updated_at: null;
  deleted_at: null;
  pivot: CategoryPivot;
}

export interface CategoryPivot {
  team_id: number;
  category_id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  league_id: number;
}

export interface Colors {
  away: Away;
  home: Away;
}

export interface Away {
  primary: string;
  secondary: string;
}

export interface Tournament {
  id: number;
  league_id: number;
  category_id: number;
  tournament_format_id: number;
  name: string;
  image: string;
  thumbnail: null;
  start_date: string;
  end_date: string;
  prize: string;
  winner: null;
  description: string;
  status: string;
  deleted_at: null;
  created_at: null;
  updated_at: Date;
  pivot: TournamentPivot;
}

export interface TournamentPivot {
  team_id: number;
  tournament_id: number;
}
