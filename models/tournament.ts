export type TournamentLocationStoreRequest = {
  tournamentId: number;
  location: Location;
  tags: string[];
};

export interface TournamentLocation extends Location {
  pivot: {
    tournament_id: number;
    location_id: number;
    availability: LocationAvailability[];
  };
  tags: Tag[];
}

export type Tag = {
  id: number;
  name: { es: string };
  slug: { es: string };
  type: string | null;
  order_count: number;
};

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
  category_id: number;
  slug: string;
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
  basic: BasicInfoForm;
  details: DetailsInfoForm;
}

export interface BasicInfoForm {
  id?: number;
  name: string;
  category_id: number;
  tournament_format_id: number;
  image?: File;
}

export interface DetailsInfoForm {
  description: string;
  end_date: string;
  prize: string;
  start_date: string;
  location: AutocompletePrediction;
}

export type CalendarStoreRequest = {
  general: GeneralCalendarForm;
  regular: RegularPhaseForm;
  elimination: EliminationPhaseForm;
};
/**
 * game_duration en EliminationPhaseForm
 * Propósito: Especifica la duración de los partidos exclusivamente para la fase de eliminatoria.
 *
 * Contexto: Este campo pertenece a la configuración específica de la fase eliminatoria, permitiendo sobrescribir el valor general si es necesario.
 *
 * Uso Típico: Permite ajustar la duración de los partidos de eliminación de forma independiente:
 *
 * Ejemplo: Partidos de eliminación pueden requerir un ajuste:
 * 120 minutos si incluye tiempo extra.
 * 90 minutos si es un partido regular.
 */
export type GeneralCalendarForm = {
  start_date: Date | null;
  end_date: Date | null;
  game_time: number;
  time_between_games: number;
  schedules_available: ScheduleAvailable;
  venues: TournamentVenue[];
};
export type RegularPhaseForm = {
  rounds: number; // Number of rounds (e.g., 1 for single round, 2 for home and away)
  points: {
    win: number; // Points for a win
    draw: number; // Points for a draw
    loss: number; // Points for a loss
  };
  tiebreakers: string[]; // Criteria for tiebreakers in order (e.g., ['goal_difference', 'goals_for', 'head_to_head'])
};
export type EliminationPhaseForm = {
  qualified_teams: number; // Number of teams advancing to the elimination phase
  game_duration: number; // Duration of each game in minutes
  format: "single_game" | "home_and_away"; // Format of the elimination phase
  tiebreakers: {
    extra_time: boolean; // Whether extra time is allowed
    penalties: boolean; // Whether penalties are used as a tiebreaker
  };
};

export type ScheduleAvailable = {
  day: string;
  label: string;
  hours: {
    from: CalendarTypePicker;
    to: CalendarTypePicker;
  };
};
export type CalendarTypePicker = {
  hours: number;
  minutes: number;
};
export type TournamentVenue = {
  id: number;
  name: string;
  city: string;
  address: string;
  tournament_availability: LocationAvailability;
};
export type LocationAvailability = {
  monday?: TimeRange;
  tuesday?: TimeRange;
  wednesday?: TimeRange;
  thursday?: TimeRange;
  friday?: TimeRange;
  saturday?: TimeRange;
  sunday?: TimeRange;
};
export type TimeRange = {
  start: string;
  end: string;
};

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

export interface FormSteps {
  current: CurrentStep;
  steps: TournamentSteps[];
}

export type CalendarStepsForm = {
  current: CurrentCalendarStep;
  steps: CalendarSteps[];
};
export type CalendarSteps = {
  step: CurrentCalendarStep;
  completed: boolean;
  label: CalendarLabelStep;
};
export type CurrentCalendarStep = "general" | "regular" | "elimination";
export type CalendarLabelStep =
  | "General"
  | "Fase Regular"
  | "Fase de Eliminación";

export type TournamentSteps = {
  step: CurrentStep;
  completed: boolean;
  label: FormLabelStep;
};
export type FormLabelStep = "Crea un torneo" | "Detalles del torneo";

export type CurrentStep = "basic-info" | "details-info";

export interface CreateTournamentForm extends TournamentStoreRequest {}
