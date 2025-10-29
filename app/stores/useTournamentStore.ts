import type {
  CalendarStoreRequest,
  FormSteps,
  Tournament,
  TournamentForm,
  TournamentLocation,
  TournamentLocationStoreRequest,
  TournamentStoreRequest,
  TournamentStatus,
  TournamentStats,
  ExportType,
  DetailsInfoForm,
  BasicInfoForm,
} from '~/models/tournament';
import type { Game } from '~/models/Game';
import type { User } from '~/models/User';
import prepareForm from '~/utils/prepareFormData';
import type { IPagination } from '~/interfaces';
import * as tournamentAPI from '~/http/api/tournament';
import type { Field } from '~/models/Schedule';
import type { CreateTeamForm } from '~/models/Team';
import { defineStore } from 'pinia';
import {
  storeToRefs,
  useCategoryStore,
  useOnboardingStore,
  useSanctumClient,
  useSanctumUser,
  useTeamStore,
  useToast,
} from '#imports';

export const useTournamentStore = defineStore('tournamentStore', () => {
  const INIT_STEPS: FormSteps = {
    current: 'basicInfo',
    steps: {
      basicInfo: {
        number: 1,
        completed: false,
        label: 'Crea un torneo',
        disable: true,
        back_step: 'close',
        next_step: 'detailsInfo',
        back_label: 'Cancelar',
        next_label: 'Siguiente',
      },
      detailsInfo: {
        completed: false,
        number: 2,
        label: 'Detalles del torneo',
        disable: false,
        back_step: 'basicInfo',
        next_step: 'save',
        back_label: 'Cancelar',
        next_label: 'Crear torneo',
      },
    },
  };
  const tournament = ref<Tournament>({} as Tournament);
  const tournaments = ref<Tournament[]>([]);
  const noTournaments = computed(() => !tournaments.value.length);
  const search = ref('');
  const statusFilters = ref<TournamentStatus[]>([]);
  const calendarDialog = ref(false);
  const tournamentStoreRequest = ref<TournamentStoreRequest>({
    basic: {} as BasicInfoForm,
    details: {
      description: '',
      location_ids: [],
      penalty_draw_enabled: false,
    } as DetailsInfoForm,
  });
  const calendarStoreRequest = ref({} as CalendarStoreRequest);
  const dialog = ref(false);
  const steps = ref<FormSteps>(INIT_STEPS);
  const nextGames = ref<Game[]>([] as Game[]);
  const currentGames = ref<Game[]>([] as Game[]);
  const categories = ref([]);
  const teamsCount = ref(0);
  const roundsCount = ref(0);
  const matchesCount = ref(0);
  const matchesByRound = ref(0);
  const loading = ref(false);
  const tournamentTypes = ref();
  const isEdition = ref(false);
  const isCalendarEdition = ref(false);
  const tournamentId = ref<number>();
  const tournamentToEdit = ref({} as TournamentForm);
  const pagination = ref<IPagination>({
    current_page: 1,
    per_page: 10,
    last_page: 1,
    total: 0,
    sort: 'asc',
  });
  const tournamentsInCreatedState = computed(() => {
    return tournaments.value.filter((tournament) => tournament.status === 'creado');
  });
  const tournamentLocations = ref<TournamentLocation[]>([] as TournamentLocation[]);
  const tournamentLocationStoreRequest = ref<TournamentLocationStoreRequest>();
  const selectedLocations = ref<TournamentLocation[]>([]);
  const selectedLocationsHasError = ref(false);
  const standings = ref();
  const groupStanding = ref();
  const tournamentStats = ref<TournamentStats>({
    goals: [],
    assistance: [],
    yellow_cards: [],
    red_cards: [],
  });
  const lastResults = ref();

  function $reset() {
    tournamentStoreRequest.value = {
      basic: {} as BasicInfoForm,
      details: {
        description: '',
        location_ids: [],
        penalty_draw_enabled: false,
      } as DetailsInfoForm,
    };
    steps.value.current = 'basicInfo';
    steps.value = INIT_STEPS;
    isEdition.value = false;
    tournamentId.value = undefined;
  }

  async function tournamentFields($tournamentId: number) {
    const client = useSanctumClient();
    const { data } = await client<{ data: Field[] }>(`api/v1/admin/tournaments/${$tournamentId}/fields`);
    return data;
  }

  async function loadTournaments() {
    loading.value = true;
    const client = useSanctumClient();
    const params = new URLSearchParams({
      per_page: String(pagination.value.per_page),
      page: String(pagination.value.current_page),
    });
    if (search.value) {
      params.set('search', search.value);
    }
    if (statusFilters.value.length) {
      statusFilters.value.forEach((status) => params.append('status[]', status));
    }
    try {
      const response = await client<{ data: Tournament[]; meta: IPagination }>(
        `/api/v1/admin/tournaments?${params.toString()}`
      );
      tournaments.value = response.data;
      pagination.value = { ...pagination.value, ...response?.meta };
    } finally {
      loading.value = false;
    }
  }
  async function applyStatusFilter(statuses?: TournamentStatus[]) {
    statusFilters.value = Array.isArray(statuses) ? [...statuses] : [];
    pagination.value.current_page = 1;
    await loadTournaments();
  }

  async function storeTournament() {
    const form = prepareForm(tournamentStoreRequest);
    return await useSanctumClient()('api/v1/admin/tournaments', {
      method: 'POST',
      body: form,
    })
      .then(async (response) => {
        await loadTournaments();
        useToast().toast({
          type: 'success',
          msg: 'Torneo Creado',
          description: 'El nuevo torneo se ha creado exitosamente.',
        });
        dialog.value = false;
        $reset();
        return response;
      })
      .catch(() => {
        useToast().toast({
          type: 'error',
          msg: 'Error al Crear Torneo',
          description: 'No se pudo crear el torneo. Por favor, intenta nuevamente.',
        });
      });
  }

  async function updateTournament() {
    const form = prepareForm(tournamentStoreRequest);
    return await useSanctumClient()(`api/v1/admin/tournaments/${tournamentId}`, {
      method: 'PUT',
      body: form,
    })
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
    const { data } = await client<{ data: Tournament[] }>(`api/v1/admin/leagues/${leagueId}/tournaments`);
    tournaments.value = data || [];
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

    return await client(`api/v1/admin/tournaments/${tournamentId.value}/mark-as-completed`, {
      method: 'PUT',
      body: { tournament_id: tournamentId.value },
    });
  }

  const getTournamentLocations = async () => {
    const client = useSanctumClient();
    tournamentLocations.value = await client<TournamentLocation[]>(
      `/api/v1/admin/tournaments/${tournamentId.value}/locations`
    );
  };
  const storeTournamentLocation = async () => {
    const client = useSanctumClient();
    await client(`/api/v1/admin/tournaments/${tournamentId.value}/locations`, {
      method: 'POST',
      body: tournamentLocationStoreRequest.value,
    })
      .then(async () => {
        await getTournamentLocations();
        await useOnboardingStore().refresh();
      })
      .then(() => {
        useToast().toast({
          type: 'success',
          msg: 'Ubicación del torneo',
          description: 'La Ubicación del torneo ha sido agregada correctamente.',
        });
      });
  };
  const getStandings = async () => {
    standings.value = await tournamentAPI.getStandings(tournamentId.value as number);
    if (tournament.value.format.name === 'Grupos y Eliminatoria') {
      groupStanding.value = await tournamentAPI.getGroupStanding(tournamentId.value as number);
    }
  };
  const getTournamentBySlug = async (slug: string) => {
    const data = await tournamentAPI.getBySlug(slug);
    tournament.value = data;
    tournamentId.value = data.id as number;
  };
  const getTournamentStats = async () => {
    tournamentStats.value = await tournamentAPI.getTournamentStats(tournamentId.value as number);
  };
  const getLastResults = async () => {
    lastResults.value = await tournamentAPI.getLastResults(tournamentId.value as number);
  };
  const getNextGames = async () => {
    nextGames.value = await tournamentAPI.getNextGames(tournamentId.value as number);
  };
  const exportStandingTournament = async (type: ExportType) => {
    await tournamentAPI.exportStandingTournament(type, tournament.value);
  };
  const exportTournamentStatsTables = async (type: ExportType) => {
    await tournamentAPI.exportTournamentStatsTables(type, tournament.value);
  };
  const initPreRegister = async (slug: string) => {
    const { teamStoreRequest } = storeToRefs(useTeamStore());
    const { categories } = storeToRefs(useCategoryStore());
    const response = await tournamentAPI.initPreRegister(slug);
    tournament.value = response.tournament;
    tournaments.value = [response.tournament];
    categories.value = [response.category];
    teamStoreRequest.value.team = {
      category_id: response.category.id,
      tournament_id: response.tournament.id,
    } as CreateTeamForm;
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
    noTournaments,
    search,
    statusFilters,
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
    standings,
    tournamentStats,
    lastResults,
    groupStanding,
    getTournamentLocations,
    loadTournaments,
    applyStatusFilter,
    storeTournament,
    fetchTournamentsByLeagueId,
    $reset,
    updateTournament,
    storeTournamentLocation,
    updateTournamentStatus,
    tournamentFields,
    getStandings,
    getTournamentBySlug,
    getTournamentStats,
    getLastResults,
    getNextGames,
    exportStandingTournament,
    exportTournamentStatsTables,
    initPreRegister,
  };
});
