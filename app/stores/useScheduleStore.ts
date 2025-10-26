import { defineStore } from 'pinia';
import { FetchError } from 'ofetch';
import type {
  CalendarStepsForm,
  EliminationPhase,
  Field,
  FootballType,
  Format,
  FormEliminationPhaseStep,
  FormGeneralScheduleRequest,
  FormRulesPhaseStep,
  GroupConfigurationOptions,
  LocationFieldsRequest,
  RoundStatus,
  ScheduleRoundStatus,
  ScheduleSettings,
  ScheduleStoreRequest,
  TournamentSchedule,
} from '~/models/Schedule';
import type { IPagination } from '~/interfaces';
import * as scheduleAPI from '~/http/api/schedule';
import * as tournamentAPI from '~/http/api/tournament';
import { useTournamentStore } from '~/stores/useTournamentStore';
import { useApiError, useToast, useSanctumClient } from '#imports';
import type { BracketPreview, ConfirmBracketMatch } from '~/models/Bracket';

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
        next_step: 'rules',
        back_label: 'Cancelar',
        next_label: 'Siguiente',
      },
      rules: {
        number: 2,
        completed: false,
        label: 'Reglas',
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
        back_step: 'rules',
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
  const INIT_SCHEDULE_SETTINGS: ScheduleSettings = {
    tournament_id: null,
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
    group_configuration_options: [] as GroupConfigurationOptions[],
    group_phase: null,
    group_phase_option_id: null,
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
  const scheduleSettings = ref<ScheduleSettings>(INIT_SCHEDULE_SETTINGS);
  const scheduleStoreRequest = ref<ScheduleStoreRequest>({
    general: {} as FormGeneralScheduleRequest,
    rules_phase: {} as FormRulesPhaseStep,
    elimination_phase: {} as FormEliminationPhaseStep,
    fields_phase: [] as LocationFieldsRequest[],
  });
  const calendarSteps = ref<CalendarStepsForm>(INIT_CALENDAR_STEPS);
  const isExporting = ref(false);
  const isAdvancingPhase = ref(false);
  const isLoadingBracketPreview = ref(false);
  const bracketPreview = ref<BracketPreview | null>(null);
  const bracketPreviewPhase = ref<string | null>(null);
  const isConfirmingBracket = ref(false);
  const tournamentFields = ref<Field[]>([]);
  const isLoadingTournamentFields = ref(false);
  const bracketMatchesDraft = ref<ConfirmBracketMatch[]>([]);
  const eliminationPhases = computed(
    () =>
      scheduleSettings.value?.phases?.filter(
        (phase) => phase.name !== 'Fase de grupos' && phase.name !== 'Tabla general'
      ) ?? []
  );
  const activePhase = computed(() => scheduleSettings.value?.phases?.find((phase) => phase.is_active) ?? null);
  const activeEliminationPhase = computed(() => eliminationPhases.value.find((phase) => phase.is_active) ?? null);
  const upcomingEliminationPhase = computed(
    () => eliminationPhases.value.find((phase) => !phase.is_completed && !phase.is_active) ?? null
  );
  const nextPhase = computed(() => {
    const phases = scheduleSettings.value?.phases ?? [];
    const currentIndex = phases.findIndex((phase) => phase.is_active);
    if (currentIndex === -1) {
      return null;
    }
    for (let i = currentIndex + 1; i < phases.length; i++) {
      if (!phases[i].is_completed) {
        return phases[i];
      }
    }
    return null;
  });

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
    const fields = scheduleStoreRequest.value.fields_phase || [];
    let total = 0;

    const clampToRange = (start: number, end: number, range?: { start: number; end: number }) => {
      let clampedStart = start;
      let clampedEnd = end;
      if (range) {
        if (clampedStart < range.start) clampedStart = range.start;
        if (clampedEnd > range.end) clampedEnd = range.end;
      }
      return clampedEnd > clampedStart ? clampedEnd - clampedStart : 0;
    };

    const stepFromIntervals = (intervals: any[]): number => {
      const minutes = intervals
        .map((interval) => minute(String(interval?.value ?? '')))
        .filter((value) => Number.isFinite(value))
        .sort((a, b) => a - b);
      let minStep: number | undefined;
      for (let i = 1; i < minutes.length; i++) {
        const diff = minutes[i] - minutes[i - 1];
        if (diff > 0 && (minStep === undefined || diff < minStep)) {
          minStep = diff;
        }
      }
      return minStep ?? 60;
    };

    for (const field of fields) {
      const availability = (field as any).availability || {};
      for (const key of Object.keys(availability)) {
        if (key === 'isCompleted') continue;
        const day = availability[key];
        if (!day || typeof day !== 'object' || !day.enabled) continue;

        const intervals = Array.isArray(day.intervals) ? day.intervals.filter(Boolean) : [];
        const selectedMinutes = intervals
          .filter((interval) => interval && interval.selected && interval.value && interval.value !== '*')
          .map((interval) => minute(String(interval.value)))
          .filter((value) => Number.isFinite(value))
          .sort((a, b) => a - b);
        if (!selectedMinutes.length) continue;

        const step = stepFromIntervals(intervals);
        const uniqueSelected = [...new Set(selectedMinutes)].sort((a, b) => a - b);
        const range = parseRange(day.available_range);

        let segmentStart = uniqueSelected[0];
        let previous = uniqueSelected[0];
        let segmentEnd = segmentStart + step;

        for (let i = 1; i < uniqueSelected.length; i++) {
          const current = uniqueSelected[i];
          if (current === previous + step) {
            segmentEnd = current + step;
          } else {
            total += clampToRange(segmentStart, segmentEnd, range);
            segmentStart = current;
            segmentEnd = current + step;
          }
          previous = current;
        }
        total += clampToRange(segmentStart, segmentEnd, range);
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
  const hasSchedule = ref(false);
  const $resetScheduleStore = () => {
    calendarSteps.value.current = 'general';
    calendarSteps.value = { ...INIT_CALENDAR_STEPS };
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
    scheduleSettings.value = INIT_SCHEDULE_SETTINGS;
    scheduleStoreRequest.value = {
      general: {} as FormGeneralScheduleRequest,
      rules_phase: {} as FormRulesPhaseStep,
      elimination_phase: {} as FormEliminationPhaseStep,
      fields_phase: [] as LocationFieldsRequest[],
    };
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
    hasSchedule.value = response?.hasSchedule ?? false;
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
  const refreshScheduleSettings = async () => {
    await fetchScheduleSettings();
  };
  const loadTournamentFields = async (force = false) => {
    if (!tournamentStore.tournamentId) {
      return;
    }
    if (tournamentFields.value.length && !force) {
      return;
    }
    isLoadingTournamentFields.value = true;
    try {
      const response: { data?: Field[] } = await tournamentAPI.getTournamentFields(
        tournamentStore.tournamentId as number
      );
      tournamentFields.value = response?.data ?? [];
    } catch (error) {
      tournamentFields.value = [];
      const { message } = useApiError(error as FetchError);
      useToast().toast({
        type: 'error',
        msg: 'Campos de juego',
        description: message,
      });
      throw error;
    } finally {
      isLoadingTournamentFields.value = false;
    }
  };
  const advanceTournamentPhase = async () => {
    if (!tournamentStore.tournamentId) {
      return;
    }
    isAdvancingPhase.value = true;
    try {
      const response: { message?: string } = await tournamentAPI.advanceTournamentPhase(
        tournamentStore.tournamentId as number
      );
      await refreshScheduleSettings();
      useToast().toast({
        type: 'success',
        msg: 'Fase del torneo',
        description: response?.message ?? 'La siguiente fase se activó correctamente.',
      });
      bracketPreview.value = null;
      bracketPreviewPhase.value = null;
    } catch (error) {
      const { message } = useApiError(error as FetchError);
      useToast().toast({
        type: 'error',
        msg: 'Fase del torneo',
        description: message,
      });
      throw error;
    } finally {
      isAdvancingPhase.value = false;
    }
  };
  const resetBracketPreview = () => {
    bracketPreview.value = null;
    bracketPreviewPhase.value = null;
    bracketMatchesDraft.value = [];
  };
  const loadEliminationBracketPreview = async (phaseName?: string) => {
    if (!tournamentStore.tournamentId) {
      return;
    }
    const targetPhase =
      phaseName ??
      activeEliminationPhase.value?.name ??
      upcomingEliminationPhase.value?.name ??
      eliminationPhases.value[0]?.name;
    if (!targetPhase) {
      resetBracketPreview();
      return;
    }
    isLoadingBracketPreview.value = true;
    try {
      const data = await tournamentAPI.getBracketPreview(tournamentStore.tournamentId as number, targetPhase);
      bracketPreview.value = data;
      bracketPreviewPhase.value = targetPhase;
      bracketMatchesDraft.value =
        data.pairs?.map((pair) => ({
          home_team_id: pair.home.team_id,
          away_team_id: pair.away.team_id,
          field_id: tournamentFields.value[0]?.id ?? null,
          match_date: '',
          match_time: '',
          leg: 1,
        })) ?? [];
    } catch (error) {
      resetBracketPreview();
      const { message } = useApiError(error as FetchError);
      useToast().toast({
        type: 'error',
        msg: 'Llaves de eliminación',
        description: message,
      });
      throw error;
    } finally {
      isLoadingBracketPreview.value = false;
    }
  };
  const confirmEliminationBracket = async (payload: {
    phase: string;
    matches: ConfirmBracketMatch[];
    round_trip?: boolean;
    min_rest_minutes?: number;
  }) => {
    if (!tournamentStore.tournamentId) {
      return;
    }
    isConfirmingBracket.value = true;
    try {
      await tournamentAPI.confirmBracket(tournamentStore.tournamentId as number, payload);
      useToast().toast({
        type: 'success',
        msg: 'Llaves de eliminación',
        description: 'Los partidos se programaron correctamente.',
      });
      resetBracketPreview();
      await refreshScheduleSettings();
      schedulePagination.value.current_page = 1;
      schedules.value.rounds = [];
      await getTournamentSchedules();
    } catch (error) {
      const { message } = useApiError(error as FetchError);
      useToast().toast({
        type: 'error',
        msg: 'Llaves de eliminación',
        description: message,
      });
      throw error;
    } finally {
      isConfirmingBracket.value = false;
    }
  };
  const generateSchedule = async () => {
    try {
      await scheduleAPI.generateSchedule(tournamentStore.tournamentId as number, scheduleStoreRequest.value);
      useToast().toast({
        type: 'success',
        msg: 'Calendario',
        description: 'Calendario Generado correctamente',
      });
      schedulePagination.value.current_page = 1;
      schedules.value.rounds = [];
      await getTournamentSchedules();
      scheduleDialog.value = false;
    } catch (error) {
      const { message } = useApiError(error as FetchError);
      useToast().toast({
        type: 'error',
        msg: 'Calendario',
        description: message,
      });
    }
  };
  const applyScheduleSettings = (data: ScheduleSettings) => {
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
    scheduleStoreRequest.value.rules_phase = {
      round_trip: data.round_trip,
      tiebreakers: data.tiebreakers,
    };
    scheduleStoreRequest.value.elimination_phase = {
      teams_to_next_round: data?.teams_to_next_round ?? 8,
      elimination_round_trip: Boolean(data?.elimination_round_trip),
      phases: data.phases,
    };
    scheduleSettings.value = data;
  };
  const fetchScheduleSettings = async () => {
    const client = useSanctumClient();
    const data = await client<ScheduleSettings>(
      `api/v1/admin/tournaments/${tournamentStore.tournamentId}/schedule/settings`
    );
    applyScheduleSettings(data);
    return data;
  };
  const settingsSchedule = async () => {
    await fetchScheduleSettings();
  };
  const fetchScheduleRoundsByStatus = async (filter: string) => {
    schedulePagination.value.current_page = 1;
    schedules.value.rounds = [];
    isLoadingSchedules.value = true;
    const response = await scheduleAPI.fetchRoundByStatus(
      tournamentStore.tournamentId as number,
      filter,
      schedulePagination.value.current_page
    );
    isLoadingSchedules.value = false;
    hasSchedule.value = response.hasSchedule ?? false;
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
    isAdvancingPhase,
    isLoadingBracketPreview,
    bracketPreview,
    bracketPreviewPhase,
    isConfirmingBracket,
    tournamentFields,
    isLoadingTournamentFields,
    bracketMatchesDraft,
    eliminationPhases,
    activePhase,
    activeEliminationPhase,
    upcomingEliminationPhase,
    nextPhase,
    // capacity info
    matchDurationMins,
    matchesPerRound,
    requiredMinutesPerRound,
    reservedMinutesPerWeek,
    hasEnoughCapacity,
    hasSchedule,
    updateStatusGame,
    getTournamentSchedules,
    fetchSchedule,
    generateSchedule,
    settingsSchedule,
    refreshScheduleSettings,
    loadTournamentFields,
    advanceTournamentPhase,
    loadEliminationBracketPreview,
    resetBracketPreview,
    confirmEliminationBracket,
    $resetScheduleStore,
    fetchScheduleRoundsByStatus,
    exportTournamentRoundScheduleAs,
  };
});
