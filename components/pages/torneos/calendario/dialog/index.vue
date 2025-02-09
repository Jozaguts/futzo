<script lang="ts" setup>
import StepperContainer from "~/components/pages/torneos/calendario/stepper/index.vue";
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";
import type {CurrentCalendarStep} from "~/models/tournament";

const {
  calendarSteps,
  scheduleDialog,
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
    console.log();
  } else if (calendarSteps.value.current === 'regular') {
    console.log();
  } else if (calendarSteps.value.current === 'elimination') {
    console.log();
  }
  if (!hasErrors) {
    nextStep();
  }
};
const nextStep = () => {
  const stepsOrder: CurrentCalendarStep[] = ['general', 'regular', 'elimination'];
  const currentStepIndex = stepsOrder.indexOf(calendarSteps.value.current);
  if (!calendarSteps.value.steps[currentStepIndex].completed) {
    calendarSteps.value.steps[currentStepIndex].completed = true;
  }
  calendarSteps.value.current = stepsOrder[currentStepIndex + 1]
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
