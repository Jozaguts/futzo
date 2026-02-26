import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import BlogComoOrganizarLigaPage from '~/pages/blog/como-organizar-liga-futbol-amateur.vue'

const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const scrollYRef = vi.hoisted(() => ({ value: 0, __v_isRef: true } as any))
const pushMock = vi.hoisted(() => vi.fn())
const replaceMock = vi.hoisted(() => vi.fn())
const resolveMock = vi.hoisted(() => vi.fn((to: string) => ({ href: to })))
const gtagMock = vi.hoisted(() => vi.fn())
const useSchemaOrgMock = vi.hoisted(() => vi.fn())

mockNuxtImport('useSanctumAuth', () => () => ({ isAuthenticated: isAuthenticatedRef }))
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: replaceMock, resolve: resolveMock }))
mockNuxtImport('useGtag', () => () => ({ gtag: gtagMock }))
mockNuxtImport('useSchemaOrg', () => useSchemaOrgMock)
mockNuxtImport('useWindowScroll', () => () => ({ y: scrollYRef }))

describe('/blog/como-organizar-liga-futbol-amateur page', () => {
  beforeEach(() => {
    isAuthenticatedRef.value = false
    scrollYRef.value = 0
    pushMock.mockReset()
    replaceMock.mockReset()
    resolveMock.mockReset()
    gtagMock.mockReset()
    useSchemaOrgMock.mockReset()
    replaceMock.mockResolvedValue(undefined)
    resolveMock.mockImplementation((to: string) => ({ href: to }))
  })

  it('renders article content blocks and internal links with article schema', async () => {
    const wrapper = await mountSuspended(BlogComoOrganizarLigaPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    const html = wrapper.html()
    expect(wrapper.text()).toContain('Cómo organizar una liga de fútbol amateur paso a paso')
    expect(wrapper.find('[data-testid="blog-article-hero-image"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="blog-article-aside-cta"]').exists()).toBe(true)
    expect(html).toContain('/funcionalidades/calendario-automatico')
    expect(html).toContain('/funcionalidades/registro-equipos-qr')
    expect(html).toContain('/funcionalidades/verificacion-jugadores')

    const nodes = useSchemaOrgMock.mock.calls.flatMap(([input]) => (Array.isArray(input) ? input : [input]))
    expect(nodes).toEqual(expect.arrayContaining([expect.objectContaining({ '@type': 'Article' })]))
  })

  it('routes unauthenticated users to login from article CTA', async () => {
    const wrapper = await mountSuspended(BlogComoOrganizarLigaPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="blog-article-cta-hero"]').trigger('click')

    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('routes authenticated users to dashboard from article CTA', async () => {
    isAuthenticatedRef.value = true

    const wrapper = await mountSuspended(BlogComoOrganizarLigaPage, {
      global: {
        stubs: {
          LandingMarketingShell: { template: '<div><slot /></div>' },
          PageLayout: { template: '<div><slot name="default" /></div>' },
        },
      },
    })

    await wrapper.find('[data-testid="blog-article-cta-final-btn"]').trigger('click')

    expect(pushMock).toHaveBeenCalledWith('/dashboard')
  })
})
