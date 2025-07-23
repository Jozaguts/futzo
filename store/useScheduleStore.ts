import { defineStore } from 'pinia';
import type {
  EliminationPhase,
  FootballType,
  Format,
  FormEliminationPhaseStep,
  FormGeneralScheduleRequest,
  FormRegularPhaseStep,
  LocationFieldsRequest,
  RoundStatus,
  ScheduleRoundStatus,
  ScheduleSettings,
  ScheduleStoreRequest,
  TournamentSchedule,
} from '~/models/Schedule';
import { useTournamentStore } from '~/store/useTournamentStore';
import type { Ref } from 'vue';
import type { IPagination } from '~/interfaces';
import type { CalendarStepsForm } from '~/models/tournament';
import { fetchRoundByStatus } from '~/http/api/schedule';

export const useScheduleStore = defineStore('scheduleStore', () => {
  const tournamentStore = useTournamentStore();
  const scheduleDialog = ref(false);
  const scheduleParams = ref<{ leagueId: number; tournamentId: number }>();
  const daysToPlay = ref([
    {
      days: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
      key: 'all-days',
      text: 'Toda la semana',
    },
    {
      days: ['viernes', 'sábado', 'domingo'],
      key: 'weekend-days',
      text: 'Viernes | Sábado | Domingo',
    },
    { days: ['sábado', 'domingo'], key: 'weekend', text: 'Sábado | Domingo' },
    { days: ['domingo'], key: 'sunday', text: 'Domingo' },
    { days: [], key: 'other', text: 'Otro' },
  ]);
  const daysToPlaySelected = ref();
  const daysToPlayCustomSelected = ref();
  const schedules = ref<TournamentSchedule>({
    rounds: [],
  });
  const noSchedules = computed(() => schedules.value?.rounds?.length === 0);
  const isLoadingSchedules = ref(false);
  const schedulePagination = ref<IPagination & { filterBy?: RoundStatus | string; search?: string }>({
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    total: 0,
    sort: 'asc',
    filterBy: undefined,
    search: undefined,
  });
  const scheduleSettings = ref<ScheduleSettings>({
    start_date: new Date(),
    end_date: null,
    round_trip: false,
    elimination_round_trip: true,
    game_time: 0,
    min_teams: 0,
    max_teams: 0,
    time_between_games: 0,
    teams: 0,
    format: {} as Format,
    footballType: {} as FootballType,
    locations: [],
    tiebreakers: [],
    phases: [] as EliminationPhase[],
  });
  const scheduleStoreRequest = ref<ScheduleStoreRequest>({
    general: {} as FormGeneralScheduleRequest,
    regular_phase: {} as FormRegularPhaseStep,
    elimination_phase: {} as FormEliminationPhaseStep,
    fields_phase: [] as LocationFieldsRequest[],
  });
  const calendarSteps = ref<CalendarStepsForm>({
    current: 'general',
    steps: [
      {
        step: 'general',
        completed: false,
        label: 'General',
      },
      {
        step: 'regular',
        completed: false,
        label: 'Fase Regular',
      },
      {
        step: 'elimination',
        completed: false,
        label: 'Fase de Eliminación',
      },
      {
        step: 'fields',
        completed: false,
        label: 'Campos de juego',
      },
    ],
  });

  const scheduleRoundStatus = ref<ScheduleRoundStatus[]>([
    { value: 'programado', text: 'Programada' },
    { value: 'en_progreso', text: 'En progreso' },
    { value: 'completado', text: 'Completada' },
    { value: 'cancelado', text: 'Cancelada' },
  ]);
  const $resetScheduleStore = () => {
    scheduleDialog.value = false;
    scheduleParams.value = undefined;
    daysToPlaySelected.value = undefined;
    daysToPlayCustomSelected.value = undefined;
    schedules.value = {
      rounds: [],
    };
    isLoadingSchedules.value = false;
    schedulePagination.value = {
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
      total: 0,
      sort: 'asc',
      filterBy: undefined,
      search: undefined,
    };
    scheduleSettings.value = {
      start_date: new Date(),
      end_date: null,
      round_trip: false,
      elimination_round_trip: true,
      game_time: 0,
      min_teams: 0,
      max_teams: 0,
      time_between_games: 0,
      teams: 0,
      format: {} as Format,
      footballType: {} as FootballType,
      locations: [],
      tiebreakers: [],
      phases: [] as EliminationPhase[],
    };
    scheduleStoreRequest.value = {
      general: {} as FormGeneralScheduleRequest,
      regular_phase: {} as FormRegularPhaseStep,
      elimination_phase: {} as FormEliminationPhaseStep,
      fields_phase: [] as LocationFieldsRequest[],
    };
    calendarSteps.value = {
      current: 'general',
      steps: [
        {
          step: 'general',
          completed: false,
          label: 'General',
        },
        {
          step: 'regular',
          completed: false,
          label: 'Fase Regular',
        },
        {
          step: 'elimination',
          completed: false,
          label: 'Fase de Eliminación',
        },
        {
          step: 'fields',
          completed: false,
          label: 'Campos de juego',
        },
      ],
    };
  };
  const getTournamentSchedules = async () => {
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
    const newRounds = response.rounds ?? [];
    if (!schedules.value.rounds.length) {
      schedules.value.rounds = [];
    }

    const existingRound = schedules.value.rounds.find((r) => r.round === newRounds[0].round);
    if (existingRound) {
      schedules.value.rounds = schedules.value.rounds.map((round) =>
        round.round === existingRound.round ? newRounds[0] : round
      );
    } else {
      schedules.value.rounds.push(...newRounds);
    }

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
  const updateStatusGame = async (roundId: number, status: RoundStatus, tournamentId: number) => {
    const client = useSanctumClient();
    await client(`api/v1/admin/tournaments/${tournamentId}/schedule/rounds/${roundId}`, {
      method: 'PUT',
      body: {
        status,
      },
    });
    schedulePagination.value.currentPage = 1;
    schedules.value.rounds = [];
    await getTournamentSchedules();
  };
  const generateSchedule = async () => {
    const client = useSanctumClient();
    return await client(`/api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule`, {
      method: 'POST',
      body: JSON.stringify(scheduleStoreRequest.value),
    });
  };
  const settingsSchedule = async () => {
    const client = useSanctumClient();
    const { data } = (await useAsyncData<ScheduleSettings>('tournament-settings', () =>
      client(`api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule/settings`)
    )) as { data: Ref<ScheduleSettings> };
    const generalSchedule = {} as FormGeneralScheduleRequest;
    generalSchedule.tournament_id = tournamentStore.tournamentId as number;
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
      tiebreakers: data.value.tiebreakers,
    };
    scheduleStoreRequest.value.elimination_phase = {
      teams_to_next_round: 8,
      round_trip: false,
      phases: data.value.phases,
    };
    scheduleSettings.value = data.value;
  };
  const fetchScheduleRoundsByStatus = async (filter: string) => {
    schedulePagination.value.currentPage = 1;
    schedules.value.rounds = [];
    const response = await fetchRoundByStatus(
      tournamentStore.tournamentId as number,
      filter,
      schedulePagination.value.currentPage
    );
    schedules.value.rounds = response.rounds ?? [];
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
    fetchScheduleRoundsByStatus,
  };
});
