<script lang="ts" setup>

import {useLocationStore} from "~/store";
import AvailabilityFormStep from "~/components/pages/ubicaciones/stepper/AvailabilityFormStep.vue";
import type {CreateTeamForm} from "~/models/Team";

const {locationStoreRequest} = storeToRefs(useLocationStore())
const fieldCount = computed(() => Array.from({length: locationStoreRequest.value.fields_count ?? 0}, (_, i) => `Campo ${i + 1}`))
const currentStep = ref(fieldCount[0])
const availabilities = ref([])
const refStep = ref()
const availabilityHandler = (value) => {
  console.log(value)
}
const stepHandler = async (type, item) => {
  console.log(await refStep.value.validate())
  console.log(refStep.value.form)
  // currentStep.value = type === 'next' ? item.step + 1 : item.step - 1

}
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

