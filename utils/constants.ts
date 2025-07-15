import type { LocationAvailability } from '~/models/Location';
import type { ScheduleLocationAvailability } from '~/models/Schedule';
import type { Formation } from '~/models/Game';

export const MAIN_PADDING_TOP = 48;
export const MAIN_PADDING_BOTTOM = 64;
export const FUTBOL_11_ID = 1;
export const MAX_SIZE = 2.0;
export const MIN_TEAMS = 8;
export const MAX_TEAMS = 32;
export const DEFAULT_POSITION = { lat: 16.8639515, lng: -99.8822807 };

export const DEFAULT_AVAILABILITY_HOURS: ScheduleLocationAvailability[] = [
  {
    id: 1,
    name: 'Campo 1',
    isCompleted: false,
    monday: {
      enabled: false,
      available_range: '00:00-23:59',
      intervals: [{ value: '*', text: 'Todo el dia', selected: false }],
      label: 'Lunes',
    },
    tuesday: {
      enabled: false,
      available_range: '00:00-23:59',
      intervals: [{ value: '*', text: 'Todo el dia', selected: false }],
      label: 'Martes',
    },
    wednesday: {
      enabled: false,
      available_range: '00:00-23:59',
      intervals: [{ value: '*', text: 'Todo el dia', selected: false }],
      label: 'Miércoles',
    },
    thursday: {
      enabled: false,
      available_range: '00:00-23:59',
      intervals: [{ value: '*', text: 'Todo el dia', selected: false }],
      label: 'Jueves',
    },
    friday: {
      enabled: false,
      available_range: '00:00-23:59',
      intervals: [{ value: '*', text: 'Todo el dia', selected: false }],
      label: 'Viernes',
    },
    saturday: {
      enabled: false,
      available_range: '00:00-23:59',
      intervals: [{ value: '*', text: 'Todo el dia', selected: false }],
      label: 'Sábado',
    },
    sunday: {
      enabled: false,
      available_range: '00:00-23:59',
      intervals: [{ value: '*', text: 'Todo el dia', selected: false }],
      label: 'Domingo',
    },
  },
];
export const DEFAULT_LOCATION_AVAILABILITY: LocationAvailability = {
  id: 1,
  name: 'Campo 1',
  isCompleted: false,
  monday: {
    enabled: false,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
  },
  tuesday: {
    enabled: false,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
  },
  wednesday: {
    enabled: false,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
  },
  thursday: {
    enabled: false,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
  },
  friday: {
    enabled: true,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
  },
  saturday: {
    enabled: true,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
  },
  sunday: {
    enabled: true,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
  },
};
export const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const phoneRegex = /^\d{10}$/;
const generateFormation = (
  name: string,
  defenses: number,
  midfielders: number,
  forwards: number
): Formation => {
  return {
    name,
    defenses: Array.from({ length: defenses }, (_, i) => ({
      abbr: 'DF',
      number: i + 1,
      name: '',
    })),
    midfielders: Array.from({ length: midfielders }, (_, i) => ({
      abbr: 'MF',
      number: i + 1,
      name: '',
    })),
    forwards: Array.from({ length: forwards }, (_, i) => ({
      abbr: 'FW',
      number: i + 1,
      name: '',
    })),
  };
};
export const formations = ref<Formation[]>([
  generateFormation('4-4-2', 4, 4, 2),
  generateFormation('4-3-3', 4, 3, 3),
  generateFormation('4-5-1', 5, 4, 1),
  generateFormation('3-5-2', 3, 5, 2),
  generateFormation('4-1-2-1-2', 4, 5, 1),
  generateFormation('4-2-3-1', 4, 5, 1),
  generateFormation('4-4-1-1', 4, 4, 2),
  generateFormation('4-1-3-2', 4, 4, 2),
  generateFormation('3-4-3', 3, 4, 3),
  generateFormation('5-4-1', 5, 4, 1),
  generateFormation('3-5-1-1', 3, 5, 1),
  generateFormation('4-1-4-1', 4, 5, 1),
  generateFormation('4-3-1-2', 4, 4, 2),
  generateFormation('4-1-2-3', 4, 4, 1),
  generateFormation('5-3-2', 5, 3, 2),
]);
