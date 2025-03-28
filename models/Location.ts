export type StepperType = {
    CanEdit: boolean
    hasCompleted: boolean
    hasError: boolean
    step: number
    subtitle?: string
    title: string
    value: number
}
export type StepperItem = { title: string, value: number }

export type Location = {
    id?: number;
    name: string;
    city: string;
    address: string;
    autocomplete_prediction: object;
};

export type LocationStoreRequest = {
    tags: string[];
    availability: LocationAvailability[]
    fields_count: number;
    position: { lat: number, lng: number }
} & Location;
export type LocationCard = {
    image: string

} & LocationStoreRequest;

export interface FormSteps {
    current: CurrentStep;
    steps: LocationSteps[];
}

export type LocationSteps = {
    step: CurrentStep;
    completed: boolean;
    label: FormLabelStep;
};
export type CurrentStep = "location" | "availability";
export type FormLabelStep = "Ubicación" | "Disponibilidad";

export type LocationAvailability = {
    isCompleted: boolean,
    monday: Day;
    tuesday: Day;
    wednesday: Day;
    thursday: Day;
    friday: Day;
    saturday: Day;
    sunday: Day;
};
export type TimeRange = {
    enabled: boolean;
    start: AvailabilityTime;
    end: AvailabilityTime;
};
export type AvailabilityTime = {
    hours: string,
    minutes: string
}
// new types
export type LocationFieldsRequest = {
    field_id: number;
    step: number;
    field_name: string;
    location_name: string;
    location_id: number;
    disabled: boolean;
    availability: Availability;
}

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
export type AvailableRange = string;

export type Interval = {
    value: Text;
    text: Text;
    selected: boolean;
}

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

export type Label = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo";
export type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type NextHandlerType = {
    availability: Availability
    field_id: number
    isCompleted: boolean,
    name: string
}
