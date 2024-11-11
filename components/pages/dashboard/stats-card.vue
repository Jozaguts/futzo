<script lang="ts" setup>
import CardArrow from "~/components/pages/dashboard/card-arrow.vue";
import Stats from "~/components/pages/dashboard/stats.vue";

type StatsCardValues = {
  total: number;
  percentage: number;
};
const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  values: {
    required: true,
    type: Object as PropType<StatsCardValues>,
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
              <card-arrow :value="values.percentage" />
            </div>
          </v-col>
          <v-col cols="5">
            <stats
              :values="[0, 2, 4, 15, 5, 10, 8, 12, 9, 15, 13, 18, 16, 20, 22]"
            ></stats>
          </v-col>
        </v-row>
      </v-container>
    </v-card-item>
  </v-card>
</template>
