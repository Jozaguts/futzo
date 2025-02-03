<script lang="ts" setup>
import {useTournamentStore} from "~/store";
import Tiebreakers from "~/components/pages/torneos/calendario/Tiebreakers.vue";

const {tournament, scheduleSettings, scheduleStoreRequest} = storeToRefs(useTournamentStore());
const form = ref({
  round_trip: false,
  group_stage: false,
});
const totalTeams = computed(() => {
  return scheduleSettings.value?.teams
})
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1">Tipo de torneo: </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <p class="text-body-1">{{ scheduleSettings.format.name }}</p>
        <small class="text-caption text-medium-emphasis">{{ scheduleSettings.format.description }}</small>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1"> Ida y Vuelta? </span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-switch v-model="form.round_trip"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1 d-block">Total de equipos registrados:</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <p class="text-body-1">{{ totalTeams }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1 d-block"> Reglas de desempate</span>
        <small>Ordena en orden ascendente la prioridad de desempate</small>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <Tiebreakers v-model="scheduleSettings.tiebreakers"/>
      </v-col>
    </v-row>
  </v-container>
</template>
