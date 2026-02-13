import type {User} from '~/models/User';
import type {Team} from '~/models/Team';
import type {Position} from '~/models/Position';

export type TeamLineupAvailablePlayers = {
  player_id: number;
  team_id: number;
  name: string;
  number: number;
  position: string;
  stats?: TeamLineupPlayerStats | null;
};

export type TeamLineupPlayerStats = {
  matches_played: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
};

export type PlayerVerificationStatus = 'not_required' | 'pending' | 'approved' | 'rejected';

export type PlayerVerification = {
  status?: PlayerVerificationStatus | null;
  verified_at?: string | null;
  verified_by?: number | null;
  notes?: string | null;
};

export type PlayerTransferLock = {
  expires_at?: string | null;
  released_at?: string | null;
  released_by?: number | null;
  team_id?: number | null;
  tournament_id?: number | null;
};

export type GuardianInfo = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  relationship?: string | null;
};
export interface Player {
  id?: number;
  name: string;
  email: string;
  phone: string;
  curp?: string | null;
  is_minor?: boolean;
  guardian?: GuardianInfo | null;
  verification?: PlayerVerification | null;
  team_lock?: PlayerTransferLock | null;
  position_id: number;
  team: Team;
  number: number;
  league_id: number;
  league?: string;
  user: User;
  position: Position;
}

export interface FormSteps {
  current: CurrentStep;
  steps: PlayerSteps;
}

export type PlayerSteps = Record<
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

export type FormLabelStep = 'Información básica' | 'Detalles del jugador' | 'Información de contacto';

export type CurrentStep = 'basic-info' | 'details-info' | 'contact-info';

export interface CreatePlayerForm extends PlayerStoreRequest {}

export interface PlayerStoreRequest {
  basic: BasicInfoForm;
  details: DetailsInfoForm;
  contact: ContactInfoForm;
  guardian?: GuardianForm;
}

export interface ImageForm {
  file: File | null;
  name: string;
  size: number;
  hasError?: boolean;
  errors?: {
    name: string | null;
    description: string | null;
    action: string | null;
  };
}

export interface BasicInfoForm {
  id?: number;
  name?: string;
  last_name?: string;
  birthdate?: string;
  nationality?: string;
  image?: HTMLImageElement | File | string;
  team_id?: number;
  category_id?: number;
  curp?: string;
  is_minor?: boolean;
  identification_method?: import('~/models/settings').PlayerVerificationMethod | null;
  identification_document?: File | string | null;
}

export interface DetailsInfoForm {
  position_id: number;
  number: number;
  height: number;
  weight: number;
  dominant_foot: string;
  medical_notes: string;
}

export interface ContactInfoForm {
  email: string;
  phone: string;
  notes: string;
  iso_code?: string;
}

export interface GuardianForm {
  name?: string;
  email?: string;
  phone?: string;
  relationship?: string;
}

export interface PlayerResponse {}
