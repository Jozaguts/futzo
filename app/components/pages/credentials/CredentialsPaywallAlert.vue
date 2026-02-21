<script setup lang="ts">
const props = defineProps<{
  checkoutUrl: string | null
}>()

const openCheckout = () => {
  if (!props.checkoutUrl || !import.meta.client) return
  window.open(props.checkoutUrl, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <v-alert v-if="checkoutUrl" type="warning" variant="tonal" border="start" class="credentials-paywall-alert" data-testid="credentials-paywall-alert">
    <div class="credentials-paywall-alert__content">
      <div>
        <p class="credentials-paywall-alert__title">Tu suscripción requiere actualización para continuar.</p>
        <p class="credentials-paywall-alert__subtitle">Completa el pago para habilitar esta función.</p>
      </div>
      <v-btn color="warning" variant="flat" @click="openCheckout">Ir a checkout</v-btn>
    </div>
  </v-alert>
</template>

<style scoped>
.credentials-paywall-alert__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.credentials-paywall-alert__title {
  margin: 0;
  color: #101828;
  font-size: 14px;
  font-weight: 600;
}

.credentials-paywall-alert__subtitle {
  margin: 2px 0 0;
  color: #475467;
  font-size: 13px;
}
</style>
