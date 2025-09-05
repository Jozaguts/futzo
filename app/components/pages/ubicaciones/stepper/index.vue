<script lang="ts" setup>
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  import LocationStep from '~/components/pages/ubicaciones/stepper/LocationStep.vue'
  import AvailabilityStep from '~/components/pages/ubicaciones/stepper/AvailabilityStep.vue'
  import type { CurrentStep, Field, LocationPosition, LocationStoreRequest } from '~/models/Location'
  import { provide } from 'vue'

  const { locationStoreRequest, isEdition, formSteps, locationDialog } = storeToRefs(useLocationStore())
  const emits = defineEmits(['next', 'back', 'close'])
  const locationStepRef = useTemplateRef<{
    validate: Function
    handleSubmit: Function
  }>('locationStepRef')
  const form = ref<LocationStoreRequest>({
    name: '',
    city: '',
    address: '',
    position: {} as LocationPosition,
    autocomplete_prediction: {},
    tags: [] as string[],
    fields: [] as Field[],
    fields_count: 1,
    steps: {
      location: {
        completed: false,
      },
      fields: {
        completed: false,
      },
    },
  })
  function updateForm(value: LocationStoreRequest) {
    form.value = { ...value }
  }

  const availabilityStepRef = useTemplateRef<{
    validate: Function
    handleSubmit: Function
  }>('availabilityStepRef')
  const textButton = computed(() => {
    if (formSteps.value.current === 'location') {
      return 'Siguiente'
    } else {
      return isEdition.value ? 'Guardar Cambios' : 'Crear ubicación'
    }
  })
  const backTextButton = computed(() => (formSteps.value.current === 'location' ? 'Cancelar' : 'Anterior'))
  const nextStepHandler = async () => {
    if (!locationStoreRequest.value.completed) {
      return
    }
    const stepsOrder: CurrentStep[] = ['location', 'availability']
    const currentStepIndex = stepsOrder.indexOf(formSteps.value.current)
    if (!formSteps.value.steps[currentStepIndex].completed) {
      formSteps.value.steps[currentStepIndex].completed = true
    }
    const isLastStep = currentStepIndex === stepsOrder.length - 1

    isLastStep ? await saveHandler() : (formSteps.value.current = stepsOrder[currentStepIndex + 1])
  }

  async function saveHandler() {
    isEdition.value ? await useLocationStore().updateLocation() : await useLocationStore().storeLocation()
  }

  const backStepHandler = () => {
    if (formSteps.value.current === 'location') {
      useLocationStore().resetLocationStoreRequest()
      locationDialog.value = false
    }
    formSteps.value.current = 'location'
  }
  provide('location_form', { form, updateForm })
</script>
<template>
  <v-card-text>
    <v-container class="pa-0">
      <v-row>
        <v-col>
          <IndicatorStep :form-steps="formSteps" />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <transition-slide group :offset="{ enter: ['-100%', 0], leave: ['100%', 0] }">
            <LocationStep ref="locationStepRef" v-if="formSteps.current === 'location'" />
            <AvailabilityStep ref="availabilityStepRef" v-else-if="formSteps.current === 'availability'" />
          </transition-slide>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12 d-flex justify-space-between">
          <SecondaryBtn class="bg-white w-btn" :text="backTextButton" @click="backStepHandler" />
          <PrimaryBtn
            :show-icon="false"
            class="w-btn"
            :text="textButton"
            :disabled="!form.steps.location.completed"
            variant="elevated"
            @click="nextStepHandler"
          />
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
