import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import FuncionalidadesCalendarioAutomaticoPage from '~/pages/funcionalidades/calendario-automatico.vue'

const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const pushMock = vi.hoisted(() => vi.fn())
const replaceMock = vi.hoisted(() => vi.fn())
const resolveMock = vi.hoisted(() => vi.fn((to: string) => ({ href: to })))
const useSchemaOrgMock = vi.hoisted(() => vi.fn())

mockNuxtImport('useSanctumAuth', () => () => ({ isAuthenticated: isAuthenticatedRef }))
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: replaceMock, resolve: resolveMock }))
mockNuxtImport('useSchemaOrg', () => useSchemaOrgMock)

describe('/funcionalidades/calendario-automatico page', () => {
  beforeEach(() => {
    isAuthenticatedRef.value = false
    pushMock.mockReset()
    replaceMock.mockReset()
    resolveMock.mockReset()
    useSchemaOrgMock.mockReset()
    replaceMock.mockResolvedValue(undefined)
    resolveMock.mockImplementation((to: string) => ({ href: to }))
  })

  it('renders calendario SEO content, placeholders and related links', async () => {
    const wrapper = await mountSuspended(FuncionalidadesCalendarioAutomaticoPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    const html = wrapper.html()
    expect(wrapper.text()).toContain('Calendario automático para liga de fútbol sin Excel')
    expect(wrapper.find('[data-testid="calendario-hero-placeholder"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="calendario-cases-placeholder"]').exists()).toBe(true)
    expect(html).toContain('/funcionalidades')
    expect(html).toContain('/funcionalidades/registro-equipos-qr')
    expect(html).toContain('/funcionalidades/gestion-canchas-horarios')
    expect(html).toContain('/funcionalidades/estadisticas-torneos')
    expect(html).toContain('Ver todas las funcionalidades')

    const nodes = useSchemaOrgMock.mock.calls.flatMap(([input]) => (Array.isArray(input) ? input : [input]))
    expect(nodes).toEqual(expect.arrayContaining([expect.objectContaining({ '@type': 'SoftwareApplication' })]))
  })

  it('sends unauthenticated CTA clicks to login', async () => {
    const wrapper = await mountSuspended(FuncionalidadesCalendarioAutomaticoPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="calendario-cta-hero"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('sends authenticated CTA clicks to dashboard', async () => {
    isAuthenticatedRef.value = true

    const wrapper = await mountSuspended(FuncionalidadesCalendarioAutomaticoPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="calendario-cta-final"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/dashboard')
  })
})
