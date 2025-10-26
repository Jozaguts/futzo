export type BracketQualifier = {
  seed: number;
  team_id: number;
  team_name: string | null;
  team_image: string | null;
  points: number;
  goal_difference: number;
  goals_for: number;
  group_key?: string | null;
};

export type BracketPair = {
  home_seed: number;
  away_seed: number;
  home: BracketQualifier;
  away: BracketQualifier;
};

export type BracketPreview = {
  phase: string;
  target_teams: number;
  source: string | null;
  qualifiers: BracketQualifier[];
  pairs: BracketPair[];
  rules?: {
    round_trip: boolean;
    away_goals: boolean;
    extra_time: boolean;
    penalties: boolean;
    advance_if_tie: string;
  } | null;
};

export type ConfirmBracketMatch = {
  home_team_id: number;
  away_team_id: number;
  field_id: number | null;
  match_date: string;
  match_time: string;
  leg?: number;
};

export type ConfirmBracketPayload = {
  phase: string;
  round_trip?: boolean;
  min_rest_minutes?: number;
  matches: ConfirmBracketMatch[];
};
