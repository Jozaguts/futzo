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
export const formations = ref<Formation[]>([
  {
    name: '4-4-2',
    defenses: 4,
    midfielders: 4,
    forwards: 2,
  },
  {
    name: '4-3-3',
    defenses: 4,
    midfielders: 3,
    forwards: 3,
  },
  {
    name: '4-5-1',
    defenses: 4,
    midfielders: 5,
    forwards: 1,
  },
  {
    name: '3-5-2',
    defenses: 3,
    midfielders: 5,
    forwards: 2,
  },
  {
    name: '4-1-2-1-2',
    defenses: 4,
    midfielders: 4,
    forwards: 2,
  },
  {
    name: '4-2-3-1',
    defenses: 4,
    midfielders: 5,
    forwards: 1,
  },
  {
    name: '4-4-1-1',
    defenses: 4,
    midfielders: 4,
    forwards: 2,
  },
  {
    name: '4-1-3-2',
    defenses: 4,
    midfielders: 4,
    forwards: 2,
  },
  {
    name: '3-4-3',
    defenses: 3,
    midfielders: 4,
    forwards: 3,
  },
  {
    name: '5-4-1',
    defenses: 5,
    midfielders: 4,
    forwards: 1,
  },
  {
    name: '3-5-1-1',
    defenses: 3,
    midfielders: 5,
    forwards: 1,
  },
  {
    name: '4-1-4-1',
    defenses: 4,
    midfielders: 5,
    forwards: 1,
  },
  {
    name: '4-3-1-2',
    defenses: 4,
    midfielders: 4,
    forwards: 2,
  },
  {
    name: '4-1-2-3',
    defenses: 4,
    midfielders: 5,
    forwards: 1,
  },
  {
    name: '5-3-2',
    defenses: 5,
    midfielders: 3,
    forwards: 2,
  },
]);
