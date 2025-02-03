<script lang="ts" setup>
import {useTournamentStore} from '~/store'

const {scheduleSettings} = storeToRefs(useTournamentStore())
const chipEventHandler = (value: number[]) => {
  scheduleSettings.value?.phases.map(
      (phase) => (phase.is_active = value.includes(phase.id))
  )
}
const activePhases = ref(
    scheduleSettings.value?.phases
        .filter((phase) => phase.is_active)
        .map((phase) => phase.id)
)
const totalTeams = computed(() => {
  return scheduleSettings.value?.teams
})
const disabledOption = (phase) => {
  console.log({phase: phase.name})
  if (phase.name === 'Fase de grupos' || phase.name === 'Tabla general') {
    return true
  }
  if (totalTeams.value < 16 && phase.name === 'Octavos de Final') {
    return true
  }
  if (totalTeams.value < 8 && phase.name === 'Cuartos de final') {
    return true
  }
}
// cuantos avanzan a la siguiente ronda?
const teamsToNextRound = computed(() => {
  const phases = scheduleSettings.value.phases;
  const getPhase = (name) => phases.find((phase) => phase.name === name);
  const roundOfSixteen = getPhase('Octavos de Final');
  const quarterFinals = getPhase('Cuartos de Final');
  const semiFinals = getPhase('Semifinales');
  const final = getPhase('Final');

  if (totalTeams.value > 16 && roundOfSixteen.is_active) return 16;
  if (totalTeams.value > 8 && quarterFinals.is_active) return 8;
  if (totalTeams.value > 4 && semiFinals.is_active) return 4;
  if (totalTeams.value > 2 && final.is_active) return 2;
  return 1;
});
const form = ref({
  round_trip: true,
});
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" lg="4" md="4">
        <span class="text-body-1 d-block">Avanzan a la siguiente ronda:</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <p>{{ teamsToNextRound }}</p>
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
        <span class="text-body-1 d-block">Fases:</span>
      </v-col>
      <v-col cols="12" lg="8" md="8">
        <v-chip-group
            multiple
            column
            filter
            v-model="activePhases"
            @update:model-value="chipEventHandler"
        >
          <v-chip
              v-for="phase in scheduleSettings.phases"
              :key="phase.id"
              :disabled="disabledOption(phase)"
              :value="phase.id"
          >{{ phase.name }}
          </v-chip>
        </v-chip-group>
        <small
            class="text-caption"
            v-if="scheduleSettings.format.name === 'Liga y Eliminatoria'"
        >
          *Fase de grupos es obligatoria
        </small>
      </v-col>
    </v-row>
  </v-container>
</template>
