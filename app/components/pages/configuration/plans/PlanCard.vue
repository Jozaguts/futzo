<script setup lang="ts">
  import { Icon } from '#components'
  import type { FutzoPlan } from '~/models/Product'
  import checkout from '~/http/api/checkout'
  import { useToast } from '~/composables/useToast'
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
  const buttonHandler = async () => {
    subscribed ? console.log('subscribed') : paymentHandler()
  }
  const paymentHandler = () => {
    try {
      checkout(plan.sku, isMonthlyPrice ? 'month' : 'year')
    } catch (error) {
      useToast().toast({
        type: 'error',
        msg: 'Checkout',
        description: 'No pudimos generar tu checkout. Intenta de nuevo o contáctanos en soporte@futzo.io',
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
  <v-card class="pa-8 futzo-rounded" min-width="280" :elevation="prioritary ? 10 : 2">
    <div class="position-relative" v-if="prioritary">
      <v-chip class="float-end position-absolute top-0 right-0" color="primary" variant="flat" size="small">{{
        badge
      }}</v-chip>
    </div>
    <v-card-title class="text-center text-h5 text-capitalize"> {{ plan?.name }} </v-card-title>
    <v-card-subtitle class="text-center">
      <slot name="subtitle">
        <span
          class="text-center text-h5 font-weight-bold"
          :class="!isMonthlyPrice ? 'text-decoration-line-through text-medium-emphasis' : 'text-black'"
          >{{ plan?.currency?.symbol }}{{ plan?.price }}{{ plan?.currency?.iso_code }}/mes
        </span>
      </slot>
    </v-card-subtitle>
    <v-card-text>
      <v-divider color="primary" opacity="1" />
      <slot name="separator">
        <p class="my-1 text-center" v-if="isMonthlyPrice">Plan mensual estándar</p>
        <div v-else class="my-1 text-center font-weight-bold">
          <div class="d-flex justify-center align-center my-1">
            <p class="mr-1">{{ plan?.currency?.symbol }}{{ plan?.annually_price }}{{ plan?.currency?.iso_code }}/mes</p>
            <v-chip variant="elevated" color="primary" density="compact" size="small"> Facturado anual </v-chip>
          </div>
          <span class="d-block font-weight-normal text-body-2">
            💸 Ahorra
            <span class="font-weight-bold">
              {{ plan?.currency?.symbol }}{{ plan?.annual_saving }}{{ plan.currency?.iso_code }}/año
            </span></span
          >
        </div>
        <v-divider color="primary" opacity="1" />
      </slot>
      <v-list v-for="feature in features">
        <v-list-item
          density="compact"
          :prepend-icon="() => h(Icon, { name: 'futzo-icon:check-box' })"
          lines="one"
          class="text-left"
          >{{ feature }}</v-list-item
        >
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn block variant="outlined" @click="buttonHandler" :disabled="disabled" :loading="loading">{{
        catText
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
