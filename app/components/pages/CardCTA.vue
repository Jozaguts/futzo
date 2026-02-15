<script setup lang="ts">
import {ga4Event} from '~/utils/ga4'

const nuxtApp = useNuxtApp() as any
const resolveFn = <T extends (...args: any[]) => any>(candidate: any, fallback: T): T => {
  return typeof candidate === 'function' ? (candidate as T) : fallback
}
const $fbq = typeof ((globalThis as any).$fbq ?? nuxtApp?.$fbq) === 'function'
  ? ((globalThis as any).$fbq ?? nuxtApp?.$fbq)
  : undefined
const $buildAppUrl = resolveFn(
  (globalThis as any).$buildAppUrl ?? nuxtApp?.$buildAppUrl,
  ((baseUrl?: string) => baseUrl || '') as any
)
const $attribution = (globalThis as any).$attribution ?? nuxtApp?.$attribution
const { cta, url, plan, billingCycle } = defineProps<{
  cta?: string
  url?: string
  plan?: string
  billingCycle?: 'month' | 'year'
}>()

const generateEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const clickHandler = () => {
  const eventId = generateEventId()
  const destination = $buildAppUrl(url, { eventId })
  const attr = $attribution?.get?.() || {}

  if (destination) {
    ga4Event('checkout_started', {
      plan: plan || '',
      billing_cycle: billingCycle || '',
    })
  }

  if (typeof $fbq === 'function') {
    $fbq('trackCustom', 'StartRegistration', {
      source: 'landing',
      placement: 'card_cta',
      fbclid: attr.fbclid,
      fbp: attr.fbp,
      fbc: attr.fbc,
      ...attr.utm,
    }, {
      eventID: eventId,
    })
  }

  if (destination) {
    window.location.href = destination
  }
}
</script>

<template>
  <div>
    <button type="button" class="btn bg-primary px-4 py-2 rounded-lg mt-4" @click="clickHandler">{{cta}} </button>
    <p class="trial-note mt-3" aria-live="polite">
      No se te cobrará durante la prueba.
    </p>
  </div>
</template>
<style scoped>
.trial-note {
font-size: 12px;
opacity: .8;
}
</style>
