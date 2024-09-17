<script lang="ts" setup>
import createTeamStep from "~/components/pages/jugadores/stepper/01-basic-info.vue";
import createDtStep from "~/components/pages/jugadores/stepper/02-details-info.vue";
import createOwnerStep from "~/components/pages/jugadores/stepper/03-contact-info.vue";
import StepIndicator from "~/components/pages/jugadores/stepper/step-indicator.vue";
import { usePlayerStore } from "~/store";
import type { CreatePlayerForm, CurrentStep } from "~/models/player";

const loading = ref(false);
const { steps, isEdition, playerStoreRequest, dialog } =
  storeToRefs(usePlayerStore());
const stepRef = ref<{ validate: Function; handleSubmit: Function }>({
  validate: Function,
  handleSubmit: Function,
});
const backHandler = () => {
  if (steps.value.current === "basic-info") {
    dialog.value = false;
    return;
  }
  const stepsOrder: CurrentStep[] = [
    "basic-info",
    "details-info",
    "contact-info",
  ];
  const currentStepIndex = stepsOrder.indexOf(steps.value.current);
  steps.value.current = stepsOrder[currentStepIndex - 1];
};
const nextHandler = async () => {
  const statusForm = await stepRef.value.validate();
  const formValues = stepRef.value.handleSubmit(
    (values: CreatePlayerForm) => values,
  );
  const playerStoreRequestValues = await formValues();
  if (statusForm.valid) {
    if (steps.value.current === "basic-info") {
      playerStoreRequest.value = {
        ...playerStoreRequest.value,
        basic: { ...playerStoreRequestValues },
      };
    }
    if (steps.value.current === "details-info") {
      playerStoreRequest.value = {
        ...playerStoreRequest.value,
        details: { ...playerStoreRequestValues },
      };
    }
    if (steps.value.current === "contact-info") {
      playerStoreRequest.value = {
        ...playerStoreRequest.value,
        contact: { ...playerStoreRequestValues },
      };
    }
    const stepsOrder: CurrentStep[] = [
      "basic-info",
      "details-info",
      "contact-info",
    ];
    const currentStepIndex = stepsOrder.indexOf(steps.value.current);
    if (!steps.value.completed.includes(stepsOrder[currentStepIndex])) {
      // si el paso no está completado
      steps.value.completed.push(stepsOrder[currentStepIndex]); // se agrega al array de completados
    }
    if (currentStepIndex === stepsOrder.length - 1) {
      // si es el último paso
      loading.value = true;
      if (isEdition.value) {
        await usePlayerStore().updatePlayer(playerStoreRequest.value.basic.id);
      } else {
        await usePlayerStore().createPlayer();
      }
      loading.value = false;
      return;
    }
    steps.value.current = stepsOrder[currentStepIndex + 1]; // siguiente paso
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
    case "contact-info":
      return isEdition.value ? "Actualizar jugador" : "Crear jugador";
    default:
      return "Crear jugador";
  }
});
</script>
<template>
  <v-card-text>
    <v-container class="pa-0">
      <v-row>
        <v-col>
          <StepIndicator />
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
            <createTeamStep
              ref="stepRef"
              v-if="steps.current === 'basic-info'"
              :key="steps.current"
            />
            <createDtStep
              ref="stepRef"
              v-if="steps.current === 'details-info'"
              :key="steps.current"
            />
            <createOwnerStep
              ref="stepRef"
              v-if="steps.current === 'contact-info'"
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
            >{{ textButtonCancel }}</v-btn
          >
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
            >{{ textButton }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
