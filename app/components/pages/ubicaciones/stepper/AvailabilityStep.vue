<script lang="ts" setup>
  import AvailabilityFormStep from '~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue'
  const currentStep = ref<number>(1)
  const { locationStoreRequest } = storeToRefs(useLocationStore())
  const markStepAsCompletedHandler = async (type: 'next' | 'back') => {
    setNextStep(type)
  }
  const setNextStep = (direction: 'next' | 'back') => {
    setTimeout(() => {
      const total = locationStoreRequest.value?.fields?.length || 1
      if ((direction === 'next' && currentStep.value < total) || (direction === 'back' && currentStep.value > 1)) {
        currentStep.value = direction === 'next' ? currentStep.value + 1 : currentStep.value - 1
      }
    }, 300)
  }
  defineExpose({
    handleSubmit: () => markStepAsCompletedHandler,
  })
  onMounted(() => {
    // Initialize current step and mark the fields step as completed when entering this view
    currentStep.value = locationStoreRequest.value?.fields?.[0]?.id || 1
    if (!Array.isArray(locationStoreRequest.value?.fields)) {
      locationStoreRequest.value = { ...(locationStoreRequest.value || {}), fields: [] }
    }
    if (locationStoreRequest.value?.steps?.fields) {
      locationStoreRequest.value.steps.fields.completed = true
    }
  })
</script>
<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="pt-0">
        <v-divider />
      </v-col>
    </v-row>
    <v-stepper editable class="pa-0 ma-0 futzo-vertical-stepper" v-model="currentStep">
      <v-stepper-header>
        <v-stepper-item
          v-for="f in locationStoreRequest.fields"
          :value="f?.id"
          :title="f.name"
          complete-icon="mdi-check-circle"
        ></v-stepper-item>
      </v-stepper-header>
      <v-stepper-window>
        <v-stepper-window-item v-for="f in locationStoreRequest.fields" :value="f.id" :key="f?.id">
          <div class="pa-1">
            <AvailabilityFormStep
              :step="f?.id"
              :init-form="f"
              @step-completed="markStepAsCompletedHandler"
              @update-field="
                (updated) => {
                  const list = Array.isArray(locationStoreRequest?.fields) ? locationStoreRequest.fields : []
                  const nextFields = list.length
                    ? list.map((field: any) => (field.id === updated.id ? { ...field, ...updated } : field))
                    : [updated]
                  locationStoreRequest = { ...(locationStoreRequest || {}), fields: nextFields }
                }
              "
            />
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
