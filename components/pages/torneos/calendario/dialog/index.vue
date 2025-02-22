<script lang="ts" setup>
import StepperContainer from "~/components/pages/torneos/calendario/stepper/index.vue";
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";
import type {CurrentCalendarStep} from "~/models/tournament";

const {
  calendarSteps,
  scheduleDialog,
  scheduleStoreRequest,
} = storeToRefs(useTournamentStore());

const {
  secondaryTextBtn,
  primaryTextBtn,
  backHandler,
} = useDialog(calendarSteps, scheduleDialog);
const stepContainerRef = ref();
const leaveHandler = () => {
  useTournamentStore().$reset();
};
const handleChange = async () => {
  let hasErrors = !stepContainerRef.value.hasValidForm();
  if (calendarSteps.value.current === 'general') {
    console.log('general', scheduleStoreRequest.value.general);
  } else if (calendarSteps.value.current === 'regular') {
    console.log('regular', scheduleStoreRequest.value.regular_phase);
  } else if (calendarSteps.value.current === 'elimination') {
    console.log('elimination', scheduleStoreRequest.value.elimination_phase);
  } else if (calendarSteps.value.current === 'locations') {
    console.log('locations', scheduleStoreRequest.value.locations_availability);
  }
  if (!hasErrors) {
    nextStep();
  }
};
const nextStep = () => {
  const stepsOrder: CurrentCalendarStep[] = ['general', 'regular', 'elimination', 'locations'];
  const currentStepIndex = stepsOrder.indexOf(calendarSteps.value.current);
  if (!calendarSteps.value.steps[currentStepIndex].completed) {
    calendarSteps.value.steps[currentStepIndex].completed = true;
  }
  calendarSteps.value.current = stepsOrder[currentStepIndex + 1]
};
</script>
<template>
  <Dialog
      min-height="100vh"
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
      <StepperContainer ref="stepContainerRef"/>
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
