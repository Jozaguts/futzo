<script lang="ts" setup>
import type {IStatStage} from "~/interfaces";
import {useDashboardStore} from "~/store";

const {range} = storeToRefs(useDashboardStore());
const {mobile} = useDisplay();
const ranges: { value: IStatStage; name: string }[] = [
  {value: "lastYear", name: `12 Meses`},
  {value: "lastMonth", name: `30 días`},
  {value: "lastWeek", name: `7 Días`},
  {value: "last24Hrs", name: "7 Horas"},
];
watch(range, (value, oldValue) => {
  if (value !== oldValue) {
    useDashboardStore().byRange();
  }
});

</script>
<template>
  <v-item-group mandatory v-model="range" class="mr-md-8 mr-lg-8 mx-2 mx-lg-0 mx-md-0">
    <v-item
        v-for="item in ranges"
        :key="item.value"
        :value="item.value"
        v-slot="{ isSelected, toggle }"
    >
      <v-btn
          @click="toggle"
          rounded="0"
          :color="isSelected ? 'primary' : ''"
          :class="['dashboard-app-bar-btn dashboard-app-bar-btn-' + item.value]"
      >
        {{ item.name }}
      </v-btn>
    </v-item>
  </v-item-group>
</template>
<style>
.dashboard-app-bar-btn {
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  background: #f9fafb;
  color: #344054;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
}

.dashboard-app-bar-btn-lastYear {
  border-top-left-radius: 8px !important;
  border-bottom-left-radius: 8px !important;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}

.dashboard-app-bar-btn-lastMonth,
.dashboard-app-bar-btn-lastWeek {
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}

.dashboard-app-bar-btn-last24Hrs {
  border-top-right-radius: 8px !important;
  border-bottom-right-radius: 8px !important;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}
</style>
