<script setup lang="ts">
import InputDay from "~/components/pages/ubicaciones/stepper/InputDay.vue";
import InputAvailabilityDate from "~/components/pages/ubicaciones/stepper/InputAvailabilityDate.vue";

const props = defineProps({
  locationId: {
    type: Object,
    required: true
  },
  locations: {
    type: Array,
    required: true
  }
})
const day = ref(props.locations.filter(day => day.id === props.locationId)[0])
</script>
<template>
  <InputAvailabilityDate :day="day?.days.monday" label="Lunes"/>
  <InputAvailabilityDate :day="day?.days.tuesday" label="Martes"/>
  <InputAvailabilityDate :day="day?.days.wednesday" label="Miércoles"/>
  <InputAvailabilityDate :day="day?.days.tuesday" label="Jueves"/>
  <InputAvailabilityDate :day="day?.days.friday" label="Viernes"/>
  <InputAvailabilityDate :day="day?.days.saturday" label="Sábado"/>
  <InputAvailabilityDate :day="day?.days.sunday" label="Domingo"/>
  <!--   todo agrear un indicador de cuantos partidos se podran jugar a partir de las horas elegidas-->
</template>
<style lang="sass">
@use "assets/scss/components/input-location-disabled.sass"
</style>
