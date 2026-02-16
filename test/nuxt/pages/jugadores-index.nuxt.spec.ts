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
const canCreatePlayerRef = ref(true)
const canImportPlayersRef = ref(true)
const isTeamScopedRoleRef = ref(false)
const toastMock = vi.fn()

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
mockNuxtImport('useRoleAccess', () => () => ({
  canCreatePlayer: canCreatePlayerRef,
  canImportPlayers: canImportPlayersRef,
  isTeamScopedRole: isTeamScopedRoleRef,
}))
mockNuxtImport('useToast', () => () => ({ toast: toastMock }))

describe('Jugadores index page', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getPlayers.mockClear()
    listTeams.mockClear()
    fetchPositions.mockClear()
    canCreatePlayerRef.value = true
    canImportPlayersRef.value = true
    isTeamScopedRoleRef.value = false
    toastMock.mockClear()
  })

  it('renders intro shell, filters, kpis and players table section', async () => {
    const wrapper = await mountSuspended(JugadoresPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot /><slot name="tour" /></div>' },
          AppBar: { template: '<div></div>' },
          SearchInput: { template: '<input />' },
          PrimaryBtn: {
            props: ['disabled'],
            template: '<button data-testid="jugadores-new-player-btn" :data-disabled="String(!!disabled)"><slot /></button>',
          },
          SecondaryBtn: {
            props: ['disabled'],
            template: '<button data-testid="jugadores-import-btn" :data-disabled="String(!!disabled)"><slot /></button>',
          },
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

  it('disables actions when role access denies player management', async () => {
    canCreatePlayerRef.value = false
    canImportPlayersRef.value = false

    const wrapper = await mountSuspended(JugadoresPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot /><slot name="tour" /></div>' },
          AppBar: { template: '<div></div>' },
          SearchInput: { template: '<input />' },
          PrimaryBtn: {
            props: ['disabled'],
            template: '<button data-testid="jugadores-new-player-btn" :data-disabled="String(!!disabled)"></button>',
          },
          SecondaryBtn: {
            props: ['disabled'],
            template: '<button data-testid="jugadores-import-btn" :data-disabled="String(!!disabled)"></button>',
          },
          PlayerKpis: { template: '<div></div>' },
          NoPlayers: { template: '<div></div>' },
          PlayersTable: { template: '<div></div>' },
          JugadoresForm: { template: '<div></div>' },
          ImportDialog: { template: '<div></div>' },
          AssignTeamDialog: { template: '<div></div>' },
          'v-select': { template: '<select></select>' },
          LazyTour: { template: '<div></div>' },
          Tour: { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="jugadores-new-player-btn"]').attributes('data-disabled')).toBe('true')
    expect(wrapper.find('[data-testid="jugadores-import-btn"]').attributes('data-disabled')).toBe('true')
  })
})
