<script lang="ts" setup>
interface FormSteps {
  formSteps: {
    current: string;
    steps: Step[];
  };
}

interface Step {
  step: string;
  completed: boolean;
  label: string;
}

const props = withDefaults(defineProps<FormSteps>(), {});
</script>
<template>
  <div class="steps-container">
    <DotStepper
      v-for="(step, index) in props.formSteps.steps"
      :active="props.formSteps.current === step.step"
      :completed="step.completed"
      :label="step.label"
      :add-divider="index !== props.formSteps.steps.length - 1"
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
