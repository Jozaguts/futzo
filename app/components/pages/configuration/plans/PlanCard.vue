<script setup lang="ts">
  import { Icon } from '#components'
  import type { FutzoPlan } from '~/models/Product'
  const {
    isMonthlyPrice,
    plan,
    prioritary = false,
  } = defineProps<{ isMonthlyPrice: boolean; plan: FutzoPlan; prioritary?: Boolean }>()
  const payHandler = () => {
    useSanctumClient()('/api/v1/checkout', {
      query: {
        user_id: useAuth()?.user?.id,
        plan: plan?.sku,
        period: isMonthlyPrice ? 'month' : 'year',
      },
    })
  }
</script>

<template>
  <v-card class="pa-8 futzo-rounded" min-width="280" :elevation="prioritary ? 10 : 2">
    <div class="position-relative" v-if="prioritary">
      <v-chip class="float-end position-absolute top-0 right-0" color="primary" variant="flat" size="small"
        >Más elegido</v-chip
      >
    </div>
    <v-card-title class="text-center text-h5"> {{ plan?.name }} </v-card-title>
    <v-card-subtitle class="text-center">
      <span
        class="text-center text-h5 font-weight-bold"
        :class="!isMonthlyPrice ? 'text-decoration-line-through text-medium-emphasis' : 'text-black'"
        >{{ plan.currency.symbol }}{{ plan.price }}{{ plan.currency.iso_code }}/mes
      </span>
    </v-card-subtitle>
    <v-card-text>
      <v-divider color="primary" opacity="1" />
      <p class="my-1 text-center" v-if="isMonthlyPrice">Plan mensual estándar</p>
      <div v-else class="my-1 text-center font-weight-bold">
        <div class="d-flex justify-center align-center my-1">
          <p class="mr-1">{{ plan.currency.symbol }}{{ plan.annually_price }}{{ plan.currency.iso_code }}/mes</p>
          <v-chip variant="elevated" color="primary" density="compact" size="small"> Facturado anual </v-chip>
        </div>
        <span class="d-block font-weight-normal text-body-2">
          💸 Ahorra
          <span class="font-weight-bold">
            {{ plan.currency.symbol }}{{ plan.annual_saving }}{{ plan.currency.iso_code }}/año
          </span></span
        >
      </div>
      <v-divider color="primary" opacity="1" />
      <v-list>
        <v-list-item :prepend-icon="() => h(Icon, { name: 'futzo-icon:check-box' })" lines="one" class="text-left"
          >administra todos tus torneos desde un solo lugar</v-list-item
        >
        <v-list-item :prepend-icon="() => h(Icon, { name: 'futzo-icon:check-box' })" lines="one" class="text-left"
          >administra todos tus torneos desde un solo lugar</v-list-item
        >
        <v-list-item :prepend-icon="() => h(Icon, { name: 'futzo-icon:check-box' })" lines="one" class="text-left"
          >administra todos tus torneos desde un solo lugar</v-list-item
        >
        <v-list-item :prepend-icon="() => h(Icon, { name: 'futzo-icon:check-box' })" lines="one" class="text-left"
          >administra todos tus torneos desde un solo lugar</v-list-item
        >
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn block variant="outlined" @click="payHandler">Suscribete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
