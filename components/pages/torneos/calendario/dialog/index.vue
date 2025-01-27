<script lang="ts" setup>
import StepperContainer from "~/components/pages/torneos/calendario/stepper/index.vue";
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";
import useSchemas from "~/composables/useSchemas";
import type {CurrentCalendarStep} from "~/models/tournament";

const {
  calendarSteps,
  scheduleDialog,
  selectedLocations,
  selectedLocationsHasError,
  scheduleStoreRequest,
} = storeToRefs(useTournamentStore());
const {validate: validateGeneral, setValues, fields, handleSubmit} = useSchemas("create-calendar");
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
const handleChange = async () => {
  let hasErrors = false;
  if (calendarSteps.value.current === 'general') {
    scheduleStoreRequest.value.general.errors.locations = ''
    const {errors, ...values} = scheduleStoreRequest.value.general
    fields.locations.fieldValue = scheduleStoreRequest.value.general.locations
    fields.start_date.fieldValue = scheduleStoreRequest.value.general.start_date
    fields.game_time.fieldValue = scheduleStoreRequest.value.general.game_time
    fields.time_between_games.fieldValue = scheduleStoreRequest.value.general.time_between_games
    const validate = handleSubmit(value => {
      if (value.locations.length === 0) {
        hasErrors = true
        scheduleStoreRequest.value.general.errors.locations = 'Debes seleccionar al menos una ubicación'
      }
    })
    await validate()
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
