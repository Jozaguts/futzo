import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import DashboardPage from '../../../app/pages/dashboard.vue'

const isMobile = ref(false)

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: isMobile }),
}))

const makeDashboardStore = (overrides: Partial<any> = {}) => ({
  teamStats: ref({
    activeTournaments: { total: 1, current: 1, dailyData: [], label: 'vs último mes' },
    matchesThisWeek: { total: 2, current: 1, dailyData: [], label: 'vs último mes' },
    registeredTeams: { total: 10, current: 1, dailyData: [], label: 'vs último mes' },
    activePlayers: { total: 20, current: 2, dailyData: [], label: 'vs último mes' },
    completedGames: { total: 4, current: 1, dailyData: [], label: 'vs último mes' },
  }),
  nextGames: ref([]),
  activity: ref([]),
  tourSteps: ref([]),
  registerTourRef: vi.fn(),
  startTour: vi.fn(),
  resetTour: vi.fn(),
  recalculateTour: vi.fn(),
  byRange: vi.fn(),
  getNextGames: vi.fn(),
  getActivity: vi.fn(),
  ...overrides,
})

describe('Dashboard page', () => {
  beforeEach(() => {
    isMobile.value = false

    mockNuxtImport('storeToRefs', () => (store: any) => store)
    mockNuxtImport('useDashboardStore', () => () => makeDashboardStore())
    mockNuxtImport('useTournamentStore', () => () => ({ tournaments: ref([]), dialog: ref(false) }))
    mockNuxtImport('useTeamStore', () => () => ({ dialog: ref(false) }))
    mockNuxtImport('usePlayerStore', () => () => ({ dialog: ref(false) }))
    mockNuxtImport('useTourHub', () => () => ({
      setActiveController: vi.fn(),
      clearActiveController: vi.fn(),
    }))
    mockNuxtImport('useAuth', () => () => ({ isSignUp: ref(false) }))
    mockNuxtImport('useToast', () => () => ({ toast: vi.fn() }))
    mockNuxtImport('useRouter', () => () => ({ push: vi.fn(), replace: vi.fn() }))
    mockNuxtImport('useRoute', () => () => ({ query: {} }))
  })

  it('renders metrics grid on desktop', async () => {
    const wrapper = await mountSuspended(DashboardPage, {
      global: {
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
          AppBar: true,
          MetricCard: { template: '<div class="metric-card-stub"></div>' },
          MetricsCarousel: { template: '<div class="metrics-carousel-stub"></div>' },
          DashboardNextGames: { template: '<div class="next-game-stub"></div>' },
          ActivityFeed: { template: '<div class="activity-stub"></div>' },
          NoGames: { template: '<div data-testid="no-games"></div>' },
          TournamentDialog: true,
          CreateTeamDialog: true,
          JugadoresForm: true,
        },
      },
    })

    expect(wrapper.find('[data-testid="dashboard-metrics-grid"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="dashboard-metrics-carousel"]').exists()).toBe(false)
    expect(wrapper.text()).toContain('Ver todos los partidos')
    expect(wrapper.text()).toContain('Ver toda la actividad')
  })

  it('renders metrics carousel on mobile', async () => {
    isMobile.value = true

    const wrapper = await mountSuspended(DashboardPage, {
      global: {
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
          AppBar: true,
          MetricCard: { template: '<div class="metric-card-stub"></div>' },
          MetricsCarousel: { template: '<div class="metrics-carousel-stub"></div>' },
          DashboardNextGames: { template: '<div class="next-game-stub"></div>' },
          ActivityFeed: { template: '<div class="activity-stub"></div>' },
          NoGames: { template: '<div data-testid="no-games"></div>' },
          TournamentDialog: true,
          CreateTeamDialog: true,
          JugadoresForm: true,
        },
      },
    })

    expect(wrapper.find('[data-testid="dashboard-metrics-carousel"]').exists()).toBe(true)
  })

  it('shows empty states for next games and activity', async () => {
    mockNuxtImport('useDashboardStore', () => () =>
      makeDashboardStore({
        nextGames: ref([]),
        activity: ref([]),
      })
    )

    const wrapper = await mountSuspended(DashboardPage, {
      global: {
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
          AppBar: true,
          MetricCard: { template: '<div class="metric-card-stub"></div>' },
          MetricsCarousel: { template: '<div class="metrics-carousel-stub"></div>' },
          DashboardNextGames: { template: '<div class="next-game-stub"></div>' },
          ActivityFeed: {
            props: ['items'],
            template: `<div>
              <div v-if="!items.length" data-testid="activity-empty"></div>
              <div v-else data-testid="activity-list"></div>
            </div>`,
          },
          NoGames: { template: '<div data-testid="no-games"></div>' },
          TournamentDialog: true,
          CreateTeamDialog: true,
          JugadoresForm: true,
        },
      },
    })

    expect(wrapper.find('[data-testid="no-games"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="activity-empty"]').exists()).toBe(true)
  })
})
