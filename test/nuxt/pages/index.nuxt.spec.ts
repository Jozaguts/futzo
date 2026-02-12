import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

const loadPricesMock = vi.hoisted(() => vi.fn(async () => undefined))
const setPriceModeMock = vi.hoisted(() => vi.fn())
const gtagMock = vi.hoisted(() => vi.fn())
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
const priceModeRef = vi.hoisted(() => ({ value: 'monthly', __v_isRef: true } as any))
const isAuthenticatedRef = vi.hoisted(() => ({ value: false, __v_isRef: true } as any))

mockNuxtImport('useProductPrices', () => () => ({
  priceMode: priceModeRef,
  setPriceMode: setPriceModeMock,
  loading: loadingRef,
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
mockNuxtImport('useRoute', () => () => ({ name: 'index', path: '/' }))

describe('Landing page pricing lazy load', () => {
  beforeEach(() => {
    loadPricesMock.mockReset()
    loadPricesMock.mockResolvedValue(undefined)
    setPriceModeMock.mockReset()
    gtagMock.mockReset()
    intersectionObservers.splice(0, intersectionObservers.length)
    kickoffPlanRef.value = null
    proPlayPlanRef.value = null
    eliteLeaguePlanRef.value = null
    loadingRef.value = false
    priceModeRef.value = 'monthly'
    isAuthenticatedRef.value = false
  })

  it('loads product prices only when pricing section intersects', async () => {
    await mountSuspended(IndexPage, {
      global: {
        stubs: {
          PageLayout: { template: '<div><slot name="default" /></div>' },
          PlanCard: { template: '<div data-testid="plan-card"></div>' },
          Icon: { template: '<i></i>' },
          'client-only': { template: '<div><slot /></div>' },
          'nuxt-link': { template: '<a><slot /></a>' },
        },
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
})
