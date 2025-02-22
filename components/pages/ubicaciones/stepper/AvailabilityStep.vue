<script lang="ts" setup>
import {useLocationStore} from "~/store";
import AvailabilityFormStep from "~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue";
import {storeToRefs} from "pinia";

type StepperType = {
  CanEdit: boolean
  hasCompleted: boolean
  hasError: boolean
  step: number
  subtitle?: string
  title: string
  value: number
}
const {locationStoreRequest} = storeToRefs(useLocationStore())
const fieldCount = computed(() => Array.from({length: locationStoreRequest.value.fields_count ?? 0}, (_, i) => `Campo ${i + 1}`))
const currentStep = ref(fieldCount[0])
const refStep = ref()
const stepHandler = async (type: 'next' | 'back' | 'validate', item?: StepperType) => {
  const {valid} = await refStep.value.validate()
  if (!valid) {
    return
  }
  if (type === 'validate') {
    console.log('validate')
  }
  locationStoreRequest.value.availability.push(refStep.value.form)
  currentStep.value = type === 'next' ? item.step + 1 : item.step - 1
}
defineExpose({
  validate: () => stepHandler('validate'),
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
        v-model="currentStep"
        class="pa-0 ma-0"
        flat
        :items="fieldCount"
    >
      <template #[`item.${currentStep}`]="item">
        <AvailabilityFormStep :step="item.step" ref="refStep">
          <template #actions>
            <v-row>
              <v-col>
                <v-btn
                    variant="tonal"
                    rounded="lg"
                    @click="() => stepHandler('back', item)"
                    color="primary">Anterior
                </v-btn>
                <v-btn
                    variant="tonal"
                    rounded="lg"
                    @click="() => stepHandler('next', item)"
                    color="primary">Siguiente
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </AvailabilityFormStep>
      </template>
      <template #actions="pros"/>
    </v-stepper-vertical>
  </v-container>
</template>
<style>
.v-expansion-panel-text {
  padding: 0;
}
</style>

