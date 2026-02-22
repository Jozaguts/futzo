import {beforeEach, describe, expect, it, vi} from 'vitest'
import {defineComponent, h, ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp, vuetifyStubs} from '../../../utils/vuetify-stubs'
import TeamsTable from '~/components/pages/equipos/teams-table.vue'

const getTeamsMock = vi.fn()
const pushMock = vi.fn()
const toastMock = vi.fn()
const getLeagueLocationsMock = vi.hoisted(() => vi.fn(async () => []))
const getTeamRegistrationQRCodeMock = vi.hoisted(() => vi.fn(async () => ({ image: 'data:image/png;base64,mock' })))
const updateHomePreferencesMock = vi.hoisted(() => vi.fn(async () => undefined))
const clipboardWriteTextMock = vi.hoisted(() => vi.fn(async () => undefined))

const teams = ref([
  {
    id: 1,
    name: 'Águilas FC',
    slug: 'aguilas-fc',
    register_link: 'https://futzo.test/equipos/aguilas/registro',
    short_name: 'AGU',
    players_count: 9,
    matches_played: 8,
    points: 17,
    goal_difference: 10,
    colors: { home: { primary: '#ef4444', secondary: '#111827' }, away: { primary: '#ffffff', secondary: '#111827' } },
    home_preferences: { location_id: null, location: null, day_of_week: null, day_label: null, start_time: null },
    tournament: { id: 10, name: 'Inactivos 2026', status: 'en curso' },
    tournaments: [{ id: 10, name: 'Inactivos 2026', status: 'en curso' }],
  },
] as any[])

const pagination = ref({
  current_page: 1,
  per_page: 15,
  last_page: 2,
  total: 20,
  sort: 'asc',
})

mockNuxtImport('useTeamStore', () => () => ({
  teams,
  pagination,
  getTeams: getTeamsMock,
}))
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: vi.fn() }))
mockNuxtImport('useToast', () => () => ({ toast: toastMock }))

vi.mock('~/stores/useLeaguesStore', () => ({
  useLeaguesStore: () => ({
    getLeagueLocations: getLeagueLocationsMock,
  }),
}))

vi.mock('~/http/api/team', () => ({
  getTeamRegistrationQRCode: getTeamRegistrationQRCodeMock,
  updateHomePreferences: updateHomePreferencesMock,
}))

const TooltipStub = defineComponent({
  name: 'VTooltip',
  setup(_, { slots }) {
    return () => h('div', { class: 'v-tooltip-stub' }, slots.activator ? slots.activator({ props: {} }) : undefined)
  },
})

const PaginationStub = defineComponent({
  name: 'VPagination',
  props: {
    modelValue: { type: Number, default: 1 },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return () => h('button', { 'data-testid': 'teams-pagination-next', onClick: () => emit('update:modelValue', 2) }, 'next')
  },
})

describe('TeamsTable', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getTeamsMock.mockReset()
    pushMock.mockReset()
    toastMock.mockReset()
    getLeagueLocationsMock.mockClear()
    getTeamRegistrationQRCodeMock.mockClear()
    updateHomePreferencesMock.mockClear()
    clipboardWriteTextMock.mockClear()
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: { writeText: clipboardWriteTextMock },
    })
    teams.value = [
      {
        id: 1,
        name: 'Águilas FC',
        slug: 'aguilas-fc',
        register_link: 'https://futzo.test/equipos/aguilas/registro',
        short_name: 'AGU',
        players_count: 9,
        matches_played: 8,
        points: 17,
        goal_difference: 10,
        colors: { home: { primary: '#ef4444', secondary: '#111827' }, away: { primary: '#ffffff', secondary: '#111827' } },
        home_preferences: { location_id: null, location: null, day_of_week: null, day_label: null, start_time: null },
        tournament: { id: 10, name: 'Inactivos 2026', status: 'en curso' },
        tournaments: [{ id: 10, name: 'Inactivos 2026', status: 'en curso' }],
      },
    ] as any
    pagination.value = {
      current_page: 1,
      per_page: 15,
      last_page: 2,
      total: 20,
      sort: 'asc',
    } as any
  })

  it('renders card rows and quick actions', async () => {
    const wrapper = await mountSuspended(TeamsTable, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i></i>' },
          InitialsAvatar: { template: '<div data-testid="initials-avatar"></div>' },
          'v-tooltip': TooltipStub,
          'v-divider': { template: '<div></div>' },
          'v-pagination': PaginationStub,
          'v-avatar': { template: '<div></div>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-time-picker': { template: '<div></div>' },
          'v-img': { template: '<img />' },
          'v-alert': { template: '<div><slot /></div>' },
        },
      },
    })

    expect(wrapper.findAll('[data-testid="team-row-card"]')).toHaveLength(1)
    expect(wrapper.text()).toContain('Águilas FC')
    expect(wrapper.text()).toContain('PJ')
    expect(wrapper.text()).toContain('PTS')
    expect(wrapper.text()).toContain('DG')
    expect(wrapper.find('[data-testid="team-action-view"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-action-link"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-action-qr"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-action-assign"]').exists()).toBe(true)
  })

  it('copies registration link and paginates', async () => {
    const wrapper = await mountSuspended(TeamsTable, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i></i>' },
          InitialsAvatar: { template: '<div data-testid="initials-avatar"></div>' },
          'v-tooltip': TooltipStub,
          'v-divider': { template: '<div></div>' },
          'v-pagination': PaginationStub,
          'v-avatar': { template: '<div></div>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-time-picker': { template: '<div></div>' },
          'v-img': { template: '<img />' },
          'v-alert': { template: '<div><slot /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="team-action-link"]').trigger('click')
    expect(clipboardWriteTextMock).toHaveBeenCalledWith('https://futzo.test/equipos/aguilas/registro')
    expect(toastMock).toHaveBeenCalled()

    await wrapper.find('[data-testid="teams-pagination-next"]').trigger('click')
    expect(getTeamsMock).toHaveBeenCalled()
  })
})
