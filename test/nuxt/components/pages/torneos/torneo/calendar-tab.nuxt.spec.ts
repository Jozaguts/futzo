import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import TournamentCalendarTab from '~/components/pages/torneos/torneo/calendar-tab.vue'

const schedules = ref({ rounds: [] as any[] })
const hasSchedule = ref(true)
const scheduleDialog = ref(false)
const scheduleDrawerOpen = ref(false)
const pendingManualMatches = ref(0)
const schedulePagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  search: undefined as string | undefined,
  filterBy: undefined as string | undefined,
})

const getTournamentSchedules = vi.fn()
const refreshScheduleSettings = vi.fn()

mockNuxtImport('useScheduleStore', () => () => ({
  schedules,
  hasSchedule,
  scheduleDialog,
  scheduleDrawerOpen,
  pendingManualMatches,
  schedulePagination,
  getTournamentSchedules,
  refreshScheduleSettings,
}))
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useToast', () => () => ({ toast: vi.fn() }))
mockNuxtImport('useDebounceFn', () => (fn: any) => fn)

describe('TournamentCalendarTab', () => {
  beforeEach(() => {
    schedules.value = { rounds: [] }
    hasSchedule.value = true
    scheduleDialog.value = false
    scheduleDrawerOpen.value = false
    pendingManualMatches.value = 0
    schedulePagination.value = {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      search: undefined,
      filterBy: undefined,
    }
    getTournamentSchedules.mockReset()
    refreshScheduleSettings.mockReset()
    getTournamentSchedules.mockResolvedValue(undefined)
    refreshScheduleSettings.mockResolvedValue(undefined)
  })

  it('loads calendar data and opens drawer when schedule exists', async () => {
    hasSchedule.value = true

    const stubs = {
      ScheduleBoard: { template: '<div data-testid="schedule-board"></div>' },
      LazyPagesTorneosCalendarioDialog: { template: '<div></div>' },
      PagesTorneosCalendarioDialog: { template: '<div></div>' },
      Icon: { template: '<i></i>' },
      'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
      'v-select': { template: '<div></div>' },
      'v-text-field': { template: '<input />' },
      'v-alert': { template: '<div><slot /></div>' },
      'v-skeleton-loader': { template: '<div></div>' },
    }

    const wrapper = await mountSuspended(TournamentCalendarTab, {
      global: {
        stubs,
      },
    })

    expect(refreshScheduleSettings).toHaveBeenCalled()
    expect(getTournamentSchedules).toHaveBeenCalled()
    expect(wrapper.find('[data-testid="calendar-toolbar-shell"]').exists()).toBe(true)

    await wrapper.find('[data-testid="calendar-config-button"]').trigger('click')
    expect(scheduleDrawerOpen.value).toBe(true)
    expect(scheduleDialog.value).toBe(false)
  })

  it('opens create dialog when schedule does not exist', async () => {
    hasSchedule.value = false

    const stubs = {
      ScheduleBoard: { template: '<div data-testid="schedule-board"></div>' },
      LazyPagesTorneosCalendarioDialog: { template: '<div></div>' },
      PagesTorneosCalendarioDialog: { template: '<div></div>' },
      Icon: { template: '<i></i>' },
      'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
      'v-select': { template: '<div></div>' },
      'v-text-field': { template: '<input />' },
      'v-alert': { template: '<div><slot /></div>' },
      'v-skeleton-loader': { template: '<div></div>' },
    }

    const wrapper = await mountSuspended(TournamentCalendarTab, {
      global: {
        stubs,
      },
    })

    await wrapper.find('[data-testid="calendar-config-button"]').trigger('click')
    expect(scheduleDialog.value).toBe(true)
    expect(scheduleDrawerOpen.value).toBe(false)
  })
})
