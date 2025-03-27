<script setup lang="ts">
import InputAvailabilityDate from "~/components/pages/ubicaciones/stepper/InputAvailabilityDate.vue";
import {useTournamentStore} from "~/store";
import type {DayHandlerType, Interval, LocationFieldsRequest, WeekDay} from "~/models/Location";

const props = defineProps({
  field: {
    type: Object as PropType<LocationFieldsRequest>,
    required: true
  },
  isLastStep: {
    type: Boolean,
    required: true,
  }
})
const {scheduleStoreRequest} = storeToRefs(useTournamentStore())
const form = ref({
  field_id: props.field.field_id,
  name: props.field.field_name,
  isCompleted: false,
  availability: props.field.availability
})
const inputDateChangedHandler = (value: DayHandlerType) => {
  if (value.value) {
    scheduleStoreRequest.value.fields_phase.map(location => {
      if (location.location_id === props.field.location_id && location.field_id === props.field.field_id) {
        location.availability[value.id].intervals.map((interval: Interval) => {
          if (value.value.includes('*') || value.value.includes(interval.value)) {
            interval.selected = true
          }
        })
      }
    })
  }
}
const availabilities = computed(() => {
  delete props.field.availability['isCompleted']
  return props.field.availability
})
const emits = defineEmits(['back', 'next', 'field-disabled'])
const dayDisabledHandler = (day: WeekDay) => {
  form.value.availability[day].enabled = !form.value.availability[day].enabled
}
</script>
<template>
  <InputAvailabilityDate
      :disabled="field.disabled"
      v-for="(item, key) in availabilities"
      :day="props.field.availability[key]"
      :id="key as number"
      :label="item.label"
      @input-date-changed="inputDateChangedHandler"
      @day-disabled="dayDisabledHandler"
  />
  <v-row>
    <v-col>
      <v-btn color="secondary" variant="tonal" class="vertical-stepper-button next" @click="emits('field-disabled', form)">Desactivar campo</v-btn>
      <v-btn color="secondary" variant="tonal" class="vertical-stepper-button next" @click="emits('next', form)">Asignar
        <template #append>
          <Icon name="mdi-arrow-right"></Icon>
        </template>
      </v-btn>
      <v-btn color="primary" variant="text" class="vertical-stepper-button back" @click="emits('back')" :disabled="isLastStep">Anterior</v-btn>
    </v-col>
  </v-row>
</template>
<style lang="sass">
@use "assets/scss/components/input-location-disabled.sass"
</style>
