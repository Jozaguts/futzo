import {beforeEach, describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {ensureVuetifyApp} from '../utils/vuetify-stubs'
import UbicacionesPage from '~/pages/ubicaciones/index.vue'

const getLocations = vi.fn()
const deleteLocation = vi.fn(() => Promise.resolve())
const registerTourRef = vi.fn()
const startTour = vi.fn()
const resetTour = vi.fn()
const recalculateTour = vi.fn()

const locationStoreMock = {
  getLocations,
  deleteLocation,
  registerTourRef,
  startTour,
  resetTour,
  recalculateTour,
  isEdition: ref(false),
  locationDialog: ref(false),
  locationToDelete: ref({ id: null, show: false }),
  locations: ref([{ id: 1, name: 'Cancha Norte', address: 'Av. 1', fields: [], fields_count: 2 }]),
  pagination: ref({ current_page: 1, per_page: 8, total: 1, last_page: 1, sort: 'asc' }),
  tourSteps: ref([]),
}

mockNuxtImport('useLocationStore', () => () => locationStoreMock)
mockNuxtImport('storeToRefs', () => (store: any) => store)
mockNuxtImport('useTourHub', () => () => ({
  setActiveController: vi.fn(),
  clearActiveController: vi.fn(),
}))

describe('Ubicaciones index page', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    getLocations.mockClear()
  })

  it('renders intro shell, controls, kpis and locations list section', async () => {
    const wrapper = await mountSuspended(UbicacionesPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="app-bar" /><slot /><slot name="tour" /></div>' },
          AppBar: { template: '<div></div>' },
          SearchInput: { template: '<input />' },
          PrimaryBtn: { template: '<button><slot /></button>' },
          LocationKpis: { template: '<div data-testid="ubicaciones-kpis"></div>' },
          NoLocations: { template: '<div data-testid="no-locations"></div>' },
          LocationCardContainer: { template: '<div data-testid="locations-list-panel"></div>' },
          DialogLocation: { template: '<div></div>' },
          ConfirmDialog: { template: '<div></div>' },
          LazyTour: { template: '<div></div>' },
          Tour: { template: '<div></div>' },
        },
      },
    })

    expect(wrapper.find('[data-testid="ubicaciones-page-top-shell"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="ubicaciones-page-intro"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="ubicaciones-page-actions"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="ubicaciones-filters-panel"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="ubicaciones-kpis"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="locations-list-panel"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Ubicaciones')
  })
})
