import { defineStore } from "pinia";
import type { FormSteps, TeamStoreRequest } from "~/models/Team";

export const useTeamStore = defineStore("teamStore", () => {
  const dialog = ref(false);
  const teams = ref([]);
  const team = ref({});
  const teamStoreRequest = ref({} as TeamStoreRequest);
  const client = useSanctumClient();
  const steps = ref<FormSteps>({
    current: "createTeam",
    completed: [],
  });
  const isEdition = ref(false);

  const createTeam = async (team: any) => {
    try {
      await client("/api/v1/admin/teams", {
        method: "POST",
        body: team,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getTeams = async () => {
    try {
      const response = await client("/api/v1/admin/teams");
      teams.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    teams,
    team,
    createTeam,
    dialog,
    steps,
    isEdition,
    teamStoreRequest,
  };
});
