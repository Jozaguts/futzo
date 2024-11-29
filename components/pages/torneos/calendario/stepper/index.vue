<script lang="ts" setup>
import General from "~/components/pages/torneos/calendario/stepper/01-general.vue";
import Regular from "~/components/pages/torneos/calendario/stepper/02-regular-phase.vue";
import Elimination from "~/components/pages/torneos/calendario/stepper/03-elimination-phase.vue";
import IndicatorStep from "~/components/shared/IndicatorStep.vue";
import { useTournamentStore } from "~/store";
import type {
  CalendarStoreRequest,
  CurrentCalendarStep,
  EliminationPhaseForm,
  GeneralCalendarForm,
  RegularPhaseForm,
} from "~/models/tournament";

type StepRef = { validate: Function; handleSubmit: Function };

const loading = ref(false);
const {
  calendarSteps,
  isCalendarEdition,
  calendarStoreRequest,
  calendarDialog,
} = storeToRefs(useTournamentStore());
// const stepRef = ref<{ validate: Function; handleSubmit: Function }>({
//   validate: Function,
//   handleSubmit: Function,
// });
const stepRef = defineModel<StepRef>("stepRef");
const backHandler = () => {
  if (calendarSteps.value.current === "general") {
    calendarDialog.value = false;
    return;
  }
  const stepsOrder: CurrentCalendarStep[] = [
    "general",
    "regular",
    "elimination",
  ];
  const currentStepIndex = stepsOrder.indexOf(calendarSteps.value.current);
  calendarSteps.value.current = stepsOrder[currentStepIndex - 1];
};
const nextHandler = async () => {
  const statusForm = await stepRef.value?.validate();
  if (statusForm.valid) {
    const calendarStoreRequestValues = await getFormValues();
    fillTournamentStoreRequest(calendarStoreRequestValues);
    const stepsOrder: CurrentCalendarStep[] = [
      "general",
      "regular",
      "elimination",
    ];
    const currentStepIndex = stepsOrder.indexOf(calendarSteps.value.current);
    if (!calendarSteps.value.steps[currentStepIndex].completed) {
      calendarSteps.value.steps[currentStepIndex].completed = true;
    }
    const isLastStep = currentStepIndex === stepsOrder.length - 1;
    isLastStep
      ? await saveHandler()
      : (calendarSteps.value.current = stepsOrder[currentStepIndex + 1]);
  }
};

async function saveHandler() {
  loading.value = true;
  isCalendarEdition.value
    ? await useTournamentStore().updateTournament()
    : await useTournamentStore().storeTournament();
  loading.value = false;
}

async function getFormValues() {
  const formValues = stepRef.value.handleSubmit(
    (values: CalendarStoreRequest) => values,
  );

  return await formValues();
}

function fillTournamentStoreRequest(
  values: GeneralCalendarForm | RegularPhaseForm | EliminationPhaseForm,
) {
  if (calendarSteps.value.current === "general") {
    calendarStoreRequest.value = {
      ...calendarStoreRequest.value,
      general: { ...(values as GeneralCalendarForm) },
    };
  }
  if (calendarSteps.value.current === "regular") {
    calendarStoreRequest.value = {
      ...calendarStoreRequest.value,
      regular: { ...(values as RegularPhaseForm) },
    };
  }
  if (calendarSteps.value.current === "elimination") {
    calendarStoreRequest.value = {
      ...calendarStoreRequest.value,
      elimination: { ...(values as EliminationPhaseForm) },
    };
  }
}
</script>
<template>
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <IndicatorStep :form-steps="calendarSteps" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <transition-slide
          group
          :offset="{
            enter: ['-100%', 0],
            leave: ['100%', 0],
          }"
        >
          <General
            ref="stepRef"
            v-if="calendarSteps.current === 'general'"
            :key="calendarSteps.current"
          />
          <Regular
            ref="stepRef"
            v-if="calendarSteps.current === 'regular'"
            :key="calendarSteps.current"
          />
          <Elimination
            ref="stepRef"
            v-if="calendarSteps.current === 'elimination'"
            :key="calendarSteps.current"
          />
        </transition-slide>
      </v-col>
    </v-row>
  </v-container>
</template>
