<script setup lang="ts">
  import type { ProductPrices } from '~/models/Product'
  import PlanCard from '~/components/pages/configuration/plans/PlanCard.vue'
  const type = ref<'yearly' | 'monthly'>('yearly')
  const isYearly = computed(() => type.value === 'yearly')
  const isMonthly = computed(() => type.value === 'monthly')
  const { isOperational } = storeToRefs(useAuthStore())
  const productPrices = ref()
  onMounted(async () => {
    if (!isOperational.value) {
      productPrices.value = await useSanctumClient()<ProductPrices>('/api/v1/public/products/prices')
    }
  })
</script>
<template>
  <v-container>
    <v-row v-if="!isOperational">
      <v-col cols="12" lg="2" md="2">
        <div class="d-flex flex-column futzo-rounded pa-4">
          <v-btn :variant="isYearly ? 'flat' : 'text'" @click="() => (type = 'yearly')" class="mb-2">Anual</v-btn>
          <v-btn :variant="isMonthly ? 'flat' : 'text'" @click="() => (type = 'monthly')" class="mb-2">Mensual</v-btn>
        </div>
      </v-col>
      <v-col cols="12" lg="10" md="10">
        <div class="d-flex ga-8 justify-center">
          <PlanCard :isMonthlyPrice="isMonthly" :plan="productPrices?.kickoff" />
          <PlanCard :isMonthlyPrice="isMonthly" :plan="productPrices?.pro_play" :prioritary="true" />
          <PlanCard :isMonthlyPrice="isMonthly" :plan="productPrices?.elite_league" />
        </div>
      </v-col>
    </v-row>
    <v-row v-else> <v-col> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, quasi. </v-col></v-row>
  </v-container>
</template>
