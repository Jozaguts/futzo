export interface FormSteps {
  current: CurrentStep;
  completed: string[];
}
// todo cambia la interface para crear equipo
// $table->string('name');
// $table->string('president_name');
// $table->string('coach_name');
// $table->string('phone')->nullable();
// $table->string('email')->nullable();
// $table->string('address')->nullable();
// $table->string('image')->nullable();
export type CurrentStep = "createTeam" | "createDt" | "createOwner";

export type CreateTeamForm = {
  name: string;
  president_name: string;
  coach_name: string;
  phone: string;
  email: string;
  address: string;
  image: string;
};
export type CreateDtForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  image: string;
};
export type CreateOwnerForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  image: string;
};
export interface TeamStoreRequest {
  teamData: CreateTeamForm;
  dtData: CreateDtForm;
  ownerData: CreateOwnerForm;
}
