import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import TorneoCalendarioPage from '../../../app/pages/torneos/[torneo]/calendario.vue'

const publicRounds = vi.hoisted(() => ({ value: [] as any[] }))
const publicLoading = vi.hoisted(() => ({ value: false }))
const publicError = vi.hoisted(() => ({ value: null as string | null }))
const loadPublicSchedule = vi.hoisted(() => vi.fn())
const resetPublicSchedule = vi.hoisted(() => vi.fn())
const sanctumUser = vi.hoisted(() => ({ value: null as any }))
const hasSchedule = vi.hoisted(() => ({ value: false }))
const scheduleDrawerOpen = vi.hoisted(() => ({ value: false }))
const getTournamentSchedules = vi.hoisted(() => vi.fn())
const resetScheduleStore = vi.hoisted(() => vi.fn())

vi.mock('~/composables/usePublicTournamentSchedule', () => ({
  usePublicTournamentSchedule: () => ({
    rounds: publicRounds,
    loading: publicLoading,
    error: publicError,
    loadMore: loadPublicSchedule,
    reset: resetPublicSchedule,
  }),
}))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: { value: false } }),
}))

mockNuxtImport('useRoute', () => () => ({ params: { torneo: 'liga-1' } }))
mockNuxtImport('useSanctumUser', () => () => sanctumUser)
mockNuxtImport('useScheduleStore', () => () => ({
  hasSchedule,
  scheduleDrawerOpen,
  getTournamentSchedules,
  $resetScheduleStore: resetScheduleStore,
}))
mockNuxtImport('storeToRefs', () => (store: any) => store)

describe('Torneo calendario page', () => {
  beforeEach(() => {
    publicRounds.value = []
    publicLoading.value = false
    publicError.value = null
    loadPublicSchedule.mockClear()
    resetPublicSchedule.mockClear()
    getTournamentSchedules.mockClear()
    resetScheduleStore.mockClear()
    sanctumUser.value = null
  })

  it('renders public schedule for guests', async () => {
    sanctumUser.value = null

    const wrapper = await mountSuspended(TorneoCalendarioPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot name="default" /><slot name="fab" /></div>' },
          AppBar: { template: '<div><slot name="buttons" /><slot name="extension" /></div>' },
          Schedule: { template: '<div data-testid="admin-schedule"></div>' },
          ScheduleRoundsInfiniteScroll: { template: '<div data-testid="public-schedule"></div>' },
          AppBarBtn: { template: '<div></div>' },
          SearchGame: { template: '<div></div>' },
          LazyPagesTorneosCalendarioDialog: { template: '<div></div>' },
          Icon: { template: '<div></div>' },
          'v-alert': { template: '<div><slot /></div>' },
          'v-fab': { template: '<div><slot /></div>' },
          'v-speed-dial': { template: '<div><slot /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-icon': { template: '<i></i>' },
        },
      },
    })

    await nextTick()

    expect(wrapper.find('[data-testid="public-schedule"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="admin-schedule"]').exists()).toBe(false)
    expect(loadPublicSchedule).toHaveBeenCalled()
    expect(getTournamentSchedules).not.toHaveBeenCalled()
  })

  it('renders admin schedule for authenticated users', async () => {
    sanctumUser.value = { email: 'admin@futzo.test' }

    const wrapper = await mountSuspended(TorneoCalendarioPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot name="default" /><slot name="fab" /></div>' },
          AppBar: { template: '<div><slot name="buttons" /><slot name="extension" /></div>' },
          Schedule: { template: '<div data-testid="admin-schedule"></div>' },
          ScheduleRoundsInfiniteScroll: { template: '<div data-testid="public-schedule"></div>' },
          AppBarBtn: { template: '<div></div>' },
          SearchGame: { template: '<div></div>' },
          LazyPagesTorneosCalendarioDialog: { template: '<div></div>' },
          Icon: { template: '<div></div>' },
          'v-alert': { template: '<div><slot /></div>' },
          'v-fab': { template: '<div><slot /></div>' },
          'v-speed-dial': { template: '<div><slot /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-icon': { template: '<i></i>' },
        },
      },
    })

    await nextTick()

    expect(wrapper.find('[data-testid="admin-schedule"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="public-schedule"]').exists()).toBe(false)
    expect(getTournamentSchedules).toHaveBeenCalled()
  })
})
