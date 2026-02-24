import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import TournamentRulesSettings from '~/components/pages/configuration/tournament-rules-settings.vue'

const toast = vi.fn()

vi.mock('~/composables/useToast', () => ({
  useToast: () => ({ toast }),
}))

const settingsApi = vi.hoisted(() => ({
  getTournamentRuleTemplates: vi.fn(),
  getTournamentRules: vi.fn(),
  syncTournamentRules: vi.fn(),
}))

vi.mock('~/http/api/settings', () => ({
  getTournamentRuleTemplates: settingsApi.getTournamentRuleTemplates,
  getTournamentRules: settingsApi.getTournamentRules,
  syncTournamentRules: settingsApi.syncTournamentRules,
}))

const RuleDialogStub = defineComponent({
  name: 'TournamentRuleFormDialog',
  props: {
    modelValue: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'submit'],
  setup(_props, { emit }) {
    return () =>
      h('div', [
        h(
          'button',
          {
            type: 'button',
            'data-testid': 'dialog-submit',
            onClick: () =>
              emit('submit', {
                rule_template_id: 4,
                name: 'Sub23',
                type: 'edad',
                condition: 'menores de',
                age: 23,
                max_players: 5,
              }),
          },
          'submit'
        ),
      ])
  },
})

describe('TournamentRulesSettings', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    toast.mockReset()
    ;(window as any).confirm = vi.fn(() => true)

    settingsApi.getTournamentRuleTemplates.mockReset()
    settingsApi.getTournamentRules.mockReset()
    settingsApi.syncTournamentRules.mockReset()

    settingsApi.getTournamentRuleTemplates.mockResolvedValue([
      { id: 1, name: 'Foráneos', type: 'cantidad', condition: null, age: null },
      { id: 4, name: 'Sub23', type: 'edad', condition: 'menores de', age: 23 },
    ])

    settingsApi.getTournamentRules.mockResolvedValue([
      {
        id: 10,
        tournament_id: 55,
        rule_template_id: 1,
        name: 'Foráneos',
        type: 'cantidad',
        condition: null,
        age: null,
        max_players: 2,
      },
    ])
  })

  it('loads templates and rules for selected tournament', async () => {
    const wrapper = await mountSuspended(TournamentRulesSettings, {
      props: {
        tournamentId: 55,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          TournamentRuleFormDialog: RuleDialogStub,
          'v-table': { template: '<table><slot /></table>' },
          'v-skeleton-loader': { template: '<div />' },
        },
      },
    })

    await flushPromises()

    expect(settingsApi.getTournamentRuleTemplates).toHaveBeenCalledTimes(1)
    expect(settingsApi.getTournamentRules).toHaveBeenCalledWith(55)
    expect(wrapper.text()).toContain('Foráneos')
    expect(wrapper.text()).toContain('Cantidad')
  })

  it('syncs complete payload when adding a rule', async () => {
    settingsApi.syncTournamentRules.mockResolvedValue([
      {
        id: 10,
        tournament_id: 55,
        rule_template_id: 1,
        name: 'Foráneos',
        type: 'cantidad',
        condition: null,
        age: null,
        max_players: 2,
      },
      {
        id: 11,
        tournament_id: 55,
        rule_template_id: 4,
        name: 'Sub23',
        type: 'edad',
        condition: 'menores de',
        age: 23,
        max_players: 5,
      },
    ])

    const wrapper = await mountSuspended(TournamentRulesSettings, {
      props: {
        tournamentId: 55,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          TournamentRuleFormDialog: RuleDialogStub,
          'v-table': { template: '<table><slot /></table>' },
          'v-skeleton-loader': { template: '<div />' },
        },
      },
    })

    await flushPromises()

    await wrapper.find('[data-testid="tournament-rules-add"]').trigger('click')
    await wrapper.find('[data-testid="dialog-submit"]').trigger('click')
    await flushPromises()

    expect(settingsApi.syncTournamentRules).toHaveBeenCalledWith(55, {
      rules: [
        {
          id: 10,
          rule_template_id: 1,
          name: 'Foráneos',
          type: 'cantidad',
          condition: null,
          age: null,
          max_players: 2,
        },
        {
          rule_template_id: 4,
          name: 'Sub23',
          type: 'edad',
          condition: 'menores de',
          age: 23,
          max_players: 5,
        },
      ],
    })
  })

  it('syncs remaining rules when deleting one', async () => {
    settingsApi.syncTournamentRules.mockResolvedValue([])

    const wrapper = await mountSuspended(TournamentRulesSettings, {
      props: {
        tournamentId: 55,
      },
      global: {
        stubs: {
          ...vuetifyStubs,
          TournamentRuleFormDialog: RuleDialogStub,
          'v-table': { template: '<table><slot /></table>' },
          'v-skeleton-loader': { template: '<div />' },
        },
      },
    })

    await flushPromises()

    await wrapper.find('[data-testid="tournament-rules-delete-10"]').trigger('click')
    await flushPromises()

    expect(settingsApi.syncTournamentRules).toHaveBeenCalledWith(55, {
      rules: [],
    })
  })
})
