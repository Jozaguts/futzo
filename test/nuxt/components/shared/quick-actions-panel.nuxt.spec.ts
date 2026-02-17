import {describe, expect, it} from 'vitest'
import {defineComponent} from 'vue'
import {mountSuspended} from '@nuxt/test-utils/runtime'
import QuickActionsPanel from '~/components/shared/quick-actions-panel.vue'

const PrimaryBtnStub = defineComponent({
  name: 'PrimaryBtn',
  props: {
    text: { type: String, required: true },
  },
  emits: ['click'],
  template: `
    <button type="button" v-bind="$attrs" @click="$emit('click')">
      {{ text }}
    </button>
  `,
})

const SecondaryBtnStub = defineComponent({
  name: 'SecondaryBtn',
  props: {
    text: { type: String, required: true },
  },
  emits: ['btn-click'],
  template: `
    <button type="button" v-bind="$attrs" @click="$emit('btn-click')">
      {{ text }}
    </button>
  `,
})

describe('QuickActionsPanel', () => {
  it('renders actions and emits selected action id', async () => {
    const wrapper = await mountSuspended(QuickActionsPanel, {
      props: {
        title: 'Acciones Rápidas',
        primaryActionId: 'create_tournament',
        actions: [
          { id: 'create_tournament', label: 'Nuevo torneo', icon: 'lucide:trophy', testId: 'action-primary' },
          { id: 'add_team', label: 'Agregar Equipo', icon: 'lucide:shirt', testId: 'action-secondary' },
        ],
      },
      global: {
        stubs: {
          PrimaryBtn: PrimaryBtnStub,
          SecondaryBtn: SecondaryBtnStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Acciones Rápidas')
    expect(wrapper.find('[data-testid="action-primary"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="action-secondary"]').exists()).toBe(true)

    await wrapper.find('[data-testid="action-primary"]').trigger('click')
    await wrapper.find('[data-testid="action-secondary"]').trigger('click')

    expect(wrapper.emitted('action')?.[0]).toEqual(['create_tournament'])
    expect(wrapper.emitted('action')?.[1]).toEqual(['add_team'])
  })
})
