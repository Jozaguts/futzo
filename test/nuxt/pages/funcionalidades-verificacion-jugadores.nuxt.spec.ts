import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import FuncionalidadesVerificacionJugadoresPage from '~/pages/funcionalidades/verificacion-jugadores.vue'

const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const pushMock = vi.hoisted(() => vi.fn())
const replaceMock = vi.hoisted(() => vi.fn())
const resolveMock = vi.hoisted(() => vi.fn((to: string) => ({ href: to })))

mockNuxtImport('useSanctumAuth', () => () => ({ isAuthenticated: isAuthenticatedRef }))
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: replaceMock, resolve: resolveMock }))

describe('/funcionalidades/verificacion-jugadores page', () => {
  beforeEach(() => {
    isAuthenticatedRef.value = false
    pushMock.mockReset()
    replaceMock.mockReset()
    resolveMock.mockReset()
    replaceMock.mockResolvedValue(undefined)
    resolveMock.mockImplementation((to: string) => ({ href: to }))
  })

  it('renders verification content, placeholders and related links', async () => {
    const wrapper = await mountSuspended(FuncionalidadesVerificacionJugadoresPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    const html = wrapper.html()
    expect(wrapper.text()).toContain('Verificación de jugadores y transferencias sin jugadores no elegibles')
    expect(wrapper.find('[data-testid="verificacion-hero-placeholder"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="verificacion-evidence-placeholder"]').exists()).toBe(true)
    expect(html).toContain('/funcionalidades')
    expect(html).toContain('/funcionalidades/calendario-automatico')
    expect(html).toContain('/funcionalidades/registro-equipos-qr')
    expect(html).toContain('/funcionalidades/estadisticas-torneos')
    expect(html).toContain('Ver todas las funcionalidades')
  })

  it('sends unauthenticated CTA clicks to login', async () => {
    const wrapper = await mountSuspended(FuncionalidadesVerificacionJugadoresPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="verificacion-cta-hero"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('sends authenticated CTA clicks to dashboard', async () => {
    isAuthenticatedRef.value = true

    const wrapper = await mountSuspended(FuncionalidadesVerificacionJugadoresPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="verificacion-cta-final"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/dashboard')
  })
})
