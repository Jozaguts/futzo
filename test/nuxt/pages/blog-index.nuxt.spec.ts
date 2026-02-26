import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import BlogIndexPage from '~/pages/blog/index.vue'

const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const pushMock = vi.hoisted(() => vi.fn())
const replaceMock = vi.hoisted(() => vi.fn())
const resolveMock = vi.hoisted(() => vi.fn((to: string) => ({ href: to })))
const useSchemaOrgMock = vi.hoisted(() => vi.fn())

mockNuxtImport('useSanctumAuth', () => () => ({ isAuthenticated: isAuthenticatedRef }))
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: replaceMock, resolve: resolveMock }))
mockNuxtImport('useSchemaOrg', () => useSchemaOrgMock)

describe('/blog page', () => {
  beforeEach(() => {
    isAuthenticatedRef.value = false
    pushMock.mockReset()
    replaceMock.mockReset()
    resolveMock.mockReset()
    useSchemaOrgMock.mockReset()
    replaceMock.mockResolvedValue(undefined)
    resolveMock.mockImplementation((to: string) => ({ href: to }))
  })

  it('renders blog hub hero and article cards with schema nodes', async () => {
    const wrapper = await mountSuspended(BlogIndexPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    const html = wrapper.html()
    expect(wrapper.text()).toContain('Blog Futzo para administradores de ligas y torneos de fútbol')
    expect(wrapper.find('[data-testid="blog-hub-hero-image"]').exists()).toBe(true)
    expect(html).toContain('/blog/como-calcular-tabla-de-posiciones-futbol')
    expect(html).toContain('/blog/reglamento-liga-futbol-amateur-plantilla')
    expect(html).toContain('/blog/como-hacer-rol-de-juegos-liga-futbol')
    expect(html).toContain('/blog/como-organizar-liga-futbol-amateur')
    expect(html).toContain('/blog/mejores-apps-para-administrar-torneos-futbol-2026')

    const nodes = useSchemaOrgMock.mock.calls.flatMap(([input]) => (Array.isArray(input) ? input : [input]))
    expect(nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'CollectionPage' }),
        expect.objectContaining({ '@type': 'ItemList' }),
      ])
    )
  })

  it('sends unauthenticated CTA clicks to login', async () => {
    const wrapper = await mountSuspended(BlogIndexPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="blog-hub-cta-hero"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('sends authenticated CTA clicks to dashboard', async () => {
    isAuthenticatedRef.value = true

    const wrapper = await mountSuspended(BlogIndexPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="blog-hub-cta-hero"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/dashboard')
  })
})
