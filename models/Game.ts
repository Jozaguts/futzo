import type { AvailableIntervals } from '~/models/Schedule';

export type Formation = {
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

export type ReScheduleFormState = {
  field_id: number;
  game_id: number;
  date: string;
  day?: string;
  selected_time?: string;
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
  id: number;
  field_id: number;
  date: string;
  game_id: number;
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
