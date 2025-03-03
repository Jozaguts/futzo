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
    id: number,
    isCompleted: boolean,
    name: string;
    monday?: TimeRange;
    tuesday?: TimeRange;
    wednesday?: TimeRange;
    thursday?: TimeRange;
    friday?: TimeRange;
    saturday?: TimeRange;
    sunday?: TimeRange;
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
