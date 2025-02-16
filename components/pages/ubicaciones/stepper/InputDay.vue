<script lang="ts" setup>
import type {TimeRange} from "~/models/Location";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";

const day = defineModel<TimeRange>('day');
const props = defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>
<template>
  <v-row v-auto-animate="{ duration: 300 }">
    <v-col cols="12" lg="4" md="4">
      <v-switch v-model="day.enabled" :label="props.label" class=" mt-1"></v-switch>
    </v-col>
    <v-col v-if="day.enabled" cols="12" lg="8" md="8">
      <div class="d-flex justify-space-between">
        <VueDatePicker v-model="day.start" time-picker class="custom-dp-location" :is24="false">
          <template #dp-input="{ value }">
            <v-text-field :value="value"
                          density="compact"
                          variant="outlined"
                          rounded="lg"
                          :single-line="true"
                          class="custom-location-input">
              <template #prepend-inner
              ><span class="text-medium-emphasis mr-5">Desde</span></template
              >
            </v-text-field>
          </template>
        </VueDatePicker>
        <VueDatePicker class="custom-dp-location" v-model="day.end" time-picker :is24="false">
          <template #dp-input="{ value }">
            <v-text-field
                class="custom-location-input"
                :value="value" density="compact" variant="outlined" rounded="lg" :single-line="true">
              <template #prepend-inner
              ><span class="text-medium-emphasis mr-5">Hasta</span></template
              >
            </v-text-field>
          </template>
        </VueDatePicker>
      </div>

    </v-col>
    <v-col v-else cols="12" lg="8" md="8">
      <div class="day-disabled">
        <Icon name="material-symbols:dark-mode-outline" size="24" class="icon"></Icon>
        <span class="label">No disponible</span>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="sass">
@use "assets/scss/components/input-location-disabled.sass"
</style>
