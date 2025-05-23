<script lang="ts" setup>
  import { useLocationStore } from '~/store'
  import AvailabilityFormStep from '~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue'
  import { storeToRefs } from 'pinia'
  import { DEFAULT_LOCATION_AVAILABILITY } from '~/utils/constants'

  const { locationStoreRequest, isEdition } = storeToRefs(useLocationStore())
  const fillAvailability = () => {
    if (!isEdition.value) {
      locationStoreRequest.value.availability = []
      console.log({ count: locationStoreRequest.value.fields_count })
      for (let i = 0; i < locationStoreRequest.value.fields_count; i++) {
        const form = {
          ...DEFAULT_LOCATION_AVAILABILITY,
          id: locationStoreRequest.value.availability.length + 1,
          name: `Campo ${locationStoreRequest.value.availability.length + 1}`,
        }
        const alreadyExists = locationStoreRequest.value.availability.some(
          (item) => item.id === form.id
        )
        if (!alreadyExists) {
          locationStoreRequest.value.availability.push(form)
        }
      }
    }
  }
  const currentStep = ref<number>(1)
  const markStepAsCompletedHandler = async (type: 'next' | 'back') => {
    setNextStep(type)
  }
  const setNextStep = (direction: 'next' | 'back') => {
    setTimeout(() => {
      if (currentStep.value < locationStoreRequest.value.availability.length) {
        currentStep.value =
          direction === 'next' ? currentStep.value + 1 : currentStep.value - 1
      }
    }, 300)
  }
  defineExpose({
    handleSubmit: () => markStepAsCompletedHandler,
  })
  onMounted(() => {
    console.log('mounted')
    fillAvailability()
  })
</script>
<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="pt-0">
        <v-divider />
      </v-col>
    </v-row>
    <v-stepper-vertical
      variant="inset"
      v-model="currentStep"
      class="pa-0 ma-0 futzo-vertical-stepper"
      flat
      eager
    >
      <v-stepper-vertical-item
        v-for="(form, index) in locationStoreRequest.availability"
        :value="index + 1"
        :key="index + 1"
        :title="form.name"
        :complete="form.isCompleted"
        complete-icon="mdi-check-circle"
        edit-icon="mdi-check-circle"
        expand-icon="mdi-chevron-down"
      >
        <AvailabilityFormStep
          :step="index + 1"
          :init-form="form"
          @step-completed="markStepAsCompletedHandler"
        />
        <template #actions></template>
      </v-stepper-vertical-item>
    </v-stepper-vertical>
  </v-container>
</template>
<style>
  .v-expansion-panel-text {
    padding: 0;
  }
</style>
