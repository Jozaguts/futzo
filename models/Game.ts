import type { AvailableIntervals } from '~/models/Schedule';
import type { TeamLineupAvailablePlayers } from '~/models/Player';
export type DialogHandlerActionsNames = 'cards' | 'goals' | 'substitutions';

export type ActionGameReportState = {
  show?: boolean;
  title: string;
  subtitle: string;
  type: 'info' | 'success' | 'error';
};

export type Initialize = Record<TeamType, TeamFormation & { team?: Team; players?: TeamLineupAvailablePlayers[] }>;
export type TeamFormation = {
  name: string;
  team_id: number;
  goalkeeper: FormationPlayer[];
  defenses: FormationPlayer[];
  midfielders: FormationPlayer[];
  forwards: FormationPlayer[];
};
export type FormationPlayer = {
  name: string;
  abbr: string;
  default_lineup_player_id: number;
  lineup_player_id: number;
  field_location: number;
  number: number;
  user_id?: number;
  player_id?: number;
  goals: number;
  cards: {
    red: boolean;
    yellow: boolean;
    doble_yellow_card: boolean;
  };
  substituted: boolean;
};

export type CardType = 'yellow-card' | 'doble-card' | 'red-card';
export type TeamType = 'home' | 'away';
export type GameTeamsPlayers = {
  home: GameTeam;
  away: GameTeam;
};

export type GameTeam = {
  team_id: number;
  name: string;
  players: GameTeamPlayer[];
};

export type GameTeamPlayer = {
  id: number;
  name: string;
  position: string;
  '#': number;
  goals: number;
  cards: CardType;
};

export type GoalDetails = {
  player_id: string;
  minute: number;
  assist_id: string;
};

export type GameTeamFormRequest = {
  home: {
    name: string;
    goals: number;
    goalsDetails: GoalDetails[];
  };
  away: {
    name: string;
    goals: number;
    goalsDetails: GoalDetails[];
  };
};

export type GameDetailsRequest = {
  id?: number;
  field_id: number;
  game_id: number;
  date: string;
  day?: string;
  selected_time?: string;
};

export type Game = {
  id: number;
  home: Away;
  away: Away;
  details: Details;
  round: number;
  status: string;
  result: null;
  start_date: Date;
  end_date: Date;
  options: Option[];
};

export type Away = {
  id: number;
  name: string;
  image: string;
  goals: number;
};

export type Details = {
  date: string;
  raw_date: Date;
  raw_time: string;
  time: Time;
  field: Field;
  location: Field;
  referee: string;
  day_of_week: string;
  tournament: string;
};

export type Field = {
  id: number;
  name: string;
};

export type Time = {
  hours: number;
  minutes: number;
};

export type Option = {
  field_id: number;
  available_intervals: AvailableIntervals;
};

export type NextGames = {
  data: Datum[];
};

export type Datum = {
  id: number;
  tournament: Tournament;
  home_team: Team;
  away_team: Team;
  location: Field;
  field: Field;
  match_date: string;
  match_time: string;
};

export type Team = {
  id: number;
  name: string;
  image: string;
};

export type Tournament = {
  id: number;
  league_id: number;
  category_id: number;
  tournament_format_id: number;
  football_type_id: number;
  name: string;
  slug: string;
  image: string;
  thumbnail: string;
  start_date: Date;
  end_date: Date;
  prize: string;
  winner: null;
  description: string;
  status: string;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
};
