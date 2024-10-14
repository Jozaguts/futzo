<script lang="ts" setup>
import BasicInfo from "~/components/pages/torneos/stepper/01-basicInfo.vue";
import DetailsInfo from "~/components/pages/torneos/stepper/02-detailsInfo.vue";
import StepIndicator from "~/components/shared/step-indicator.vue";
import { useTournamentStore } from "~/store";
import type { CreateTournamentForm, CurrentStep } from "~/models/tournament";

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
  const formValues = stepRef.value.handleSubmit(
    (values: CreateTournamentForm) => values,
  );
  const tournamentStoreRequestValues = await formValues();
  if (statusForm.valid) {
    if (steps.value.current === "basic-info") {
      tournamentStoreRequest.value = {
        ...tournamentStoreRequest.value,
        basic: { ...tournamentStoreRequestValues },
      };
    }
    if (steps.value.current === "details-info") {
      tournamentStoreRequest.value = {
        ...tournamentStoreRequest.value,
        details: { ...tournamentStoreRequestValues },
      };
    }
    const stepsOrder: CurrentStep[] = ["basic-info", "details-info"];
    const currentStepIndex = stepsOrder.indexOf(steps.value.current);
    if (!steps.value.completed.includes(stepsOrder[currentStepIndex])) {
      steps.value.completed.push(stepsOrder[currentStepIndex]);
    }
    if (currentStepIndex === stepsOrder.length - 1) {
      loading.value = true;
      if (isEdition.value) {
        await useTournamentStore().updateTournament(
          tournamentStoreRequest.value.basic.id as number,
          tournamentStoreRequest.value,
        );
      } else {
        await useTournamentStore().storeTournament();
      }
      loading.value = false;
      return;
    }
    steps.value.current = stepsOrder[currentStepIndex + 1];
  }
};
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
      return "Siguiente";
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
            <StepIndicator
              :current="steps.current"
              :completed="steps.completed"
            />
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
