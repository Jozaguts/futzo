import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import EquipoDetallePage from '~/pages/equipos/[equipo]/index.vue'

const { getTeamFormationMock, getTeamRegistrationQRCodeMock } = vi.hoisted(() => ({
  getTeamFormationMock: vi.fn(() => ({ name: '4-4-2' })),
  getTeamRegistrationQRCodeMock: vi.fn(() => Promise.resolve({ image: 'data:image/png;base64,mock' })),
}))
const routerPush = vi.fn()
const clipboardWriteText = vi.fn()

const homeTeam = ref({
  id: 10,
  name: 'Águilas FC',
  slug: 'aguilas-fc',
  register_link: 'http://testing.futzo.test/equipos/aguilas-fc/jugadores/inscripcion',
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
  getTeamFormation: getTeamFormationMock,
  getTeamRegistrationQRCode: getTeamRegistrationQRCodeMock,
}))

vi.mock('~/utils/sort-formation', () => ({
  sortFormation: (formation: unknown) => formation,
}))

vi.mock('vuetify', () => ({
  useDisplay: () => ({ mobile: ref(false) }),
}))

mockNuxtImport('useTeamStore', () => () => teamStoreMock)
mockNuxtImport('usePlayerStore', () => () => playerStoreMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useRoute', () => () => ({ params: { equipo: 'aguilas-fc' } }))
mockNuxtImport('useRouter', () => () => ({ push: routerPush, back: vi.fn(), replace: vi.fn() }))
mockNuxtImport('useRuntimeConfig', () => () => ({ public: { baseUrl: 'http://testing.futzo.test' } }))
mockNuxtImport('useRequestURL', () => () => new URL('http://testing.futzo.test/equipos/aguilas-fc'))
mockNuxtImport('useToast', () => () => ({ toast }))

describe('Equipo detalle page', () => {
  beforeEach(() => {
    teamStoreMock.getTeam.mockClear()
    teamStoreMock.getFormations.mockClear()
    playerStoreMock.getDefaultLineupAvailableTeamPlayers.mockClear()
    getTeamRegistrationQRCodeMock.mockClear()
    routerPush.mockClear()
    toast.mockClear()
    clipboardWriteText.mockClear()
    Object.defineProperty(globalThis, 'navigator', {
      value: { clipboard: { writeText: clipboardWriteText } },
      configurable: true,
    })
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
          TournamentShareMenu: {
            emits: ['select'],
            template: `
              <div>
                <button data-testid="team-share-copy" @click="$emit('select', 'registration_link')"></button>
                <button data-testid="team-share-qr" @click="$emit('select', 'registration_qr')"></button>
              </div>
            `,
          },
          KpisMetricsSection: { template: '<div data-testid="team-detail-kpis-grid"></div>' },
          LinesupContainer: { template: '<div data-testid="linesup-container"></div>' },
          Icon: { template: '<i></i>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-tooltip': { template: '<div><slot :props="{}" /></div>' },
          'v-dialog': { template: '<div><slot /></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-alert': { template: '<div><slot /></div>' },
          'v-img': { template: '<div></div>' },
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
    expect(wrapper.find('[data-testid="team-share-copy"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="team-share-qr"]').exists()).toBe(true)
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

  it('handles registration share actions (copy link and qr)', async () => {
    const wrapper = await mountSuspended(EquipoDetallePage, {
      global: {
        stubs: {
          PageLayout: {
            template: '<div><slot name="app-bar" /><slot name="default" /><slot name="fab" /></div>',
          },
          AppBar: { template: '<div><slot name="buttons" /></div>' },
          CreateTeamDialog: { template: '<div></div>' },
          TournamentShareMenu: {
            emits: ['select'],
            template: `
              <div>
                <button data-testid="team-share-copy" @click="$emit('select', 'registration_link')"></button>
                <button data-testid="team-share-qr" @click="$emit('select', 'registration_qr')"></button>
              </div>
            `,
          },
          KpisMetricsSection: { template: '<div></div>' },
          LinesupContainer: { template: '<div></div>' },
          Icon: { template: '<i></i>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-tooltip': { template: '<div><slot :props="{}" /></div>' },
          'v-dialog': { template: '<div><slot /></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-alert': { template: '<div><slot /></div>' },
          'v-img': { template: '<div></div>' },
          'v-skeleton-loader': { template: '<div></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-icon': { template: '<i><slot /></i>' },
        },
      },
    })

    await wrapper.find('[data-testid="team-share-copy"]').trigger('click')
    expect(clipboardWriteText).toHaveBeenCalledWith('http://testing.futzo.test/equipos/aguilas-fc/jugadores/inscripcion')
    expect(toast).toHaveBeenCalledWith({ type: 'success', msg: 'Enlace de inscripción copiado' })

    await wrapper.find('[data-testid="team-share-qr"]').trigger('click')
    expect(getTeamRegistrationQRCodeMock).toHaveBeenCalledWith(10)
  })
})
