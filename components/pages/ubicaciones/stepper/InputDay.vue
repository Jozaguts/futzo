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
        <VueDatePicker v-model="day.start" time-picker class="custom-dp-location">
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
        <VueDatePicker class="custom-dp-location" v-model="day.end" time-picker>
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
.custom-location-input
  max-height: 44px
  padding-inline: 0

.custom-location-input > .v-input__control > .v-field > .v-field__field > input
  text-indent: 32px
  font-weight: 900

.day-disabled
  width: 100%
  height: 52px
  background: #F3F4F4
  border-radius: 8px
  display: flex
  align-items: center
  padding-left: 1rem
  border: 1px solid #DBDCDE

  .icon
    color: #C9CBCD
    font-size: 24px
    margin-right: 4px

  .label
    font-size: 16px
    color: #C9CBCD
    font-weight: 600
    line-height: 24px
    margin-left: 8px

</style>
