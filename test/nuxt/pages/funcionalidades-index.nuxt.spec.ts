import {beforeEach, describe, expect, it, vi} from 'vitest'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import FuncionalidadesIndexPage from '~/pages/funcionalidades/index.vue'

const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const pushMock = vi.hoisted(() => vi.fn())
const replaceMock = vi.hoisted(() => vi.fn())
const resolveMock = vi.hoisted(() => vi.fn((to: string) => ({ href: to })))

mockNuxtImport('useSanctumAuth', () => () => ({ isAuthenticated: isAuthenticatedRef }))
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: replaceMock, resolve: resolveMock }))

describe('/funcionalidades index page', () => {
  beforeEach(() => {
    isAuthenticatedRef.value = false
    pushMock.mockReset()
    replaceMock.mockReset()
    resolveMock.mockReset()
    replaceMock.mockResolvedValue(undefined)
    resolveMock.mockImplementation((to: string) => ({ href: to }))
  })

  it('renders SEO hub content and six feature modules', async () => {
    const wrapper = await mountSuspended(FuncionalidadesIndexPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
          Icon: { template: '<i />' },
        },
      },
    })

    expect(wrapper.text()).toContain('Todas las funcionalidades que necesitas para operar tu liga en un solo sistema')
    expect(wrapper.findAll('.feature-hub-page__module-card')).toHaveLength(6)
    expect(wrapper.find('[data-testid="funcionalidades-hero-placeholder"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="funcionalidades-system-placeholder"]').exists()).toBe(true)
  })

  it('sends unauthenticated CTA clicks to login', async () => {
    const wrapper = await mountSuspended(FuncionalidadesIndexPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
          Icon: { template: '<i />' },
        },
      },
    })

    await wrapper.find('[data-testid="funcionalidades-cta-hero"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('sends authenticated CTA clicks to dashboard', async () => {
    isAuthenticatedRef.value = true

    const wrapper = await mountSuspended(FuncionalidadesIndexPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
          Icon: { template: '<i />' },
        },
      },
    })

    await wrapper.find('[data-testid="funcionalidades-cta-final"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/dashboard')
  })
})
