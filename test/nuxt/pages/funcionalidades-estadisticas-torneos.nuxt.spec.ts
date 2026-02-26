import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import FuncionalidadesEstadisticasTorneosPage from '~/pages/funcionalidades/estadisticas-torneos.vue'

const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const pushMock = vi.hoisted(() => vi.fn())
const replaceMock = vi.hoisted(() => vi.fn())
const resolveMock = vi.hoisted(() => vi.fn((to: string) => ({ href: to })))

mockNuxtImport('useSanctumAuth', () => () => ({ isAuthenticated: isAuthenticatedRef }))
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: replaceMock, resolve: resolveMock }))

describe('/funcionalidades/estadisticas-torneos page', () => {
  beforeEach(() => {
    isAuthenticatedRef.value = false
    pushMock.mockReset()
    replaceMock.mockReset()
    resolveMock.mockReset()
    replaceMock.mockResolvedValue(undefined)
    resolveMock.mockImplementation((to: string) => ({ href: to }))
  })

  it('renders stats content, placeholders and related links', async () => {
    const wrapper = await mountSuspended(FuncionalidadesEstadisticasTorneosPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    const html = wrapper.html()
    expect(wrapper.text()).toContain('Estadísticas y tabla de posiciones en tiempo real para tu liga')
    expect(wrapper.find('[data-testid="estadisticas-hero-placeholder"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="estadisticas-public-placeholder"]').exists()).toBe(true)
    expect(html).toContain('/funcionalidades')
    expect(html).toContain('/funcionalidades/calendario-automatico')
    expect(html).toContain('/funcionalidades/vista-publica-torneo')
    expect(html).toContain('/funcionalidades/verificacion-jugadores')
    expect(html).toContain('Ver todas las funcionalidades')
  })

  it('sends unauthenticated CTA clicks to login', async () => {
    const wrapper = await mountSuspended(FuncionalidadesEstadisticasTorneosPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="estadisticas-cta-hero"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('sends authenticated CTA clicks to dashboard', async () => {
    isAuthenticatedRef.value = true

    const wrapper = await mountSuspended(FuncionalidadesEstadisticasTorneosPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="estadisticas-cta-final"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/dashboard')
  })
})
