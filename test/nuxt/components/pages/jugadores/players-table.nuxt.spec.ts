import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import PlayersTable from '~/components/pages/jugadores/players-table.vue'

const pushMock = vi.fn()
const openPlayerEditionMock = vi.fn()
const getPlayersMock = vi.fn()

const players = ref<any[]>([])
const playerId = ref<number | undefined>(undefined)
const showAssignTeam = ref(false)
const noPlayers = ref(false)
const pagination = ref({
  current_page: 1,
  per_page: 10,
  last_page: 1,
})
const teams = ref<any[]>([{ id: 1, name: 'Aguilas FC' }])

mockNuxtImport('usePlayerStore', () => () => ({
  players,
  playerId,
  pagination,
  showAssignTeam,
  noPlayers,
  openPlayerEdition: openPlayerEditionMock,
  getPlayers: getPlayersMock,
}))

mockNuxtImport('useTeamStore', () => () => ({
  teams,
}))

mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: vi.fn() }))

const InitialsAvatarStub = defineComponent({
  name: 'InitialsAvatar',
  props: {
    image: { type: [String, null], default: '' },
    name: { type: String, default: '' },
    initials: { type: String, default: '' },
    fallbackColor: { type: String, default: '' },
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () =>
      h('div', {
        'data-testid': 'player-avatar',
        'data-image': String(props.image ?? ''),
        'data-name': props.name,
        'data-initials': props.initials,
        'data-color': props.fallbackColor,
        'data-size': String(attrs.size ?? ''),
        'data-rounded': String(attrs.rounded ?? ''),
      })
  },
})

describe('PlayersTable', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    pushMock.mockReset()
    openPlayerEditionMock.mockReset()
    getPlayersMock.mockReset()
    playerId.value = undefined
    showAssignTeam.value = false
    noPlayers.value = false
    players.value = [
      {
        id: 10,
        name: 'Carlos',
        last_name: 'Mendez',
        image: null,
        user: { image: null },
        number: 9,
        team: { id: null, name: null, colors: { home: { primary: '#ef4444' } } },
        position: { name: 'Delantero' },
        stats: { goals: 5, assists: 2, yellow_cards: 1, red_cards: 0 },
      },
    ]
  })

  it('renders shared avatar style and keeps player actions', async () => {
    const wrapper = await mountSuspended(PlayersTable, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i></i>' },
          InitialsAvatar: InitialsAvatarStub,
          'v-divider': { template: '<div></div>' },
          'v-pagination': { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="player-row-card"]').exists()).toBe(true)
    const avatar = wrapper.find('[data-testid="player-avatar"]')
    expect(avatar.exists()).toBe(true)
    expect(avatar.attributes('data-size')).toBe('42')
    expect(avatar.attributes('data-rounded')).toBe('lg')
    expect(avatar.attributes('data-color')).toBe('#ef4444')

    const assignButton = wrapper.find('[data-testid="player-action-assign-team"]')
    expect(assignButton.exists()).toBe(true)
    await assignButton.trigger('click')
    expect(playerId.value).toBe(10)
    expect(showAssignTeam.value).toBe(true)
  })
})
