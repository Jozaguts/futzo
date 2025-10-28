import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import type { ScheduleSettings, TournamentSchedule } from '~/models/Schedule';

const advanceTournamentPhaseMock = vi.hoisted(() => vi.fn());
const getTournamentFieldsMock = vi.hoisted(() => vi.fn());

vi.mock('~/http/api/tournament', () => ({
  __esModule: true,
  advanceTournamentPhase: advanceTournamentPhaseMock,
  getTournamentFields: getTournamentFieldsMock,
  exportTournamentRoundScheduleAs: vi.fn(),
}));

const toastMock = vi.fn();
const clientMock = vi.fn();
const standingsMock = vi.fn();
const lastResultsMock = vi.fn();
const nextGamesMock = vi.fn();
const tournamentRef = ref({ id: 42, name: 'Copa Futzo', status: 'en curso', winner: null });

mockNuxtImport('useToast', () => () => ({ toast: toastMock }));
mockNuxtImport('useApiError', () => () => ({ message: 'error' }));
mockNuxtImport('useSanctumClient', () => () => clientMock);
mockNuxtImport('useTournamentStore', () => () => ({
  tournamentId: ref(42),
  tournament: tournamentRef,
  getStandings: standingsMock,
  getLastResults: lastResultsMock,
  getNextGames: nextGamesMock,
}));

const scheduleSettingsResponse: ScheduleSettings = {
  tournament_id: 42,
  start_date: new Date(),
  end_date: null,
  round_trip: false,
  elimination_round_trip: false,
  game_time: 90,
  min_teams: 0,
  max_teams: 0,
  time_between_games: 0,
  teams: 2,
  format: { id: 3, name: 'Liga y Eliminatoria' },
  footballType: { id: 1, name: 'Fútbol 11' },
  locations: [],
  tiebreakers: [],
  phases: [
    {
      id: 7,
      name: 'Final',
      is_active: true,
      is_completed: false,
      min_teams_for: null,
      rules: null,
    },
  ],
  group_configuration_options: [],
  group_phase: null,
  group_phase_option_id: null,
};

const buildMatch = (status: 'programado' | 'completado') => ({
  id: 101,
  status,
  result: '',
  details: {
    date: '2025-01-01',
    time: '20:00',
    raw_date: '2025-01-01',
    raw_time: '20:00',
    field: { id: 1, name: 'Principal' },
    location: { id: 1, name: 'Sede Central' },
    referee: 'Por asignar',
  },
  options: [],
  home: { id: 501, name: 'Atlético Futzo', image: '', goals: 0 },
  away: { id: 502, name: 'Real Codex', image: '', goals: 0 },
});

const emptyScheduleResponse: TournamentSchedule = { rounds: [] };

clientMock.mockImplementation(async (url: string) => {
  if (url.includes('/schedule/settings')) {
    return scheduleSettingsResponse;
  }
  if (url.includes('/schedule?page=')) {
    return {
      hasSchedule: true,
      rounds: [],
      pagination: { total_rounds: 0 },
    };
  }
  return emptyScheduleResponse;
});

describe('useScheduleStore finalization helpers', () => {
  let useScheduleStore: typeof import('~/stores/useScheduleStore')['useScheduleStore'];

  beforeEach(async () => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
    ({ useScheduleStore } = await import('~/stores/useScheduleStore'));
  });

  it('actualiza al campeón tras finalizar el torneo', async () => {
    const store = useScheduleStore();
    await store.refreshScheduleSettings();
    store.scheduleSettings.value = {
      ...store.scheduleSettings.value,
      phases: [{ id: 99, name: 'Final', is_active: true, is_completed: false, min_teams_for: null, rules: null }],
    };
    store.schedules.value = {
      rounds: [
        {
          round: 1,
          status: 'programado',
          isEditable: false,
          date: '2025-01-01',
          matches: [buildMatch('completado')],
        },
      ],
    } as typeof store.schedules.value;

    advanceTournamentPhaseMock.mockResolvedValue({
      message: 'Torneo finalizado. Campeón: Atlético Futzo.',
      champion: { team_id: 501, team_name: 'Atlético Futzo' },
      tournament: { id: 42, name: 'Copa Futzo', status: 'completado', winner: 'Atlético Futzo' },
    });

    await store.advanceTournamentPhase();

    const firstCall = advanceTournamentPhaseMock.mock.calls[0] ?? [];
    const firstArg = firstCall[0];
    expect(typeof firstArg === 'object' && firstArg && 'value' in firstArg ? firstArg.value : firstArg).toBe(42);
    expect(tournamentRef.value.status).toBe('completado');
    expect(tournamentRef.value.winner).toBe('Atlético Futzo');
    expect(standingsMock).toHaveBeenCalledTimes(1);
    expect(lastResultsMock).toHaveBeenCalledTimes(1);
    expect(nextGamesMock).toHaveBeenCalledTimes(1);
  });
});
