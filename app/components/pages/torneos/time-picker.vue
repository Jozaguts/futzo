<script lang="ts" setup>
import {VueDatePicker} from '@vuepic/vue-datepicker'
import type {CalendarTypePicker} from '~/models/tournament'

const to = defineModel<CalendarTypePicker>('to', {
    required: true,
  })
  const from = defineModel<CalendarTypePicker>('from', {
    required: true,
  })
  const fromBtnRf = ref()
  const toBtnRf = ref()
  const selectDate = (direction: string) => {
    direction === 'from' ? fromBtnRf.value.selectDate() : toBtnRf.value.selectDate()
  }
</script>

<template>
  <v-row>
    <v-col>
      <vue-date-picker v-model="to" time-picker :ui="{ menu: 'custom-width' }" ref="fromBtnRf">
        <template #dp-input="{ value }">
          <v-text-field :value="value" density="compact" variant="outlined">
            <template #prepend-inner><span class="text-medium-emphasis">Desde</span></template>
          </v-text-field>
        </template>
        <template #action-preview></template>
        <template #action-buttons>
          <p class="calendar-custom-btn" @click="() => selectDate('from')">Aceptar</p>
        </template>
      </vue-date-picker>
    </v-col>
    <v-col>
      <vue-date-picker ref="toBtnRf" v-model="from" time-picker :ui="{ menu: 'custom-width' }">
        <template #dp-input="{ value }">
          <v-text-field :value="value" density="compact" single-line hide-details>
            <template #prepend-inner><span class="text-medium-emphasis">Hasta</span></template>
          </v-text-field>
        </template>
        <template #action-preview></template>
        <template #action-buttons>
          <p class="calendar-custom-btn" @click="() => selectDate('to')">Aceptar</p>
        </template>
      </vue-date-picker>
    </v-col>
  </v-row>
</template>
<style>
  .calendar-custom-btn {
    border-radius: 8px;
    border: 1px solid #7f56d9;
    background: #9155fd;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    color: var(--futzo-on-surface);
    padding: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .dp__menu.dp__menu_index.custom-width {
    width: 260px;
  }

  :root {
    --dp-primary-color: #f0ad4e;
  }
</style>
