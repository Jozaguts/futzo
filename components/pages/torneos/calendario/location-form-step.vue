<script setup lang="ts">
import InputAvailabilityDate from '~/components/pages/ubicaciones/stepper/InputAvailabilityDate.vue'
import {useScheduleStore, useTournamentStore} from '~/store'
import type {
  Day,
  DayHandlerType,
  Interval,
  LocationFieldsRequest,
  NextHandlerType,
  WeekDay,
} from '~/models/Schedule'
import type {IntervalValue} from "~/models/Location";

const props = defineProps({
  field: {
    type: Object as PropType<LocationFieldsRequest>,
    required: true,
  },
  isLastStep: {
    type: Boolean,
    required: true,
  },
})
const {scheduleStoreRequest} = storeToRefs(useScheduleStore())
const form = ref<NextHandlerType>({
  field_id: props.field.field_id,
  name: props.field.field_name,
  isCompleted: false,
  availability: props.field.availability,
})
const inputDateChangedHandler = ({id: day, value: selectedSlots}: DayHandlerType) => {
  // recorremos todos los fields en el store
  scheduleStoreRequest.value.fields_phase.forEach((location) => {
    if (
        location.location_id === props.field.location_id &&
        location.field_id === props.field.field_id
    ) {
      // para este día concreto, marcamos `selected` según el array
      location.availability[day].intervals.forEach((interval) => {
        const slot = interval.value
        interval.selected = selectedSlots.some(
            sel => sel.start === slot.start && sel.end === slot.end
        )
      })
    }
  })
}
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
      <v-btn
          color="secondary"
          variant="outlined"
          class="vertical-stepper-button back"
          @click="emits('back')"
          :disabled="isLastStep"
      >Anterior
      </v-btn
      >
      <v-btn
          color="primary"
          variant="outlined"
          class="vertical-stepper-button next"
          @click="emits('next', form)"
      >Marcar como completado
        <template #append>
          <Icon name="mdi-arrow-right"></Icon>
        </template>
      </v-btn>
    </v-col>
  </v-row>
</template>
<style lang="sass">
@use "assets/scss/components/input-location-disabled.sass"
</style>
