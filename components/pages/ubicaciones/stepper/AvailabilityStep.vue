<script lang="ts" setup>
import {useLocationStore} from "~/store";
import AvailabilityFormStep from "~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue";
import {storeToRefs} from "pinia";
import {DEFAULT_LOCATION_AVAILABILITY} from "~/utils/constants";
import type {StepperItem} from "~/models/Location";

const {locationStoreRequest, stepsCompleted, isEdition} = storeToRefs(useLocationStore())
const fillAvailability = () => {
  for (let i = 0; i < locationStoreRequest.value.fields_count; i++) {
    const form = {
      ...DEFAULT_LOCATION_AVAILABILITY,
      id: locationStoreRequest.value.availability.length + 1,
      name: `Campo ${locationStoreRequest.value.availability.length + 1}`,
    }
    const alreadyExists = locationStoreRequest.value.availability.some((item) => item.id === form.id)
    if (!alreadyExists) {
      locationStoreRequest.value.availability.push(form)
    }
  }
}
const fieldsCount = computed<StepperItem[]>(() => Array.from({length: locationStoreRequest.value.fields_count ?? 0}, (_, i) => ({title: `Campo ${i + 1}`, value: i + 1})))
const currentStep = ref<number>(1)
const markStepAsCompletedHandler = async (type: 'next' | 'back') => {
  setNextStep(type)
}
const setNextStep = (direction: 'next' | 'back') => {
  setTimeout(() => {
    if (currentStep.value < fieldsCount.value.length) {
      currentStep.value = direction === 'next' ? currentStep.value + 1 : currentStep.value - 1
    }
  }, 300)
}
defineExpose({
  handleSubmit: () => markStepAsCompletedHandler
})
onMounted(() => {
  locationStoreRequest.value.availability = []
  fillAvailability()
})
</script>
<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="pt-0">
        <v-divider/>
      </v-col>
    </v-row>
    <v-stepper-vertical
        variant="inset"
        v-model="currentStep"
        class="pa-0 ma-0 futzo-vertical-stepper"
        flat
        eager
    >
      <v-stepper-vertical-item v-for="form in locationStoreRequest.availability" :value="form.id" :key="form.id" :title="form.name">
        <AvailabilityFormStep
            :step="form.id as number"
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

