<script setup lang="ts">
import InputAvailabilityDate from "~/components/pages/ubicaciones/stepper/InputAvailabilityDate.vue";
import {useTournamentStore} from "~/store";
import type {Day, DayHandlerType, Interval, LocationFieldsRequest, NextHandlerType, WeekDay} from "~/models/Schedule";

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
const form = ref<NextHandlerType>({
  field_id: props.field.field_id,
  name: props.field.field_name,
  isCompleted: false,
  availability: props.field.availability
})
const inputDateChangedHandler = (value: DayHandlerType) => {
  const selectedHours = value.value;
  const day = value.id;
  const hasAllDay = selectedHours.includes('*');
  const onlyAllDay = hasAllDay && selectedHours.length === 1;

  scheduleStoreRequest.value.fields_phase.forEach(location => {
    if (
        location.location_id === props.field.location_id &&
        location.field_id === props.field.field_id
    ) {
      location.availability[day].intervals.forEach((interval: Interval) => {
        if (onlyAllDay) {
          // Solo "*" seleccionado: marcar todos excepto "*" como true
          interval.selected = interval.value !== '*';
        } else if (hasAllDay) {
          // "*" y otros horarios: marcar "*" como true, el resto según si están en selectedHours
          interval.selected =
              interval.value === '*' || selectedHours.includes(interval.value);
        } else {
          // Sin "*": marcar solo los seleccionados
          interval.selected = selectedHours.includes(interval.value);
        }
      });
    }
  });
};
const availabilities = computed(() => {
  let data = {} as Record<WeekDay, Day>
  for (const key in props.field.availability) {
    if (typeof props.field.availability[key as WeekDay] === 'object') {
      data[key as WeekDay] = props.field.availability[key as WeekDay]
    }
  }
  return data
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
      :day="props.field.availability[key] as Day"
      :key="key"
      :data-value="key"
      :id="key as WeekDay"
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
