<script lang="ts" setup>
  import AvailabilityFormStep from '~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue'
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
        const alreadyExists = locationStoreRequest.value.availability.some((item) => item.id === form.id)
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
        currentStep.value = direction === 'next' ? currentStep.value + 1 : currentStep.value - 1
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
    <v-stepper editable v-model="currentStep" class="pa-0 ma-0 futzo-vertical-stepper">
      <v-stepper-header>
        <v-stepper-item
          v-for="form in locationStoreRequest.availability"
          :value="form?.id"
          :complete="form?.isCompleted"
          complete-icon="mdi-check-circle"
        >
          {{ form.name }}
        </v-stepper-item>
      </v-stepper-header>
      <v-stepper-window>
        <v-stepper-window-item v-for="form in locationStoreRequest.availability" :value="form?.id" :key="form?.id">
          <div class="pa-1">
            <AvailabilityFormStep :step="form?.id" :init-form="form" @step-completed="markStepAsCompletedHandler" />
          </div>
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </v-container>
</template>
<style>
  .v-expansion-panel-text {
    padding: 0;
  }
</style>
