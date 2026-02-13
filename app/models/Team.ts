import type {Position} from '~/models/Position';
import type {IPagination} from '~/interfaces';

export type TeamsPaginatedResponse = {
  data: Team[];
  meta: TeamsPaginationMeta;
};

export type TeamKpiMetric = {
  total: number;
  current: number;
  dailyData: number[];
  label: string;
};

export type TeamMetricsRange = 'lastMonth';

export type TeamListKpis = {
  teamsRegistered: TeamKpiMetric;
  playersRegistered: TeamKpiMetric;
  activeTournaments: TeamKpiMetric;
  teamsWithHomeVenue: TeamKpiMetric;
};

export type TeamDetailKpis = {
  matchesPlayed: TeamKpiMetric;
  wins: TeamKpiMetric;
  draws: TeamKpiMetric;
  losses: TeamKpiMetric;
  goalsFor: TeamKpiMetric;
  goalsAgainst: TeamKpiMetric;
  goalDifference: TeamKpiMetric;
  points: TeamKpiMetric;
};

export type TeamDetailMetricsResponse = {
  data: {
    range: TeamMetricsRange;
    kpis: TeamDetailKpis;
  };
};

export type TeamsPaginationMeta = IPagination & {
  kpis?: TeamListKpis;
};

export type PreRegisterTeamResponse = {
  categories: Category[];
  positions: Position[];
  team: Team & { categories: Category[] };
  tournaments: Tournament[];
};

export type Formation = {
  id: number;
  name: string;
  goalkeeper: number;
  defenses: number;
  midfielders: number;
  forwards: number;
};
export interface FormSteps {
  current: CurrentStep;
  steps: TeamSteps;
}

export type TeamSteps = Record<
  CurrentStep,
  {
    number: number;
    completed: boolean;
    label: FormLabelStep;
    disable: boolean;
    back_step: CurrentStep | 'close';
    next_step: CurrentStep | 'save';
    back_label: string;
    next_label: string;
  }
>;
export type CurrentStep = 'createTeam' | 'createDt' | 'createOwner';
export type FormLabelStep = 'Crea un equipo' | 'Crea el DT' | 'Crea el presidente';

export type CreateTeamForm = {
  id?: number;
  name: string;
  category_id: number;
  tournament_id: number;
  image: HTMLImageElement | File | string;
  colors: {
    home: {
      primary: string;
      secondary: string;
    };
    away: {
      primary: string;
      secondary: string;
    };
  };
  description: string | null;
  home_location_id: number | null;
  home_day_of_week: number | null;
  home_start_time: string | null;
};

export type CreateDtForm = {
  id?: number;
  name: string;
  phone: string;
  email: string;
  image: HTMLImageElement | File | string;
  iso_code?: number;
};
export type CreateOwnerForm = {
  id?: number;
  name: string;
  phone: string;
  email: string;
  image: HTMLImageElement | File | string;
  iso_code?: number;
};

export interface TeamStoreRequest {
  team: CreateTeamForm;
  coach: CreateDtForm;
  president: CreateOwnerForm;
}

export type Team = {
  id: number;
  name: string;
  slug: string;
  short_name?: string | null;
  players_count?: number | null;
  register_link?: string | null;
  matches_played?: number | null;
  wins?: number | null;
  draws?: number | null;
  losses?: number | null;
  goals_for?: number | null;
  goals_against?: number | null;
  goal_difference?: number | null;
  points?: number | null;
  tournaments?: TeamTournamentBadge[] | null;
  category: Category;
  tournament: Tournament;
  image: string;
  colors: Colors;
  description: string | null;
  president: User;
  coach: User;
  home_preferences: HomePreferences;
  default_home?: HomePreferences | null;
};
export interface Category {
  id: number;
  name: string;
  age_range: string;
  gender: string;
  created_at: null;
  updated_at: null;
  deleted_at: null;
  pivot: CategoryPivot;
}

export interface CategoryPivot {
  team_id: number;
  category_id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  league_id: number;
}

export interface HomePreferences {
  location_id: number | null;
  location: { id: number; name: string } | null;
  day_of_week: number | null;
  day_label: string | null;
  start_time: string | null;
}

export interface Colors {
  away: Away;
  home: Away;
}

export interface Away {
  primary: string;
  secondary: string;
}

export interface TeamTournamentBadge {
  id?: number;
  name: string;
  status?: string | null;
}

export interface Tournament {
  id: number;
  league_id: number;
  category_id: number;
  tournament_format_id: number;
  name: string;
  image: string;
  thumbnail: null;
  start_date: string;
  end_date: string;
  prize: string;
  winner: null;
  description: string;
  status: string;
  deleted_at: null;
  created_at: null;
  updated_at: Date;
  pivot: TournamentPivot;
}

export interface TournamentPivot {
  team_id: number;
  tournament_id: number;
}
