import { defineStore } from "pinia";
import type {
  FormSteps,
  Team,
  TeamResponse,
  TeamStoreRequest,
} from "~/models/Team";

const { toast } = useToast();

export const useTeamStore = defineStore("teamStore", () => {
  const dialog = ref(false);
  const teams = ref<TeamResponse[]>();
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
  const client = useSanctumClient();
  const steps = ref<FormSteps>({
    current: "createTeam",
    steps: [
      {
        step: "createTeam",
        completed: false,
        label: "Crea un equipo",
      },
      {
        step: "createDt",
        completed: false,
        label: "Crea el DT",
      },
      {
        step: "createOwner",
        completed: false,
        label: "Crea el presidente",
      },
    ],
  });
  const isEdition = ref(false);

  const createTeam = async () => {
    let form = prepareForm();

    await client("/api/v1/admin/teams", {
      method: "POST",
      body: form,
    })
      .then(async () => {
        await getTeams();
        toast(
          "success",
          "Equipo Creado",
          "El nuevo equipo se ha creado exitosamente.",
        );

        dialog.value = false;
      })
      .catch((error) => {
        toast(
          "error",
          "Error al crear el equipo",
          error.data?.message ??
            "No se pudo crear el equipo. Verifica tu información e inténtalo de nuevo.",
        );
      });
  };
  const updateTeam = async (teamId: number) => {
    let form = prepareForm();
    await client(`/api/v1/admin/teams/${teamId}`, {
      method: "PUT",
      body: form,
    })
      .then(async () => {
        await getTeams();
        toast(
          "success",
          "Equipo actualizado",
          "El equipo se ha actualizado exitosamente",
        );
        dialog.value = false;
      })
      .catch((error) => {
        toast(
          "error",
          "Error al actualizar el equipo",
          error.data?.message ??
            "No se pudo actualizar el equipo. Verifica tu información e inténtalo de nuevo.",
        );
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
  const getTeams = async (sort = "asc", perPage = 10) => {
    pagination.value.perPage = perPage;
    try {
      const response = await client(
        `/api/v1/admin/teams?per_page=${pagination.value.perPage}&page=${pagination.value.to}&sort=${sort}`,
      );
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
