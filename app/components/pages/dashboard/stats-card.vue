<script lang="ts" setup>
import CardArrow from "~/components/pages/dashboard/card-arrow.vue";
import Stats from "~/components/pages/dashboard/stats.vue";
import type { IDashboardStatsValues } from "~/interfaces";

defineProps({
  title: {
    required: true,
    type: String,
  },
  values: {
    required: true,
    type: Object as PropType<IDashboardStatsValues>,
  },
  isPositive: {
    required: true,
    type: Boolean,
    default: () => true,
  },
});
</script>
<template>
  <v-card class="dashboard-stats-card">
    <v-card-title class="dashboard-stats-card__title">{{ title }}</v-card-title>
    <v-card-item>
      <v-container class="pa-0">
        <v-row no-gutters>
          <v-col cols="7" class="position-relative">
            <div class="dashboard-stats-card--values-container">
              <p class="dashboard-stats-card--values-container__total">
                {{ values.total }}
              </p>
              <card-arrow :value="values.current" :label="values.label" />
            </div>
          </v-col>
          <v-col cols="5">
            <stats :isPositive="isPositive" :values="values.dailyData"></stats>
          </v-col>
        </v-row>
      </v-container>
    </v-card-item>
  </v-card>
</template>
