export type PlayerVerificationMethod = 'none' | 'curp' | 'ine' | 'passport' | 'other';

export type PlayerVerificationSettings = {
  requires_player_verification: boolean;
  player_verification_method: PlayerVerificationMethod | null;
};

export type PlayerTransferLockSetting = {
  id: number;
  name: string;
  player_lock_duration_days: number | null;
  requires_player_verification?: boolean | null;
  player_verification_method?: PlayerVerificationMethod | null;
};

export type TournamentVerificationOverride = 'inherit' | 'required' | 'not_required';

export type TournamentConfigurationSettings = {
  id?: number | null;
  tournament_id: number;
  tournament_format_id: number | null;
  football_type_id: number | null;
  substitutions_per_team: number | null;
  max_teams: number | null;
  min_teams: number | null;
  time_between_games: number | null;
  max_players_per_team: number | null;
  min_players_per_team: number | null;
  max_teams_per_player: number | null;
  player_lock_duration_days: number | null;
  requires_player_verification: boolean | null;
  player_verification_method: PlayerVerificationMethod | null;
  game_time: number | null;
  round_trip: boolean | null;
  group_stage: boolean | null;
  elimination_round_trip: boolean | null;
};
