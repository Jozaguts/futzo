import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { ref } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

const toastMock = vi.fn();
const clientMock = vi.fn();
const ga4EventMock = vi.hoisted(() => vi.fn());

vi.mock('~/utils/ga4', () => ({
  ga4Event: ga4EventMock,
}));

mockNuxtImport('useToast', () => () => ({ toast: toastMock }));
mockNuxtImport('useTourController', () => () => ({
  registerTourRef: vi.fn(),
  startTour: vi.fn(),
  resetTour: vi.fn(),
  recalculateTour: vi.fn(),
}));
mockNuxtImport('useSanctumClient', () => () => clientMock);
mockNuxtImport('useTeamStore', () => () => ({
  team: { tournament_id: 77 },
  list: vi.fn(),
}));
mockNuxtImport('useTournamentStore', () => () => ({
  tournamentId: ref(77),
}));
mockNuxtImport('useCategoryStore', () => () => ({
  fetchCategories: vi.fn(),
}));

describe('usePlayerStore import players', () => {
  let usePlayerStore: typeof import('~/stores/usePlayerStore')['usePlayerStore'];

  beforeEach(async () => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
    ({ usePlayerStore } = await import('~/stores/usePlayerStore'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('handles immediate import response', async () => {
    clientMock.mockImplementation(async (url: string) => {
      if (url === '/api/v1/admin/players/import') {
        return {
          imported_count: 5,
          skipped_count: 1,
          message: 'Importación completada',
        };
      }

      if (url.startsWith('/api/v1/admin/players?')) {
        return {
          data: [],
          meta: { current_page: 1, per_page: 10, total: 0, last_page: 1, sort: 'asc' },
        };
      }

      return {};
    });

    const store = usePlayerStore();
    store.importModal = true;
    const file = new File(['content'], 'players.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    await store.importPlayersHandler(file, null);

    expect(
      clientMock.mock.calls.some(([url]) => String(url) === '/api/v1/admin/players/import')
    ).toBe(true);
    expect(
      clientMock.mock.calls.some(([url]) => String(url).startsWith('/api/v1/admin/players?'))
    ).toBe(true);
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        msg: 'Jugadores importados',
      })
    );
    expect(ga4EventMock).toHaveBeenCalledWith(
      'players_bulk_imported',
      expect.objectContaining({ players_count: 5 })
    );
    expect(store.importModal).toBe(false);
  });

  it('polls batch endpoint when import is queued', async () => {
    vi.useFakeTimers();
    let batchChecks = 0;

    clientMock.mockImplementation(async (url: string) => {
      if (url === '/api/v1/admin/players/import') {
        return {
          status: 'queued',
          player_import_batch_id: 99,
        };
      }

      if (url === '/api/v1/admin/players/import/99') {
        batchChecks += 1;
        if (batchChecks === 1) {
          return {
            status: 'processing',
            id: 99,
          };
        }
        return {
          status: 'completed_with_errors',
          imported_count: 52,
          skipped_count: 3,
          errors: { file: ['Formato inválido en bloque 2'] },
        };
      }

      if (url.startsWith('/api/v1/admin/players?')) {
        return {
          data: [],
          meta: { current_page: 1, per_page: 10, total: 0, last_page: 1, sort: 'asc' },
        };
      }

      return {};
    });

    const store = usePlayerStore();
    store.importModal = true;
    const file = new File(['content'], 'players.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const importPromise = store.importPlayersHandler(file, null);
    await vi.runAllTimersAsync();
    await importPromise;

    const toastMessages = toastMock.mock.calls.map((call) => call[0]?.msg);
    expect(toastMessages).toContain('Importación en proceso');
    expect(toastMessages).toContain('Importación finalizada con observaciones');

    const warningToast = toastMock.mock.calls.map((call) => call[0]).find((toast) => toast?.type === 'warning');
    expect(warningToast?.description).toContain('Importados: 52. Omitidos: 3.');
    expect(ga4EventMock).toHaveBeenCalledWith(
      'players_bulk_imported',
      expect.objectContaining({ players_count: 52 })
    );
    expect(store.importModal).toBe(false);
  });
});
