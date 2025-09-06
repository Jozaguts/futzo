import type { Interval, LocationAvailability, Windows } from '~/models/Location';
import type { ActionGameReportState, DialogHandlerActionsNames } from '~/models/Game';
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
export const GOALS_STATE: ActionGameReportState = {
  title: 'Registrar Goles',
  subtitle: 'Añade los goles del partido',
  type: 'info',
};
export const CARDS_STATE: ActionGameReportState = {
  title: 'Registrar Tarjetas',
  subtitle: 'Añade las tarjetas del partido',
  type: 'info',
};
export const SUBSTITUTIONS_STATE: ActionGameReportState = {
  title: 'Registrar Cambios',
  subtitle: 'Añade los cambios realizados durante el partido',
  type: 'info',
};
export const POST_CHECKOUT_LOGIN_SUCCESS_STATUS_CODE = 200;
export const POST_CHECKOUT_LOGIN_ERROR_STATUS_CODE = 400;
export const WINDOWS: Windows = {
  mon: [{ start: '09:00', end: '17:00', enabled: false }],
  tue: [{ start: '09:00', end: '17:00', enabled: false }],
  wed: [{ start: '09:00', end: '17:00', enabled: false }],
  thu: [{ start: '09:00', end: '17:00', enabled: false }],
  fri: [{ start: '09:00', end: '17:00', enabled: true }],
  sat: [{ start: '09:00', end: '17:00', enabled: true }],
  sun: [{ start: '09:00', end: '17:00', enabled: true }],
  all: [{ start: '09:00', end: '17:00', enabled: false }],
};
