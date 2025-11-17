<script setup lang="ts">
  import type { Currency, FutzoPlan, Prices, ProductPrices } from '~/models/Product'
  import PlanCard from '~/components/pages/configuration/plans/PlanCard.vue'
  import StripeElementsDrawer from '~/components/pages/configuration/plans/StripeElementsDrawer.vue'
  const type = ref<'yearly' | 'monthly'>('yearly')
  const isYearly = computed(() => type.value === 'yearly')
  const isMonthly = computed(() => type.value === 'monthly')
  const { isSubscribed, user, stripeDialog } = storeToRefs(useAuthStore())
  const productPrices = ref()

  onMounted(async () => {
    if (!isSubscribed.value) {
      productPrices.value = await useSanctumClient()<ProductPrices>('/api/v1/public/products/prices')
    }
    if (useRoute().query.payment === 'success') {
      await useSanctumAuth().refreshIdentity()
    }
  })

  const handleCheckout = (p: { sku: string; period: 'month' | 'year'; name: string }) => {
    stripeDialog.value.sku = p.sku
    stripeDialog.value.period = p.period
    stripeDialog.value.name = p.name
    stripeDialog.value.open = true
  }

  const features: Record<keyof ProductPrices, string[]> = {
    kickoff: [
      'Administra todos tus torneos desde un solo lugar',
      'Calendario automático en segundos (adiós Excel)',
      'Resultados y estadísticas en tiempo real',
    ],
    pro_play: [
      'Todo lo de Kickoff',
      'Registro automático con links únicos',
      'Personaliza colores y logo de tu liga',
      'Soporte estándar',
    ],
    elite_league: [
      'Todo lo de ProPlay',
      'Soporte prioritario',
      'Acceso anticipado a nuevas funciones',
      'Comunicación directa con jugadores y entrenadores',
    ],
  }
</script>
<template>
  <v-container fluid>
    <v-row v-if="!isSubscribed">
      <v-col cols="12" lg="2" md="2">
        <div class="d-flex flex-column futzo-rounded pa-4">
          <v-btn :variant="isYearly ? 'flat' : 'text'" @click="() => (type = 'yearly')" class="mb-2">Anual</v-btn>
          <v-btn :variant="isMonthly ? 'flat' : 'text'" @click="() => (type = 'monthly')" class="mb-2">Mensual</v-btn>
        </div>
      </v-col>
      <v-col cols="12" lg="10" md="10">
        <div class="d-flex ga-8 justify-center flex-md-nowrap flex-lg-nowrap flex-wrap">
          <PlanCard
            :isMonthlyPrice="isMonthly"
            :plan="productPrices?.kickoff"
            :features="features.kickoff ?? []"
            @checkout="handleCheckout"
          />
          <PlanCard
            :isMonthlyPrice="isMonthly"
            :plan="productPrices?.pro_play"
            :prioritary="true"
            :features="features.pro_play ?? []"
            @checkout="handleCheckout"
          />
          <PlanCard
            :isMonthlyPrice="isMonthly"
            :plan="productPrices?.elite_league"
            :features="features.elite_league ?? []"
            @checkout="handleCheckout"
          />
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="4" lg="4">
        <PlanCard
          :isMonthlyPrice="user?.plan?.billing_period === 'month'"
          :prioritary="true"
          badge="Tu plan actual"
          :subscribed="true"
          :features="features[(user?.plan?.product?.sku as keyof ProductPrices) ?? []]"
          :plan="
            {
              sku: user?.plan?.product.sku,
              name: user?.plan?.product?.name,
              cta: 'Ver detalles',
              currency: {} as Currency,
              price: '',
              promo_price: '',
              annually_price: '',
              url: '',
              discount: '',
              prices: {} as Prices,
              annual_saving: '',
            } as FutzoPlan
          "
        >
          <template #subtitle>{{ user?.plan?.billing_period === 'month' ? 'Mensual' : 'Anual' }} </template>
          <template #separator>
            <div class="d-flex justify-end">
              <p class="text-medium-emphasis">
                <span class=""> Próxima fecha de cobro </span>
                <span class="text-decoration-underline">{{ user?.plan?.current_period_end }}</span>
              </p>
            </div>
          </template>
        </PlanCard>
      </v-col></v-row
    >
  </v-container>
</template>
