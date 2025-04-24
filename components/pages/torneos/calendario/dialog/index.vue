<script lang="ts" setup>
import StepperContainer from "~/components/pages/torneos/calendario/stepper/index.vue";
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";
import type {CurrentCalendarStep} from "~/models/tournament";
import {useToast} from "~/composables/useToast";

const {
  calendarSteps,
  scheduleDialog,
  scheduleStoreRequest,
  schedulePagination,
} = storeToRefs(useTournamentStore());

const {
  secondaryTextBtn,
  primaryTextBtn,
  backHandler,
} = useDialog(calendarSteps, scheduleDialog);
const stepContainerRef = ref();
const isFetching = ref(false);
const leaveHandler = () => {
  calendarSteps.value.steps.forEach(step => step.completed = false);
  calendarSteps.value.current = 'general';
};
const handleChange = async () => {
  let hasErrors = !stepContainerRef.value.hasValidForm();
  let validation = {value: '', step: ''};
  if (calendarSteps.value.current === 'general') {
    validation.value = await stepContainerRef.value.validate()
    validation.step = 'general'
  } else if (calendarSteps.value.current === 'regular') {
    validation.value = await stepContainerRef.value.validate()
    validation.step = 'regular'
  } else if (calendarSteps.value.current === 'elimination') {
    validation.value = await stepContainerRef.value.validate()
    validation.step = 'elimination'
  } else if (calendarSteps.value.current === 'fields') {
    validation.value = await stepContainerRef.value.validate()
    validation.step = 'fields'
  }
  if (!hasErrors) {
    nextStep();
  }
};
const disabledButton = computed(() => {
  if (calendarSteps.value.current !== 'fields') {
    return false
  } else {
    return !scheduleStoreRequest.value.fields_phase.every((field) => field.availability.isCompleted)
  }
})
const nextStep = () => {
  const stepsOrder: CurrentCalendarStep[] = ['general', 'regular', 'elimination', 'fields'];
  const currentStepIndex = stepsOrder.indexOf(calendarSteps.value.current);
  if (!calendarSteps.value.steps[currentStepIndex].completed) {
    calendarSteps.value.steps[currentStepIndex].completed = true;
  }
  if (calendarSteps.value.current !== 'fields') {
    calendarSteps.value.current = stepsOrder[currentStepIndex + 1]
  } else {
    isFetching.value = true;
    useTournamentStore().generateSchedule()
        .then(() => {
          useTournamentStore()
              .getTournamentSchedules()
              .finally(() => {
                isFetching.value = false;
                scheduleDialog.value = false;
                schedulePagination.value.currentPage = 1;
                useToast().toast('success',
                    'Calendario creado',
                    'El calendario se ha creado correctamente'
                );
              })
        });
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
      @leaving="leaveHandler"

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
          :loading="isFetching"
          :disabled="disabledButton || isFetching"
          @click="handleChange"
      >{{ primaryTextBtn }}
      </v-btn>
    </template>
  </Dialog>
</template>
