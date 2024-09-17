import { defineStore } from "pinia";
import type { FormSteps, Team, TeamStoreRequest } from "~/models/Team";
import { toast } from "vuetify-sonner";

export const useTeamStore = defineStore("teamStore", () => {
  const dialog = ref(false);
  const teams = ref<Team[]>();
  const team = ref<Team>();
  const teamId = ref(0);
  const search = ref("");
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 0,
    to: 1,
  });
  const teamStoreRequest = ref<Partial<TeamStoreRequest>>(
    {} as TeamStoreRequest,
  );
  //     {
  //   team: {
  //     name: "equipo 1",
  //     phone: "+52 322 2397177",
  //     email: "test@test.com",
  //     tournament_id: 1,
  //     address: {
  //       description:
  //         "La Sabana, San José Province, San José, Sabana, Costa Rica",
  //       matched_substrings: { length: 9, offset: 0 },
  //       place_id: "ChIJM_Dtpqv8oI8RyETi6jXqf_c",
  //       reference: "ChIJM_Dtpqv8oI8RyETi6jXqf_c",
  //       structured_formatting: {
  //         main_text: "La Sabana",
  //         main_text_matched_substrings: { length: 9, offset: 0 },
  //         secondary_text: "San José Province, San José, Sabana, Costa Rica",
  //       },
  //       terms: [
  //         {
  //           offset: 0,
  //           value: "La Sabana",
  //         },
  //         {
  //           offset: 11,
  //           value: "San José Province",
  //         },
  //         {
  //           offset: 30,
  //           value: "San José",
  //         },
  //         {
  //           offset: 40,
  //           value: "Sabana",
  //         },
  //       ],
  //       types: [
  //         "establishment",
  //         "tourist_attraction",
  //         "point_of_interest",
  //         "park",
  //       ],
  //     },
  //     category_id: 2,
  //     image: new Image(),
  //     colors: {
  //       home: {
  //         primary: "#000000",
  //         secondary: "#000000",
  //       },
  //       away: {
  //         primary: "#fff",
  //         secondary: "#fff",
  //       },
  //     },
  //     description: "description",
  //   },
  //   president: {
  //     name: "president name",
  //     email: "email@test.com",
  //     phone: "+52 3222398299",
  //     image: new File([], ""),
  //   },
  //   coach: {
  //     name: "coach name",
  //     email: "coach@test.com",
  //     phone: "+52 3222398211",
  //     image: new File([], ""),
  //   },
  // });
  const client = useSanctumClient();
  const steps = ref<FormSteps>({
    current: "createTeam",
    completed: [],
  });
  const isEdition = ref(false);

  const createTeam = async () => {
    let form = prepareForm();

    await client("/api/v1/admin/teams", {
      method: "POST",
      body: form,
    })
      .then(async (response) => {
        await getTeams();
        toast.success("Equipo creado");

        dialog.value = false;
      })
      .catch((error) => {
        console.error(error.data?.errors);

        toast.error(error.data?.message ?? "Error al crear equipo");
      });
  };
  const updateTeam = async (teamId: number) => {
    let form = prepareForm();
    await client(`/api/v1/admin/teams/${teamId}`, {
      method: "PUT",
      body: form,
    })
      .then(async (response) => {
        await getTeams();
        toast.success("Equipo actualizado");
        dialog.value = false;
      })
      .catch((error) => {
        console.error(error.data?.errors);
        toast.error(error.data?.message ?? "Error al editar equipo");
      });
  };
  const prepareForm = (): FormData => {
    let form = new FormData();

    for (const key in teamStoreRequest.value) {
      if (key === "team") {
        for (const keyTeam in teamStoreRequest.value.team) {
          if (teamStoreRequest.value.team[keyTeam] instanceof File) {
            form.append(
              `team[${keyTeam}]`,
              teamStoreRequest.value.team[keyTeam],
            );
          }
          if (
            (typeof teamStoreRequest.value.team[keyTeam] === "object" &&
              keyTeam === "colors") ||
            keyTeam === "address"
          ) {
            form.append(
              `team[${keyTeam}]`,
              JSON.stringify(teamStoreRequest.value.team[keyTeam]),
            );
          } else {
            form.append(
              `team[${keyTeam}]`,
              teamStoreRequest.value.team[keyTeam],
            );
          }
        }
      } else if (key === "coach") {
        for (const keyCoach in teamStoreRequest.value.coach) {
          if (teamStoreRequest.value.coach[keyCoach] instanceof File) {
            form.append(
              `coach[${keyCoach}]`,
              teamStoreRequest.value.coach[keyCoach],
            );
          } else {
            form.append(
              `coach[${keyCoach}]`,
              teamStoreRequest.value.coach[keyCoach],
            );
          }
        }
      } else if (key === "president") {
        for (const keyPresident in teamStoreRequest.value.president) {
          if (teamStoreRequest.value.president[keyPresident] instanceof File) {
            form.append(
              `president[${keyPresident}]`,
              teamStoreRequest.value.president[keyPresident],
            );
          } else {
            form.append(
              `president[${keyPresident}]`,
              teamStoreRequest.value.president[keyPresident],
            );
          }
        }
      }
    }
    return form;
  };
  const getTeams = async () => {
    try {
      const response = await client(
        `/api/v1/admin/teams?per_page=20&page=${pagination.value.to}`,
      );
      console.log({ response });
      pagination.value.total = response.meta.last_page;
      pagination.value.page = response.meta.current_page;
      teams.value = response.data.teams;
    } catch (error) {
      console.log(error);
    }
  };
  const list = async () => {
    try {
      const response = await client("/api/v1/admin/teams/list");
      teams.value = response.teams;
    } catch (error) {
      console.log(error);
    }
  };

  const getTeam = async (id: number) => {
    try {
      return await client<{ data: TeamStoreRequest }>(
        `/api/v1/admin/teams/${id}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    teams,
    team,
    dialog,
    steps,
    isEdition,
    teamStoreRequest,
    teamId,
    pagination,
    search,
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    list,
  };
});
