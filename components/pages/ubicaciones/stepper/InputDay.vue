<script lang="ts" setup>
import type {TimeRange, AvailabilityTime} from "~/models/Location";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";

const props = defineProps({
  day: {
    type: Object as PropType<TimeRange>,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  onUpdateDay: {
    type: Function as PropType<(val: TimeRange) => void>,
    required: true
  },
  id: {
    type: String,
  }
})
</script>
<template>
  <v-row v-auto-animate="{ duration: 300 }">
    <v-col cols="12" lg="3" md="3">
      <v-switch
          :model-value="props.day.enabled"
          @update:model-value="(val: boolean | null) => props.onUpdateDay({ ...props.day, enabled: val as boolean })"
          class="mt-1 text-caption"
          density="compact"

      >
        <template #label><span class="text-caption"> {{ label }}</span></template>
      </v-switch>
    </v-col>

    <v-col v-if="day.enabled" cols="12" lg="9" md="9">
      <div class="d-flex">
        <div class="w-100 mx-2">

          <VueDatePicker
              time-picker class="custom-dp-location" :is24="false"
              :model-value="props.day.start"
              @update:model-value="(val: AvailabilityTime) => props.onUpdateDay({ ...props.day, start: val})"
          >
            <template #dp-input="{ value }">
              <v-text-field :value="value"
                            density="compact"
                            variant="outlined"
                            rounded="lg"
                            :single-line="true"
                            class="custom-location-input"
                            :error="!value"
              >
                <template #prepend-inner
                ><span class="text-medium-emphasis">Desde</span></template
                >

              </v-text-field>
            </template>
          </VueDatePicker>
        </div>
        <div class="w-100 mx-2 ">
          <VueDatePicker
              class="custom-dp-location"
              :model-value="props.day.end"
              @update:model-value="(val: AvailabilityTime) => props.onUpdateDay({ ...props.day, end: val })"
              time-picker
              :is24="false"
          >
            <template #dp-input="{ value }">
              <v-text-field
                  class="custom-location-input"
                  :value="value"
                  density="compact"
                  variant="outlined"
                  rounded="lg"
                  :single-line="true"
                  :error="!value"
              >

                <template #prepend-inner
                ><span class="text-medium-emphasis mr-1">Hasta</span></template
                >
              </v-text-field>
            </template>
          </VueDatePicker>
        </div>
      </div>
    </v-col>
    <v-col v-else cols="12" lg="9" md="9">
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
