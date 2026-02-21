import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ensureVuetifyApp, vuetifyStubs } from '../../../utils/vuetify-stubs'
import CredentialsModuleShell from '~/components/pages/credentials/CredentialsModuleShell.vue'

const mediaQueryRef = vi.hoisted(() => ({ value: false }))
const routeRef = vi.hoisted(() => ({ value: { path: '/credenciales' } as any }))
const routerPushMock = vi.hoisted(() => vi.fn())

vi.mock('@vueuse/core', () => ({
  useMediaQuery: () => mediaQueryRef.value,
}))

vi.mock('~/composables/credentials/useCredentialsAccess', () => ({
  useCredentialsAccess: () => ({
    visibleTabs: ref([
      { key: 'resumen', label: 'Resumen', path: '/credenciales' },
      { key: 'generar', label: 'Generar', path: '/credenciales/generar' },
      { key: 'disenos', label: 'Diseños', path: '/credenciales/disenos' },
      { key: 'validacion', label: 'Validación', path: '/credenciales/validacion' },
      { key: 'historial', label: 'Historial', path: '/credenciales/historial' },
    ]),
  }),
}))

vi.mock('#imports', async () => {
  const actual = await vi.importActual<any>('#imports')
  return {
    ...actual,
    useRoute: () => routeRef.value,
    useRouter: () => ({ push: routerPushMock }),
  }
})

describe('CredentialsModuleShell', () => {
  beforeEach(() => {
    ensureVuetifyApp()
    mediaQueryRef.value = false
    routeRef.value = { path: '/credenciales' }
    routerPushMock.mockReset()
  })

  it('shows tabs on desktop', async () => {
    const wrapper = await mountSuspended(CredentialsModuleShell, {
      props: { current: 'resumen' },
      slots: { default: '<div>content</div>' },
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
        },
      },
    })

    expect(wrapper.find('[data-testid="credentials-subnav"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="credentials-subnav-dropdown"]').exists()).toBe(false)
    expect(wrapper.text()).toContain('Resumen')
    expect(wrapper.text()).toContain('Validación')
  })

  it('shows dropdown on compact mobile mode', async () => {
    mediaQueryRef.value = true

    const wrapper = await mountSuspended(CredentialsModuleShell, {
      props: { current: 'resumen' },
      global: {
        stubs: {
          ...vuetifyStubs,
          Icon: { template: '<i />' },
        },
      },
    })

    expect(wrapper.find('[data-testid="credentials-subnav-dropdown"]').exists()).toBe(true)
  })
})
