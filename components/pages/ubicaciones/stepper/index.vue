<script lang="ts" setup>
import {useLocationStore} from '~/store'
import IndicatorStep from "~/components/shared/IndicatorStep.vue";
import LocationStep from "~/components/pages/ubicaciones/stepper/LocationStep.vue";
import AvailabilityStep from "~/components/pages/ubicaciones/stepper/AvailabilityStep.vue";
import type {CurrentStep, LocationStoreRequest} from "~/models/Location";

const {locationStoreRequest, isEdition, formSteps} = storeToRefs(useLocationStore())
const emits = defineEmits(['next', 'back', 'close'])
const stepRef = ref<{ validate: Function; handleSubmit: Function }>({
  validate: Function,
  handleSubmit: Function,
});

const cancelBtnHandler = () => {
  if (formSteps.value.current === 'location') {
    emits('close')
  } else {
    formSteps.value.current = 'location'
  }
}
const textButton = computed(() => {
  if (formSteps.value.current === 'location') {
    return 'Siguiente'
  } else {
    return isEdition.value ? 'Guardar Cambios' : 'Crear ubicación'
  }
})
const nextStepHandler = async () => {
  const statusForm = await stepRef.value.validate();
  if (statusForm.valid) {
    const values = await getFormValues();
    fillLocationStoreRequest(values)
    const stepsOrder: CurrentStep[] = ["location", "availability"];
    const currentStepIndex = stepsOrder.indexOf(formSteps.value.current);

    if (!formSteps.value.steps[currentStepIndex].completed) {
      formSteps.value.steps[currentStepIndex].completed = true;
    }
    const isLastStep = currentStepIndex === stepsOrder.length - 1;
    isLastStep
        ? await saveHandler()
        : (formSteps.value.current = stepsOrder[currentStepIndex + 1]);
  }
}

async function saveHandler() {
  isEdition.value
      ? await useLocationStore().storeLocation()
      : await useLocationStore().updateLocation();
}

function fillLocationStoreRequest(values: LocationStoreRequest) {
  if (formSteps.value.current === "location") {
    locationStoreRequest.value = values
  }
  // if (steps.value.current === "details-info") {
  //   tournamentStoreRequest.value = {
  //     ...tournamentStoreRequest.value,
  //     details: { ...(values as DetailsInfoForm) },
  //   };
  // }
}

const backStepHandler = () => {
  formSteps.value.current = 'location'
}

async function getFormValues() {
  const formValues = stepRef.value.handleSubmit(
      (values: LocationStoreRequest) => values,
  );

  return await formValues();
}

// const saveLocationHandler = handleSubmit(async (values) => {
//   if (formSteps.value.current === 'location') {
//     formSteps.value.steps[0].completed = true
//     formSteps.value.current = 'availability'
//     return
//   } else {
//     locationStoreRequest.value = {...values, tags: tags.value as string[]};
//     if (isEdition.value) {
//       useLocationStore().updateLocation()
//           .then(() => {
//             resetForm()
//             emits('location-added')
//           })
//     } else {
//       useLocationStore().storeLocation()
//           .then(() => {
//             resetForm()
//             emits('location-added')
//           })
//     }
//   }
// });
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
            <LocationStep ref="stepRef" v-if="formSteps.current === 'location'"/>
            <AvailabilityStep ref="stepRef" v-else-if="formSteps.current === 'availability'"/>
          </transition-slide>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12 d-flex justify-space-between">
          <SecondaryBtn class="bg-white w-btn " text="Cancelar" @click="backStepHandler"/>
          <PrimaryBtn :show-icon="false" class="w-btn" :text="textButton" variant="elevated" @click="nextStepHandler"/>
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
