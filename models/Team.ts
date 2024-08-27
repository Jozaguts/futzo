export interface FormSteps {
  current: CurrentStep;
  completed: string[];
}
export type CurrentStep = "createTeam" | "createDt" | "createOwner";
