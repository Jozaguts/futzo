import type {ImageForm} from '~/models/tournament';
import type {TourStep} from "#nuxt-tour/props";
import type {VTour} from "#components";

export type TourKey = 'dashboard' | 'torneos' | 'equipos' | 'jugadores' | 'ubicaciones';
export type TourState = {
  steps: TourStep[];
  show: boolean;
  // @ts-ignore
  ref: InstanceType<typeof VTour> | null;
};
export type Tour = Record<TourKey, TourState>;
export type Stats = {
  registeredTeams: ActivePlayers;
  activePlayers: ActivePlayers;
  completedGames: ActivePlayers;
};
export type ActivePlayers = {
  total: number;
  current: number;
  dailyData: number[];
  label: string;
};
export type toastTypes = 'success' | 'warning' | 'error' | 'info';
export type Action = 'login';
export type ToastOptions = {
  type: toastTypes;
  msg: string;
  description?: string;
  action?: Action;
  duration?: number;
};
export interface Header {
  title: string;
  value: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  filterable?: boolean;
  divider?: boolean;
}

export {};
declare global {
  interface Window {
    FB: any;
  }
}

export interface Auth {
  user: User | null;
  loggedIn: boolean;
  token: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface AutocompletePrediction {
  address_components: AddressComponent[];
  adr_address: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos: Photo[];
  place_id: string;
  reference: string;
  types: string[];
  url: string;
  utc_offset: number;
  vicinity: string;
  website: string;
  html_attributions: any[];
  utc_offset_minutes: number;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  south: number;
  west: number;
  north: number;
  east: number;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  width: number;
}

export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

export interface Term {
  offset: number;
  value: string;
}

export type IStatStage = 'last24Hrs' | 'lastWeek' | 'lastMonth' | 'lastYear';
export type ITeamStats = {
  registeredTeams: IDashboardStatsValues;
  activePlayers: IDashboardStatsValues;
  completedGames: IDashboardStatsValues;
};
export type IDashboardStatsValues = {
  total: number;
  current: number;
  dailyData: number[];
  label: string;
};
export type IPagination = {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
  sort: 'asc' | 'desc';
};
export type DragAndDrop = {
  dragging: boolean;
  dropped: boolean;
  interval: number;
  value: number;
  bufferValue: number;
  image: ImageForm;
};
