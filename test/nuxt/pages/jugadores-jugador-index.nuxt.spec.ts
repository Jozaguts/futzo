import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp} from '../utils/vuetify-stubs'
import JugadorDetailPage from '~/pages/jugadores/[jugador]/index.vue'

const getPlayer = vi.fn(async () => {})
const updatePlayer = vi.fn(async () => {})
const uploadVerification = vi.fn(async () => {})
const approveVerification = vi.fn(async () => {})
const rejectVerification = vi.fn(async () => {})
const releasePlayer = vi.fn(async () => {})
const fetchPositions = vi.fn(async () => {})
const isPlayerRoleRef = ref(false)
const canManageSensitivePlayerActionsRef = ref(true)

const playerStoreMock = {
  getPlayer,
  updatePlayer,
  uploadVerification,
  approveVerification,
  rejectVerification,
  releasePlayer,
  player: ref({
    id: 10,
    name: 'Carlos',
    last_name: 'Mendez',
    image: '',
    birthdate: '2000-01-10',
    phone: '5555555555',
    email: 'carlos@futzo.io',
    number: 9,
    position: { id: 1, name: 'Delantero' },
    team: { id: 1, name: 'Aguilas FC', category: { name: 'Libre' }, tournament: { id: 2, name: 'Apertura 2026' } },
    stats: { goals: 6, assists: 2 },
  }),
}

const positionsStoreMock = {
  fetchPositions,
  positions: ref([{ id: 1, name: 'Delantero' }]),
}

mockNuxtImport('usePlayerStore', () => () => playerStoreMock)
mockNuxtImport('usePositionsStore', () => () => positionsStoreMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useRoute', () => () => ({ params: { jugador: '10' } }))
mockNuxtImport('useRouter', () => () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }))
mockNuxtImport('useRoleAccess', () => () => ({
  isPlayerRole: isPlayerRoleRef,
  canManageSensitivePlayerActions: canManageSensitivePlayerActionsRef,
}))

describe('Jugador detail page', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getPlayer.mockClear()
    fetchPositions.mockClear()
    isPlayerRoleRef.value = false
    canManageSensitivePlayerActionsRef.value = true
  })

  it('renders player detail shell and loads player data', async () => {
    const wrapper = await mountSuspended(JugadorDetailPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot /></div>' },
          AppBar: { template: '<div></div>' },
          Icon: { template: '<i></i>' },
          'v-skeleton-loader': { template: '<div></div>' },
          'v-empty-state': { template: '<div></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-avatar': { template: '<div><slot /></div>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-divider': { template: '<hr />' },
          'v-file-input': { template: '<input />' },
          'v-select': { template: '<select></select>' },
          'v-text-field': { template: '<input />' },
          'v-textarea': { template: '<textarea></textarea>' },
          'v-dialog': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="jugador-detail-page"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="jugador-detail-hero"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Carlos Mendez')
    expect(wrapper.text()).toContain('Delantero')
    expect(getPlayer).toHaveBeenCalledWith('10')
  })

  it('hides verification and transfer cards for player role', async () => {
    isPlayerRoleRef.value = true
    canManageSensitivePlayerActionsRef.value = false

    const wrapper = await mountSuspended(JugadorDetailPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot /></div>' },
          AppBar: { template: '<div></div>' },
          Icon: { template: '<i></i>' },
          'v-skeleton-loader': { template: '<div></div>' },
          'v-empty-state': { template: '<div></div>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-avatar': { template: '<div><slot /></div>' },
          'v-chip': { template: '<span><slot /></span>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-divider': { template: '<hr />' },
          'v-file-input': { template: '<input />' },
          'v-select': { template: '<select></select>' },
          'v-text-field': { template: '<input />' },
          'v-textarea': { template: '<textarea></textarea>' },
          'v-dialog': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
        },
      },
    })

    expect(wrapper.text()).not.toContain('Verificación')
    expect(wrapper.text()).not.toContain('Bloqueo de transferencia')
  })
})
