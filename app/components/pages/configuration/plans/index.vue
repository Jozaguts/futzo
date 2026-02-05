<script setup lang="ts">
import type {Currency, FutzoPlan, Prices, ProductPrices} from '~/models/Product'
import PlanCard from '~/components/pages/configuration/plans/PlanCard.vue'
import {useDisplay} from 'vuetify'

const type = ref<'yearly' | 'monthly'>('yearly')
  const isYearly = computed(() => type.value === 'yearly')
  const isMonthly = computed(() => type.value === 'monthly')
  const { isSubscribed, user, stripeDialog } = storeToRefs(useAuthStore())
  const productPrices = ref()
  const { mobile } = useDisplay()
  const page = ref(1)
  const loadingPlans = computed(() => {
    if (isSubscribed.value) {
      return !user.value?.plan
    }
    return !productPrices.value
  })
  const skeletonItems = computed(() => (mobile.value ? [0] : [0, 1, 2]))

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

  const plans = computed(() => [
    {
      plan: productPrices.value?.kickoff,
      features: features.kickoff ?? [],
      prioritary: false,
    },
    {
      plan: productPrices.value?.pro_play,
      features: features.pro_play ?? [],
      prioritary: true,
    },
    {
      plan: productPrices.value?.elite_league,
      features: features.elite_league ?? [],
      prioritary: false,
    },
  ])
</script>
<template>
  <v-container fluid class="pa-0">
    <v-row v-if="!isSubscribed && !mobile">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn-toggle v-model="type" class="plans-toggle" density="comfortable" rounded="lg" divided mandatory>
          <v-btn value="yearly" class="plans-toggle__btn" :variant="isYearly ? 'flat' : 'text'">Anual</v-btn>
          <v-btn value="monthly" class="plans-toggle__btn" :variant="isMonthly ? 'flat' : 'text'">Mensual</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12">
        <div class="plans-grid">
          <template v-if="loadingPlans">
            <v-card
              v-for="item in skeletonItems"
              :key="item"
              class="pa-8 futzo-rounded plan-card-skeleton"
              min-width="280"
              max-width="400"
            >
              <v-skeleton-loader type="chip" class="mb-4" />
              <v-skeleton-loader type="heading" class="mb-2" />
              <v-skeleton-loader type="text" class="mb-4" />
              <v-divider class="mb-4" />
              <v-skeleton-loader type="list-item@4" class="mb-4" />
              <v-skeleton-loader type="actions" />
            </v-card>
          </template>
          <template v-else>
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
          </template>
        </div>
      </v-col>
    </v-row>
    <v-row v-else-if="!isSubscribed && mobile">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn-toggle v-model="type" class="plans-toggle" density="comfortable" rounded="lg" divided mandatory>
          <v-btn value="yearly" class="plans-toggle__btn" :variant="isYearly ? 'flat' : 'text'">Anual</v-btn>
          <v-btn value="monthly" class="plans-toggle__btn" :variant="isMonthly ? 'flat' : 'text'">Mensual</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12">
        <v-data-iterator
          class="data-iterator-container"
          :items-per-page="1"
          :items="loadingPlans ? skeletonItems : plans"
          :page="page"
        >
          <template #default="{ items }">
            <template v-for="(item, i) in items" :key="i">
              <div class="mobile-plan-card">
                <v-card v-if="loadingPlans" class="pa-8 futzo-rounded plan-card-skeleton" min-width="280">
                  <v-skeleton-loader type="chip" class="mb-4" />
                  <v-skeleton-loader type="heading" class="mb-2" />
                  <v-skeleton-loader type="text" class="mb-4" />
                  <v-divider class="mb-4" />
                  <v-skeleton-loader type="list-item@4" class="mb-4" />
                  <v-skeleton-loader type="actions" />
                </v-card>
                <PlanCard
                  v-else
                  :isMonthlyPrice="isMonthly"
                  :plan="item.raw.plan"
                  :prioritary="item.raw.prioritary"
                  :features="item.raw.features"
                  @checkout="handleCheckout"
                />
              </div>
            </template>
          </template>
          <template #footer>
            <v-pagination
              v-if="!loadingPlans"
              density="compact"
              :length="plans.length"
              v-model="page"
              variant="text"
              total-visible="3"
              elevation="5"
              class="mt-2"
            />
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="4" lg="4" >
        <v-card v-if="loadingPlans" class="pa-8 futzo-rounded plan-card-skeleton" min-width="280" max-width="400">
          <v-skeleton-loader type="chip" class="mb-4" />
          <v-skeleton-loader type="heading" class="mb-2" />
          <v-skeleton-loader type="text" class="mb-4" />
          <v-divider class="mb-4" />
          <v-skeleton-loader type="list-item@4" class="mb-4" />
          <v-skeleton-loader type="actions" />
        </v-card>
        <PlanCard
          v-else
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
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
.mobile-plan-card {
  min-height: 580px;
  display: flex;
  align-items: stretch;
}
.plans-toggle {
  background: #f2f4f7;
  padding: 4px;
  margin: 8px 0 0;
}
.plans-toggle__btn {
  min-width: 110px;
  text-transform: none;
  font-weight: 600;
}
.plans-grid {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 16px;
}
.plan-card-skeleton {
  width: 100%;
}
@media (min-width: 960px) {
  .mobile-plan-card {
    min-height: auto;
  }
  .plans-grid {
    flex-wrap: nowrap;
  }
}
</style>
