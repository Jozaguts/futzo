<script lang="ts" setup>
import StepperDot from "~/components/shared/stepper-dot.vue";

export interface FormSteps {
  current: string;
  completed: string[];
}

const steps = withDefaults(defineProps<FormSteps>(), {});
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
      label="Detalles del torneo"
    />
  </div>
</template>
<style lang="sass" scoped>
.steps-container
  display: flex
  align-items: center
  max-width: 80%
  margin: 1rem auto 3rem auto
  position: relative
</style>
