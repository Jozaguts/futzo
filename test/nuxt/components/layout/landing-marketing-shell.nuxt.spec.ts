import {beforeEach, describe, expect, it, vi} from 'vitest'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import LandingMarketingShell from '~/components/layout/LandingMarketingShell.vue'

const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const pushMock = vi.hoisted(() => vi.fn())
const replaceMock = vi.hoisted(() => vi.fn())
const resolveMock = vi.hoisted(() => vi.fn((to: string) => ({ href: to })))

mockNuxtImport('useSanctumAuth', () => () => ({ isAuthenticated: isAuthenticatedRef }))
mockNuxtImport('useRouter', () => () => ({ push: pushMock, replace: replaceMock, resolve: resolveMock }))

const globalStubs = {
  PageLayout: { template: '<div><slot name="default" /></div>' },
  Icon: { template: '<i />' },
  'nuxt-link': { props: ['to'], template: '<a :href="to"><slot /></a>' },
  VAppBar: { template: '<header><slot /></header>' },
  VAppBarNavIcon: { emits: ['click'], template: '<button @click="$emit(\'click\')"></button>' },
  VNavigationDrawer: { template: '<aside><slot /></aside>' },
  VList: { template: '<div><slot /></div>' },
  VListItem: {
    props: ['title', 'href'],
    template: '<a v-if="href" :href="href">{{ title }}<slot /></a><div v-else>{{ title }}<slot /></div>',
  },
  VBtn: { emits: ['click'], template: '<button @click="$emit(\'click\', $event)"><slot /></button>' },
  VContainer: { template: '<div><slot /></div>' },
  VSpacer: { template: '<span />' },
}

describe('LandingMarketingShell', () => {
  beforeEach(() => {
    isAuthenticatedRef.value = false
    pushMock.mockReset()
    replaceMock.mockReset()
    resolveMock.mockReset()
    replaceMock.mockResolvedValue(undefined)
    resolveMock.mockImplementation((to: string) => ({ href: to }))
  })

  it('renders landing navbar, product footer links and slot content', async () => {
    const wrapper = await mountSuspended(LandingMarketingShell, {
      slots: {
        default: '<div data-testid="shell-slot-content">contenido</div>',
      },
      global: {
        stubs: globalStubs,
      },
    })

    const html = wrapper.html()
    expect(wrapper.find('[data-testid="shell-slot-content"]').exists()).toBe(true)
    expect(html).toContain('Funcionalidades')
    expect(html).toContain('Producto')
    expect(html).toContain('/blog')
    expect(html).toContain('/blog/como-organizar-liga-futbol-amateur')
    expect(html).toContain('/funcionalidades/calendario-automatico')
    expect(html).toContain('/funcionalidades/registro-equipos-qr')
    expect(html).toContain('/funcionalidades/verificacion-jugadores')
    expect(html).toContain('/funcionalidades/estadisticas-torneos')
    expect(html).toContain('/funcionalidades/gestion-canchas-horarios')
    expect(html).toContain('/funcionalidades/vista-publica-torneo')
  })

  it('routes CTA to login when unauthenticated', async () => {
    const wrapper = await mountSuspended(LandingMarketingShell, {
      slots: {
        default: '<div />',
      },
      global: {
        stubs: globalStubs,
      },
    })

    await wrapper.find('[data-testid="landing-shell-cta-nav"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('routes CTA to dashboard when authenticated', async () => {
    isAuthenticatedRef.value = true

    const wrapper = await mountSuspended(LandingMarketingShell, {
      slots: {
        default: '<div />',
      },
      global: {
        stubs: globalStubs,
      },
    })

    await wrapper.find('[data-testid="landing-shell-cta-nav"]').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/dashboard')
  })
})
