<script lang="ts" setup>
import StepperContainer from "~/components/pages/torneos/calendario/stepper/index.vue";
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";

const {
  calendarSteps,
  scheduleDialog,
  selectedLocations,
  selectedLocationsHasError,
} = storeToRefs(useTournamentStore());
const leaveHandler = () => {
  useTournamentStore().$reset();
};
const {
  settings,
  secondaryTextBtn,
  primaryTextBtn,
  stepRef,
  backHandler,
  nextHandler,
} = useDialog(calendarSteps, scheduleDialog);
const handleChange = () => {
  if (selectedLocations.value.length === 0) {
    selectedLocationsHasError.value = true;
  } else {
    nextHandler();
  }
};
</script>
<template>
  <Dialog
      title="Crear un calendario"
      subtitle="Completa los detalles del calendario."
      :actions="{
      primary: primaryTextBtn,
      secondary: secondaryTextBtn,
    }"
      :loading="false"
      v-model="scheduleDialog"
  >
    <template #v-card-text>
      <StepperContainer v-model:step-ref="stepRef"/>
    </template>
    <template #actions>
      <v-btn
          width="50%"
          min-height="44"
          variant="outlined"
          color="secondary"
          density="comfortable"
          size="large"
          @click="backHandler"
      >{{ secondaryTextBtn }}
      </v-btn>
      <v-btn
          width="50%"
          min-height="44"
          variant="elevated"
          color="primary"
          density="comfortable"
          size="large"
          @click="handleChange"
      >{{ primaryTextBtn }}
      </v-btn>
    </template>
  </Dialog>
</template>
