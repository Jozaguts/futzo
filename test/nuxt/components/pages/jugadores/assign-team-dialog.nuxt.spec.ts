import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import AssignTeamDialog from '~/components/pages/jugadores/assign-team-dialog.vue'

const showAssignTeam = ref(true)
const playerId = ref<number | null>(10)
const players = ref<any[]>([{ id: 10, birthdate: '2008-01-01' }])
const player = ref<any>(null)
const tournamentRulesByTeam = ref<any>({
  teamId: null,
  tournamentId: null,
  rules: [],
  complianceSummary: null,
})
const isTournamentRulesLoading = ref(false)

const listTeamsMock = vi.fn()
const fetchRulesByTeamMock = vi.fn()
const assignPlayerToTeamMock = vi.fn()
const getPlayerMock = vi.fn()

const teams = ref<any[]>([
  { id: 1, name: 'Leones' },
  { id: 2, name: 'Tigres' },
])

mockNuxtImport('usePlayerStore', () => () => ({
  showAssignTeam,
  playerId,
  players,
  player,
  tournamentRulesByTeam,
  isTournamentRulesLoading,
  fetchTournamentRulesValidationByTeam: fetchRulesByTeamMock,
  assignPlayerToTeam: assignPlayerToTeamMock,
  getPlayer: getPlayerMock,
}))

mockNuxtImport('useTeamStore', () => () => ({
  teams,
  list: listTeamsMock,
}))

mockNuxtImport('storeToRefs', () => (store: any) => store)

const DialogStub = defineComponent({
  name: 'DialogStub',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(_props, { slots }) {
    return () => h('div', [slots['v-card-text']?.(), slots.actions?.()])
  },
})

const VAutocompleteStub = defineComponent({
  name: 'VAutocompleteStub',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    return () =>
      h('input', {
        ...attrs,
        value: props.modelValue ?? '',
        onInput: (event: Event) => {
          const value = Number((event.target as HTMLInputElement).value)
          emit('update:modelValue', Number.isFinite(value) && value > 0 ? value : null)
        },
      })
  },
})

const VSwitchStub = defineComponent({
  name: 'VSwitchStub',
  props: ['label', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          onClick: () => emit('update:modelValue', !props.modelValue),
        },
        String(props.label ?? '')
      )
  },
})

describe('AssignTeamDialog', () => {
  beforeEach(() => {
    showAssignTeam.value = true
    playerId.value = 10
    players.value = [{ id: 10, birthdate: '2008-01-01' }]
    player.value = null
    tournamentRulesByTeam.value = {
      teamId: null,
      tournamentId: null,
      rules: [{ id: 21, name: 'Foráneos', type: 'cantidad', condition: null, age: null, max_players: 3 }],
      complianceSummary: {},
    }
    isTournamentRulesLoading.value = false
    listTeamsMock.mockReset()
    fetchRulesByTeamMock.mockReset()
    fetchRulesByTeamMock.mockResolvedValue(null)
    assignPlayerToTeamMock.mockReset()
    assignPlayerToTeamMock.mockResolvedValue(true)
    getPlayerMock.mockReset()
    getPlayerMock.mockResolvedValue(undefined)
  })

  it('loads teams and fetches rules when team changes', async () => {
    const wrapper = await mountSuspended(AssignTeamDialog, {
      global: {
        stubs: {
          Dialog: DialogStub,
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-autocomplete': VAutocompleteStub,
          'v-switch': VSwitchStub,
          'v-btn': { template: '<button type="button" @click="$emit(\'click\')"><slot /></button>' },
        },
      },
    })

    await flushPromises()
    expect(listTeamsMock).toHaveBeenCalled()

    const teamInput = wrapper.get('[data-testid="assign-team-select"]')
    await teamInput.setValue('2')
    await flushPromises()

    expect(fetchRulesByTeamMock).toHaveBeenCalledWith(2)
  })

  it('sends tournament rule selection when confirming assignment', async () => {
    const wrapper = await mountSuspended(AssignTeamDialog, {
      global: {
        stubs: {
          Dialog: DialogStub,
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-autocomplete': VAutocompleteStub,
          'v-switch': VSwitchStub,
          'v-btn': { template: '<button type="button" @click="$emit(\'click\')"><slot /></button>' },
        },
      },
    })

    await wrapper.get('[data-testid="assign-team-select"]').setValue('2')
    await flushPromises()

    await wrapper.get('[data-testid="assign-team-rule-21"]').trigger('click')
    await flushPromises()

    await wrapper.get('[data-testid="assign-team-confirm"]').trigger('click')
    await flushPromises()

    expect(assignPlayerToTeamMock).toHaveBeenCalledWith({
      teamId: 2,
      playerId: 10,
      birthdate: '2008-01-01',
      tournamentRuleId: 21,
    })
    expect(showAssignTeam.value).toBe(false)
  })
})
