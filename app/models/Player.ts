import type { User } from '~/models/User';
import type { Team } from '~/models/Team';
import type { Position } from '~/models/Position';

export type TeamLineupAvailablePlayers = {
  player_id: number;
  team_id: number;
  name: string;
  number: number;
  position: string;
};
export interface Player {
  id?: number;
  name: string;
  email: string;
  phone: string;
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
    back: Function;
    next: Function;
  }
>;

export type FormLabelStep = 'Información básica' | 'Detalles del jugador' | 'Información de contacto';

export type CurrentStep = 'basic-info' | 'details-info' | 'contact-info';

export interface CreatePlayerForm extends PlayerStoreRequest {}

export interface PlayerStoreRequest {
  basic: BasicInfoForm;
  details: DetailsInfoForm;
  contact: ContactInfoForm;
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

export interface PlayerResponse {}
