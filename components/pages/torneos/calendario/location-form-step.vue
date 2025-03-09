<script setup lang="ts">
import InputAvailabilityDate from "~/components/pages/ubicaciones/stepper/InputAvailabilityDate.vue";

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
const form = ref({
  field_id: props.field.id,
  name: props.field.name,
  isCompleted: false,
  availability: props.field.availability
})
const inputDateChangedHandler = (value) => {
  if (value.value) {
    const day = value.day.id
    const positon = value.day.isStart ? 'start' : 'end'
    const hours = value.day.value.split(':')[0]
    form.value.availability[day][positon].hours = hours
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
      <!--      al momento de click en asignar se debe dentro de availabiltiy marcar como isCompleted en tru y el form que ahora exste es mejor pasarlo de una vez al store
      scheduleStoreRequest   availability: TournamentLocationAvailability[]
      -->
      <v-btn color="secondary" variant="tonal" class="vertical-steper-button next" @click="emits('next')">Asignar</v-btn>
      <v-btn color="primary" variant="text" class="vertical-steper-button back" @click="emits('back')" :disabled="isLastStep">Anterior</v-btn>
    </v-col>
  </v-row>
</template>
<style lang="sass">
@use "assets/scss/components/input-location-disabled.sass"
</style>
