import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import TorneoIndexPage from '~/pages/torneos/[torneo]/index.vue'

const standings = ref([] as any[])
const tournamentId = ref<number | undefined>(1)
const tournament = ref({
  name: 'Inactivos 2026 Apertura',
  status: 'en curso',
  format_label: 'Liga y Eliminatoria',
  football_type_label: 'Fútbol 7',
  location: { name: 'Cancha Los Olivos' },
  teams_count: 10,
  players_count: 87,
  games_progress: { percent: 53, label: '8/15', played: 8, total: 15 },
  progress: { percent: 40, label: '18/45' },
  start_date_to_string: '15 Ene 2026',
  end_date_to_string: '30 May 2026',
})

const getStandings = vi.fn()
const getTournamentBySlug = vi.fn()
const tournamentApi = vi.hoisted(() => ({
  getTournamentMetrics: vi.fn(),
  getTournamentRegistrationQRCode: vi.fn(),
  getTournamentScheduleQRCode: vi.fn(),
}))

vi.mock('~/http/api/tournament', () => ({
  getTournamentMetrics: tournamentApi.getTournamentMetrics,
  getTournamentRegistrationQRCode: tournamentApi.getTournamentRegistrationQRCode,
  getTournamentScheduleQRCode: tournamentApi.getTournamentScheduleQRCode,
}))

mockNuxtImport('useTournamentStore', () => () => ({
  standings,
  tournamentId,
  tournament,
  getStandings,
  getTournamentBySlug,
}))
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useRoute', () => () => ({ params: { torneo: 'inactivos-2026-apertura' }, query: {} }))
mockNuxtImport('useRouter', () => () => ({ push: vi.fn(), replace: vi.fn() }))
mockNuxtImport('useToast', () => () => ({ toast: vi.fn() }))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: { value: false } }),
}))

describe('Torneo admin index page', () => {
  beforeEach(() => {
    getStandings.mockClear()
    getTournamentBySlug.mockClear()
    getStandings.mockResolvedValue(undefined)
    getTournamentBySlug.mockResolvedValue(undefined)
    tournamentApi.getTournamentMetrics.mockReset()
    tournamentApi.getTournamentScheduleQRCode.mockReset()
    tournamentApi.getTournamentMetrics.mockResolvedValue({
      data: {
        registeredTeams: { total: 10, current: 5, dailyData: [], label: 'vs último mes' },
        registeredPlayers: { total: 87, current: 4, dailyData: [], label: 'vs último mes' },
        matchesPlayed: { total: 8, targetTotal: 15, current: 3, dailyData: [], label: 'vs último mes' },
        disciplinaryCases: { total: 2, current: -10, dailyData: [], label: 'vs último mes' },
      },
    })
    tournamentApi.getTournamentScheduleQRCode.mockResolvedValue({ image: 'data:image/png;base64,mock' })
  })

  it('renders header and tabs without next/last games', async () => {
    const wrapper = await mountSuspended(TorneoIndexPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot name="default" /></div>' },
          AppBar: { template: '<div><slot name="title" /></div>' },
          StatsTableContainer: { template: '<div data-testid="stats-table"></div>' },
          StatsTable: { template: '<div></div>' },
          TournamentCalendarTab: { template: '<div data-testid="calendar-tab"></div>' },
          Vue3EasyDataTable: { template: '<div data-testid="standings"></div>' },
          CreateTournamentDialog: { template: '<div></div>' },
          DisciplinePanel: { template: '<div data-testid="discipline-panel"></div>' },
          TournamentShareMenu: { template: '<button data-testid="tournament-share-menu"></button>' },
          KpisMetricsSection: {
            props: ['items'],
            template: `
              <div data-testid="kpis-metrics">
                <span v-for="item in items" :key="item.title">{{ item.value }}</span>
              </div>
            `,
          },
          TransitionFade: { template: '<div><slot /></div>' },
          Icon: { template: '<i></i>' },
          'v-btn-group': { template: '<div><slot /></div>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-progress-linear': { template: '<div data-testid="progress"></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-tooltip': { template: '<div><slot /></div>' },
          'v-dialog': { template: '<div><slot /></div>' },
          'v-alert': { template: '<div><slot /></div>' },
          'v-img': { template: '<div></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="tournament-page-shell"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="tournament-page-top-shell"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="tournament-page-intro"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="tournament-share-menu"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="tournament-standings-table-wrapper"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Inactivos 2026 Apertura')
    expect(wrapper.text()).toContain('8/15')
    expect(wrapper.find('[data-testid="stats-table"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="tournament-sections"]').exists()).toBe(true)
    expect(tournamentApi.getTournamentMetrics).toHaveBeenCalledWith(1, 'lastMonth')

    const disciplinaButton = wrapper.findAll('button').find((button) => button.text().includes('Disciplina'))
    expect(disciplinaButton).toBeTruthy()
    await disciplinaButton?.trigger('click')

    expect(wrapper.find('[data-testid="discipline-panel"]').exists()).toBe(true)
  })
})
