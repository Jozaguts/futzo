import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { ref } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

const toastMock = vi.fn();
const clientMock = vi.fn();
let routeName = 'jugadores';
let teamStoreMock: any;

vi.mock('~/http/api/settings', () => ({
  getTournamentRules: vi.fn(),
  getTournamentTeamRulesComplianceSummary: vi.fn(),
}));

import * as settingsAPI from '~/http/api/settings';

mockNuxtImport('useToast', () => () => ({ toast: toastMock }));
mockNuxtImport('useTourController', () => () => ({
  registerTourRef: vi.fn(),
  startTour: vi.fn(),
  resetTour: vi.fn(),
  recalculateTour: vi.fn(),
}));
mockNuxtImport('useSanctumClient', () => () => clientMock);
mockNuxtImport('useRoute', () => () => ({ name: routeName }));
mockNuxtImport('useTeamStore', () => () => teamStoreMock);
mockNuxtImport('useTournamentStore', () => () => ({
  tournamentId: ref(5),
}));
mockNuxtImport('useCategoryStore', () => () => ({
  fetchCategories: vi.fn(),
}));

describe('usePlayerStore tournament rules validation', () => {
  let usePlayerStore: typeof import('~/stores/usePlayerStore')['usePlayerStore'];

  beforeEach(async () => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
    routeName = 'jugadores';
    teamStoreMock = {
      teams: ref([]),
      getTeam: vi.fn(),
      list: vi.fn(),
    };

    clientMock.mockImplementation(async (url: string) => {
      if (String(url).startsWith('/api/v1/admin/players?')) {
        return {
          data: [],
          meta: { current_page: 1, per_page: 10, total: 0, last_page: 1, sort: 'asc' },
        };
      }
      return {};
    });

    (settingsAPI.getTournamentRules as any).mockResolvedValue([]);
    (settingsAPI.getTournamentTeamRulesComplianceSummary as any).mockResolvedValue({});

    ({ usePlayerStore } = await import('~/stores/usePlayerStore'));
  });

  it('skips tournament validation when player has no team', async () => {
    const store = usePlayerStore();
    store.playerStoreRequest = {
      basic: { name: 'Luis Hernandez Ortiz', birthdate: '2010-01-01', team_id: null },
      details: {},
      contact: {},
    } as any;

    const result = await store.createPlayer();

    expect(result).toBe(true);
    expect(settingsAPI.getTournamentRules).not.toHaveBeenCalled();
    const createCall = clientMock.mock.calls.find(([url]) => String(url) === '/api/v1/admin/players');
    expect(createCall).toBeTruthy();
    const payload = createCall?.[1]?.body as FormData;
    expect(payload.get('basic[name]')).toBe('Luis');
    expect(payload.get('basic[last_name]')).toBe('Hernandez Ortiz');
  });

  it('blocks player creation when age rules are not met', async () => {
    teamStoreMock.teams.value = [{ id: 7, tournament: { id: 5 } }];
    (settingsAPI.getTournamentRules as any).mockResolvedValue([
      {
        id: 22,
        tournament_id: 5,
        rule_template_id: 4,
        name: 'Sub23',
        type: 'edad',
        condition: 'menores de',
        age: 23,
        max_players: 5,
      },
    ]);

    const store = usePlayerStore();
    store.playerStoreRequest = {
      basic: { name: 'Jugador', birthdate: '1990-01-01', team_id: 7 },
      details: {},
      contact: {},
    } as any;

    const result = await store.createPlayer();

    expect(result).toBe(false);
    expect(settingsAPI.getTournamentRules).toHaveBeenCalledWith(5);
    expect(settingsAPI.getTournamentTeamRulesComplianceSummary).not.toHaveBeenCalled();
    expect(clientMock).not.toHaveBeenCalledWith(
      '/api/v1/admin/players',
      expect.objectContaining({ method: 'POST' })
    );
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'warning',
        msg: 'No cumple con las reglas del torneo',
      })
    );
  });

  it('blocks player creation when quantity rules are exceeded', async () => {
    teamStoreMock.teams.value = [{ id: 9, tournament: { id: 5 } }];
    (settingsAPI.getTournamentRules as any).mockResolvedValue([
      {
        id: 21,
        tournament_id: 5,
        rule_template_id: 1,
        name: 'Foraneos',
        type: 'cantidad',
        condition: null,
        age: null,
        max_players: 3,
      },
    ]);
    (settingsAPI.getTournamentTeamRulesComplianceSummary as any).mockResolvedValue({
      can_add_player: false,
      message: 'No hay cupo disponible',
    });

    const store = usePlayerStore();
    store.playerStoreRequest = {
      basic: { name: 'Jugador', birthdate: '2010-01-01', team_id: 9, tournament_rule_id: 21 },
      details: {},
      contact: {},
    } as any;

    const result = await store.createPlayer();

    expect(result).toBe(false);
    expect(settingsAPI.getTournamentRules).toHaveBeenCalledWith(5);
    expect(settingsAPI.getTournamentTeamRulesComplianceSummary).toHaveBeenCalledWith(5, 9);
    expect(clientMock).not.toHaveBeenCalledWith(
      '/api/v1/admin/players',
      expect.objectContaining({ method: 'POST' })
    );
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'warning',
        msg: 'No cumple con las reglas del torneo',
      })
    );
  });

  it('creates player when age and quantity validations pass', async () => {
    teamStoreMock.teams.value = [{ id: 11, tournament: { id: 5 } }];
    (settingsAPI.getTournamentRules as any).mockResolvedValue([
      {
        id: 21,
        tournament_id: 5,
        rule_template_id: 1,
        name: 'Foraneos',
        type: 'cantidad',
        condition: null,
        age: null,
        max_players: 3,
      },
      {
        id: 22,
        tournament_id: 5,
        rule_template_id: 4,
        name: 'Sub23',
        type: 'edad',
        condition: 'menores de',
        age: 23,
        max_players: 5,
      },
    ]);
    (settingsAPI.getTournamentTeamRulesComplianceSummary as any).mockResolvedValue({
      can_add_player: true,
      rules: [{ name: 'Foraneos', type: 'cantidad', current_players: 2, max_players: 3, is_compliant: true }],
    });

    const store = usePlayerStore();
    store.playerStoreRequest = {
      basic: { name: 'Jugador', birthdate: '2010-01-01', team_id: 11, tournament_rule_id: 21 },
      details: {},
      contact: {},
    } as any;

    const result = await store.createPlayer();

    expect(result).toBe(true);
    expect(settingsAPI.getTournamentRules).toHaveBeenCalledWith(5);
    expect(settingsAPI.getTournamentTeamRulesComplianceSummary).toHaveBeenCalledWith(5, 11);
    const createCall = clientMock.mock.calls.find(([url]) => String(url) === '/api/v1/admin/players');
    expect(createCall).toBeTruthy();
    const payload = createCall?.[1]?.body as FormData;
    expect(payload.get('basic[tournament_id]')).toBe('5');
    expect(payload.get('basic[tournament_rule_id]')).toBe('21');
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        msg: 'Jugador creado',
      })
    );
  });

  it('does not apply quantity limit when tournament_rule_id is null', async () => {
    teamStoreMock.teams.value = [{ id: 13, tournament: { id: 5 } }];
    (settingsAPI.getTournamentRules as any).mockResolvedValue([
      {
        id: 21,
        tournament_id: 5,
        rule_template_id: 1,
        name: 'Foráneos',
        type: 'cantidad',
        condition: null,
        age: null,
        max_players: 3,
      },
    ]);
    (settingsAPI.getTournamentTeamRulesComplianceSummary as any).mockResolvedValue({
      can_add_player: false,
      message: 'No hay cupo disponible',
    });

    const store = usePlayerStore();
    store.playerStoreRequest = {
      basic: { name: 'Jugador', birthdate: '2010-01-01', team_id: 13, tournament_rule_id: null },
      details: {},
      contact: {},
    } as any;

    const result = await store.createPlayer();

    expect(result).toBe(true);
    expect(settingsAPI.getTournamentRules).toHaveBeenCalledWith(5);
    expect(clientMock).toHaveBeenCalledWith(
      '/api/v1/admin/players',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('blocks when selected tournament_rule_id is not part of tournament quantity rules', async () => {
    teamStoreMock.teams.value = [{ id: 14, tournament: { id: 5 } }];
    (settingsAPI.getTournamentRules as any).mockResolvedValue([
      {
        id: 21,
        tournament_id: 5,
        rule_template_id: 1,
        name: 'Foráneos',
        type: 'cantidad',
        condition: null,
        age: null,
        max_players: 3,
      },
    ]);

    const store = usePlayerStore();
    store.playerStoreRequest = {
      basic: { name: 'Jugador', birthdate: '2010-01-01', team_id: 14, tournament_rule_id: 999 },
      details: {},
      contact: {},
    } as any;

    const result = await store.createPlayer();

    expect(result).toBe(false);
    expect(settingsAPI.getTournamentTeamRulesComplianceSummary).not.toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'warning',
        msg: 'Regla del torneo inválida',
      })
    );
  });

  it('assigns player to team when rules validation passes', async () => {
    teamStoreMock.teams.value = [{ id: 20, tournament: { id: 5 } }];
    (settingsAPI.getTournamentRules as any).mockResolvedValue([
      {
        id: 21,
        tournament_id: 5,
        rule_template_id: 1,
        name: 'Foráneos',
        type: 'cantidad',
        condition: null,
        age: null,
        max_players: 3,
      },
    ]);
    (settingsAPI.getTournamentTeamRulesComplianceSummary as any).mockResolvedValue({
      can_add_player: true,
      rules: [{ name: 'Foráneos', type: 'cantidad', current_players: 1, max_players: 3, is_compliant: true }],
    });

    const store = usePlayerStore();
    const result = await store.assignPlayerToTeam({
      teamId: 20,
      playerId: 88,
      birthdate: '2010-01-01',
      tournamentRuleId: 21,
    });

    expect(result).toBe(true);
    const assignCall = clientMock.mock.calls.find(([url]) => String(url) === '/api/v1/admin/teams/20/players/88/assign');
    expect(assignCall).toBeTruthy();
    expect(assignCall?.[1]).toEqual(
      expect.objectContaining({
        method: 'POST',
        body: { tournament_id: 5, tournament_rule_id: 21 },
      })
    );
  });

  it('assigns player with empty payload when tournament has no rules', async () => {
    teamStoreMock.teams.value = [{ id: 40, tournament: { id: 5 } }];
    (settingsAPI.getTournamentRules as any).mockResolvedValue([]);

    const store = usePlayerStore();
    const result = await store.assignPlayerToTeam({
      teamId: 40,
      playerId: 66,
      birthdate: '2010-01-01',
      tournamentRuleId: null,
    });

    expect(result).toBe(true);
    const assignCall = clientMock.mock.calls.find(([url]) => String(url) === '/api/v1/admin/teams/40/players/66/assign');
    expect(assignCall).toBeTruthy();
    expect(assignCall?.[1]).toEqual(
      expect.objectContaining({
        method: 'POST',
        body: {},
      })
    );
  });

  it('blocks assign when age rule is not met', async () => {
    teamStoreMock.teams.value = [{ id: 30, tournament: { id: 5 } }];
    (settingsAPI.getTournamentRules as any).mockResolvedValue([
      {
        id: 22,
        tournament_id: 5,
        rule_template_id: 4,
        name: 'Sub23',
        type: 'edad',
        condition: 'menores de',
        age: 23,
        max_players: 5,
      },
    ]);

    const store = usePlayerStore();
    const result = await store.assignPlayerToTeam({
      teamId: 30,
      playerId: 99,
      birthdate: '1990-01-01',
      tournamentRuleId: null,
    });

    expect(result).toBe(false);
    expect(clientMock.mock.calls.some(([url]) => String(url) === '/api/v1/admin/teams/30/players/99/assign')).toBe(false);
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'warning',
        msg: 'No cumple con las reglas del torneo',
      })
    );
  });
});
