<script lang="ts" setup>
import {useTournamentStore} from "~/store";
import Tiebreakers from "~/components/pages/torneos/calendario/Tiebreakers.vue";

const {scheduleStoreRequest} = storeToRefs(useTournamentStore());

const {fields, meta} = useSchemas("calendar-regular-step", {
  round_trip: scheduleStoreRequest.value?.regular_phase.round_trip,
  tiebreakers: scheduleStoreRequest.value?.regular_phase.tiebreakers
});
const isValid = computed(() => {
  return meta.value.valid
})
defineExpose({
  isValid,
})
watch(fields.round_trip, (value) => {
  if (value?.fieldValue) {
    scheduleStoreRequest.value = {
      ...scheduleStoreRequest.value,
      regular_phase: {
        ...scheduleStoreRequest.value.regular_phase,
        round_trip: value.fieldValue
      }
    }
  }
}, {deep: true})
watch(fields.tiebreakers, (value) => {
  if (value?.fieldValue) {
    scheduleStoreRequest.value.regular_phase.tiebreakers = value.fieldValue
  }
}, {deep: true})
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Ida y Vuelta? </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-switch v-model="fields.round_trip.fieldValue" v-bind="fields.round_trip.fieldPropsValue"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1 d-block"> Reglas de desempate</span>
        <small>Ordena en orden ascendente la prioridad de desempate</small>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <Tiebreakers v-model="fields.tiebreakers.fieldValue"/>
      </v-col>
    </v-row>
  </v-container>
</template>
