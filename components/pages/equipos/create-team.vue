<script setup lang="ts">
import StepperDot from "~/components/shared/stepper-dot.vue";
import CreateTeamStepper from "~/components/pages/equipos/stepper/index.vue";
import { storeToRefs } from "pinia";
import { useTeamStore, useTournamentStore } from "~/store";
import type { CurrentStep } from "~/models/Team";

const { isEdition, tournamentId } = storeToRefs(useTournamentStore());
const teamStore = useTeamStore();
const { steps } = storeToRefs(teamStore);

const title = computed(() => {
  switch (steps.value.current) {
    case "createTeam":
      return isEdition.value ? "Editar equipo" : "Crear un equipo";
    case "createDt":
      return isEdition.value ? "Editar DT" : "Crear DT";
    case "createOwner":
      return isEdition.value ? "Editar dueño" : "Crear dueño";
  }
});
const subtitle = computed(() => {
  switch (steps.value.current) {
    case "createTeam":
      return isEdition.value
        ? "Modifica los detalles del equipo."
        : "Completa los detalles del equipo.";
    case "createDt":
      return isEdition.value
        ? "Modifica los detalles del DT."
        : "Completa los detalles del DT.";
    case "createOwner":
      return isEdition.value
        ? "Modifica los detalles del dueño."
        : "Completa los detalles del dueño.";
  }
});
const textButton = computed(() => {
  switch (steps.value.current) {
    case "createTeam":
      return "Siguiente";
    case "createDt":
      return "Siguiente";
    case "createOwner":
      return isEdition.value ? "Actualizar equipo" : "Crear equipo";
    default:
      return "Crear equipo";
  }
});
const textButtonCancel = computed(() => {
  if (steps.value.current === "createTeam") {
    return "Cancelar";
  } else {
    return "Regresar";
  }
});
const leaveHandler = () => {
  steps.value.current = "createTeam";
  steps.value.completed = [];
};
const nextHandler = () => {
  const stepsOrder: CurrentStep[] = ["createTeam", "createDt", "createOwner"];
  const currentStepIndex = stepsOrder.indexOf(steps.value.current);
  steps.value.current = stepsOrder[currentStepIndex + 1];
};
const backHandler = () => {
  if (steps.value.current === "createTeam") {
    teamStore.dialog = false;
    return;
  }

  const stepsOrder: CurrentStep[] = ["createTeam", "createDt", "createOwner"];
  const currentStepIndex = stepsOrder.indexOf(steps.value.current);
  steps.value.current = stepsOrder[currentStepIndex - 1];
};
</script>

<template>
  <v-dialog
    v-model="teamStore.dialog"
    max-width="688"
    @after-leave="leaveHandler"
  >
    <v-card
      class="create-tournament-card futzo-rounded"
      :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <v-card-item>
        <template #prepend>
          <v-sheet
            border="primary thin"
            class="mx-auto d-flex justify-center align-center mr-2 rounded-lg"
            height="45"
            width="45"
          >
            <nuxt-icon name="football" filled></nuxt-icon>
          </v-sheet>
        </template>
        <template #title
          ><span class="">{{ title }}</span></template
        >
        <template #subtitle>{{ subtitle }}</template>
        <template #append>
          <nuxt-icon name="x-dialog" filled @click="teamStore.dialog = false" />
        </template>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text>
        <div class="steps-container">
          <StepperDot
            :active="steps.current === 'createTeam'"
            :completed="steps.completed.includes('createTeam')"
            label="Crear un equipo"
          />
          <v-divider />
          <StepperDot
            :active="steps.current === 'createDt'"
            :completed="steps.completed.includes('createDt')"
            label="Crear el DT"
          />
          <v-divider />
          <StepperDot
            :active="steps.current === 'createOwner'"
            :completed="steps.completed.includes('createOwner')"
            label="Crea el dueño"
          />
        </div>
        <CreateTeamStepper :step="steps.current" />
      </v-card-text>
      <v-card-actions>
        <v-container>
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
                @click="nextHandler"
                >{{ textButton }}</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style>
.steps-container {
  display: flex;
  align-items: center;
  max-width: 80%;
  margin: 2rem auto 4rem auto;
  position: relative;
}
.create-tournament-card > .v-card-item > .v-card-item__append {
  cursor: pointer;
  align-self: flex-start !important;
  justify-self: center !important;
  padding-inline-start: 0 !important;
  margin-top: 0.4rem;
}
.nuxt-icon.primary-step svg {
  width: 2em;
  height: 2rem;
  padding: 1px;
  border: 2px solid #9155fd;
  border-radius: 50%;
}
</style>
