<script lang="ts" setup>
import BasicInfo from "~/components/pages/torneos/stepper/01-basicInfo.vue";
import DetailsInfo from "~/components/pages/torneos/stepper/02-detailsInfo.vue";
import StepIndicator from "~/components/shared/step-indicator.vue";
import { useTournamentStore } from "~/store";
import type {
  BasicInfoForm,
  CreateTournamentForm,
  CurrentStep,
  DetailsInfoForm,
} from "~/models/tournament";

const loading = ref(false);
const { steps, isEdition, tournamentStoreRequest, dialog } =
  storeToRefs(useTournamentStore());
const stepRef = ref<{ validate: Function; handleSubmit: Function }>({
  validate: Function,
  handleSubmit: Function,
});
const backHandler = () => {
  if (steps.value.current === "basic-info") {
    dialog.value = false;
    return;
  }
  const stepsOrder: CurrentStep[] = ["basic-info", "details-info"];
  const currentStepIndex = stepsOrder.indexOf(steps.value.current);
  steps.value.current = stepsOrder[currentStepIndex - 1];
};
const nextHandler = async () => {
  const statusForm = await stepRef.value.validate();
  if (statusForm.valid) {
    const tournamentStoreRequestValues = await getFormValues();
    fillTournamentStoreRequest(tournamentStoreRequestValues);
    const stepsOrder: CurrentStep[] = ["basic-info", "details-info"];
    const currentStepIndex = stepsOrder.indexOf(steps.value.current);
    if (!steps.value.steps[currentStepIndex].completed) {
      steps.value.steps[currentStepIndex].completed = true;
    }
    const isLastStep = currentStepIndex === stepsOrder.length - 1;
    isLastStep
      ? await saveHandler()
      : (steps.value.current = stepsOrder[currentStepIndex + 1]);
  }
};

async function saveHandler() {
  loading.value = true;
  isEdition.value
    ? await useTournamentStore().updateTournament()
    : await useTournamentStore().storeTournament();
  loading.value = false;
}

async function getFormValues() {
  const formValues = stepRef.value.handleSubmit(
    (values: CreateTournamentForm) => values,
  );

  return await formValues();
}

function fillTournamentStoreRequest(values: BasicInfoForm | DetailsInfoForm) {
  if (steps.value.current === "basic-info") {
    tournamentStoreRequest.value = {
      ...tournamentStoreRequest.value,
      basic: { ...(values as BasicInfoForm) },
    };
  }
  if (steps.value.current === "details-info") {
    tournamentStoreRequest.value = {
      ...tournamentStoreRequest.value,
      details: { ...(values as DetailsInfoForm) },
    };
  }
}

const textButtonCancel = computed(() => {
  if (steps.value.current === "basic-info") {
    return "Cancelar";
  } else {
    return "Regresar";
  }
});
const textButton = computed(() => {
  switch (steps.value.current) {
    case "basic-info":
      return "Siguiente";
    case "details-info":
      return "Crear torneo";
    default:
      return "Crear torneo";
  }
});
</script>
<template>
  <PerfectScrollbar
    :options="{
      suppressScrollX: true,
    }"
  >
    <v-card-text>
      <v-container class="pa-0">
        <v-row>
          <v-col>
            <StepIndicator :form-steps="steps" />
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
              <BasicInfo
                ref="stepRef"
                v-if="steps.current === 'basic-info'"
                :key="steps.current"
              />
              <DetailsInfo
                ref="stepRef"
                v-if="steps.current === 'details-info'"
                :key="steps.current"
              />
            </transition-slide>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn
              variant="outlined"
              block
              color="secondary"
              density="comfortable"
              size="large"
              @click="backHandler"
              >{{ textButtonCancel }}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              variant="elevated"
              block
              color="primary"
              density="comfortable"
              size="large"
              :loading="loading"
              @click="nextHandler"
              >{{ textButton }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </PerfectScrollbar>
</template>
