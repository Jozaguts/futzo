import type { IntervalValue } from '~/models/Location';

export type EliminationRules = {
  round_trip: boolean;
  away_goals: boolean;
  extra_time: boolean;
  penalties: boolean;
  advance_if_tie: 'better_seed' | 'none';
};
export interface EliminationPayload {
  teams_to_next_round: number;
  round_trip: boolean;
  elimination_round_trip: boolean;
  phases: Array<
    EliminationPhase & {
      rules: EliminationRules | null;
    }
  >;
  group_phase?: {
    option_id: string | null;
  };
}
export type TournamentRules = {
  disabledPhases: (phase: EliminationPhase, totalTeams: number) => boolean;
  teamsToNextRound: (phases: EliminationPhase[], totalTeams: number) => string | number;
};

export type CalendarLabelStep = 'General' | 'Reglas' | 'Fase de Eliminación' | 'Campos de juego';
export type CurrentCalendarStep = 'general' | 'rules' | 'elimination' | 'fields';
export type CalendarSteps = Record<
  CurrentCalendarStep,
  {
    number: number;
    disable: boolean;
    completed: boolean;
    label: CalendarLabelStep;
    back_step: CurrentCalendarStep | 'close';
    next_step: CurrentCalendarStep | 'save';
    back_label: string;
    next_label: string;
  }
>;
export type CalendarStepsForm = {
  current: CurrentCalendarStep;
  steps: CalendarSteps;
};
export type ScheduleStoreRequest = {
  general: FormGeneralScheduleRequest;
  rules_phase: FormRulesPhaseStep;
  elimination_phase: FormEliminationPhaseStep;
  fields_phase: LocationFieldsRequest[];
  group_phase?: {
    option_id: string | null;
  };
};
export type FormGeneralScheduleRequest = {
  tournament_id: number;
  total_teams: number;
  tournament_format_id: number;
  football_type_id: number;
  start_date: string | Date;
  game_time: number;
  time_between_games: number;
  locations?: FormGeneralLocation[];
};
export type FormGeneralLocation = {
  id: number;
  name: string;
};
export type FormRulesPhaseStep = {
  round_trip: boolean;
  tiebreakers: Tiebreaker[];
};
export type FormEliminationPhaseStep = {
  teams_to_next_round: number;
  elimination_round_trip: boolean;
  phases: EliminationPhase[];
  group_phase?: {
    option_id: string | null;
  };
};

export type Phase =
  | 'Fase de grupos'
  | 'Tabla general'
  | 'Dieciseisavos de Final'
  | 'Octavos de Final'
  | 'Cuartos de Final'
  | 'Semifinales'
  | 'Final';
export type EliminationPhase = {
  id: number;
  name: Phase;
  is_active: boolean;
  is_completed: boolean;
  min_teams_for: number | null;
  rules?: Rules | null;
};
export type Rules = {
  round_trip: boolean;
  away_goals: boolean;
  extra_time: boolean;
  penalties: boolean;
  advance_if_tie: 'better_seed' | 'none' | string;
};
export type Tiebreaker = {
  id: number;
  rule: string;
  is_active: boolean;
  priority: number;
  deleted_at?: null;
  created_at?: Date;
  updated_at?: Date;
};
export type DatePickerAttributes = {
  position: 'left' | 'right';
  locale: 'es' | 'en';
  'min-date'?: Date;
  teleport: boolean;
  'hide-input-icon': boolean;
  'enable-time-picker': boolean;
  'month-name-format': string;
  ref: Ref;
  placeholder: string;
  ui: {
    input: string;
    menu: string;
    calendarCell: string;
  };
  'multi-calendars'?: { solo?: boolean };
  'v-model'?: Ref<Date> | Ref<[Date, Date]>;
  range?: boolean;
  'max-date'?: Date;
};

export type PenaltyShootout = {
  decided: boolean;
  winner_team_id: number | null;
  home_goals: number | null;
  away_goals: number | null;
};

export type PenaltyAttempt = {
  id?: number | null;
  player_id: number | null;
  team_id: number;
  score_goal: boolean | null;
  kicks_number: number | null;
  player?: {
    id: number | null;
    name: string | null;
  } | null;
};

export type TournamentSchedule = {
  rounds: Round[];
};
export type RoundByeTeam = {
  id: number;
  name: string;
  image: string | null;
};
export type Round = {
  isEditable: boolean;
  status: RoundStatus;
  round: number;
  date: Date;
  matches: Match[];
  bye_team?: RoundByeTeam | null;
};

export type Match = {
  id: number;
  home: MatchAway;
  away: MatchAway;
  status: Status;
  details: MatchDetails;
  result: string;
  options: MatchOptions[];
  penalties?: PenaltyShootout;
  penalty_draw_enabled?: boolean;
  phase?: {
    id: number | null;
    name: string | null;
  };
  group?: {
    key: string;
    name: string;
    teams_count: number;
    teams: MatchAway[];
  };
};
export type MatchOptions = {
  available_intervals: AvailableIntervals;
  field_id: number;
};
export type AvailableIntervals = {
  day: WeekDay;
  hours: HourAvailableInterval[];
};
export type HourAvailableInterval = {
  start: Text;
  end: Text;
};

export type MatchDetails = {
  date: string;
  time: string;
  field: Field | null;
  location: Field | null;
  referee: string | null;
  raw_date: string;
  raw_time?: string;
};
export type Field = {
  id: number;
  name: string;
};
export type MatchAway = {
  id: number;
  name: string;
  image: string;
  goals: number;
};

export type Schedule = {
  tournament_id: number;
  home_team_id: number;
  away_team_id: number;
  field_id: number;
  location_id: number;
  match_date: Date;
  match_time: string;
  round: number;
  status: Status;
};

export type Status = 'scheduled' | 'completed' | 'canceled'; //| "postponed" | "in_progress" | "not_started" | "finished"

export type Team = {
  id: number;
  name: string;
  pivot: Pivot;
};

export type Pivot = {
  tournament_id: number;
  team_id: number;
};

export type ScheduleTeamSummary = {
  id: number;
  name: string;
  image: string | null;
};

export interface ScheduleRegenerationLogSummary {
  mode: 'full' | 'partial' | string;
  cutoff_round: number | null;
  executed_at: string | null;
  matches_created: number | null;
}

export type DatePosition = 1 | 2;

export interface ScheduleSettings {
  tournament_id: number | null;
  start_date: Date | string;
  end_date: null;
  game_time: number;
  min_teams: number;
  max_teams: number;
  time_between_games: number;
  teams: number;
  round_trip: boolean;
  elimination_round_trip: boolean;
  penalty_draw_enabled: boolean;
  format: Format;
  footballType: FootballType;
  locations: Location[];
  tiebreakers: Tiebreaker[];
  phases: EliminationPhase[];
  group_configuration_options: GroupConfigurationOptions[];
  group_phase: string | null;
  group_phase_option_id: null | string;
  teams_without_games: ScheduleTeamSummary[];
  pending_manual_matches: number;
  last_regeneration: ScheduleRegenerationLogSummary | null;
}
export type GroupConfigurationOptions = {
  id: string;
  groups: number;
  group_sizes: number[];
  group_phase: GroupPhase;
  elimination: Elimination;
};

export type Elimination = {
  teams: number;
  label: string;
  phase_name: string;
};

export type GroupPhase = {
  teams_per_group: number;
  advance_top_n: number;
  include_best_thirds: boolean;
  best_thirds_count: number | null;
  group_sizes: number[];
};

export interface FootballType {
  id: number;
  name: string;
  description: string;
  status: string;
  max_players_per_team: number;
  min_players_per_team: number;
  max_registered_players: number;
  substitutions: null;
  deleted_at: null;
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
  address: string;
  pivot: Pivot;
  tags: any[];
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

export type LocationFieldsRequest = {
  field_id: number;
  step: number;
  field_name: string;
  location_name: string;
  location_id: number;
  disabled: boolean;
  availability: Availability;
};

export type Day = {
  enabled: boolean;
  available_range: AvailableRange;
  intervals: Interval[];
  label: Label;
};
export type DayHandlerType = {
  weekday: WeekDay;
  day: Day;
  intervalHoursSelected: Interval[];
};

export type Interval = {
  value: Text;
  text: Text;
  selected: boolean;
  disabled: boolean;
};
export type NextHandlerType = {
  availability: Availability;
  field_id: number;
  isCompleted: boolean;
  name: string;
};
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type Availability = {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
  isCompleted: boolean;
};
export type AvailableRange = string;
export type Label = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
export type Text =
  | '00:00'
  | '01:00'
  | '02:00'
  | '03:00'
  | '04:00'
  | '05:00'
  | '06:00'
  | '07:00'
  | '08:00'
  | '09:00'
  | '10:00'
  | '11:00'
  | '12:00'
  | '13:00'
  | '14:00'
  | '15:00'
  | '16:00'
  | '17:00'
  | '18:00'
  | '19:00'
  | '20:00'
  | '21:00'
  | '22:00'
  | '23:00';

export type RoundStatus = 'programado' | 'en_progreso' | 'completado' | 'aplazado' | 'cancelado';
export type RoundStatusText = 'Programada' | 'En progreso' | 'Completada' | 'Parcialmente jugada' | 'Cancelada';
export type ScheduleRoundStatus = {
  text: RoundStatusText;
  value: RoundStatus;
};

export interface ScheduleRegenerationAnalysis {
  mode: 'full' | 'partial';
  cutoff_round: number | null;
  completed_rounds: number;
  total_rounds: number;
  pending_manual_matches: number;
  explanation: string;
}

export interface ScheduleRegenerationResult extends ScheduleRegenerationAnalysis {
  matches_created: number;
  message: string;
  pending_manual_matches: number;
  log_id?: number;
  analysis?: ScheduleRegenerationAnalysis | null;
}
