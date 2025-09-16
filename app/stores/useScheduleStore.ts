import { defineStore } from 'pinia';
import type {
  CalendarStepsForm,
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
import type { IPagination } from '~/interfaces';
import { fetchRoundByStatus } from '~/http/api/schedule';
import * as tournamentAPI from '~/http/api/tournament';
import { useToast } from '~/composables/useToast';
import { useTournamentStore } from '~/stores/useTournamentStore';
import { useSanctumClient } from '#imports';

export const useScheduleStore = defineStore('scheduleStore', () => {
  const INIT_CALENDAR_STEPS: CalendarStepsForm = {
    current: 'general',
    steps: {
      general: {
        number: 1,
        disable: true,
        label: 'General',
        completed: false,
        back_step: 'close',
        next_step: 'regular',
        back_label: 'Cancelar',
        next_label: 'Siguiente',
      },
      regular: {
        number: 2,
        completed: false,
        label: 'Fase Regular',
        disable: false,
        back_step: 'general',
        next_step: 'elimination',
        back_label: 'Anterior',
        next_label: 'Siguiente',
      },
      elimination: {
        number: 3,
        completed: false,
        label: 'Fase de Eliminación',
        disable: false,
        back_step: 'regular',
        next_step: 'fields',
        back_label: 'Anterior',
        next_label: 'Siguiente',
      },
      fields: {
        number: 4,
        completed: false,
        label: 'Campos de juego',
        disable: false,
        back_step: 'elimination',
        next_step: 'save',
        back_label: 'Anterior',
        next_label: 'Crear Calendario',
      },
    },
  };
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
    current_page: 1,
    per_page: 10,
    last_page: 1,
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
  const calendarSteps = ref<CalendarStepsForm>(INIT_CALENDAR_STEPS);
  const isExporting = ref(false);

  // ---- Capacity helpers (client-side estimation) ----
  const MATCH_GLOBAL_REST = 15;
  const MATCH_UNEXPECTED_BUFFER = 15;
  const minute = (hhmm: string): number => {
    const [h, m] = (hhmm || '0:0').split(':');
    return Number(h) * 60 + Number(m);
  };
  const parseRange = (range?: string): { start: number; end: number } | undefined => {
    if (!range) return undefined;
    // accepts "09:00-17:00" or "09:00 a 17:00"
    const norm = range.replace(/\s*a\s*/i, '-');
    const parts = norm.split('-');
    if (parts.length !== 2) return undefined;
    //@ts-ignore
    return { start: minute(parts[0].trim()), end: minute(parts[1].trim()) };
  };
  const matchDurationMins = computed(
    () =>
      Number(scheduleSettings.value.game_time || 0) +
      Number(scheduleSettings.value.time_between_games || 0) +
      MATCH_GLOBAL_REST +
      MATCH_UNEXPECTED_BUFFER
  );
  const matchesPerRound = computed(() => {
    const teams = Number(scheduleSettings.value.teams || scheduleStoreRequest.value.general?.total_teams || 0);
    return teams > 1 ? Math.floor(teams / 2) : 0;
  });
  const requiredMinutesPerRound = computed(() => matchesPerRound.value * matchDurationMins.value);
  const reservedMinutesPerWeek = computed(() => {
    let total = 0;
    const md = matchDurationMins.value;
    const fields = scheduleStoreRequest.value.fields_phase || [];
    for (const field of fields) {
      const av = (field as any).availability || {};
      for (const key of Object.keys(av)) {
        const day = av[key];
        if (!day || typeof day !== 'object' || key === 'isCompleted' || !day.enabled) continue;
        const selected = (day.intervals || [])
          .filter((i: any) => i && i.selected && i.value && i.value !== '*')
          .map((i: any) => minute(String(i.value)))
          .sort((a: number, b: number) => a - b);
        const range = parseRange(day.available_range);
        if (selected.length === 0) continue;
        let start = selected[0];
        let end = selected[selected.length - 1] + md; // mirror backend behavior (last slot + matchDuration)
        if (range) {
          if (start < range.start) start = range.start;
          if (end > range.end) end = range.end;
        }
        if (end > start) {
          const matches = Math.floor((end - start) / md);
          total += matches * md;
        }
      }
    }
    return total;
  });
  const hasEnoughCapacity = computed(() => reservedMinutesPerWeek.value >= requiredMinutesPerRound.value);

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
      current_page: 1,
      per_page: 10,
      last_page: 1,
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
    calendarSteps.value = INIT_CALENDAR_STEPS;
  };
  const getTournamentSchedules = async () => {
    isLoadingSchedules.value = true;
    const client = useSanctumClient();
    let url = `/api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule?page=${schedulePagination.value.current_page}`;

    if (schedulePagination.value.filterBy) {
      url += `&filterBy=${schedulePagination.value.filterBy}`;
    }
    if (schedulePagination.value.search) {
      url += `&search=${schedulePagination.value.search}`;
    }

    const response = await client(url);
    //@ts-ignore
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

    schedulePagination.value.current_page += 1;
    //@ts-ignore
    schedulePagination.value.last_page = response.pagination.total_rounds;
    isLoadingSchedules.value = false;
  };
  const fetchSchedule = async () => {
    isLoadingSchedules.value = true;
    const client = useSanctumClient();
    //@ts-ignore
    schedules.value = await client(
      `/api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule?page=${schedulePagination.value.current_page}`
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
    schedulePagination.value.current_page = 1;
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
  const settingsSchedule = async (force = false) => {
    const client = useSanctumClient();
    const data = await client<ScheduleSettings>(
      `api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule/settings`
    );
    const generalSchedule = {} as FormGeneralScheduleRequest;
    generalSchedule.tournament_id = tournamentStore.tournamentId as number;
    generalSchedule.tournament_format_id = data.format.id;
    generalSchedule.football_type_id = data.footballType.id;
    generalSchedule.start_date = data.start_date;
    generalSchedule.game_time = data.game_time;
    generalSchedule.time_between_games = data.time_between_games;
    generalSchedule.total_teams = data.teams;
    generalSchedule.locations = [];
    scheduleStoreRequest.value.general = generalSchedule;
    scheduleStoreRequest.value.regular_phase = {
      round_trip: data.round_trip,
      tiebreakers: data.tiebreakers,
    };
    scheduleStoreRequest.value.elimination_phase = {
      teams_to_next_round: 8,
      round_trip: false,
      phases: data.phases,
    };
    scheduleSettings.value = data;
  };
  const fetchScheduleRoundsByStatus = async (filter: string) => {
    schedulePagination.value.current_page = 1;
    schedules.value.rounds = [];
    const response = await fetchRoundByStatus(
      tournamentStore.tournamentId as number,
      filter,
      schedulePagination.value.current_page
    );
    //@ts-ignore
    schedules.value.rounds = response.rounds ?? [];
  };
  const exportTournamentRoundScheduleAs = async (type: 'excel' | 'img', round: number) => {
    isExporting.value = true;
    return tournamentAPI
      .exportTournamentRoundScheduleAs(type, tournamentStore.tournamentId as number, round)
      .then(() => {
        useToast().toast({
          type: 'success',
          msg: 'Calendario',
          description: 'El rol de juegos se ha generado correctamente',
        });
      })
      .finally(() => {
        isExporting.value = false;
      });
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
    isExporting,
    // capacity info
    matchDurationMins,
    matchesPerRound,
    requiredMinutesPerRound,
    reservedMinutesPerWeek,
    hasEnoughCapacity,
    updateStatusGame,
    getTournamentSchedules,
    fetchSchedule,
    generateSchedule,
    settingsSchedule,
    $resetScheduleStore,
    fetchScheduleRoundsByStatus,
    exportTournamentRoundScheduleAs,
  };
});
