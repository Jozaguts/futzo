import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import {mountSuspended} from '@nuxt/test-utils/runtime'

const ga4EventMock = vi.hoisted(() => vi.fn())

vi.mock('~/utils/ga4', () => ({
  ga4Event: ga4EventMock,
}))

describe('CardCTA', () => {
  const original = {
    fbq: (globalThis as any).$fbq,
    buildAppUrl: (globalThis as any).$buildAppUrl,
    attribution: (globalThis as any).$attribution,
  }

  beforeEach(() => {
    ga4EventMock.mockReset()
    ;(globalThis as any).$fbq = vi.fn()
    ;(globalThis as any).$buildAppUrl = vi.fn(() => 'https://futzo.test/checkout')
    ;(globalThis as any).$attribution = {
      get: () => ({ fbclid: 'fbclid-1', fbp: '_fbp-1', fbc: '_fbc-1', utm: { utm_source: 'meta' } }),
    }
  })

  afterEach(() => {
    ;(globalThis as any).$fbq = original.fbq
    ;(globalThis as any).$buildAppUrl = original.buildAppUrl
    ;(globalThis as any).$attribution = original.attribution
  })

  it('fires GA4 checkout_started on click', async () => {
    const { default: CardCTA } = await import('~/components/pages/CardCTA.vue')
    const wrapper = await mountSuspended(CardCTA, {
      props: {
        cta: 'Empieza gratis',
        plan: 'kickoff',
        billingCycle: 'month',
      },
    })

    await wrapper.find('button').trigger('click')

    expect(ga4EventMock).toHaveBeenCalledWith('checkout_started', {
      plan: 'kickoff',
      billing_cycle: 'month',
    })
  })
})
