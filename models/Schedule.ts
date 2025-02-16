import type {LocationAvailability} from "~/models/Location";

export type ScheduleStoreRequest = {
    general: FormGeneralScheduleRequest,
    regular_phase?: FormRegularPhaseStep
    elimination_phase?: FormEliminationPhaseStep
    locations_availability?: FormLocationAvailabilityStep[]
}
export type FormGeneralScheduleRequest = {
    tournament_id: number;
    tournament_format_id: number;
    football_type_id: number;
    start_date: string | Date;
    game_time: number;
    time_between_games: number;
    locations: FormGeneralLocation[];
}
export type FormGeneralLocation = {
    id: number;
    name: string;
}
export type FormRegularPhaseStep = {
    round_trip: boolean,
    total_teams: number;
    tiebreakers: Tiebreaker[];
}
export type FormEliminationPhaseStep = {
    teams_to_next_round: number,
    round_trip: boolean,
    phases: EliminationPhase[],
}
export type FormLocationAvailabilityStep = {
    tournament_id: number;
    availability: TournamentLocationAvailability[]
}
export type TournamentLocationAvailability = {
    id: number;
    days: LocationAvailability
}
export type Phase = 'Fase de grupos' | 'Tabla general' | 'Octavos de Final' | 'Cuartos de Final' | 'Semifinales' | 'Final';
export type EliminationPhase = {
    id: number;
    name: Phase;
    is_active: boolean;
    is_completed: boolean;
}
export type Tiebreaker = {
    id: number;
    rule: string;
    is_active: string;
    priority: number;
    deleted_at?: null;
    created_at?: Date;
    updated_at?: Date;
}
export type DatePickerAttributes = {
    position: "left" | "right";
    locale: "es" | "en";
    "min-date": Date;
    teleport: boolean;
    "hide-input-icon": boolean;
    "enable-time-picker": boolean;
    "month-name-format": string;
    ref: Ref;
    placeholder: string;
    ui: {
        input: string;
        menu: string;
        calendarCell: string;
    };
    "multi-calendars"?: { solo?: boolean };
    "v-model"?: Ref<Date> | Ref<[Date, Date]>;
    range?: boolean;
};

export interface Schedule {
}

export type DatePosition = 1 | 2;

export interface ScheduleSettings {
    start_date: Date | string;
    end_date: null;
    game_time: number;
    min_teams: number;
    max_teams: number;
    time_between_games: number;
    teams: number;
    round_trip: boolean;
    elimination_round_trip: boolean;
    format: Format;
    footballType: FootballType;
    locations: Location[];
    tiebreakers: Tiebreaker[];
    phases: EliminationPhase[];
}

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
    city: string;
    address: string;
    autocomplete_prediction: AutocompletePrediction;
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

export interface Pivot {
    tournament_id: number;
    location_id: number;
    availability: null;
}

