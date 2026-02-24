import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import TournamentsSettingsCard from '~/components/pages/configuration/tournaments-settings-card.vue'

const tournamentsRef = vi.hoisted(() => ({ value: [{ id: 55, name: 'Apertura 2026' }] as any[] }))
const formatsRef = vi.hoisted(() => ({ value: [] as any[] }))
const footballTypesRef = vi.hoisted(() => ({ value: [] as any[] }))

const fetchTournamentsMock = vi.hoisted(() => vi.fn(async () => undefined))
const fetchFormatsMock = vi.hoisted(() => vi.fn(async () => undefined))
const getFootballTypesMock = vi.hoisted(() => vi.fn(async () => undefined))

mockNuxtImport('useTournamentStore', () => () => ({
  __refs: {
    tournaments: tournamentsRef,
  },
  fetchTournamentsByLeagueId: fetchTournamentsMock,
}))

mockNuxtImport('useCategoryStore', () => () => ({
  __refs: {
    formats: formatsRef,
  },
  fetchFormats: fetchFormatsMock,
}))

mockNuxtImport('useLeaguesStore', () => () => ({
  __refs: {
    footballTypes: footballTypesRef,
  },
  getFootballTypes: getFootballTypesMock,
}))

mockNuxtImport('storeToRefs', () => (store: { __refs?: Record<string, any> }) => store.__refs ?? {})

const settingsApi = vi.hoisted(() => ({
  getTournamentConfiguration: vi.fn(),
  updateTournamentConfiguration: vi.fn(),
}))

vi.mock('~/http/api/settings', () => ({
  getTournamentConfiguration: settingsApi.getTournamentConfiguration,
  updateTournamentConfiguration: settingsApi.updateTournamentConfiguration,
}))

const VListItemStub = defineComponent({
  name: 'StubVListItem',
  props: {
    active: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(props, { slots, emit, attrs }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          class: ['v-list-item', props.active ? 'v-list-item--active' : null],
          onClick: (event: MouseEvent) => emit('click', event),
        },
        slots.default ? slots.default() : undefined
      )
  },
})

describe('TournamentsSettingsCard', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    fetchTournamentsMock.mockClear()
    fetchFormatsMock.mockClear()
    getFootballTypesMock.mockClear()
    settingsApi.getTournamentConfiguration.mockReset()
    settingsApi.updateTournamentConfiguration.mockReset()

    settingsApi.getTournamentConfiguration.mockResolvedValue({
      tournament_id: 55,
      tournament_format_id: null,
      football_type_id: null,
      substitutions_per_team: null,
      max_teams: null,
      min_teams: null,
      time_between_games: null,
      max_players_per_team: null,
      min_players_per_team: null,
      max_teams_per_player: null,
      player_lock_duration_days: null,
      requires_player_verification: false,
      player_verification_method: null,
      game_time: null,
      round_trip: false,
      group_stage: false,
      elimination_round_trip: false,
    })
  })

  it('shows renamed section label and renders rules section', async () => {
    const wrapper = await mountSuspended(TournamentsSettingsCard, {
      global: {
        stubs: {
          ...vuetifyStubs,
          TransitionFade: { template: '<div><slot /></div>' },
          TournamentRulesSettings: { template: '<div data-testid="tournament-rules-section" />' },
          BaseInput: { template: '<div><slot name="input" /></div>' },
          'v-navigation-drawer': { template: '<aside><slot /><slot name="append" /></aside>' },
          'v-main': { template: '<main><slot /></main>' },
          'v-list': { template: '<div><slot /></div>' },
          'v-list-item': VListItemStub,
          'v-list-item-title': { template: '<span><slot /></span>' },
          'v-card-item': { template: '<div><slot /></div>' },
          'v-form': { template: '<form><slot /></form>' },
          'v-text-field': { template: '<input />' },
          'v-switch': { template: '<input type="checkbox" />' },
          'v-select': { template: '<select />' },
          'v-btn': vuetifyStubs['v-btn'],
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Configuración')
    expect(wrapper.text()).toContain('Reglas')
    expect(wrapper.text()).not.toContain('Reglas base')

    const rulesButton = wrapper.findAll('button').find((item) => item.text().includes('Reglas'))
    expect(rulesButton).toBeTruthy()

    await rulesButton?.trigger('click')
    await flushPromises()

    expect(wrapper.find('[data-testid="tournament-rules-section"]').exists()).toBe(true)
  })
})
