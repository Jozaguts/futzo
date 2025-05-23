import { defineStore } from 'pinia';
import type {
  CalendarStoreRequest,
  FormSteps,
  Tournament,
  TournamentForm,
  TournamentLocation,
  TournamentLocationStoreRequest,
  TournamentStoreRequest,
  TournamentStatus,
} from '~/models/tournament';
import type { Game } from '~/models/Game';
import type { User } from '~/models/user';
import prepareForm from '~/utils/prepareFormData';
import type { IPagination } from '~/interfaces';

export const useTournamentStore = defineStore('tournamentStore', () => {
  const tournament = ref<Tournament>({} as Tournament);
  const tournaments = ref<Tournament[]>([]);
  const noTournaments = computed(() => !tournaments.value.length);
  const search = ref('');
  const calendarDialog = ref(false);
  const tournamentStoreRequest = ref({} as TournamentStoreRequest);
  const calendarStoreRequest = ref({} as CalendarStoreRequest);
  const steps = ref<FormSteps>({
    current: 'basic-info',
    steps: [
      {
        step: 'basic-info',
        completed: false,
        label: 'Crea un torneo',
      },
      {
        step: 'details-info',
        completed: false,
        label: 'Detalles del torneo',
      },
    ],
  });
  const nextGames = ref<Game[]>([
    {
      id: 1,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: null,
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 2,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 3,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 4,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 5,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 6,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 7,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 8,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 9,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 10,
      away: {
        name: 'Cruz azul',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
  ]);
  const currentGames = ref<Game[]>([
    {
      id: 1,
      away: {
        name: 'Chivas',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Monterrey',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: null,
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 2,
      away: {
        name: 'Pachuca',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'Tigres',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 3,
      away: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'America',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 4,
      away: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'America',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 5,
      away: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'America',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
      },
    },
    {
      id: 6,
      away: {
        name: 'Santos',
        img: 'https://ui-avatars.com/api/?name=Cruz azul',
      },
      home: {
        name: 'America',
        img: 'https://ui-avatars.com/api/?name=Santos',
      },
      result: '1-0',
      schedule: {
        day: 'Sab. 9/3',
        hour: '19:00',
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
  const isCalendarEdition = ref(false);
  const tournamentId = ref<number>();
  const tournamentToEdit = ref({} as TournamentForm);
  const pagination = ref<IPagination>({
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    total: 0,
    sort: 'asc',
  });

  const tournamentsInCreatedState = computed(() => {
    return tournaments.value.filter(
      (tournament) => tournament.status === 'creado'
    );
  });

  const tournamentLocations = ref<TournamentLocation[]>(
    [] as TournamentLocation[]
  );
  const tournamentLocationStoreRequest = ref<TournamentLocationStoreRequest>();
  const selectedLocations = ref<TournamentLocation[]>([]);
  const selectedLocationsHasError = ref(false);

  function $reset() {
    tournamentStoreRequest.value = {} as TournamentStoreRequest;
    steps.value.current = 'basic-info';
    steps.value.steps.map((step) => (step.completed = false));
    isEdition.value = false;
    tournamentId.value = undefined;
  }

  async function tournamentFields($tournamentId: number) {
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
    )
      .then(({ data, pagination: _pagination }) => {
        tournaments.value = data || [];
        pagination.value = { ...pagination.value, ..._pagination };
      })
      .finally(() => (loading.value = false));
  }

  async function storeTournament() {
    const form = prepareForm(tournamentStoreRequest);
    return await useSanctumClient()('api/v1/admin/tournaments', {
      method: 'POST',
      body: form,
    })
      .then(async (response) => {
        await loadTournaments();
        useToast().toast(
          'success',
          'Torneo Creado',
          'El nuevo torneo se ha creado exitosamente.'
        );
        dialog.value = false;
        $reset();
        return response;
      })
      .catch(() => {
        useToast().toast(
          'error',
          'Error al Crear Torneo',
          'No se pudo crear el torneo. Por favor, intenta nuevamente.'
        );
      });
  }

  async function updateTournament() {
    const form = prepareForm(tournamentStoreRequest);
    return await useSanctumClient()(
      `api/v1/admin/tournaments/${tournamentId}`,
      {
        method: 'PUT',
        body: form,
      }
    )
      .then(async (response) => {
        return response;
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  async function fetchTournamentsByLeagueId(leagueId?: number) {
    const client = useSanctumClient();
    const user = useSanctumUser<User>();
    if (!leagueId) {
      leagueId = user.value?.league?.id;
    }
    const { data } = await client(
      `api/v1/admin/leagues/${leagueId}/tournaments`
    );
    tournaments.value = data || [];
    // todo revisar la manera en la que contamos el teamCount y machesByRound
    // creo debería ser un computed que se actualice cuando cambie el valor de tournaments

    // console.log({tournaments:tournaments.value })
    // teamsCount.value = data.teams_count || 0;
    // const test = teamsCount.value / 2 ;
    // matchesByRound.value = teamsCount.value / 2 ;

    // console.log( matchesByRound.value, 2222222)
  }

  async function updateTournamentStatus(status: TournamentStatus) {
    const client = useSanctumClient();
    await client(`api/v1/admin/tournaments/${tournamentId.value}/status`, {
      method: 'PUT',
      body: { status },
    }).then(async () => {
      await loadTournaments();
    });
  }

  async function markAsCompleted() {
    const client = useSanctumClient();

    return await client(
      `api/v1/admin/tournaments/${tournamentId.value}/mark-as-completed`,
      {
        method: 'PUT',
        body: { tournament_id: tournamentId.value },
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
      method: 'POST',
      body: tournamentLocationStoreRequest.value,
    }).then(async () => {
      useToast().toast(
        'success',
        'Ubicación del torneo',
        'La Ubicación del torneo ha sido agregada correctamente.'
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
    tournamentFields,
  };
});
