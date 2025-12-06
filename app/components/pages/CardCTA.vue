<script setup lang="ts">
const { $fbq, $buildAppUrl, $attribution } = useNuxtApp() as any
const { cta, url } = defineProps<{ cta?: string, url?: string }>()

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

  if (typeof $fbq === 'function') {
    $fbq('trackCustom', 'StartTrialClick', {
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
    <button type="button" class="btn mt-4" @click="clickHandler">{{cta}} </button>
    <p class="trial-note mt-3" aria-live="polite">
      No se te cobrará durante la prueba.
      Elige tu plan al finalizar los 7 días.
    </p>
  </div>
</template>
<style scoped>
.trial-note {
font-size: 12px;
opacity: .8;
}
</style>
