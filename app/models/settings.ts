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
