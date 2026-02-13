import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import EquipoDetallePage from '~/pages/equipos/[equipo]/index.vue'

const homeTeam = ref({
  id: 10,
  name: 'Águilas FC',
  short_name: 'AGU',
  image: '',
  coach: { name: 'Carlos Méndez' },
  president: { name: 'Luis Pérez' },
  tournament: { name: 'Inactivos 2026 Apertura' },
  matches_played: 8,
  wins: 5,
  draws: 2,
  losses: 1,
  goals_for: 18,
  goals_against: 8,
  goal_difference: 10,
  points: 17,
})

const formations = ref([{ id: 1, name: '4-4-2' }])
const homeFormation = ref({ name: '4-4-2' })
const homePlayers = ref([
  { player_id: 101, team_id: 10, name: 'Carlos Méndez', number: 10, position: 'Mediocampista' },
  { player_id: 102, team_id: 10, name: 'Mario Flores', number: 1, position: 'Portero' },
])

const teamStoreMock = {
  homeTeam,
  formations,
  homeFormation,
  homePlayers,
  getTeam: vi.fn(() => homeTeam.value),
  getFormations: vi.fn(() => formations.value),
  updateDefaultFormationType: vi.fn(() => Promise.resolve()),
  showTeamHandler: vi.fn(),
}

const playerStoreMock = {
  getDefaultLineupAvailableTeamPlayers: vi.fn(() => homePlayers.value),
}

const toast = vi.fn()

vi.mock('~/http/api/team', () => ({
  getTeamFormation: vi.fn(() => ({ name: '4-4-2' })),
}))

vi.mock('~/utils/sort-formation', () => ({
  sortFormation: (formation: unknown) => formation,
}))

mockNuxtImport('useTeamStore', () => () => teamStoreMock)
mockNuxtImport('usePlayerStore', () => () => playerStoreMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useRoute', () => () => ({ params: { equipo: 'aguilas-fc' } }))
mockNuxtImport('useRouter', () => () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn() }))
mockNuxtImport('useToast', () => () => ({ toast }))

describe('Equipo detalle page', () => {
  beforeEach(() => {
    teamStoreMock.getTeam.mockClear()
    teamStoreMock.getFormations.mockClear()
    playerStoreMock.getDefaultLineupAvailableTeamPlayers.mockClear()
    toast.mockClear()
  })

  it('renders clean layout with header, kpis, points, roster and field', async () => {
    const wrapper = await mountSuspended(EquipoDetallePage, {
      global: {
        stubs: {
          PageLayout: {
            template: '<div><slot name="app-bar" /><slot name="default" /><slot name="fab" /></div>',
          },
          AppBar: { template: '<div><slot name="buttons" /></div>' },
          CreateTeamDialog: { template: '<div></div>' },
          KpisMetricsSection: { template: '<div data-testid="team-detail-kpis-grid"></div>' },
          LinesupContainer: { template: '<div data-testid="linesup-container"></div>' },
          Icon: { template: '<i></i>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-skeleton-loader': { template: '<div></div>' },
          'v-fab': { template: '<button><slot /></button>' },
          'v-speed-dial': { template: '<div><slot /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-icon': { template: '<i><slot /></i>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="team-detail-page"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-detail-header"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Águilas FC')
    expect(wrapper.text()).toContain('Cap: Carlos Méndez')
    expect(wrapper.find('[data-testid="team-detail-kpis-grid"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-detail-points"]').text()).toContain('17')
    expect(wrapper.find('[data-testid="team-detail-actions"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Editar equipo')
    expect(wrapper.find('[data-testid="team-detail-workspace"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-roster-list"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-field-wrapper"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="linesup-container"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-detail-history"]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Próximos partidos')
    expect(wrapper.text()).not.toContain('Partidos jugados')
    expect(teamStoreMock.getTeam).toHaveBeenCalledWith('aguilas-fc')
  })
})
