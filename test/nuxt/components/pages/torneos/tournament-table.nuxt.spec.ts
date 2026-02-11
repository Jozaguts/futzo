import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { ref, defineComponent, h } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs, iconStub } from '../../../utils/vuetify-stubs'
import TournamentTable from '~/components/pages/torneos/tournament-table.vue'

const tournaments = ref([
  {
    id: 1,
    name: 'Liga Primavera 2026',
    slug: 'liga-primavera',
    status: 'en curso',
    format_label: 'Liga',
    football_type_label: 'Fútbol 7',
    teams_count: 10,
    players_count: 87,
    games_progress: { percent: 40, label: '18/45', played: 18, total: 45 },
    progress: { percent: 40, label: '18/45' },
  },
])

const pagination = ref({ current_page: 1, per_page: 10, last_page: 1 })
const search = ref('')
const tournamentId = ref<number | undefined>()
const tournament = ref({})
const noTournaments = ref(false)
const isMobile = ref(false)
const loading = ref(false)

const loadTournaments = vi.fn()

mockNuxtImport('useTournamentStore', () => () => ({
  noTournaments,
  tournaments,
  tournamentId,
  tournament,
  pagination,
  search,
  loading,
  loadTournaments,
}))

mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useRouter', () => () => ({ push: vi.fn(), replace: vi.fn() }))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: isMobile }),
}))

const CopyLinkStub = defineComponent({
  name: 'CopyLink',
  props: {
    iconOnly: { type: Boolean, default: false },
  },
  setup(props) {
    return () => h('button', { 'data-testid': 'copy-link', 'data-icon-only': String(props.iconOnly) })
  },
})

const EasyDataTableStub = defineComponent({
  name: 'Vue3EasyDataTable',
  props: {
    items: { type: Array, default: () => [] },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        { class: 'easy-data-table-stub' },
        (props.items as any[]).map((item) =>
          h('div', { class: 'easy-row' }, [
            slots['item-name']?.(item),
            slots['item-format_label']?.(item),
            slots['item-football_type_label']?.(item),
            slots['item-teams_count']?.(item),
            slots['item-players_count']?.(item),
            slots['item-progress']?.(item),
            slots['item-status']?.(item),
            slots['item-actions']?.(item),
          ])
        )
      )
  },
})

const TooltipStub = defineComponent({
  name: 'VTooltip',
  setup(_, { slots }) {
    return () => h('div', { class: 'v-tooltip' }, slots.activator ? slots.activator({ props: {} }) : undefined)
  },
})

describe('TournamentTable', () => {
  beforeAll(() => {
    ensureVuetifyApp()
  })

  beforeEach(() => {
    tournaments.value = [
      {
        id: 1,
        name: 'Liga Primavera 2026',
        slug: 'liga-primavera',
        status: 'en curso',
        format_label: 'Liga',
        football_type_label: 'Fútbol 7',
        teams_count: 10,
        players_count: 87,
        games_progress: { percent: 40, label: '18/45', played: 18, total: 45 },
        progress: { percent: 40, label: '18/45' },
      },
    ]
    noTournaments.value = false
    loading.value = false
  })

  it('renders progress, status, and action icons', async () => {
    const wrapper = await mountSuspended(TournamentTable, {
      global: {
        stubs: {
          ...vuetifyStubs,
          ClientOnly: { template: '<div><slot /></div>' },
          Vue3EasyDataTable: EasyDataTableStub,
          CopyLink: CopyLinkStub,
          Icon: iconStub,
          'v-tooltip': TooltipStub,
          'v-avatar': { template: '<div></div>' },
          'v-chip': { template: '<div><slot /></div>' },
          'v-progress-linear': { template: '<div></div>' },
          'v-skeleton-loader': { template: '<div data-testid="tournament-table-skeleton"></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-img': { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Liga Primavera 2026')
    expect(wrapper.text()).toContain('Liga')
    expect(wrapper.text()).toContain('Fútbol 7')
    expect(wrapper.text()).toContain('18/45')
    expect(wrapper.text()).toContain('Activo')

    const copyLink = wrapper.find('[data-testid="copy-link"]')
    expect(copyLink.exists()).toBe(true)
    expect(copyLink.attributes('data-icon-only')).toBe('true')
  })

  it('renders skeleton while loading without items', async () => {
    tournaments.value = []
    noTournaments.value = true
    loading.value = true

    const wrapper = await mountSuspended(TournamentTable, {
      global: {
        stubs: {
          ...vuetifyStubs,
          ClientOnly: { template: '<div><slot /></div>' },
          Vue3EasyDataTable: EasyDataTableStub,
          CopyLink: CopyLinkStub,
          Icon: iconStub,
          'v-tooltip': TooltipStub,
          'v-avatar': { template: '<div></div>' },
          'v-chip': { template: '<div><slot /></div>' },
          'v-progress-linear': { template: '<div></div>' },
          'v-skeleton-loader': { template: '<div data-testid="tournament-table-skeleton"></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-img': { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="tournament-table-skeleton"]').exists()).toBe(true)
    expect(wrapper.find('.easy-data-table-stub').exists()).toBe(false)
  })
})
