export interface FormSteps {
  current: CurrentStep;
  completed: string[];
}
export type CurrentStep = "createTeam" | "createDt" | "createOwner";

export type CreateTeamForm = {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: object;
  category_id: number;
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
  description: string;
};
export type CreateDtForm = {
  id?: number;
  name: string;
  phone: string;
  email: string;
  image: HTMLImageElement | File | string;
};
export type CreateOwnerForm = {
  id?: number;
  name: string;
  phone: string;
  email: string;
  image: HTMLImageElement | File | string;
};
export interface TeamStoreRequest {
  team: CreateTeamForm;
  coach: CreateDtForm;
  president: CreateOwnerForm;
}
