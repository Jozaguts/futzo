<script setup lang="ts">
import {Icon} from '#components'
import type {FutzoPlan} from '~/models/Product'
import {useToast} from '~/composables/useToast'
import {createBillingPortalSession} from '~/http/api/stripe'

const {
    isMonthlyPrice,
    plan,
    prioritary = false,
    badge = 'Más elegido',
    subscribed,
    features,
  } = defineProps<{
    isMonthlyPrice: boolean
    plan: FutzoPlan
    prioritary?: Boolean
    badge?: string
    subscribed?: boolean
    features: string[]
  }>()
  const disabled = ref(false)
  const loading = ref(false)
  const emit = defineEmits<{
    (e: 'checkout', payload: { sku: string; period: 'month' | 'year'; name: string }): void
  }>()

  const buttonHandler = async () => {
    try {
      if (subscribed) {
        loading.value = true
        const { url } = await createBillingPortalSession()
        window.open(url, '_blank', 'noopener,noreferrer')
        loading.value = false
        return
      }
      emit('checkout', { sku: plan.sku, period: isMonthlyPrice ? 'month' : 'year', name: plan.name })
    } catch (error: any) {
      loading.value = false
      useToast().toast({
        type: 'error',
        msg: subscribed ? 'Portal de facturación' : 'Checkout',
        description:
          error?.data?.message ||
          (subscribed ? 'No pudimos abrir el portal de facturación.' : 'No pudimos iniciar el pago. Intenta de nuevo.'),
      })
    }
  }
  const catText = computed(() => {
    let text = ''
    if (loading.value) {
      text = 'Generando tu checkout seguro...'
    } else if (!loading.value && !subscribed) {
      text = 'Comenzar ahora'
    } else if (!loading.value && subscribed) {
      text = 'Ver detalles'
    }
    return text
  })
</script>
<template>
  <v-card
    class="plan-card futzo-rounded"
    :class="{ 'plan-card--featured': prioritary }"
    min-width="280"
    max-width="400"
    :elevation="prioritary ? 6 : 0"
  >
    <v-chip v-if="prioritary" class="plan-card__badge" color="primary" variant="flat" size="small">{{ badge }}</v-chip>
    <div class="plan-card__title">{{ plan?.name }}</div>
    <div class="plan-card__price">
      <slot name="subtitle">
        <span
          class="plan-card__price-amount"
          :class="!isMonthlyPrice ? 'plan-card__price-amount--muted' : ''"
        >
          {{ plan?.currency?.symbol }}{{ plan?.price }}{{ plan?.currency?.iso_code }}/mes
        </span>
      </slot>
    </div>
    <div class="plan-card__divider" />
    <slot name="separator">
     <div v-auto-animate>
       <p class="plan-card__note" v-if="isMonthlyPrice" >Plan mensual estándar</p>
       <div v-else class="plan-card__billing">
         <div class="plan-card__billing-row">
           <p>{{ plan?.currency?.symbol }}{{ plan?.annually_price }}{{ plan?.currency?.iso_code }}/mes</p>
           <v-chip variant="elevated" color="primary" density="compact" size="small"> Facturado anual </v-chip>
         </div>
         <span class="plan-card__saving" v-auto-animate>
          💸 Ahorra
          <span class="plan-card__saving-amount" v-if="plan?.currency?.symbol">
            {{ plan?.currency?.symbol }}{{ plan?.annual_saving }}{{ plan?.currency?.iso_code }}/año
          </span>
        </span>
       </div>
       <div class="plan-card__divider"></div>
     </div>
    </slot>
    <v-list v-for="feature in features" class="plan-card__features"
            v-auto-animate>
      <v-list-item
        density="compact"
        :prepend-icon="() => h(Icon, { name: 'futzo-icon:check-box' })"
        lines="one"
        :key="feature"
        class="plan-card__feature"
        >{{ feature }}</v-list-item
      >
    </v-list>
    <v-card-actions class="plan-card__actions">
      <v-btn
        block
        :variant="prioritary ? 'flat' : 'outlined'"
        :color="prioritary ? 'primary' : undefined"
        @click="buttonHandler"
        :disabled="disabled"
        :loading="loading"
      >
        {{ catText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.plan-card {
  position: relative;
  padding: 24px;
  box-shadow: none;
  min-height: var(--plan-card-min-height, 520px);
  display: flex;
  flex-direction: column;
}
.plan-card--featured {
  border-color: #7f56d9 !important;
  box-shadow: 0 12px 24px rgba(127, 86, 217, 0.18);
}
.plan-card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
}
.plan-card__title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #101828;
}
.plan-card__price {
  font-size: 22px;
  font-weight: 700;
  color: #7f56d9;
  margin-bottom: 8px;
}
.plan-card__price-amount--muted {
  text-decoration: line-through;
  color: #667085;
  font-weight: 600;
}
.plan-card__divider {
  height: 1px;
  background: #eaecf0;
  margin: 12px 0;
}
.plan-card__note {
  color: #667085;
  margin: 0 0 8px 0;
}
.plan-card__billing {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
  color: #101828;
  font-weight: 600;
}
.plan-card__billing-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.plan-card__saving {
  color: #12b76a;
  font-weight: 600;
  font-size: 13px;
}
.plan-card__saving-amount {
  font-weight: 700;
}
.plan-card__features {
  padding: 0;
}
.plan-card__feature {
  padding-left: 0;
}
.plan-card__actions {
  padding: 0;
  margin-top: auto;
}
</style>
