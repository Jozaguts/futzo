import type { Interval, LocationAvailability } from '~/models/Location';
import type { DialogHandlerActionsNames } from '~/models/Game';
export const MAIN_PADDING_TOP = 48;
export const MAIN_PADDING_BOTTOM = 64;
export const FUTBOL_11_ID = 1;
export const MAX_SIZE = 2.0;
export const MIN_TEAMS = 8;
export const MAX_TEAMS = 32;
export const DEFAULT_POSITION = { lat: 16.8639515, lng: -99.8822807 };
export const DEFAULT_LOCATION_AVAILABILITY: LocationAvailability = {
  id: 1,
  name: 'Campo 1',
  isCompleted: false,
  monday: {
    enabled: false,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
    intervals: [] as Interval[],
    available_range: '00:00-23:59',
  },
  tuesday: {
    enabled: false,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
    intervals: [] as Interval[],
    available_range: '00:00-23:59',
  },
  wednesday: {
    enabled: false,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
    intervals: [] as Interval[],
    available_range: '00:00-23:59',
  },
  thursday: {
    enabled: false,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
    intervals: [] as Interval[],
    available_range: '00:00-23:59',
  },
  friday: {
    enabled: true,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
    intervals: [] as Interval[],
    available_range: '00:00-23:59',
  },
  saturday: {
    enabled: true,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
    intervals: [] as Interval[],
    available_range: '00:00-23:59',
  },
  sunday: {
    enabled: true,
    start: { hours: '09', minutes: '00' },
    end: { hours: '17', minutes: '00' },
    intervals: [] as Interval[],
    available_range: '00:00-23:59',
  },
};
export const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const phoneRegex = /^\d{10}$/;
export const GOALS: DialogHandlerActionsNames = 'goals';
export const CARDS: DialogHandlerActionsNames = 'cards';
export const SUBSTITUTIONS: DialogHandlerActionsNames = 'substitutions';
