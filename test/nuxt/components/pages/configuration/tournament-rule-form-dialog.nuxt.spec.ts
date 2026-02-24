import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import TournamentRuleFormDialog from '~/components/pages/configuration/tournament-rule-form-dialog.vue'

const VTextFieldStub = defineComponent({
  name: 'StubVTextField',
  props: {
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    return () =>
      h('input', {
        ...attrs,
        type: props.type,
        value: props.modelValue as string | number,
        onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value),
      })
  },
})

const VSelectStub = defineComponent({
  name: 'StubVSelect',
  props: {
    modelValue: { type: [String, Number, null], default: null },
    items: { type: Array, default: () => [] },
    itemTitle: { type: String, default: 'title' },
    itemValue: { type: String, default: 'value' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    return () =>
      h(
        'select',
        {
          ...attrs,
          value: props.modelValue as any,
          onChange: (event: Event) => {
            const value = (event.target as HTMLSelectElement).value
            emit('update:modelValue', value === '' ? null : isNaN(Number(value)) ? value : Number(value))
          },
        },
        [
          h('option', { value: '' }, '--'),
          ...(props.items as any[]).map((item) =>
            h(
              'option',
              {
                value: item[props.itemValue] ?? item.value,
              },
              item[props.itemTitle] ?? item.title
            )
          ),
        ]
      )
  },
})

describe('TournamentRuleFormDialog', () => {
  beforeEach(() => {
    ensureVuetifyApp()
  })

  it('prefills values when selecting template and submits age payload', async () => {
    const wrapper = await mountSuspended(TournamentRuleFormDialog, {
      props: {
        modelValue: true,
        mode: 'create',
        initialRule: null,
        templates: [
          { id: 1, name: 'Foráneos', type: 'cantidad', condition: null, age: null },
          { id: 4, name: 'Sub23', type: 'edad', condition: 'menores de', age: 23 },
        ],
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          'v-text-field': VTextFieldStub,
          'v-select': VSelectStub,
          'v-card-actions': { template: '<div><slot /></div>' },
        },
      },
    })

    const templateSelect = wrapper.get('[data-testid="tournament-rule-template"]')
    await templateSelect.setValue('4')

    const nameInput = wrapper.get('[data-testid="tournament-rule-name"]')
    expect((nameInput.element as HTMLInputElement).value).toBe('Sub23')

    const maxPlayers = wrapper.get('[data-testid="tournament-rule-max-players"]')
    await maxPlayers.setValue('5')

    const saveButton = wrapper.get('[data-testid="tournament-rule-save"]')
    expect(saveButton.attributes('disabled')).toBeUndefined()

    await saveButton.trigger('click')

    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toEqual({
      rule_template_id: 4,
      name: 'Sub23',
      type: 'edad',
      condition: 'menores de',
      age: 23,
      max_players: 5,
    })
  })

  it('requires age condition fields only when type is edad', async () => {
    const wrapper = await mountSuspended(TournamentRuleFormDialog, {
      props: {
        modelValue: true,
        mode: 'create',
        initialRule: null,
        templates: [],
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          'v-text-field': VTextFieldStub,
          'v-select': VSelectStub,
          'v-card-actions': { template: '<div><slot /></div>' },
        },
      },
    })

    await wrapper.get('[data-testid="tournament-rule-name"]').setValue('Regla libre')
    await wrapper.get('[data-testid="tournament-rule-max-players"]').setValue('2')

    const typeSelect = wrapper.get('[data-testid="tournament-rule-type"]')
    await typeSelect.setValue('edad')

    const saveButton = wrapper.get('[data-testid="tournament-rule-save"]')
    expect(saveButton.attributes('disabled')).toBeDefined()

    await wrapper.get('[data-testid="tournament-rule-condition"]').setValue('menores de')
    await wrapper.get('[data-testid="tournament-rule-age"]').setValue('21')

    expect(saveButton.attributes('disabled')).toBeUndefined()
  })
})
