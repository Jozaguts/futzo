import type {LocationAvailability} from "~/models/Location";

export type ScheduleStoreRequest = {
    general: FormGeneralScheduleRequest,
    regular_phase: FormRegularPhaseStep
    elimination_phase: FormEliminationPhaseStep
    fields_phase: FormLocationAvailabilityStep[]
}
export type FormGeneralScheduleRequest = {
    tournament_id: number;
    total_teams: number;
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
    tiebreakers: Tiebreaker[];
}
export type FormEliminationPhaseStep = {
    teams_to_next_round: number,
    round_trip: boolean,
    phases: EliminationPhase[],
}
export type ScheduleLocationAvailability = {
    id: number;
    name: string
    isCompleted: boolean,
    monday: Day;
    tuesday: Day;
    wednesday: Day;
    thursday: Day;
    friday: Day;
    saturday: Day;
    sunday: Day;
}
export type FormLocationAvailabilityStep = {
    field_id: number,
    step: number,
    field_name: string,
    location_name: string,
    location_id: number,
    availability: LocationAvailability
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
    "min-date"?: Date;
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

export type TournamentSchedule = {
    tournament: Tournament;
    rounds: Round[];
}
export type Round = {
    isEditable: boolean;
    status: RoundStatus
    round: number;
    date: Date;
    matches: Match[];
}

export type Match = {
    id: number;
    home: MatchAway;
    away: MatchAway;
    status: Status;
    details: MatchDetails;
    result: string;
}
export type MatchDetails = {
    date: string;
    time: string;
    field: Field;
    location: Field;
    referee: string;
}
export type Field = {
    id: number;
    name: string;
}
export type MatchAway = {
    id: number;
    name: string;
    image: string
    goals: number;
}


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
}

export type Status = "scheduled" | "completed" | "canceled"; //| "postponed" | "in_progress" | "not_started" | "finished"
export type Tournament = {
    id: number;
    league_id: number;
    category: Category;
    tournament_format_id: number;
    football_type_id: number;
    name: string;
    image: null;
    thumbnail: null;
    start_date: Date;
    end_date: null;
    prize: string;
    winner: null;
    description: string;
    status: string;
    deleted_at: null;
    created_at: Date;
    updated_at: Date;
    teams: Team[];
    start_date_to_string: string;
}
export type Category = {
    id: number;
    name: string;
}
export type Team = {
    id: number;
    name: string;
    pivot: Pivot;
}

export type Pivot = {
    tournament_id: number;
    team_id: number;
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

export type LocationFieldsRequest = {
    field_id: number;
    step: number;
    field_name: string;
    location_name: string;
    location_id: number;
    disabled: boolean;
    availability: Availability;
}
export type Day = {
    enabled: boolean;
    available_range: AvailableRange;
    intervals: Interval[];
    label: Label;
}
export type DayHandlerType = {
    id: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    day: Day,
    value: string[]
}

export type Interval = {
    value: Text;
    text: Text;
    selected: boolean;
}
export type NextHandlerType = {
    availability: Availability
    field_id: number
    isCompleted: boolean,
    name: string
}
export type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type Availability = {
    monday: Day,
    tuesday: Day,
    wednesday: Day,
    thursday: Day,
    friday: Day;
    saturday: Day;
    sunday: Day;
    isCompleted: boolean;
}
export type AvailableRange = string;
export type Label = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo";
export type Text =
    "*"
    | "Todo el dia"
    | "00:00"
    | "01:00"
    | "02:00"
    | "03:00"
    | "04:00"
    | "05:00"
    | "06:00"
    | "07:00"
    | "08:00"
    | "09:00"
    | "10:00"
    | "11:00"
    | "12:00"
    | "13:00"
    | "14:00"
    | "15:00"
    | "16:00"
    | "17:00"
    | "18:00"
    | "19:00"
    | "20:00"
    | "21:00"
    | "22:00"
    | "23:00";

export type RoundStatus = 'programado' | 'en_progreso' | 'completado' | 'aplazado' | 'cancelado'
export type RoundStatusText = 'Programada' | 'En progreso' | 'Completada' | 'Parcialmente jugada' | 'Cancelada'
export type ScheduleRoundStatus = {
    text: RoundStatusText
    value: RoundStatus
}
