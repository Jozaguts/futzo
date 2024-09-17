<script lang="ts" setup>
import { storeToRefs } from "pinia";
import StepperDot from "~/components/shared/stepper-dot.vue";
import { usePlayerStore } from "~/store";

const teamStore = usePlayerStore();
const { steps } = storeToRefs(teamStore);
</script>
<template>
  <div class="steps-container">
    <StepperDot
      :active="steps.current === 'basic-info'"
      :completed="steps.completed.includes('basic-info')"
      label="Información básica"
    />
    <v-divider />
    <StepperDot
      :active="steps.current === 'details-info'"
      :completed="steps.completed.includes('details-info')"
      label="Detalles del jugador"
    />
    <v-divider />
    <StepperDot
      :active="steps.current === 'contact-info'"
      :completed="steps.completed.includes('contact-info')"
      label="Información de contacto"
    />
  </div>
</template>
