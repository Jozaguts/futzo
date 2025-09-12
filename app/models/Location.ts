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
  address: string;
  place_id: string;
  position: LocationPosition;
};
export type LocationStoreRequest = {
  tags: string[];
  fields: Field[];
  fields_count: number;
  // Optional completion flag kept for legacy UI checks
  completed?: boolean;
  steps: {
    location: {
      completed: boolean;
    };
    fields: {
      completed: boolean;
    };
  };
} & Location;
export type Field = {
  id: number;
  name: string;
  type?: string;
  completed: boolean;
  field_count?: number;
  windows: Windows;
};
export type Windows = {
  mon?: All[];
  tue?: All[];
  wed?: All[];
  thu?: All[];
  fri?: All[];
  sat?: All[];
  sun?: All[];
  all?: All[];
};
export type All = {
  label: string;
  enabled: boolean;
  start: string;
  end: string;
};
export type LocationPosition = {
  lat: number;
  lng: number;
};

export type LocationCard = {
  image: string;
  windows: WindowLocation[];
} & LocationStoreRequest;
export type WindowLocation = {
  id: number;
  name: string;
  type: string;
  windows: Array<WindowReserved[]>;
};
export type WindowReserved = {
  day: EspWeekDay;
  end: string;
  start: string;
};
export type EspWeekDay = 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
export interface FormSteps {
  current: CurrentStep;
  steps: LocationSteps;
}

export type LocationSteps = Record<
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
