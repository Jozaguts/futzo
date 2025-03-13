<script setup lang="ts">
import InputAvailabilityDate from "~/components/pages/ubicaciones/stepper/InputAvailabilityDate.vue";
import {useTournamentStore} from "~/store";

const props = defineProps({
  field: {
    type: Object,
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
const inputDateChangedHandler = (value) => {
  if (value.value) {
    const day = value.id
    const position = value.isStart ? 'start' : 'end'
    const hours = value.value.split(':')[0]
    form.value.availability[day][position].hours = hours
    scheduleStoreRequest.value.fields_phase.map(location => {
      if (location.location_id === props.field.location_id && location.field_id === props.field.field_id) {
        location.availability = form.value.availability
      }
    })
  }

}
const emits = defineEmits(['back', 'next'])
</script>
<template>
  <InputAvailabilityDate :day="props.field.availability.monday" id="monday" label="Lunes" @input-date-changed="inputDateChangedHandler"/>
  <InputAvailabilityDate :day="props.field.availability.tuesday" id="tuesday" label="Martes" @input-date-changed="inputDateChangedHandler"/>
  <InputAvailabilityDate :day="props.field.availability.wednesday" id="wednesday" label="Miércoles" @input-date-changed="inputDateChangedHandler"/>
  <InputAvailabilityDate :day="props.field.availability.tuesday" id="tuesday" label="Jueves" @input-date-changed="inputDateChangedHandler"/>
  <InputAvailabilityDate :day="props.field.availability.friday" id="friday" label="Viernes" @input-date-changed="inputDateChangedHandler"/>
  <InputAvailabilityDate :day="props.field.availability.saturday" id="saturday" label="Sábado" @input-date-changed="inputDateChangedHandler"/>
  <InputAvailabilityDate :day="props.field.availability.sunday" id="sunday" label="Domingo" @input-date-changed="inputDateChangedHandler"/>
  <v-row>
    <v-col>
      <v-btn color="secondary" variant="tonal" class="vertical-stepper-button next" @click="emits('next', form)">Asignar</v-btn>
      <v-btn color="primary" variant="text" class="vertical-stepper-button back" @click="emits('back')" :disabled="isLastStep">Anterior</v-btn>
    </v-col>
  </v-row>
</template>
<style lang="sass">
@use "assets/scss/components/input-location-disabled.sass"
</style>
