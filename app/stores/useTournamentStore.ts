import type {
    BasicInfoForm,
    CalendarStoreRequest,
    DetailsInfoForm,
    ExportType,
    FormSteps,
    Tournament,
    TournamentForm,
    TournamentKpiMetric,
    TournamentListKpis,
    TournamentLocation,
    TournamentLocationStoreRequest,
    TournamentStats,
    TournamentStatus,
    TournamentStoreRequest,
    TournamentSummary,
} from '~/models/tournament';
import type {Game} from '~/models/Game';
import type {User} from '~/models/User';
import prepareForm from '~/utils/prepareFormData';
import type {IPagination} from '~/interfaces';
import * as tournamentAPI from '~/http/api/tournament';
import type {Field} from '~/models/Schedule';
import type {CreateTeamForm} from '~/models/Team';
import {defineStore, skipHydrate} from 'pinia';
import {
    storeToRefs,
    useCategoryStore,
    useOnboardingStore,
    useSanctumClient,
    useSanctumUser,
    useTeamStore,
    useToast,
} from '#imports';
import type {TourStep} from '#nuxt-tour/props';
import {useTourController} from '~/composables/useTourController';
import {ga4Event} from '~/utils/ga4';

// @ts-ignore
export const useTournamentStore = defineStore('tournamentStore', () => {
  const KPI_RANGE = 'lastMonth' as const;
  const DEFAULT_KPI_LABEL = 'vs último mes';

  const createZeroKpi = () => ({
    total: 0,
    current: 0,
    dailyData: [] as number[],
    label: DEFAULT_KPI_LABEL,
  });

  const createDefaultListKpis = (): TournamentListKpis => ({
    tournamentsCreated: createZeroKpi(),
    teamsRegistered: createZeroKpi(),
    playersRegistered: createZeroKpi(),
    matchesPlayed: createZeroKpi(),
  });

  const normalizeKpi = (metric?: Partial<TournamentKpiMetric>) => ({
    total: Number(metric?.total ?? 0),
    current: Number(metric?.current ?? 0),
    dailyData: Array.isArray(metric?.dailyData) ? metric?.dailyData.map((value) => Number(value ?? 0)) : [],
    label: metric?.label || DEFAULT_KPI_LABEL,
  });

  const normalizeListKpis = (kpis?: Partial<TournamentListKpis>): TournamentListKpis => ({
    tournamentsCreated: normalizeKpi(kpis?.tournamentsCreated),
    teamsRegistered: normalizeKpi(kpis?.teamsRegistered),
    playersRegistered: normalizeKpi(kpis?.playersRegistered),
    matchesPlayed: normalizeKpi(kpis?.matchesPlayed),
  });

  // @ts-ignore
  const { registerTourRef, startTour, resetTour, recalculateTour } = useTourController();
  const tourSteps = ref<TourStep[]>([
    {
      title: "Crea tu primer torneo",
      subText: "Define el formato y Futzo se encarga del calendario y los partidos.",
      slot: "torneos",
      target: '.tournament-primary-btn',
      onNext: () =>{
       dialog.value = true
      },
    },
    {
      title: "Configura tu torneo",
      subText: "Estos datos permiten que Futzo programe partidos y aplique las reglas correctas.",
      slot: "torneos",
    },
    {
      title: "Nombre del torneo",
      subText: "Identifica tu torneo. Ejemplo: ‘Apertura 2026",
      slot: "torneos",
      target: '#tournament-name',
    },
    {
      title: "Fecha de inicio",
      subText: "La fecha desde la que Futzo organiza el calendario.",
      slot: "torneos",
      target: '#tournament-date',
    },
    {
      title: "Formato del torneo",
      subText: "Define cómo se juega (liga, liga y eliminatoria, etc.)",
      slot: "torneos",
      target: '#tournament-format',
    },
    {
      title: "Tipo de torneo",
      subText: "Establece las reglas principales del torneo según tu formato, 11 vs 11 o 7 vs 7",
      slot: "torneos",
      target: '#tournament-type',
    },
    {
      title: "Categoría",
      subText: "Clasifica el torneo: amateur, infantil, veteranos, etc",
      slot: "torneos",
      target: '#tournament-category',
    },
    {
      title: "Mínimo y maximo de equipos",
      subText: "Cantidad mínima para iniciar el torneo y maxima para registrar.",
      slot: "torneos",
      target: '#tournament-min-max',
    },
    {
      title: "Cambios permitidos",
      subText: "Número de sustituciones permitidas por partido",
      slot: "torneos",
      target: '#tournament-substitutions',
      onNext: () =>{
        steps.value.current = 'detailsInfo';
      },
    },
    {
      title: "Ubicaciones del torneo",
      subText: "No es obligatorio. Selecciona las canchas disponibles y Futzo las usará para programar los partidos; también puedes hacerlo sin campo asignado.",
      slot: "torneos",
      target: '#tournament-location',
    },
    {
      title: "Regla de desempate por penales",
      subText: "Si un partido termina empatado, se define por penales: ganador: 2 puntos · perdedor: 1 punto.",
      slot: "torneos",
      target: '#tournament-rule',
      onNext: () =>{
        dialog.value = false
        steps.value.current = 'basicInfo'
      },
    },
    {
      title: 'Listo',
      subText: 'El equipo fue creado. Ahora puedes registrar jugadores o continuar con el torneo.',
      slot: 'equipos',
      target: 'body',
    },
  ])
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
  const formatFilter = ref<string | null>(null);
  const summary = ref<TournamentSummary>({
    total: 0,
    active: 0,
    upcoming: 0,
    finished: 0,
  });
  const listKpis = ref<TournamentListKpis>(createDefaultListKpis());
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

  type TournamentFieldsResponse = {
    data: Field[];
    meta?: {
      fields_source?: 'tournament' | 'league' | null;
    };
  };
  async function tournamentFields($tournamentId: number, locationId?: number | null) {
    const client = useSanctumClient();
    const response = await client<TournamentFieldsResponse>(`api/v1/admin/tournaments/${$tournamentId}/fields`, {
      query: locationId ? { location_id: locationId } : undefined,
    });

    return {
      data: response.data ?? [],
      meta: response.meta ?? {},
    };
  }

  const extractPlayedGames = (item: Tournament) => {
    if (item?.games_progress && typeof item.games_progress.played === 'number') {
      return item.games_progress.played;
    }
    return 0;
  };

  const computeFallbackListKpis = (items: Tournament[], nextSummary: TournamentSummary): TournamentListKpis => ({
    tournamentsCreated: {
      total: nextSummary.total ?? items.length,
      current: 0,
      dailyData: [],
      label: DEFAULT_KPI_LABEL,
    },
    teamsRegistered: {
      total: items.reduce((acc, item) => acc + Number(item?.teams_count ?? 0), 0),
      current: 0,
      dailyData: [],
      label: DEFAULT_KPI_LABEL,
    },
    playersRegistered: {
      total: items.reduce((acc, item) => acc + Number(item?.players_count ?? 0), 0),
      current: 0,
      dailyData: [],
      label: DEFAULT_KPI_LABEL,
    },
    matchesPlayed: {
      total: items.reduce((acc, item) => acc + extractPlayedGames(item), 0),
      current: 0,
      dailyData: [],
      label: DEFAULT_KPI_LABEL,
    },
  });

  type TournamentListMeta = IPagination & { summary?: TournamentSummary; kpis?: TournamentListKpis };

  async function loadTournaments() {
    loading.value = true;
    const client = useSanctumClient();
    const requestedPage = Number.isFinite(Number(pagination.value.current_page))
      ? Math.max(1, Number(pagination.value.current_page))
      : 1;
    const params = new URLSearchParams({
      per_page: String(pagination.value.per_page),
      page: String(requestedPage),
      range: KPI_RANGE,
    });
    if (search.value) {
      params.set('search', search.value);
    }
    if (statusFilters.value.length) {
      statusFilters.value.forEach((status) => params.append('status[]', status));
    }
    if (formatFilter.value) {
      params.set('format', formatFilter.value);
    }
    try {
      const response = await client<{ data: Tournament[]; meta: TournamentListMeta }>(
        `/api/v1/admin/tournaments?${params.toString()}`
      );
      const lastPage = Math.max(1, Number(response?.meta?.last_page ?? 1));
      if (requestedPage > lastPage) {
        pagination.value.current_page = lastPage;
        await loadTournaments();
        return;
      }
      tournaments.value = response.data;
      pagination.value = { ...pagination.value, ...response?.meta, current_page: requestedPage };
      const nextSummary = response?.meta?.summary ?? summary.value;
      summary.value = nextSummary;
      listKpis.value = response?.meta?.kpis
        ? normalizeListKpis(response.meta.kpis)
        : computeFallbackListKpis(response.data, nextSummary);
    } finally {
      loading.value = false;
    }
  }
  async function applyStatusFilter(statuses?: TournamentStatus[]) {
    statusFilters.value = Array.isArray(statuses) ? [...statuses] : [];
    pagination.value.current_page = 1;
    await loadTournaments();
  }

  async function applyFormatFilter(format?: string | null) {
    formatFilter.value = format || null;
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
        pagination.value.current_page = 1;
        await loadTournaments();
        useToast().toast({
          type: 'success',
          msg: 'Torneo Creado',
          description: 'El nuevo torneo se ha creado exitosamente.',
        });
        ga4Event('tournament_created', {
          tournament_id: (response as any)?.id ?? (response as any)?.data?.id ?? null,
          format: tournamentStoreRequest.value.basic?.tournament_format_id ?? null,
          category: tournamentStoreRequest.value.basic?.category_id ?? null,
          teams_count: (response as any)?.teams_count ?? null,
        });
        dialog.value = false;
        $reset();
        return response;
      })
      .catch(() => {});
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
    registerTourRef,
    startTour,
    resetTour,
    recalculateTour,
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
    formatFilter,
    summary,
    listKpis,
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
    tourSteps: skipHydrate(tourSteps),
    getTournamentLocations,
    loadTournaments,
    applyStatusFilter,
    applyFormatFilter,
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
