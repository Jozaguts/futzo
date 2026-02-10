import { describe, it, expect, vi, beforeAll } from 'vitest'
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
    progress: { percent: 40, label: '18/45' },
  },
])

const pagination = ref({ current_page: 1, per_page: 10, last_page: 1 })
const search = ref('')
const tournamentId = ref<number | undefined>()
const tournament = ref({})
const noTournaments = ref(false)

const loadTournaments = vi.fn()

mockNuxtImport('useTournamentStore', () => () => ({
  noTournaments,
  tournaments,
  tournamentId,
  tournament,
  pagination,
  search,
  loadTournaments,
}))

mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useRouter', () => () => ({ push: vi.fn() }))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: { value: false } }),
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

const TableStub = defineComponent({
  name: 'Table',
  props: {
    items: { type: Array, default: () => [] },
    statusHandler: { type: Function, default: null },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        { class: 'table-stub' },
        (props.items as any[]).map((item) =>
          h('div', { class: 'table-row' }, [
            slots.name?.(item),
            h('div', item.format_label),
            h('div', item.football_type_label),
            h('div', String(item.teams_count ?? item.teams)),
            h('div', String(item.players_count ?? item.players)),
            h('div', item.progress?.label ?? ''),
            h('div', (props.statusHandler ? props.statusHandler(item.status)?.label : item.status) ?? ''),
            slots.actions?.({ item }),
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

  it('renders progress, status, and action icons', async () => {
    const wrapper = await mountSuspended(TournamentTable, {
      global: {
        stubs: {
          ...vuetifyStubs,
          Table: TableStub,
          CopyLink: CopyLinkStub,
          Icon: iconStub,
          'v-tooltip': TooltipStub,
          'v-avatar': { template: '<div></div>' },
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
})
