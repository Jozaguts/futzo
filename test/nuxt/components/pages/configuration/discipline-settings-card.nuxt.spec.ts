import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import DisciplineSettingsCard from '~/components/pages/configuration/discipline-settings-card.vue'

const toast = vi.fn()

vi.mock('~/composables/useToast', () => ({
  useToast: () => ({ toast }),
}))

const settingsApi = vi.hoisted(() => ({
  getDisciplineViolations: vi.fn(),
  createDisciplineViolation: vi.fn(),
  updateDisciplineViolation: vi.fn(),
  getDisciplineSettingsDefaults: vi.fn(),
  updateDisciplineSettingsDefaults: vi.fn(),
}))

vi.mock('~/http/api/settings', () => ({
  getDisciplineViolations: settingsApi.getDisciplineViolations,
  createDisciplineViolation: settingsApi.createDisciplineViolation,
  updateDisciplineViolation: settingsApi.updateDisciplineViolation,
  getDisciplineSettingsDefaults: settingsApi.getDisciplineSettingsDefaults,
  updateDisciplineSettingsDefaults: settingsApi.updateDisciplineSettingsDefaults,
}))

const VBtnStub = defineComponent({
  name: 'StubVBtn',
  props: {
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(props, { slots, emit, attrs }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          disabled: props.disabled,
          onClick: (event: MouseEvent) => emit('click', event),
        },
        slots.default ? slots.default() : undefined
      )
  },
})

const VTextFieldStub = defineComponent({
  name: 'StubVTextField',
  props: {
    modelValue: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    return () =>
      h('input', {
        ...attrs,
        value: props.modelValue as string | number,
        disabled: props.disabled,
        onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value),
      })
  },
})

const VTextareaStub = defineComponent({
  name: 'StubVTextarea',
  props: {
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    return () =>
      h('textarea', {
        ...attrs,
        value: props.modelValue,
        onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLTextAreaElement).value),
      })
  },
})

const VSwitchStub = defineComponent({
  name: 'StubVSwitch',
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    return () =>
      h('input', {
        ...attrs,
        type: 'checkbox',
        checked: props.modelValue,
        disabled: props.disabled,
        onChange: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).checked),
      })
  },
})

describe('DisciplineSettingsCard', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    toast.mockReset()

    settingsApi.getDisciplineViolations.mockReset()
    settingsApi.createDisciplineViolation.mockReset()
    settingsApi.updateDisciplineViolation.mockReset()
    settingsApi.getDisciplineSettingsDefaults.mockReset()
    settingsApi.updateDisciplineSettingsDefaults.mockReset()

    settingsApi.getDisciplineViolations.mockResolvedValue([
      {
        id: 1,
        name: 'Alineacion indebida',
        description: 'Jugador no habilitado',
        active: true,
        default_sanctions: [{ label: 'Deduccion de puntos', description: 'Se resta 1 punto al equipo' }],
      },
    ])

    settingsApi.getDisciplineSettingsDefaults.mockResolvedValue({
      alignment_default_goals_against: 3,
      alignment_default_match_lost: true,
      alignment_default_preset_id: 'ADMIN_WIN_3_0',
      enable_appeals: false,
      enable_recidivism_escalation: true,
      presets: [{ id: 'ADMIN_WIN_3_0', label: 'Gana por sancion 3-0' }],
    })

    settingsApi.updateDisciplineSettingsDefaults.mockResolvedValue({
      alignment_default_goals_against: 3,
      alignment_default_match_lost: true,
      alignment_default_preset_id: 'ADMIN_WIN_3_0',
      enable_appeals: false,
      enable_recidivism_escalation: true,
      presets: [{ id: 'ADMIN_WIN_3_0', label: 'Gana por sancion 3-0' }],
    })

    settingsApi.createDisciplineViolation.mockResolvedValue({
      id: 2,
      name: 'Agresion verbal',
      description: 'Insultos al arbitro',
      active: true,
    })
  })

  it('loads violations and defaults on mount', async () => {
    const wrapper = await mountSuspended(DisciplineSettingsCard, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
          'v-btn': VBtnStub,
          'v-text-field': VTextFieldStub,
          'v-textarea': VTextareaStub,
          'v-switch': VSwitchStub,
          'v-select': vuetifyStubs['v-select'],
          'v-divider': { template: '<hr />' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-skeleton-loader': { template: '<div />' },
        },
      },
    })

    await flushPromises()

    expect(settingsApi.getDisciplineViolations).toHaveBeenCalledTimes(1)
    expect(settingsApi.getDisciplineSettingsDefaults).toHaveBeenCalledTimes(1)
    expect(wrapper.text()).toContain('Catalogo de faltas')
    expect(wrapper.text()).toContain('Alineacion indebida')
  })

  it('saves defaults payload', async () => {
    const wrapper = await mountSuspended(DisciplineSettingsCard, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
          'v-btn': VBtnStub,
          'v-text-field': VTextFieldStub,
          'v-textarea': VTextareaStub,
          'v-switch': VSwitchStub,
          'v-select': vuetifyStubs['v-select'],
          'v-divider': { template: '<hr />' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-skeleton-loader': { template: '<div />' },
        },
      },
    })

    await flushPromises()

    await wrapper.find('[data-testid="discipline-save-defaults"]').trigger('click')
    await flushPromises()

    expect(settingsApi.updateDisciplineSettingsDefaults).toHaveBeenCalledWith(
      expect.objectContaining({
        alignment_default_goals_against: 3,
        alignment_default_match_lost: true,
        alignment_default_preset_id: 'ADMIN_WIN_3_0',
        enable_appeals: false,
        enable_recidivism_escalation: true,
      })
    )
  })

  it('creates a new violation from dialog', async () => {
    const wrapper = await mountSuspended(DisciplineSettingsCard, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
          'v-btn': VBtnStub,
          'v-text-field': VTextFieldStub,
          'v-textarea': VTextareaStub,
          'v-switch': VSwitchStub,
          'v-select': vuetifyStubs['v-select'],
          'v-divider': { template: '<hr />' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-skeleton-loader': { template: '<div />' },
        },
      },
    })

    await flushPromises()

    await wrapper.find('[data-testid="discipline-add-violation"]').trigger('click')
    await flushPromises()

    await wrapper.find('[data-testid="discipline-violation-name"]').setValue('Agresion verbal')
    await wrapper.find('[data-testid="discipline-violation-description"]').setValue('Insultos al arbitro')
    await wrapper.find('[data-testid="discipline-save-violation"]').trigger('click')
    await flushPromises()

    expect(settingsApi.createDisciplineViolation).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Agresion verbal',
        description: 'Insultos al arbitro',
      })
    )
  })
})
