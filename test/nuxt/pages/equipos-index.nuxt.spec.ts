import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp} from '../utils/vuetify-stubs'
import EquiposPage from '~/pages/equipos/index.vue'

const getTeams = vi.fn()
const registerTourRef = vi.fn()
const startTour = vi.fn()
const resetTour = vi.fn()
const recalculateTour = vi.fn()

const teamStoreMock = {
  getTeams,
  registerTourRef,
  startTour,
  resetTour,
  recalculateTour,
  dialog: ref(false),
  noTeams: ref(false),
  tourSteps: ref([]),
  listKpis: ref({
    teamsRegistered: { total: 0, current: 0, dailyData: [], label: 'vs último mes' },
    playersRegistered: { total: 0, current: 0, dailyData: [], label: 'vs último mes' },
    activeTournaments: { total: 0, current: 0, dailyData: [], label: 'vs último mes' },
    teamsWithHomeVenue: { total: 0, current: 0, dailyData: [], label: 'vs último mes' },
  }),
}

mockNuxtImport('useTeamStore', () => () => teamStoreMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useTourHub', () => () => ({
  setActiveController: vi.fn(),
  clearActiveController: vi.fn(),
}))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: ref(false) }),
}))

describe('Equipos index page', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getTeams.mockClear()
  })

  it('renders intro, kpis and table shell', async () => {
    const wrapper = await mountSuspended(EquiposPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot /><slot name="tour" /></div>' },
          AppBar: { template: '<div></div>' },
          SearchInput: { template: '<div></div>' },
          TeamKpis: { template: '<div data-testid="equipos-kpis"></div>' },
          NoTeams: { template: '<div data-testid="no-teams"></div>' },
          TeamsTable: { template: '<div data-testid="teams-table"></div>' },
          CreateTeamDialog: { template: '<div></div>' },
          ImportDialog: { template: '<div></div>' },
          Icon: { template: '<i></i>' },
          'v-fab': { template: '<button><slot /></button>' },
          'v-speed-dial': { template: '<div><slot /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          LazyTour: { template: '<div></div>' },
          Tour: { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="equipos-page-intro"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="equipos-page-top-shell"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="equipos-page-actions"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="equipos-filters-panel"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Equipos')
    expect(wrapper.find('[data-testid="equipos-kpis"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="equipos-table-panel"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="teams-table"]').exists()).toBe(true)
    expect(getTeams).toHaveBeenCalled()
  })
})
