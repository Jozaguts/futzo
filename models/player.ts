export interface Player {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  team: string;
  league_id: number;
  league?: string;
}
export interface FormSteps {
  current: CurrentStep;
  completed: string[];
}
export type CurrentStep = "basic-info" | "details-info" | "contact-info";

export interface CreatePlayerForm {}
export interface PlayerStoreRequest {
  basic: {
    id?: number;
    avatar: HTMLImageElement | File | string;
  };
  details: {};
  contact: {};
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
