<script lang="ts" setup>
import {useLocationStore} from "~/store";
import AvailabilityFormStep from "~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue";
import {storeToRefs} from "pinia";
import {DEFAULT_LOCATION_AVAILABILITY} from "~/utils/constants";
import type {StepperType, StepperItem, LocationAvailability} from "~/models/Location";
import type {FormValidationResult} from "vee-validate";

const {locationStoreRequest, stepsCompleted, isEdition} = storeToRefs(useLocationStore())
for (let i = 0; i < locationStoreRequest.value.fields_count; i++) {
  locationStoreRequest.value.availability.push({...DEFAULT_LOCATION_AVAILABILITY, id: i + 1, name: `Campo ${i + 1}`})
}

const fieldsCount = computed<StepperItem[]>(() => Array.from({length: locationStoreRequest.value.fields_count ?? 0}, (_, i) => ({title: `Campo ${i + 1}`, value: i + 1})))
const currentStep = ref<number>(1)
const refStep = ref()

const emits = defineEmits(['all-steps-completed'])
const availabilityStepHandler = async (type: 'next' | 'back', form: FormValidationResult<LocationAvailability>) => {
  console.log(type, form)
  if (!form?.valid) {
    return
  }
  console.log(locationStoreRequest.value.availability)
  // if (!isEdition.value) {
  //   const alreadyExists = locationStoreRequest.value.availability.some((item) => item.id === form.values?.id)
  //   if (!alreadyExists) {
  //     console.log('alreadyExists')
  //     locationStoreRequest.value.availability.push(form.values as LocationAvailability)
  //   }
  // } else {
  //   console.log(locationStoreRequest.value.availability);
  //   return;
  // }
  // if (stepsCompleted.value === fieldsCount.value.length) {
  //   emits('all-steps-completed', true)
  // }
  //
  // setNextStep(type)
}
const setNextStep = (direction: 'next' | 'back') => {
  setTimeout(() => {
    if (currentStep.value < fieldsCount.value.length) {
      currentStep.value = direction === 'next' ? currentStep.value + 1 : currentStep.value - 1
    }
  }, 300)

}

defineExpose({
  validate: async () => await refStep.value.validate(),
  handleSubmit: () => availabilityStepHandler
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
        editable
    >
      <v-stepper-vertical-item v-for="form in locationStoreRequest.availability" :value="form.id" :key="form.id" :title="form.name">
        <AvailabilityFormStep
            :step="form.id as number"
            ref="refStep"
            :init-form="form"
            @step-completed="availabilityStepHandler"
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

