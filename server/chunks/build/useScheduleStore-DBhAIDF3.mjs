import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { at as useDisplay, aU as useNuxtApp, bM as useSanctumUser, y as useSanctumClient, G as useSanctumAuth } from './server.mjs';
import { u as useToast } from './useToast-m9XhiEp3.mjs';
import { isProxy } from '@vue/reactivity';
import { u as useAsyncData } from './index-DkcY5wU8.mjs';

const useGlobalStore = defineStore("global", () => {
  const { mobile } = useDisplay();
  const isMobile = computed(() => mobile.value);
  const isLoading = ref(true);
  const appName = ref(useNuxtApp().$config.public.appName);
  const rail = ref(false);
  const drawerWidth = ref(0);
  const showFooter = ref(true);
  const drawer = ref(true);
  return {
    isLoading,
    drawer,
    appName,
    isMobile,
    rail,
    drawerWidth,
    showFooter
  };
});
const useAuthStore = defineStore("authStore", () => {
  const { toast } = useToast();
  const user = useSanctumUser();
  const role = computed(() => {
    var _a;
    return (_a = user.value) == null ? void 0 : _a.roles[0];
  });
  const isSuperAdmin = computed(() => role.value === "super administrador");
  const image = computed(() => {
    var _a;
    return (_a = user.value) == null ? void 0 : _a.image;
  });
  const forgotPasswordState = ref({
    step: "reset-password",
    username: "",
    areaCode: "+52",
    isPhone: false,
    isFetching: false,
    code: "",
    token: ""
  });
  const resetForgotPasswordState = () => {
    forgotPasswordState.value = {
      step: "reset-password",
      username: "",
      areaCode: "+52",
      isPhone: false,
      isFetching: false,
      code: ""
    };
  };
  const updateUser = (updateUserForm) => {
    const client = useSanctumClient();
    client(`api/v1/admin/profile/${updateUserForm.id}`, {
      method: "PUT",
      body: updateUserForm
    }).then(async () => {
      const { refreshIdentity } = useSanctumAuth();
      await refreshIdentity();
      toast(
        "success",
        "Perfil Actualizado",
        "Tu perfil se ha actualizado exitosamente."
      );
    });
  };
  const updatePassword = (updateUserPasswordForm) => {
    const client = useSanctumClient();
    client(`api/v1/admin/profile/${updateUserPasswordForm.id}/password`, {
      method: "PUT",
      body: {
        ...updateUserPasswordForm
      }
    }).then(() => {
      toast(
        "success",
        "Contrase\xF1a actualizada",
        "Tu contrase\xF1a se ha actualizado exitosamente."
      );
    }).catch((error) => {
      var _a;
      const message = ((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) || "No se pudo actualizar la contrase\xF1a. Verifica tu informaci\xF3n e int\xE9ntalo de nuevo.";
      toast("error", "Error al Actualizar Contrase\xF1a", message);
    });
  };
  const updateImage = async (image2) => {
    var _a;
    const client = useSanctumClient();
    const formData = new FormData();
    formData.append("image", image2);
    client(`api/v1/admin/profile/${(_a = user.value) == null ? void 0 : _a.id}/image`, {
      method: "POST",
      body: formData
    }).then(async () => {
      const { refreshIdentity } = useSanctumAuth();
      await refreshIdentity();
      toast(
        "success",
        "Imagen actualizada",
        "Tu imagen se ha actualizado exitosamente."
      );
    }).catch((error) => {
      var _a2;
      const message = ((_a2 = error == null ? void 0 : error.data) == null ? void 0 : _a2.message) || "No se pudo actualizar tu imagen. Verifica tu informaci\xF3n e int\xE9ntalo de nuevo.";
      toast("error", "Error al actualizar tu imagen", message);
    });
  };
  const reSendCode = (param, type) => {
    const client = useSanctumClient();
    client(`api/v1/verify-code/resend?${type}=${param}`).then(() => {
      useToast().toast(
        "success",
        "C\xF3digo reenviado",
        "Tu c\xF3digo de verificaci\xF3n ha sido reenviado exitosamente."
      );
    }).catch((error) => {
      var _a2;
      var _a;
      toast(
        "error",
        "Error al reenviar el c\xF3digo",
        (_a2 = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) != null ? _a2 : "Ha ocurrido un error al intentar reenviar tu c\xF3digo de verificaci\xF3n. Por favor, intenta nuevamente m\xE1s tarde."
      );
    });
  };
  return {
    role,
    isSuperAdmin,
    user,
    image,
    forgotPasswordState,
    updateUser,
    updateImage,
    updatePassword,
    reSendCode,
    resetForgotPasswordState
  };
}, {
  persist: {
    pick: ["user", "role", "isSuperAdmin", "image"]
  }
});
const prepareForm = (requestData) => {
  const form = new FormData();
  const appendData = (prefix, data) => {
    for (const key in data) {
      if (data[key] instanceof File) {
        form.append(`${prefix}[${key}]`, data[key]);
      } else if (data[key] instanceof Date) {
        const date = data[key].toISOString().split("T")[0];
        form.append(`${prefix}[${key}]`, date);
      } else if (isProxy(data[key])) {
        form.append(`${prefix}[${key}]`, JSON.stringify(data[key]));
      } else {
        form.append(`${prefix}[${key}]`, data[key]);
      }
    }
  };
  for (const key in requestData.value) {
    const data = requestData.value[key];
    appendData(key, data);
  }
  return form;
};
const useTournamentStore = defineStore("tournamentStore", () => {
  const tournament = ref({});
  const tournaments = ref([]);
  const noTournaments = computed(() => !tournaments.value.length);
  const search = ref("");
  const calendarDialog = ref(false);
  const tournamentStoreRequest = ref({});
  const calendarStoreRequest = ref({});
  const steps = ref({
    current: "basic-info",
    steps: [
      {
        step: "basic-info",
        completed: false,
        label: "Crea un torneo"
      },
      {
        step: "details-info",
        completed: false,
        label: "Detalles del torneo"
      }
    ]
  });
  const nextGames = ref([
    {
      id: 1,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: null,
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 2,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 3,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 4,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 5,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 6,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 7,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 8,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 9,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 10,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    }
  ]);
  const currentGames = ref([
    {
      id: 1,
      away: {
        name: "Chivas",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Monterrey",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: null,
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 2,
      away: {
        name: "Pachuca",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "Tigres",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 3,
      away: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "America",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 4,
      away: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "America",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 5,
      away: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "America",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    },
    {
      id: 6,
      away: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Cruz azul"
      },
      home: {
        name: "America",
        img: "https://ui-avatars.com/api/?name=Santos"
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00"
      }
    }
  ]);
  const categories = ref([]);
  const teamsCount = ref(0);
  const roundsCount = ref(0);
  const matchesCount = ref(0);
  const matchesByRound = ref(0);
  const loading = ref(false);
  const tournamentTypes = ref();
  const dialog = ref(false);
  const isEdition = ref(false);
  const isCalendarEdition = ref(false);
  const tournamentId = ref();
  const tournamentToEdit = ref({});
  const pagination = ref({
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    total: 0,
    sort: "asc"
  });
  const tournamentsInCreatedState = computed(() => {
    return tournaments.value.filter(
      (tournament2) => tournament2.status === "creado"
    );
  });
  const tournamentLocations = ref(
    []
  );
  const tournamentLocationStoreRequest = ref();
  const selectedLocations = ref([]);
  const selectedLocationsHasError = ref(false);
  function $reset() {
    tournamentStoreRequest.value = {};
    steps.value.current = "basic-info";
    steps.value.steps.map((step) => step.completed = false);
    isEdition.value = false;
    tournamentId.value = void 0;
  }
  async function tournamentFields($tournamentId) {
    const client = useSanctumClient();
    const { data } = await client(
      `api/v1/admin/tournaments/${$tournamentId}/fields`
    );
    return data;
  }
  async function loadTournaments() {
    loading.value = true;
    const client = useSanctumClient();
    await client(
      `/api/v1/admin/tournaments?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}`
    ).then(({ data, pagination: _pagination }) => {
      tournaments.value = data || [];
      pagination.value = { ...pagination.value, ..._pagination };
    }).finally(() => loading.value = false);
  }
  async function storeTournament() {
    const form = prepareForm(tournamentStoreRequest);
    return await useSanctumClient()("api/v1/admin/tournaments", {
      method: "POST",
      body: form
    }).then(async (response) => {
      await loadTournaments();
      useToast().toast(
        "success",
        "Torneo Creado",
        "El nuevo torneo se ha creado exitosamente."
      );
      dialog.value = false;
      $reset();
      return response;
    }).catch(() => {
      useToast().toast(
        "error",
        "Error al Crear Torneo",
        "No se pudo crear el torneo. Por favor, intenta nuevamente."
      );
    });
  }
  async function updateTournament() {
    const form = prepareForm(tournamentStoreRequest);
    return await useSanctumClient()(
      `api/v1/admin/tournaments/${tournamentId}`,
      {
        method: "PUT",
        body: form
      }
    ).then(async (response) => {
      return response;
    }).catch((error) => {
      console.log({ error });
    });
  }
  async function fetchTournamentsByLeagueId(leagueId) {
    var _a, _b;
    const client = useSanctumClient();
    const user = useSanctumUser();
    if (!leagueId) {
      leagueId = (_b = (_a = user.value) == null ? void 0 : _a.league) == null ? void 0 : _b.id;
    }
    const { data } = await client(
      `api/v1/admin/leagues/${leagueId}/tournaments`
    );
    tournaments.value = data || [];
  }
  async function updateTournamentStatus(status) {
    const client = useSanctumClient();
    await client(`api/v1/admin/tournaments/${tournamentId.value}/status`, {
      method: "PUT",
      body: { status }
    }).then(async () => {
      await loadTournaments();
    });
  }
  async function markAsCompleted() {
    const client = useSanctumClient();
    return await client(
      `api/v1/admin/tournaments/${tournamentId.value}/mark-as-completed`,
      {
        method: "PUT",
        body: { tournament_id: tournamentId.value }
      }
    );
  }
  const getTournamentLocations = async () => {
    const client = useSanctumClient();
    client(`/api/v1/admin/tournaments/${tournamentId.value}/locations`).then(
      (data) => {
        tournamentLocations.value = data;
      }
    );
  };
  const storeTournamentLocation = async () => {
    const client = useSanctumClient();
    await client(`/api/v1/admin/tournaments/${tournamentId.value}/locations`, {
      method: "POST",
      body: tournamentLocationStoreRequest.value
    }).then(async () => {
      useToast().toast(
        "success",
        "Ubicaci\xF3n del torneo",
        "La Ubicaci\xF3n del torneo ha sido agregada correctamente."
      );
      await getTournamentLocations();
    });
  };
  return {
    tournaments,
    tournament,
    nextGames,
    categories,
    currentGames,
    teamsCount,
    roundsCount,
    matchesCount,
    matchesByRound,
    loading,
    tournamentTypes,
    dialog,
    isEdition,
    tournamentId,
    tournamentToEdit,
    pagination,
    markAsCompleted,
    noTournaments,
    search,
    steps,
    tournamentStoreRequest,
    calendarDialog,
    calendarStoreRequest,
    isCalendarEdition,
    tournamentLocations,
    tournamentLocationStoreRequest,
    selectedLocations,
    selectedLocationsHasError,
    tournamentsInCreatedState,
    getTournamentLocations,
    loadTournaments,
    storeTournament,
    fetchTournamentsByLeagueId,
    $reset,
    updateTournament,
    storeTournamentLocation,
    updateTournamentStatus,
    tournamentFields
  };
});
const useTeamStore = defineStore("teamStore", () => {
  const { toast } = useToast();
  const dialog = ref(false);
  const teams = ref();
  const team = ref();
  const teamId = ref(0);
  const search = ref("");
  const importModal = ref(false);
  const pagination = ref({
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    total: 0,
    sort: "asc"
  });
  const teamStoreRequest = ref(
    {}
  );
  const client = useSanctumClient();
  const steps = ref({
    current: "createTeam",
    steps: [
      {
        step: "createTeam",
        completed: false,
        label: "Crea un equipo"
      },
      {
        step: "createDt",
        completed: false,
        label: "Crea el DT"
      },
      {
        step: "createOwner",
        completed: false,
        label: "Crea el presidente"
      }
    ]
  });
  const isEdition = ref(false);
  const loading = ref(false);
  const downloadTemplate = async () => {
    loading.value = true;
    await client("/api/v1/admin/teams/template", {
      method: "GET"
      // responseType: "blob",
    }).then((response) => {
      const url = (void 0).URL.createObjectURL(new Blob([response]));
      const link = (void 0).createElement("a");
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      (void 0).body.appendChild(link);
      link.click();
    }).catch((error) => {
      var _a2;
      var _a;
      toast(
        "error",
        "Error al descargar la plantilla",
        (_a2 = (_a = error.data) == null ? void 0 : _a.message) != null ? _a2 : "No se pudo descargar la plantilla. Int\xE9ntalo de nuevo."
      );
    }).finally(() => {
      loading.value = false;
    });
  };
  async function importTeamsHandler(file, tournamentId) {
    const formData = new FormData();
    formData.append("tournament_id", tournamentId.toString());
    formData.append("file", file);
    await client("/api/v1/admin/teams/import", {
      method: "POST",
      body: formData
    }).then(async () => {
      toast(
        "success",
        "Equipos Importados",
        "Los equipos se han importado exitosamente."
      );
      importModal.value = false;
      await getTeams();
    }).catch((error) => {
      var _a2;
      var _a;
      toast(
        "error",
        "Error al importar equipos",
        (_a2 = (_a = error.data) == null ? void 0 : _a.message) != null ? _a2 : "No se pudieron importar los equipos. Verifica tu archivo e int\xE9ntalo de nuevo."
      );
    });
  }
  const createTeam = async () => {
    let form = prepareForm2();
    await client("/api/v1/admin/teams", {
      method: "POST",
      body: form
    }).then(async () => {
      await getTeams();
      toast(
        "success",
        "Equipo Creado",
        "El nuevo equipo se ha creado exitosamente."
      );
      dialog.value = false;
    }).catch((error) => {
      var _a2;
      var _a;
      toast(
        "error",
        "Error al crear el equipo",
        (_a2 = (_a = error.data) == null ? void 0 : _a.message) != null ? _a2 : "No se pudo crear el equipo. Verifica tu informaci\xF3n e int\xE9ntalo de nuevo."
      );
    });
  };
  const updateTeam = async (teamId2) => {
    let form = prepareForm2();
    await client(`/api/v1/admin/teams/${teamId2}`, {
      method: "PUT",
      body: form
    }).then(async () => {
      await getTeams();
      toast(
        "success",
        "Equipo actualizado",
        "El equipo se ha actualizado exitosamente"
      );
      dialog.value = false;
    }).catch((error) => {
      var _a2;
      var _a;
      toast(
        "error",
        "Error al actualizar el equipo",
        (_a2 = (_a = error.data) == null ? void 0 : _a.message) != null ? _a2 : "No se pudo actualizar el equipo. Verifica tu informaci\xF3n e int\xE9ntalo de nuevo."
      );
    });
  };
  const prepareForm2 = () => {
    var _a;
    let form = new FormData();
    for (const key in teamStoreRequest.value) {
      if (key === "team") {
        for (const keyTeam in teamStoreRequest.value.team) {
          if (((_a = teamStoreRequest.value) == null ? void 0 : _a.team[keyTeam]) instanceof File) {
            form.append(
              `team[${keyTeam}]`,
              teamStoreRequest.value.team[keyTeam]
            );
          }
          if (typeof teamStoreRequest.value.team[keyTeam] === "object" && keyTeam === "colors" || keyTeam === "address") {
            form.append(
              `team[${keyTeam}]`,
              JSON.stringify(teamStoreRequest.value.team[keyTeam])
            );
          } else {
            form.append(
              `team[${keyTeam}]`,
              teamStoreRequest.value.team[keyTeam]
            );
          }
        }
      } else if (key === "coach") {
        for (const keyCoach in teamStoreRequest.value.coach) {
          if (teamStoreRequest.value.coach[keyCoach] instanceof File) {
            form.append(
              `coach[${keyCoach}]`,
              teamStoreRequest.value.coach[keyCoach]
            );
          } else {
            form.append(
              `coach[${keyCoach}]`,
              teamStoreRequest.value.coach[keyCoach]
            );
          }
        }
      } else if (key === "president") {
        for (const keyPresident in teamStoreRequest.value.president) {
          if (teamStoreRequest.value.president[keyPresident] instanceof File) {
            form.append(
              `president[${keyPresident}]`,
              teamStoreRequest.value.president[keyPresident]
            );
          } else {
            form.append(
              `president[${keyPresident}]`,
              teamStoreRequest.value.president[keyPresident]
            );
          }
        }
      }
    }
    return form;
  };
  const getTeams = async () => {
    try {
      await client(
        `/api/v1/admin/teams?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`
      ).then(({ data, pagination: _pagination }) => {
        teams.value = data || [];
        pagination.value = { ...pagination.value, ..._pagination };
      });
    } catch (error) {
      console.log(error);
    }
  };
  const searchTeams = (value = "") => {
    const client2 = useSanctumClient();
    client2(
      `/api/v1/admin/teams/search?value=${value}`
    ).then(({ data, pagination: _pagination }) => {
      teams.value = data || [];
      pagination.value = { ...pagination.value, ..._pagination };
    });
  };
  const list = async () => {
    try {
      teams.value = await client("/api/v1/admin/teams/list");
    } catch (error) {
      console.log(error);
    }
  };
  const getTeam = async (id) => {
    try {
      return await client(
        `/api/v1/admin/teams/${id}`
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
    importModal,
    loading,
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    list,
    importTeamsHandler,
    downloadTemplate,
    searchTeams
  };
});
const usePlayerStore = defineStore("playerStore", () => {
  const { toast } = useToast();
  const players = ref([]);
  const dialog = ref(false);
  const search = ref("");
  const isEdition = ref(false);
  const noPlayers = computed(() => players.value.length === 0);
  const playerStoreRequest = ref({});
  const playerId = ref(null);
  const availableTeams = ref([]);
  const pagination = ref({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
    sort: "asc"
  });
  const importModal = ref(false);
  const loading = ref(false);
  const isImporting = ref(false);
  const showAssignTeam = ref(false);
  const downloadTemplate = async () => {
    const client = useSanctumClient();
    loading.value = true;
    await client("/api/v1/admin/players/template", {
      method: "GET"
    }).then((response) => {
      const url = (void 0).URL.createObjectURL(new Blob([response]));
      const link = (void 0).createElement("a");
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      (void 0).body.appendChild(link);
      link.click();
    }).catch((error) => {
      var _a2;
      var _a;
      toast(
        "error",
        "Error al descargar la plantilla",
        (_a2 = (_a = error.data) == null ? void 0 : _a.message) != null ? _a2 : "No se pudo descargar la plantilla. Int\xE9ntalo de nuevo."
      );
    }).finally(() => {
      loading.value = false;
    });
  };
  const updatePlayer = async (id) => {
    console.log(id);
  };
  const createPlayer = async () => {
    const form = prepareForm(playerStoreRequest);
    const client = useSanctumClient();
    await client("/api/v1/admin/players", {
      method: "POST",
      body: form
    }).then(async () => {
      toast(
        "success",
        "Jugador creado",
        "El nuevo jugador se ha agregado exitosamente."
      );
      dialog.value = false;
      await getPlayers();
    }).catch((error) => {
      var _a2;
      var _a, _b;
      console.error((_a = error.data) == null ? void 0 : _a.errors);
      toast(
        "error",
        "Error al crear al jugador",
        (_a2 = (_b = error.data) == null ? void 0 : _b.message) != null ? _a2 : "No se pudo crear al jugador. Verifica tu informaci\xF3n e int\xE9ntalo de nuevo."
      );
    });
  };
  const getPlayers = async () => {
    try {
      const client = useSanctumClient();
      await client(
        `/api/v1/admin/players?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`
      ).then(({ data, pagination: _pagination }) => {
        pagination.value = { ...pagination.value, ..._pagination };
        players.value = data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const importPlayersHandler = async (file, teamId) => {
    isImporting.value = true;
    const client = useSanctumClient();
    const formData = new FormData();
    formData.append("team_id", teamId.toString());
    formData.append("file", file);
    await client("/api/v1/admin/players/import", {
      method: "POST",
      body: formData
    }).then(async () => {
      toast(
        "success",
        "Jugadores importados",
        "Los jugadores han sido importados y registrados exitosamente."
      );
      importModal.value = false;
      await getPlayers();
    }).catch((error) => {
      var _a2;
      var _a, _b;
      console.error((_a = error.data) == null ? void 0 : _a.errors);
      toast(
        "error",
        "Error importar",
        (_a2 = (_b = error.data) == null ? void 0 : _b.message) != null ? _a2 : "No se pudo importar el documento. Verifica su informaci\xF3n e int\xE9ntalo de nuevo."
      );
    }).finally(() => isImporting.value = false);
  };
  const steps = ref({
    current: "basic-info",
    steps: [
      { step: "basic-info", completed: false, label: "Informaci\xF3n b\xE1sica" },
      { step: "details-info", completed: false, label: "Detalles del jugador" },
      {
        step: "contact-info",
        completed: false,
        label: "Informaci\xF3n de contacto"
      }
    ]
  });
  return {
    players,
    dialog,
    search,
    noPlayers,
    isEdition,
    steps,
    playerStoreRequest,
    playerId,
    pagination,
    importModal,
    availableTeams,
    isImporting,
    showAssignTeam,
    updatePlayer,
    createPlayer,
    getPlayers,
    importPlayersHandler,
    downloadTemplate
  };
});
const usePositionsStore = defineStore("positionsStore", () => {
  const positions = ref([]);
  return {
    positions
  };
});
const useDashboardStore = defineStore("dashboardStore", () => {
  const range = ref("lastMonth");
  const teamStats = ref({
    registeredTeams: {
      total: 0,
      current: 0,
      dailyData: [],
      label: "vs \xFAltimo mes"
    },
    activePlayers: {
      total: 0,
      current: 0,
      dailyData: [],
      label: "vs \xFAltimo mes"
    },
    completedGames: {
      total: 0,
      current: 0,
      dailyData: [],
      label: "vs \xFAltimo mes"
    }
  });
  const nextGames = ref([]);
  function byRange() {
    const client = useSanctumClient();
    client(`/api/v1/admin/dashboard/stats?range=${range.value}`).then(
      (response) => {
        teamStats.value.registeredTeams = response.registeredTeams;
        teamStats.value.activePlayers = response.activePlayers;
        teamStats.value.completedGames = response.completedGames;
      }
    );
  }
  function getNextGames() {
    const client = useSanctumClient();
    client("/api/v1/admin/dashboard/next-games").then(({ data }) => {
      nextGames.value = data;
    });
  }
  return {
    teamStats,
    range,
    nextGames,
    byRange,
    getNextGames
  };
});
const useApiError = (error) => {
  var _a;
  return {
    code: (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status,
    message: error.data.message
  };
};
const MAX_SIZE = 2;
const DEFAULT_POSITION = { lat: 16.8639515, lng: -99.8822807 };
const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const phoneRegex = /^\d{10}$/;
const useLocationStore = defineStore("locationStore", () => {
  const stepsCompleted = computed(() => {
    return locationStoreRequest.value.availability.filter((item) => item.isCompleted).length;
  });
  const isAllStepsCompleted = computed(() => {
    return locationStoreRequest.value.availability.every((item) => item.isCompleted) && locationStoreRequest.value.completed || formSteps.value.current === "location" && locationStoreRequest.value.completed || isEdition.value;
  });
  const locations = ref();
  const locationStoreRequest = ref({
    name: "",
    city: "",
    address: "",
    autocomplete_prediction: {},
    tags: [],
    availability: [],
    fields_count: 0,
    position: DEFAULT_POSITION
  });
  const locationDialog = ref(false);
  const isEdition = ref(false);
  const locationCard = ref({});
  const locationToDelete = ref({
    id: null,
    show: false
  });
  const pagination = ref({
    currentPage: 1,
    perPage: 8,
    lastPage: 1,
    total: 0,
    sort: "asc"
  });
  const formSteps = ref({
    current: "location",
    steps: [
      {
        step: "location",
        completed: false,
        label: "Ubicaci\xF3n"
      },
      {
        step: "availability",
        completed: false,
        label: "Disponibilidad"
      }
    ]
  });
  const $reset = () => {
    resetLocationStoreRequest();
    locationDialog.value = false;
    isEdition.value = false;
    locationCard.value = {};
    locationToDelete.value = { id: null, show: false };
    pagination.value = {
      currentPage: 1,
      perPage: 8,
      lastPage: 1,
      total: 0,
      sort: "asc"
    };
    locations.value = [];
  };
  async function reloadLocations() {
    pagination.value = {
      currentPage: 1,
      perPage: 8,
      lastPage: 1,
      total: 0,
      sort: "asc"
    };
    await getLocations();
  }
  function resetLocationStoreRequest() {
    locationStoreRequest.value = {
      name: "",
      city: "",
      address: "",
      autocomplete_prediction: {},
      tags: [],
      availability: [],
      fields_count: 0,
      position: DEFAULT_POSITION,
      completed: false
    };
  }
  async function getLocations(search) {
    const client = useSanctumClient();
    const url = `/api/v1/admin/locations?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`;
    await client(
      url + (search ? `&search=${search}` : "")
    ).then(({ data, meta }) => {
      pagination.value = {
        currentPage: meta.current_page,
        lastPage: meta.last_page,
        perPage: meta.per_page,
        total: meta.total,
        sort: pagination.value.sort
      };
      if (pagination.value.currentPage > 1) {
        locations.value = [...locations.value, ...data];
      } else {
        locations.value = data;
        console.log(locations.value);
      }
    });
  }
  async function storeLocation() {
    const client = useSanctumClient();
    await client("/api/v1/admin/locations", {
      method: "POST",
      body: locationStoreRequest.value
    }).then(async (location) => {
      var _a;
      (_a = locations.value) == null ? void 0 : _a.splice(0, 0, location);
      await reloadLocations();
      const { toast } = useToast();
      toast(
        "success",
        "Ubicaci\xF3n creada",
        "La  nueva ubicaci\xF3n se ha agregado exitosamente."
      );
      locationDialog.value = false;
    }).catch((error) => {
      const { message } = useApiError(error);
      const { toast } = useToast();
      toast(
        "error",
        "Error al crear la ubicaci\xF3n",
        message != null ? message : "Ocurri\xF3 un error al intentar crear la ubicaci\xF3n."
      );
    });
  }
  async function updateLocation() {
    var _a;
    const client = useSanctumClient();
    await client(`/api/v1/admin/locations/${(_a = locationCard.value) == null ? void 0 : _a.id}`, {
      method: "PUT",
      body: locationStoreRequest.value
    }).then(async () => {
      await reloadLocations();
      const { toast } = useToast();
      toast(
        "success",
        "Ubicaci\xF3n actualizada",
        "La ubicaci\xF3n se ha actualizado exitosamente."
      );
      locationDialog.value = false;
    });
  }
  async function deleteLocation() {
    const client = useSanctumClient();
    await client(`/api/v1/admin/locations/${locationToDelete.value.id}`, {
      method: "DELETE"
    }).then(
      async () => {
        var _a;
        await getLocations();
        const { toast } = useToast();
        toast(
          "success",
          "Ubicaci\xF3n eliminada",
          "La ubicaci\xF3n se ha eliminado exitosamente."
        );
        locations.value = (_a = locations.value) == null ? void 0 : _a.filter((location) => location.id !== locationToDelete.value.id);
        locationToDelete.value.show = false;
        locationToDelete.value.id = null;
      }
    );
  }
  const noLocations = computed(
    () => !locations.value || locations.value.length === 0
  );
  return {
    locations,
    locationStoreRequest,
    locationDialog,
    noLocations,
    isEdition,
    locationCard,
    locationToDelete,
    pagination,
    formSteps,
    stepsCompleted,
    isAllStepsCompleted,
    deleteLocation,
    storeLocation,
    updateLocation,
    getLocations,
    resetLocationStoreRequest,
    reloadLocations,
    $reset
  };
});
const useLeaguesStore = defineStore("leaguesStore", () => {
  const leagues = ref([]);
  const footballTypes = ref([]);
  const fetchLeagues = async () => {
    const client = useSanctumClient();
    leagues.value = await client("/api/v1/admin/leagues");
  };
  const getFootballTypes = async () => {
    const client = useSanctumClient();
    footballTypes.value = await client("/api/v1/admin/leagues/football/types");
  };
  const getLeagueLocations = async () => {
    const client = useSanctumClient();
    return await client(
      "/api/v1/admin/leagues/locations"
    );
  };
  return {
    leagues,
    getFootballTypes,
    fetchLeagues,
    footballTypes,
    getLeagueLocations
  };
});
const useCategoryStore = defineStore("categoryStore", () => {
  const categories = ref([]);
  const formats = ref([]);
  const fetchCategories = async () => {
    const client = useSanctumClient();
    categories.value = await client("/api/v1/admin/categories");
  };
  const fetchFormats = async () => {
    const client = useSanctumClient();
    formats.value = await client("/api/v1/admin/tournaments/formats");
  };
  return {
    categories,
    formats,
    fetchFormats,
    fetchCategories
  };
});
const useScheduleStore = defineStore("scheduleStore", () => {
  const tournamentStore = useTournamentStore();
  const scheduleDialog = ref(false);
  const scheduleParams = ref();
  const daysToPlay = ref([
    {
      days: [
        "lunes",
        "martes",
        "mi\xE9rcoles",
        "jueves",
        "viernes",
        "s\xE1bado",
        "domingo"
      ],
      key: "all-days",
      text: "Toda la semana"
    },
    {
      days: ["viernes", "s\xE1bado", "domingo"],
      key: "weekend-days",
      text: "Viernes | S\xE1bado | Domingo"
    },
    { days: ["s\xE1bado", "domingo"], key: "weekend", text: "S\xE1bado | Domingo" },
    { days: ["domingo"], key: "sunday", text: "Domingo" },
    { days: [], key: "other", text: "Otro" }
  ]);
  const daysToPlaySelected = ref();
  const daysToPlayCustomSelected = ref();
  const schedules = ref({
    rounds: [],
    tournament: {}
  });
  const noSchedules = computed(() => {
    var _a, _b;
    return ((_b = (_a = schedules.value) == null ? void 0 : _a.rounds) == null ? void 0 : _b.length) === 0;
  });
  const isLoadingSchedules = ref(false);
  const schedulePagination = ref({
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    total: 0,
    sort: "asc",
    filterBy: void 0,
    search: void 0
  });
  const scheduleSettings = ref({
    start_date: /* @__PURE__ */ new Date(),
    end_date: null,
    round_trip: false,
    elimination_round_trip: true,
    game_time: 0,
    min_teams: 0,
    max_teams: 0,
    time_between_games: 0,
    teams: 0,
    format: {},
    footballType: {},
    locations: [],
    tiebreakers: [],
    phases: []
  });
  const scheduleStoreRequest = ref({
    general: {},
    regular_phase: {},
    elimination_phase: {},
    fields_phase: []
  });
  const calendarSteps = ref({
    current: "general",
    steps: [
      {
        step: "general",
        completed: false,
        label: "General"
      },
      {
        step: "regular",
        completed: false,
        label: "Fase Regular"
      },
      {
        step: "elimination",
        completed: false,
        label: "Fase de Eliminaci\xF3n"
      },
      {
        step: "fields",
        completed: false,
        label: "Campos de juego"
      }
    ]
  });
  const scheduleRoundStatus = ref([
    { value: "programado", text: "Programada" },
    { value: "en_progreso", text: "En progreso" },
    { value: "completado", text: "Completada" },
    { value: "cancelado", text: "Cancelada" }
  ]);
  const getMatch = async (matchId, fieldId, date) => {
    const client = useSanctumClient();
    return await client(`/api/v1/admin/games/${matchId}?date=${date}&field_id=${fieldId}`);
  };
  const $resetScheduleStore = () => {
    scheduleDialog.value = false;
    scheduleParams.value = void 0;
    daysToPlaySelected.value = void 0;
    daysToPlayCustomSelected.value = void 0;
    schedules.value = {
      rounds: [],
      tournament: {}
    };
    isLoadingSchedules.value = false;
    schedulePagination.value = {
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
      total: 0,
      sort: "asc",
      filterBy: void 0,
      search: void 0
    };
    scheduleSettings.value = {
      start_date: /* @__PURE__ */ new Date(),
      end_date: null,
      round_trip: false,
      elimination_round_trip: true,
      game_time: 0,
      min_teams: 0,
      max_teams: 0,
      time_between_games: 0,
      teams: 0,
      format: {},
      footballType: {},
      locations: [],
      tiebreakers: [],
      phases: []
    };
    scheduleStoreRequest.value = {
      general: {},
      regular_phase: {},
      elimination_phase: {},
      fields_phase: []
    };
    calendarSteps.value = {
      current: "general",
      steps: [
        {
          step: "general",
          completed: false,
          label: "General"
        },
        {
          step: "regular",
          completed: false,
          label: "Fase Regular"
        },
        {
          step: "elimination",
          completed: false,
          label: "Fase de Eliminaci\xF3n"
        },
        {
          step: "fields",
          completed: false,
          label: "Campos de juego"
        }
      ]
    };
  };
  const getTournamentSchedules = async () => {
    var _a;
    isLoadingSchedules.value = true;
    const client = useSanctumClient();
    let url = `/api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule?page=${schedulePagination.value.currentPage}`;
    if (schedulePagination.value.filterBy) {
      url += `&filterBy=${schedulePagination.value.filterBy}`;
    }
    if (schedulePagination.value.search) {
      url += `&search=${schedulePagination.value.search}`;
    }
    const response = await client(url);
    const newRounds = (_a = response.rounds) != null ? _a : [];
    if (!schedules.value.rounds.length) {
      schedules.value.rounds = [];
    }
    schedules.value.tournament = response.tournament;
    schedules.value.rounds.push(...newRounds);
    schedulePagination.value.currentPage += 1;
    schedulePagination.value.lastPage = response.pagination.total_rounds;
    isLoadingSchedules.value = false;
  };
  const fetchSchedule = async () => {
    isLoadingSchedules.value = true;
    const client = useSanctumClient();
    schedules.value = await client(
      `/api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule?page=${schedulePagination.value.currentPage}`
    ).finally(() => {
      isLoadingSchedules.value = false;
    });
  };
  const updateStatusGame = async (roundId, status, tournamentId) => {
    const client = useSanctumClient();
    await client(
      `api/v1/admin/tournaments/${tournamentId}/schedule/rounds/${roundId}`,
      {
        method: "PUT",
        body: {
          status
        }
      }
    );
  };
  const generateSchedule = async () => {
    const client = useSanctumClient();
    return await client(
      `/api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule`,
      {
        method: "POST",
        body: JSON.stringify(scheduleStoreRequest.value)
      }
    );
  };
  const settingsSchedule = async () => {
    const client = useSanctumClient();
    const { data } = await useAsyncData(
      "tournament-settings",
      () => client(
        `api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule/settings`
      )
    );
    const generalSchedule = {};
    generalSchedule.tournament_id = tournamentStore.tournamentId;
    generalSchedule.tournament_format_id = data.value.format.id;
    generalSchedule.football_type_id = data.value.footballType.id;
    generalSchedule.start_date = data.value.start_date;
    generalSchedule.game_time = data.value.game_time;
    generalSchedule.time_between_games = data.value.time_between_games;
    generalSchedule.total_teams = data.value.teams;
    generalSchedule.locations = [];
    scheduleStoreRequest.value.general = generalSchedule;
    scheduleStoreRequest.value.regular_phase = {
      round_trip: data.value.round_trip,
      tiebreakers: data.value.tiebreakers
    };
    scheduleStoreRequest.value.elimination_phase = {
      teams_to_next_round: 8,
      round_trip: false,
      phases: data.value.phases
    };
    scheduleSettings.value = data.value;
  };
  return {
    scheduleDialog,
    daysToPlay,
    scheduleParams,
    daysToPlayCustomSelected,
    daysToPlaySelected,
    schedules,
    noSchedules,
    schedulePagination,
    scheduleSettings,
    isLoadingSchedules,
    scheduleRoundStatus,
    calendarSteps,
    scheduleStoreRequest,
    updateStatusGame,
    getTournamentSchedules,
    fetchSchedule,
    generateSchedule,
    settingsSchedule,
    $resetScheduleStore,
    getMatch
  };
});

export { MAX_SIZE as M, useTeamStore as a, useAuthStore as b, useApiError as c, useLocationStore as d, useTournamentStore as e, usePlayerStore as f, useCategoryStore as g, usePositionsStore as h, useLeaguesStore as i, useScheduleStore as j, useGlobalStore as k, phoneRegex as p, specialCharacters as s, useDashboardStore as u };
//# sourceMappingURL=useScheduleStore-DBhAIDF3.mjs.map
