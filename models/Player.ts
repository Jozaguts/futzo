export interface Player {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position_id: number;
  team: string;
  league_id: number;
  league?: string;
}

export interface FormSteps {
  current: CurrentStep;
  steps: PlayerSteps[];
}

export interface PlayerSteps {
  step: CurrentStep;
  completed: boolean;
  label: FormLabelStep;
}

export type FormLabelStep =
  | "Información básica"
  | "Detalles del jugador"
  | "Información de contacto";

export type CurrentStep = "basic-info" | "details-info" | "contact-info";

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
  name: string;
  lastName: string;
  birthdate: string;
  nationality: string;
  image: HTMLImageElement | File | string;
  team_id?: number;
  category_id?: number;
}

export interface DetailsInfoForm {
  position_id: number;
  number: number;
  height: number;
  weight: number;
  dominant_foot: string;
  medical_notes: number;
}

export interface ContactInfoForm {
  email: string;
  phone: string;
  notes: string;
}

export interface PlayerResponse {}
