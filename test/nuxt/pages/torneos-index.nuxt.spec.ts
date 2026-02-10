import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp } from '../utils/vuetify-stubs'
import TorneosPage from '~/pages/torneos/index.vue'

const loadTournaments = vi.fn()
const registerTourRef = vi.fn()
const startTour = vi.fn()
const resetTour = vi.fn()
const recalculateTour = vi.fn()

const tournamentStoreMock = {
  loadTournaments,
  registerTourRef,
  startTour,
  resetTour,
  recalculateTour,
  tournamentId: ref<number | undefined>(undefined),
  noTournaments: ref(false),
  tourSteps: ref([]),
  summary: ref({ total: 0, active: 0, upcoming: 0, finished: 0 }),
}

mockNuxtImport('useTournamentStore', () => () => tournamentStoreMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useTourHub', () => () => ({
  setActiveController: vi.fn(),
  clearActiveController: vi.fn(),
}))

describe('Torneos index page', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    loadTournaments.mockClear()
  })

  it('renders header and loads tournaments', async () => {
    const wrapper = await mountSuspended(TorneosPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="default" /><slot name="tour" /></div>' },
          TournamentKpis: { template: '<div data-testid="kpis"></div>' },
          TournamentFilters: { template: '<div data-testid="filters"></div>' },
          TournamentTable: { template: '<div data-testid="table"></div>' },
          NoTournaments: { template: '<div></div>' },
          TournamentDialog: { template: '<div></div>' },
          LazyTour: { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Torneos')
    expect(wrapper.find('[data-testid="kpis"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="filters"]').exists()).toBe(true)
    expect(loadTournaments).toHaveBeenCalled()
  })
})
