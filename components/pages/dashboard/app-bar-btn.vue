<script lang="ts" setup></script>
<template>
  <v-item-group mandatory model-value="1" class="mr-8">
    <v-item
      v-for="item in [
        { id: 1, name: '12 meses' },
        { id: 2, name: '30 días' },
        { id: 3, name: '7 días' },
        { id: 4, name: '24 horas' },
      ]"
      :key="item.id"
      v-slot="{ isSelected, toggle }"
    >
      <v-btn
        @click="toggle"
        rounded="0"
        :color="isSelected ? 'primary' : ''"
        :class="['dashboard-app-bar-btn dashboard-app-bar-btn-' + item.id]"
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

.dashboard-app-bar-btn-1 {
  border-top-left-radius: 8px !important;
  border-bottom-left-radius: 8px !important;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}

.dashboard-app-bar-btn-2,
.dashboard-app-bar-btn-3 {
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}

.dashboard-app-bar-btn-4 {
  border-top-right-radius: 8px !important;
  border-bottom-right-radius: 8px !important;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}
</style>
