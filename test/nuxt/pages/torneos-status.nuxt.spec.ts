import {beforeEach, describe, expect, it, vi} from 'vitest'
import {nextTick} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'

const ga4EventMock = vi.hoisted(() => vi.fn())
vi.mock('~/utils/ga4', () => ({ ga4Event: ga4EventMock }))

const statusComposable = vi.hoisted(() => ({
  data: {
    __v_isRef: true,
    value: {
      header: {
        name: 'Inactivos 2026 Apertura',
        tournamentName: 'Liga Premier',
        football_type: 'Fútbol 7',
        tournament_format_name: 'Liga y Eliminatoria',
        teams: 10,
      },
      standings: [
        {
          id: 1,
          rank: 1,
          team: { name: 'Águilas FC' },
          matches_played: 8,
          points: 17,
          goal_difference: 10,
          last_5: 'WWDWL',
        },
      ],
      lastResults: [],
      stats: {
        goals: [],
        assistance: [],
        yellow_cards: [],
        red_cards: [],
      },
    },
  },
  loading: { __v_isRef: true, value: false },
  error: { __v_isRef: true, value: null as string | null },
  load: vi.fn(),
}))

const scheduleComposable = vi.hoisted(() => ({
  rounds: { __v_isRef: true, value: [] as any[] },
  loading: { __v_isRef: true, value: false },
  error: { __v_isRef: true, value: null as string | null },
  loadMore: vi.fn(),
  reset: vi.fn(),
}))

const tournamentApi = vi.hoisted(() => ({
  getBySlug: vi.fn(),
  getTournamentScheduleQRCode: vi.fn(),
}))

const toast = vi.hoisted(() => vi.fn())

vi.mock('~/composables/usePublicTournamentStatus', () => ({
  usePublicTournamentStatus: () => statusComposable,
}))

vi.mock('~/composables/usePublicTournamentSchedule', () => ({
  usePublicTournamentSchedule: () => scheduleComposable,
}))

vi.mock('~/http/api/tournament', () => ({
  getBySlug: tournamentApi.getBySlug,
  getTournamentScheduleQRCode: tournamentApi.getTournamentScheduleQRCode,
}))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: { value: true } }),
}))

mockNuxtImport('useRoute', () => () => ({ params: { torneo: 'inactivos-2026-apertura' } }))
mockNuxtImport('useSanctumUser', () => () => ({ value: { roles: [] } }))
mockNuxtImport('useToast', () => () => ({ toast }))
mockNuxtImport('useRuntimeConfig', () => () => ({ public: { baseUrl: 'https://futzo.test' } }))
mockNuxtImport('useRequestURL', () => () => new URL('https://futzo.test'))

const mountPage = async () => {
  const { default: TorneoStatusPage } = await import('~/pages/torneos/[torneo]/status.vue')
  return await mountSuspended(TorneoStatusPage, {
    global: {
      stubs: {
        PageLayout: {
          template: `
            <div>
              <slot name="app-bar" />
              <slot name="default" />
              <slot name="footer" />
              <slot name="fab" />
            </div>
          `,
        },
        TournamentHeader: {
          props: ['header'],
          template: `
            <div data-testid="status-header">
              {{ header?.football_type }} · {{ header?.tournament_format_name }} · {{ header?.teams }}
            </div>
          `,
        },
        TransitionFade: { template: '<div data-testid="transition-fade"><slot /></div>' },
        TournamentStandingsTable: {
          props: ['wrapperTestId'],
          template: '<div :data-testid="wrapperTestId"></div>',
        },
        PublicStatsTabs: { template: '<div></div>' },
        NextGamesToday: { template: '<section><slot name="content" /></section>' },
        LastGames: { template: '<div></div>' },
        StatsTableContainer: { template: '<section><slot name="content" /></section>' },
        ScheduleRoundsInfiniteScroll: { template: '<div data-testid="schedule-rounds-list"></div>' },
        'client-only': { template: '<div><slot /></div>' },
        'v-container': { template: '<div><slot /></div>' },
        'v-row': { template: '<div><slot /></div>' },
        'v-col': { template: '<div><slot /></div>' },
        'v-card': { template: '<div><slot /></div>' },
        'v-card-title': { template: '<div><slot /></div>' },
        'v-card-text': { template: '<div><slot /></div>' },
        'v-card-actions': { template: '<div><slot /></div>' },
        'v-skeleton-loader': { template: '<div></div>' },
        'v-empty-state': { template: '<div></div>' },
        'v-alert': { template: '<div><slot /></div>' },
        'v-footer': { template: '<div><slot /></div>' },
        'v-dialog': { template: '<div><slot /></div>' },
        'v-btn': { template: '<button><slot /></button>' },
        'v-img': { template: '<div></div>' },
        Icon: { template: '<i></i>' },
      },
    },
  })
}

describe('Torneo public status page', () => {
  beforeEach(() => {
    statusComposable.load.mockClear()
    scheduleComposable.loadMore.mockClear()
    scheduleComposable.reset.mockClear()
    scheduleComposable.rounds.value = []
    ;(window as any).scrollTo = vi.fn()
    ga4EventMock.mockReset()
  })

  it('renders shared tabs structure and mobile standings headers', async () => {
    const wrapper = await mountPage()

    expect(wrapper.find('[data-testid="public-status-page"]').exists()).toBe(true)
    expect(wrapper.find('.tournament-sections-tabs-shell').exists()).toBe(true)
    expect(wrapper.find('[data-testid="transition-fade"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="status-header"]').text()).toContain('Fútbol 7')
    expect(wrapper.find('[data-testid="status-header"]').text()).toContain('Liga y Eliminatoria')
    expect(wrapper.find('[data-testid="status-header"]').text()).toContain('10')
    expect(wrapper.find('[data-testid="status-standings-table-wrapper"]').exists()).toBe(true)

    const tabButtons = wrapper.findAll('.tournament-sections-tabs__item')
    expect(tabButtons).toHaveLength(2)
    expect(tabButtons[0]?.text()).toBe('Vista General')
    expect(tabButtons[1]?.text()).toBe('Calendario')

    expect(ga4EventMock).toHaveBeenCalledWith('public_calendar_opened', {
      tournament_id: null,
      tournament_slug: 'inactivos-2026-apertura',
      source: 'direct',
    })
  })

  it('loads schedule when switching to calendario tab and no rounds are loaded yet', async () => {
    const wrapper = await mountPage()

    const calendarioTab = wrapper.findAll('.tournament-sections-tabs__item')[1]
    expect(calendarioTab).toBeTruthy()
    await calendarioTab?.trigger('click')
    await nextTick()

    expect(scheduleComposable.loadMore).toHaveBeenCalledTimes(1)
  })
})
