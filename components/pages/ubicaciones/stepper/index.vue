<script lang="ts" setup>
import {useLocationStore} from '~/store'
import IndicatorStep from "~/components/shared/IndicatorStep.vue";
import LocationStep from "~/components/pages/ubicaciones/stepper/LocationStep.vue";
import AvailabilityStep from "~/components/pages/ubicaciones/stepper/AvailabilityStep.vue";
import type {CurrentStep, LocationStoreRequest} from "~/models/Location";

const {locationStoreRequest, isEdition, formSteps, isAllStepsCompleted} = storeToRefs(useLocationStore())
const emits = defineEmits(['next', 'back', 'close'])
const locationStepRef = useTemplateRef<{ validate: Function; handleSubmit: Function }>('locationStepRef',);
const availabilityStepRef = useTemplateRef<{ validate: Function; handleSubmit: Function }>('availabilityStepRef');
const textButton = computed(() => {
  if (formSteps.value.current === 'location') {
    return 'Siguiente'
  } else {
    return isEdition.value ? 'Guardar Cambios' : 'Crear ubicación'
  }
})
const backTextButton = computed(() => formSteps.value.current === 'location' ? 'Cancelar' : 'Anterior')
const nextStepHandler = async () => {
  console.log(locationStoreRequest.value.completed)
  if (!locationStoreRequest.value.completed) {
    return
  }

  const values = formSteps.value.current === 'location' ? locationStoreRequest.value : {};
  console.log(values)
  fillLocationStoreRequest(values)
  const stepsOrder: CurrentStep[] = ["location", "availability"];
  const currentStepIndex = stepsOrder.indexOf(formSteps.value.current);

  if (!formSteps.value.steps[currentStepIndex].completed) {
    formSteps.value.steps[currentStepIndex].completed = true;
  }
  const isLastStep = currentStepIndex === stepsOrder.length - 1;
  console.log(isLastStep)
  isLastStep
      ? await saveHandler()
      : (() => {
        formSteps.value.current = stepsOrder[currentStepIndex + 1];
        disabled.value = true
      })();
  // }
}

async function saveHandler() {
  // isEdition.value
  //     ? await useLocationStore().updateLocation()
  //     : await useLocationStore().storeLocation();
}

function fillLocationStoreRequest(values: LocationStoreRequest) {
  if (formSteps.value.current === "location") {
    locationStoreRequest.value.address = values.address
    locationStoreRequest.value.autocomplete_prediction = values.autocomplete_prediction
    locationStoreRequest.value.city = values.city
    locationStoreRequest.value.fields_count = values.fields_count
    locationStoreRequest.value.name = values.name
    locationStoreRequest.value.position = values.position
  }
  // const hasIncompleteLocations = locationStoreRequest.value.availability.some(location => !location.isCompleted)
  // if (!hasIncompleteLocations) {
  // }
}

const backStepHandler = () => {
  if (formSteps.value.current === 'location') {
    console.log('asdasd')
    useLocationStore().resetLocationStoreRequest()
  }
  formSteps.value.current = 'location'
  disabled.value = false
}

async function getFormValues() {
  let formValues
  if (formSteps.value.current === 'location') {
    console.log(locationStepRef.value)
    formValues = await locationStepRef.value.handleSubmit(
        (values: LocationStoreRequest) => values,
    );
  } else if (formSteps.value.current === 'availability') {

    formValues = await availabilityStepRef.value.handleSubmit(
        (values: LocationStoreRequest) => values,
    );
  }
  return await formValues();
}
</script>

<template>
  <v-card-text>
    <v-container class="pa-0">
      <v-row>
        <v-col>
          <IndicatorStep :form-steps="formSteps"/>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <transition-slide
              group
              :offset="{ enter: ['-100%', 0],leave: ['100%', 0]}"
          >
            <LocationStep ref="locationStepRef" v-if="formSteps.current === 'location'"/>
            <AvailabilityStep ref="availabilityStepRef" v-else-if="formSteps.current === 'availability'"/>
          </transition-slide>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12 d-flex justify-space-between">
          <SecondaryBtn class="bg-white w-btn " :text="backTextButton" @click="backStepHandler"/>
          <PrimaryBtn :show-icon="false" class="w-btn" :text="textButton" :disabled="!isAllStepsCompleted" variant="elevated" @click="nextStepHandler"/>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
<style scoped>
.w-btn {
  min-width: 49%;
  max-height: 42px;
}
</style>
