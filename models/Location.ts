export type Location = {
    id?: number;
    name: string;
    city: string;
    address: string;
    autocomplete_prediction: object;
};

export type LocationStoreRequest = {
    tags: string[];
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
