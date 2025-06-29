export type GameDetailsRequest = {
    id: number,
    field_id: number,
    date: string
}

export type Game = {
    id: number;
    home: Away;
    away: Away;
    details: Details;
    round: number;
    status: string;
    result: null;
    start_date: Date;
    end_date: Date;
    options: Option[];
}

export type Away = {
    id: number;
    name: string;
    image: string;
    goals: number;
}

export type Details = {
    date: string;
    raw_date: Date;
    raw_time: string;
    time: Time;
    field: Field;
    location: Field;
    referee: string;
    day_of_week: string;
    tournament: string;
}

export type Field = {
    id: number;
    name: string;
}

export type Time = {
    hours: number;
    minutes: number;
}

export type Option = {
    field_id: number;
    available_intervals: any[];
}
