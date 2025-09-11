<script lang="ts" setup>
  export type Steps = Record<
    string,
    {
      number: number
      completed: boolean
      label: string
      disable: boolean
      back: Function
      next: Function
    }
  >
  export interface FormSteps {
    current: string
    steps: Steps
  }
  const { steps } = defineProps<{ steps: FormSteps }>()
  const countSteps = computed(() => {
    return Object.keys(steps.steps).length
  })
</script>
<template>
  <div class="steps-container">
    <DotStepper
      v-for="(step, key) in steps.steps"
      :active="key === steps.current"
      :completed="step.completed"
      :label="step.label"
      :add-divider="step.number < countSteps"
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
