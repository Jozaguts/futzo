import {beforeEach, describe, expect, it, vi} from 'vitest'
import {mockNuxtImport, mountSuspended} from '@nuxt/test-utils/runtime'
import {nextTick} from 'vue'
import IndexPage from '~/pages/index.vue'

const loadPricesMock = vi.hoisted(() => vi.fn(async () => undefined))
const setPriceModeMock = vi.hoisted(() => vi.fn())
const gtagMock = vi.hoisted(() => vi.fn())
const fbqMock = vi.hoisted(() => vi.fn())
const buildAppUrlMock = vi.hoisted(() => vi.fn((baseUrl: string, opts?: { eventId?: string }) => `${baseUrl}?event_id=${opts?.eventId || 'evt'}`))
const attributionGetMock = vi.hoisted(() =>
  vi.fn(() => ({
    fbclid: 'fbclid-1',
    fbp: '_fbp-1',
    fbc: '_fbc-1',
    utm: { utm_source: 'meta' },
  }))
)
const intersectionObservers = vi.hoisted(
  () =>
    [] as Array<{
      callback: (entries: Array<{ isIntersecting?: boolean }>) => void
      options?: Record<string, any>
      stop: ReturnType<typeof vi.fn>
    }>
)

const kickoffPlanRef = vi.hoisted(() => ({ value: null, __v_isRef: true } as any))
const proPlayPlanRef = vi.hoisted(() => ({ value: null, __v_isRef: true } as any))
const eliteLeaguePlanRef = vi.hoisted(() => ({ value: null, __v_isRef: true } as any))
const loadingRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const errorRef = vi.hoisted(() => ({ value: null, __v_isRef: true } as any))
const priceModeRef = vi.hoisted(() => ({ value: 'monthly', __v_isRef: true } as any))
const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))
const isMobileViewportRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))

const NuxtLinkStub = {
  props: ['to'],
  emits: ['click'],
  template: `<a :href="to" @click="$emit('click', $event)"><slot /></a>`,
}

mockNuxtImport('useProductPrices', () => () => ({
  priceMode: priceModeRef,
  setPriceMode: setPriceModeMock,
  loading: loadingRef,
  error: errorRef,
  kickoffPlan: kickoffPlanRef,
  proPlayPlan: proPlayPlanRef,
  eliteLeaguePlan: eliteLeaguePlanRef,
  load: loadPricesMock,
}))

mockNuxtImport('useIntersectionObserver', () => (target: any, callback: any, options?: any) => {
  const stop = vi.fn()
  intersectionObservers.push({ callback, options, stop })
  return { stop }
})

mockNuxtImport('useGtag', () => () => ({ gtag: gtagMock }))
mockNuxtImport('useSanctumAuth', () => () => ({ isAuthenticated: isAuthenticatedRef }))
mockNuxtImport('useMediaQuery', () => () => isMobileViewportRef)
mockNuxtImport('useRoute', () => () => ({ name: 'index', path: '/' }))

const globalStubs = {
  PageLayout: { template: '<div><slot name="default" /></div>' },
  PlanCard: { template: '<div data-testid="plan-card"></div>' },
  Icon: { template: '<i></i>' },
  'client-only': { template: '<div><slot /></div>' },
  'nuxt-link': NuxtLinkStub,
  VAppBar: { template: '<header><slot /></header>' },
  VAppBarNavIcon: { emits: ['click'], template: `<button @click="$emit('click')"></button>` },
  VNavigationDrawer: { template: '<aside><slot /></aside>' },
}

describe('Landing page pricing lazy load', () => {
  beforeEach(() => {
    loadPricesMock.mockReset()
    loadPricesMock.mockResolvedValue(undefined)
    setPriceModeMock.mockReset()
    gtagMock.mockReset()
    fbqMock.mockReset()
    buildAppUrlMock.mockReset()
    attributionGetMock.mockReset()
    intersectionObservers.splice(0, intersectionObservers.length)
    kickoffPlanRef.value = null
    proPlayPlanRef.value = null
    eliteLeaguePlanRef.value = null
    loadingRef.value = false
    errorRef.value = null
    priceModeRef.value = 'monthly'
    isAuthenticatedRef.value = false
    isMobileViewportRef.value = false

    // Provide the fb pixel helpers via globalThis fallbacks (index.vue supports them).
    ;(globalThis as any).$fbq = fbqMock
    ;(globalThis as any).$buildAppUrl = buildAppUrlMock
    ;(globalThis as any).$attribution = { get: attributionGetMock }
  })

  it('loads product prices only when pricing section intersects', async () => {
    await mountSuspended(IndexPage, {
      global: {
        stubs: globalStubs,
      },
    })

    expect(loadPricesMock).not.toHaveBeenCalled()

    const pricingObserver = intersectionObservers.find((entry) => entry.options?.rootMargin === '200px 0px')
    expect(pricingObserver).toBeTruthy()

    pricingObserver?.callback([{ isIntersecting: true }])
    expect(loadPricesMock).toHaveBeenCalledTimes(1)

    pricingObserver?.callback([{ isIntersecting: true }])
    expect(loadPricesMock).toHaveBeenCalledTimes(1)
  })

  it('fires Meta ViewContent when pricing section intersects (once)', async () => {
    await mountSuspended(IndexPage, {
      global: {
        stubs: globalStubs,
      },
    })

    const pricingPixelObserver = intersectionObservers.find((entry) => entry.options?.threshold === 0.2)
    expect(pricingPixelObserver).toBeTruthy()

    pricingPixelObserver?.callback([{ isIntersecting: true }])
    expect(fbqMock).toHaveBeenCalledWith('track', 'ViewContent', {
      content_name: 'pricing',
      content_category: 'plans',
      content_type: 'pricing',
    })

    pricingPixelObserver?.callback([{ isIntersecting: true }])
    expect(fbqMock).toHaveBeenCalledTimes(1)
  })

  it('fires Meta StartRegistration when clicking both landing CTAs (nav + hero)', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: globalStubs,
      },
    })

    await wrapper.find('[data-testid="landing-cta-nav"]').trigger('click')
    expect(fbqMock.mock.calls.some((c) => c?.[0] === 'trackCustom' && c?.[1] === 'StartRegistration')).toBe(true)

    await wrapper.find('[data-testid="landing-cta-hero"]').trigger('click')
    expect(
      fbqMock.mock.calls.filter((c) => c?.[0] === 'trackCustom' && c?.[1] === 'StartRegistration').length
    ).toBe(2)
  })

  it('shows sticky CTA in mobile only after leaving hero section', async () => {
    isMobileViewportRef.value = true

    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: globalStubs,
      },
    })

    expect(wrapper.find('[data-testid="landing-cta-mobile-sticky"]').exists()).toBe(false)

    const heroObserver = intersectionObservers.find((entry) => entry.options?.threshold === 0.05)
    expect(heroObserver).toBeTruthy()

    heroObserver?.callback([{ isIntersecting: false }])
    await nextTick()
    expect(wrapper.find('[data-testid="landing-cta-mobile-sticky"]').exists()).toBe(true)

    heroObserver?.callback([{ isIntersecting: true }])
    await nextTick()
    expect(wrapper.find('[data-testid="landing-cta-mobile-sticky"]').exists()).toBe(false)
  })

  it('tracks StartRegistration from sticky mobile CTA', async () => {
    isMobileViewportRef.value = true

    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: globalStubs,
      },
    })

    const heroObserver = intersectionObservers.find((entry) => entry.options?.threshold === 0.05)
    heroObserver?.callback([{ isIntersecting: false }])
    await nextTick()

    await wrapper.find('[data-testid="landing-cta-mobile-sticky-btn"]').trigger('click')

    expect(
      fbqMock.mock.calls.some((call) => call?.[0] === 'trackCustom' && call?.[1] === 'StartRegistration' && call?.[2]?.placement === 'mobile-sticky')
    ).toBe(true)
  })

  it('renders screenshots gallery with product captures', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: globalStubs,
      },
    })

    expect(wrapper.text()).toContain('Mira Futzo en acción')
    expect(wrapper.findAll('figure.screenshot-card').length).toBeGreaterThanOrEqual(6)
  })

  it('keeps social links in footer', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: globalStubs,
      },
    })

    const html = wrapper.html()
    expect(html).toContain('https://www.facebook.com/futzo.io')
    expect(html).toContain('https://www.instagram.com/futzo.io/')
    expect(html).toContain('https://www.youtube.com/@futzo-oficial')
  })
})
