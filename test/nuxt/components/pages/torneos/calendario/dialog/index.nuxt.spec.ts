import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import CreateCalendarDialog from '~/components/pages/torneos/calendario/dialog/index.vue'

const generateSchedule = vi.hoisted(() => vi.fn())
const resetScheduleStore = vi.hoisted(() => vi.fn())

const calendarSteps = ref({
  current: 'general',
  steps: {
    general: {
      number: 1,
      disable: false,
      label: 'General',
      completed: false,
      back_step: 'close',
      next_step: 'rules',
      back_label: 'Cancelar',
      next_label: 'Siguiente',
    },
    rules: {
      number: 2,
      disable: false,
      label: 'Reglas',
      completed: false,
      back_step: 'general',
      next_step: 'elimination',
      back_label: 'Anterior',
      next_label: 'Siguiente',
    },
    elimination: {
      number: 3,
      disable: false,
      label: 'Eliminatoria',
      completed: false,
      back_step: 'rules',
      next_step: 'fields',
      back_label: 'Anterior',
      next_label: 'Siguiente',
    },
    fields: {
      number: 4,
      disable: false,
      label: 'Campos',
      completed: false,
      back_step: 'elimination',
      next_step: 'save',
      back_label: 'Anterior',
      next_label: 'Crear calendario',
    },
  },
})
const scheduleDialog = ref(true)

const scheduleStore = {
  calendarSteps,
  scheduleDialog,
  generateSchedule,
  $resetScheduleStore: resetScheduleStore,
}

const buttonStub = {
  emits: ['click'],
  props: ['disabled'],
  template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
}

vi.mock('~/stores/useScheduleStore', () => ({
  useScheduleStore: () => scheduleStore,
}))

mockNuxtImport('storeToRefs', () => (store: any) => ({
  calendarSteps: store.calendarSteps,
  scheduleDialog: store.scheduleDialog,
}))

describe('CreateCalendarDialog', () => {
  beforeEach(() => {
    calendarSteps.value.current = 'general'
    scheduleDialog.value = true
    generateSchedule.mockReset()
    generateSchedule.mockResolvedValue(undefined)
    resetScheduleStore.mockReset()
  })

  it('closes dialog on back when current step points to close', async () => {
    const wrapper = await mountSuspended(CreateCalendarDialog, {
      global: {
        stubs: {
          Dialog: { template: '<div><slot name="v-card-text" /><slot name="actions" /></div>' },
          StepperContainer: { template: '<div></div>' },
          Icon: { template: '<span></span>' },
          'v-btn': buttonStub,
        },
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')

    expect(scheduleDialog.value).toBe(false)
  })

  it('advances step when next step is not save', async () => {
    const wrapper = await mountSuspended(CreateCalendarDialog, {
      global: {
        stubs: {
          Dialog: { template: '<div><slot name="v-card-text" /><slot name="actions" /></div>' },
          StepperContainer: { template: '<div></div>' },
          Icon: { template: '<span></span>' },
          'v-btn': buttonStub,
        },
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(calendarSteps.value.current).toBe('rules')
    expect(generateSchedule).not.toHaveBeenCalled()
  })

  it('generates schedule on final step', async () => {
    calendarSteps.value.current = 'fields'

    const wrapper = await mountSuspended(CreateCalendarDialog, {
      global: {
        stubs: {
          Dialog: { template: '<div><slot name="v-card-text" /><slot name="actions" /></div>' },
          StepperContainer: { template: '<div></div>' },
          Icon: { template: '<span></span>' },
          'v-btn': buttonStub,
        },
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(generateSchedule).toHaveBeenCalledTimes(1)
  })
})
