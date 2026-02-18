import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {flushPromises} from '@vue/test-utils'
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
const hardResetSchedule = vi.fn()

mockNuxtImport('useScheduleStore', () => () => ({
  schedules,
  hasSchedule,
  scheduleDialog,
  scheduleDrawerOpen,
  pendingManualMatches,
  schedulePagination,
  getTournamentSchedules,
  refreshScheduleSettings,
  hardResetSchedule,
}))
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useToast', () => () => ({ toast: vi.fn() }))
mockNuxtImport('useDebounceFn', () => (fn: any) => fn)

describe('TournamentCalendarTab', () => {
  const stubs = {
    ScheduleBoard: { template: '<div data-testid="schedule-board"></div>' },
    LazyPagesTorneosCalendarioDialog: { template: '<div></div>' },
    PagesTorneosCalendarioDialog: { template: '<div></div>' },
    Icon: { template: '<i></i>' },
    'v-btn': {
      props: ['disabled'],
      template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
    },
    'v-select': { template: '<div></div>' },
    'v-text-field': { template: '<input />' },
    'v-skeleton-loader': { template: '<div></div>' },
    'v-dialog': {
      props: ['modelValue'],
      template: '<div v-if="modelValue"><slot /></div>',
    },
    'v-card': { template: '<div><slot /></div>' },
    'v-card-title': { template: '<div><slot /></div>' },
    'v-card-text': { template: '<div><slot /></div>' },
    'v-card-actions': { template: '<div><slot /></div>' },
    'v-autocomplete': {
      props: ['modelValue', 'items'],
      template: `
        <select
          data-testid="calendar-hard-reset-round"
          :value="modelValue === null || modelValue === undefined ? '' : String(modelValue)"
          @change="$emit('update:modelValue', $event.target.value === '' ? null : Number($event.target.value))"
        >
          <option value=""></option>
          <option v-for="item in items" :key="String(item.value)" :value="item.value === null ? '' : String(item.value)">
            {{ item.title }}
          </option>
        </select>
      `,
    },
  }

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
    hardResetSchedule.mockReset()
    getTournamentSchedules.mockResolvedValue(undefined)
    refreshScheduleSettings.mockResolvedValue(undefined)
    hardResetSchedule.mockResolvedValue(undefined)
  })

  it('loads calendar data and opens drawer when schedule exists', async () => {
    hasSchedule.value = true

    const wrapper = await mountSuspended(TournamentCalendarTab, {
      global: {
        stubs,
      },
    })
    await flushPromises()

    expect(refreshScheduleSettings).toHaveBeenCalled()
    expect(getTournamentSchedules).toHaveBeenCalled()
    expect(wrapper.find('[data-testid="calendar-toolbar-shell"]').exists()).toBe(true)

    await wrapper.find('[data-testid="calendar-config-button"]').trigger('click')
    expect(scheduleDrawerOpen.value).toBe(true)
    expect(scheduleDialog.value).toBe(false)
  })

  it('opens create dialog when schedule does not exist', async () => {
    hasSchedule.value = false

    const wrapper = await mountSuspended(TournamentCalendarTab, {
      global: {
        stubs,
      },
    })
    await flushPromises()

    await wrapper.find('[data-testid="calendar-config-button"]').trigger('click')
    expect(scheduleDialog.value).toBe(true)
    expect(scheduleDrawerOpen.value).toBe(false)
  })

  it('hard resets full schedule when no round is selected', async () => {
    hasSchedule.value = true
    schedulePagination.value.last_page = 4

    const wrapper = await mountSuspended(TournamentCalendarTab, {
      global: {
        stubs,
      },
    })
    await flushPromises()

    await wrapper.find('[data-testid="calendar-hard-reset-button"]').trigger('click')
    await wrapper.find('[data-testid="calendar-hard-reset-confirm"]').trigger('click')

    expect(hardResetSchedule).toHaveBeenCalledWith(undefined)
  })

  it('hard resets schedule from selected round', async () => {
    hasSchedule.value = true
    schedulePagination.value.last_page = 4

    const wrapper = await mountSuspended(TournamentCalendarTab, {
      global: {
        stubs,
      },
    })
    await flushPromises()

    await wrapper.find('[data-testid="calendar-hard-reset-button"]').trigger('click')
    await wrapper.find('[data-testid="calendar-hard-reset-round"]').setValue('2')
    await wrapper.find('[data-testid="calendar-hard-reset-confirm"]').trigger('click')

    expect(hardResetSchedule).toHaveBeenCalledWith({ round: 2 })
  })

  it('treats round 1 as full hard reset', async () => {
    hasSchedule.value = true
    schedulePagination.value.last_page = 4

    const wrapper = await mountSuspended(TournamentCalendarTab, {
      global: {
        stubs,
      },
    })
    await flushPromises()

    await wrapper.find('[data-testid="calendar-hard-reset-button"]').trigger('click')
    await wrapper.find('[data-testid="calendar-hard-reset-round"]').setValue('1')
    await wrapper.find('[data-testid="calendar-hard-reset-confirm"]').trigger('click')

    expect(hardResetSchedule).toHaveBeenCalledWith(undefined)
  })
})
