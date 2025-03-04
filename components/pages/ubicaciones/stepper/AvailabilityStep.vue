<script lang="ts" setup>
import {useLocationStore} from "~/store";
import AvailabilityFormStep from "~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue";
import {storeToRefs} from "pinia";
import {DEFAULT_AVAILABILITY_HOURS} from "~/utils/constants";
import type {StepperType, StepperItem} from "~/models/Location";

const {locationStoreRequest, stepsCompleted, isEdition} = storeToRefs(useLocationStore())
const fieldsCount = computed<StepperItem[]>(() => Array.from({length: locationStoreRequest.value.fields_count ?? 0}, (_, i) => ({title: `Campo ${i + 1}`, value: i + 1})))
const currentStep = ref<number>(fieldsCount.value[0].value)
const refStep = ref()

const emits = defineEmits(['all-steps-completed'])
const availabilityStepHandler = async (type: 'next' | 'back', item: StepperType) => {
  const {valid} = await refStep.value.validate()
  if (!valid) {
    return
  }

  if (!isEdition.value) {
    const alreadyExists = locationStoreRequest.value.availability.some((item) => item.id === refStep.value.form.id)
    if (!alreadyExists) {
      locationStoreRequest.value.availability.push(refStep.value.form)
    }
  } else {
    locationStoreRequest.value.availability = locationStoreRequest.value.availability.map(item => {
      if (item.step === refStep.value.form.id) {
        return {...refStep.value.form, id: item.id, step: item?.step}
      } else {
        return item
      }
    })
  }
  if (stepsCompleted.value === fieldsCount.value.length) {
    emits('all-steps-completed', true)
  }

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
  validate: async () => await refStep.value.validate(),
  handleSubmit: () => availabilityStepHandler
})
const initForm = computed(() => {
  const form = locationStoreRequest.value.availability.find((item) => item.step == currentStep.value)
  if (isEdition.value) {
    return form
  } else {
    return locationStoreRequest.value.availability.find((item) => item.id == currentStep.value) ?? {
      ...DEFAULT_AVAILABILITY_HOURS[0],
      name: `Campo ${currentStep.value}`,
      id: currentStep.value
    }
  }

})
</script>
<template>
  <v-container fluid>
    <v-row no-gutters>
      {{ locationStoreRequest.availability.length }}
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
        :items="fieldsCount"
        editable
    >
      <template #[`item.${currentStep}`]="item">
        <AvailabilityFormStep
            :step="item.step as number"
            ref="refStep"
            :init-form="initForm"
            @step-completed="availabilityStepHandler"
        />
      </template>
      <template #actions="props"/>
    </v-stepper-vertical>
  </v-container>
</template>
<style>
.v-expansion-panel-text {
  padding: 0;
}
</style>

