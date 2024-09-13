import { defineStore } from "pinia";
import type { Tournament, TournamentForm } from "~/models/tournament";
import type { Game } from "~/models/Game";
import { useGlobalStore } from "~/store/useGlobalStore";

export const useTournamentStore = defineStore("tournamentStore", () => {
  const tournament = ref<Tournament | null>(null);
  const tournaments = ref<Tournament[]>([]);
  const nextGames = ref<Game[]>([
    {
      id: 1,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: null,
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 2,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 3,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 4,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 5,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 6,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 7,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 8,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 9,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 10,
      away: {
        name: "Cruz azul",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
  ]);
  const currentGames = ref<Game[]>([
    {
      id: 1,
      away: {
        name: "Chivas",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Monterrey",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: null,
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 2,
      away: {
        name: "Pachuca",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "Tigres",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 3,
      away: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "America",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 4,
      away: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "America",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 5,
      away: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "America",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
    {
      id: 6,
      away: {
        name: "Santos",
        img: "https://ui-avatars.com/api/?name=Cruz azul",
      },
      home: {
        name: "America",
        img: "https://ui-avatars.com/api/?name=Santos",
      },
      result: "1-0",
      schedule: {
        day: "Sab. 9/3",
        hour: "19:00",
      },
    },
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
  const tournamentId = ref<number | null>(null);
  const tournamentToEdit = ref({} as TournamentForm);
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 0,
  });
  async function loadTournaments() {
    loading.value = true;
    const client = useSanctumClient();
    const { data, meta } = await client(
      `/api/v1/admin/tournaments?per_page=${pagination.value.perPage}&page=${pagination.value.page}`,
    );
    tournaments.value = data?.tournaments || [];
    tournament.value = tournaments.value[0] || null;
    categories.value = data?.categories || [];
    pagination.value = {
      page: meta.current_page,
      perPage: meta.per_page,
      total: meta.last_page,
    };
    loading.value = false;
  }
  async function storeTournament(formData) {
    return await useSanctumClient()("api/v1/admin/tournaments", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        return response;
      })
      .catch((error) => {
        useGlobalStore().showErrorNotification({ message: error.data.message });
      });
  }
  async function updateTournament(tournamentId, formData) {
    return await useSanctumClient()(
      `api/v1/admin/tournaments/${tournamentId}`,
      {
        method: "PUT",
        body: formData,
      },
    )
      .then(async (response) => {
        return response;
      })
      .catch((error) => {
        useGlobalStore().showErrorNotification({ message: error.data.message });
      });
  }
  async function storeCategory(formData) {
    const client = useSanctumClient();
    await useAsyncData("store-category", async () => {
      return await client("api/v1/admin/categories", {
        method: "POST",
        body: formData,
      });
    }).then(async () => {
      await loadTournaments();
      // todo add toast alert
    });
  }
  async function fetchTournamentsByLeagueId(id: number) {
    const client = useSanctumClient();
    const { data } = await client(`/api/v1/admin/leagues/${id}/tournaments`);
    tournaments.value = data || [];
    // todo revisar la manera en la que contamos el teamcoutn y machesByRound
    // creo deberia ser un computed que se actualice cuando cambie el valor de tournaments

    // console.log({tournaments:tournaments.value })
    // teamsCount.value = data.teams_count || 0;
    // const test = teamsCount.value / 2 ;
    // matchesByRound.value = teamsCount.value / 2 ;
    // console.log( matchesByRound.value, 2222222)
  }
  async function updateTournamentStatus(tournamentId: number, status: string) {
    const client = useSanctumClient();
    await client(`api/v1/admin/tournaments/${tournamentId}/status`, {
      method: "PUT",
      body: { status },
    }).then(async () => {
      await loadTournaments();
    });
  }
  async function getTournamentTypes() {
    const client = useSanctumClient();
    tournamentTypes.value = await client("/api/v1/admin/tournaments/types");
  }

  async function markAsCompleted() {
    const client = useSanctumClient();

    return await client(
      `api/v1/admin/tournaments/${tournamentId.value}/mark-as-completed`,
      {
        method: "PUT",
        body: { tournament_id: tournamentId.value },
      },
    );
  }
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
    loadTournaments,
    storeTournament,
    storeCategory,
    fetchTournamentsByLeagueId,
    getTournamentTypes,
    updateTournament,
    loading,
    tournamentTypes,
    dialog,
    isEdition,
    tournamentId,
    tournamentToEdit,
    updateTournamentStatus,
    pagination,
    markAsCompleted,
  };
});
