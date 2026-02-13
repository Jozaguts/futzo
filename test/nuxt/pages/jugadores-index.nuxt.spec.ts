import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp} from '../utils/vuetify-stubs'
import JugadoresPage from '~/pages/jugadores/index.vue'

const getPlayers = vi.fn()
const fetchPositions = vi.fn()
const listTeams = vi.fn()
const registerTourRef = vi.fn()
const startTour = vi.fn()
const resetTour = vi.fn()
const recalculateTour = vi.fn()

const playerStoreMock = {
  getPlayers,
  fetchPositions,
  registerTourRef,
  startTour,
  resetTour,
  recalculateTour,
  dialog: ref(false),
  importModal: ref(false),
  noPlayers: ref(false),
  players: ref([{ id: 10, name: 'Carlos', team: { id: 1, name: 'Aguilas FC' }, position: { name: 'Delantero' } }]),
  pagination: ref({ current_page: 1, per_page: 10, total: 1, last_page: 1, sort: 'asc' }),
  tourSteps: ref([]),
}

const teamStoreMock = {
  list: listTeams,
  teams: ref([{ id: 1, name: 'Aguilas FC' }]),
}

const positionsStoreMock = {
  fetchPositions,
  positions: ref([{ id: 1, name: 'Delantero' }]),
}

mockNuxtImport('usePlayerStore', () => () => playerStoreMock)
mockNuxtImport('useTeamStore', () => () => teamStoreMock)
mockNuxtImport('usePositionsStore', () => () => positionsStoreMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useTourHub', () => () => ({
  setActiveController: vi.fn(),
  clearActiveController: vi.fn(),
}))

describe('Jugadores index page', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getPlayers.mockClear()
    listTeams.mockClear()
    fetchPositions.mockClear()
  })

  it('renders intro shell, filters, kpis and players table section', async () => {
    const wrapper = await mountSuspended(JugadoresPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot /><slot name="tour" /></div>' },
          AppBar: { template: '<div></div>' },
          SearchInput: { template: '<input />' },
          PrimaryBtn: { template: '<button><slot /></button>' },
          SecondaryBtn: { template: '<button><slot /></button>' },
          PlayerKpis: { template: '<div data-testid="jugadores-kpis"></div>' },
          NoPlayers: { template: '<div data-testid="no-players"></div>' },
          PlayersTable: { template: '<div data-testid="players-table"></div>' },
          JugadoresForm: { template: '<div></div>' },
          ImportDialog: { template: '<div></div>' },
          AssignTeamDialog: { template: '<div></div>' },
          'v-select': { template: '<select></select>' },
          LazyTour: { template: '<div></div>' },
          Tour: { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="jugadores-page-top-shell"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="jugadores-page-intro"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="jugadores-page-actions"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="jugadores-filters-panel"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="jugadores-kpis"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="jugadores-table-panel"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="players-table"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Jugadores')
    expect(getPlayers).toHaveBeenCalled()
    expect(listTeams).toHaveBeenCalled()
    expect(fetchPositions).toHaveBeenCalled()
  })
})
