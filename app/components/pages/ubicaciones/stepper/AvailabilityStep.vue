<script lang="ts" setup>
  import AvailabilityFormStep from '~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue'
  import { inject } from 'vue'

  const { form, updateForm } = inject('location_form') as any
  const currentStep = ref<number>(1)

  const markStepAsCompletedHandler = async (type: 'next' | 'back') => {
    setNextStep(type)
  }
  const setNextStep = (direction: 'next' | 'back') => {
    setTimeout(() => {
      const total = form.value?.fields?.length || 1
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
    currentStep.value = form.value?.fields?.[0]?.id || 1
    if (!Array.isArray(form.value?.fields)) {
      updateForm({ ...(form.value || {}), fields: [] })
    }
    if (form.value?.steps?.fields) {
      form.value.steps.fields.completed = true
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
          v-for="f in form.fields"
          :value="f?.id"
          :title="f.name"
          complete-icon="mdi-check-circle"
        ></v-stepper-item>
      </v-stepper-header>
      <v-stepper-window>
        <v-stepper-window-item v-for="f in form.fields" :value="f.id" :key="f?.id">
          <div class="pa-1">
            <AvailabilityFormStep
              :step="f?.id"
              :init-form="f"
              @step-completed="markStepAsCompletedHandler"
              @update-field="
                (updated) => {
                  const list = Array.isArray(form.value?.fields) ? form.value.fields : []
                  const nextFields = list.length
                    ? list.map((field: any) => (field.id === updated.id ? { ...field, ...updated } : field))
                    : [updated]
                  updateForm({ ...(form.value || {}), fields: nextFields })
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
