import type { IPagination } from '~/interfaces';
export type LocationRequest = Promise<LocationPagination>;
export type LocationResponse = Awaited<LocationRequest>;
export type LocationPagination = {
  data: LocationCard[];
  meta: IPagination;
};
export type StepperType = {
  CanEdit: boolean;
  hasCompleted: boolean;
  hasError: boolean;
  step: number;
  subtitle?: string;
  title: string;
  value: number;
};
export type StepperItem = { title: string; value: number };

export type Location = {
  id?: number;
  name: string;
  city: string;
  address: string;
  autocomplete_prediction: object;
};

export type LocationStoreRequest = {
  tags: string[];
  availability: LocationAvailability[];
  fields_count: number;
  position: { lat: number; lng: number };
  completed: boolean;
} & Location;
export type LocationCard = {
  image: string;
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
export type CurrentStep = 'location' | 'availability';
export type FormLabelStep = 'Ubicación' | 'Disponibilidad';

export type LocationAvailability = {
  id: number;
  name: string;
  isCompleted: boolean;
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
};
export type Day = {
  enabled: boolean;
  start: AvailabilityTime;
  end: AvailabilityTime;
  intervals: Interval[];
  available_range: string;
};
export type Interval = {
  disabled: boolean;
  selected: boolean;
  text: string;
  value: IntervalValue;
};
export type IntervalValue = {
  start: string;
  end: string;
};

export type TimeRange = {
  enabled: boolean;
  start: AvailabilityTime;
  end: AvailabilityTime;
};

export type AvailabilityTime = {
  hours: string;
  minutes: string;
};
