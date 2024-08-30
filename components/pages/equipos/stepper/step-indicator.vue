<script lang="ts" setup>
import { storeToRefs } from "pinia";
import StepperDot from "~/components/shared/stepper-dot.vue";
import { useTeamStore } from "~/store";

const teamStore = useTeamStore();
const { steps } = storeToRefs(teamStore);
</script>
<template>
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
</template>
