<script lang="ts" setup>
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  import LocationStep from '~/components/pages/ubicaciones/stepper/LocationStep.vue'
  import AvailabilityStep from '~/components/pages/ubicaciones/stepper/AvailabilityStep.vue'

  const { isEdition, formSteps, locationDialog, locationStoreRequest } = storeToRefs(useLocationStore())
  const emits = defineEmits(['next', 'back', 'close'])
  const locationStepRef = useTemplateRef<{
    validate: Function
    handleSubmit: Function
  }>('locationStepRef')
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
    const firstStepCompleted = !!locationStoreRequest.value?.steps?.location?.completed
    const secondStepCompleted = !!locationStoreRequest.value?.steps?.fields?.completed
    if (!firstStepCompleted && !secondStepCompleted) {
      return
    }
    if (!secondStepCompleted && firstStepCompleted) {
      formSteps.value.current = 'availability'
      return
    }
    if (secondStepCompleted && firstStepCompleted) {
      await saveHandler()
      return
    }
  }

  async function saveHandler() {
    // Sync local provided form into store request before saving
    const store = useLocationStore()
    const { locationStoreRequest: storeRequest } = storeToRefs(store)
    storeRequest.value = { ...locationStoreRequest.value }
    isEdition.value ? await store.updateLocation() : await store.storeLocation()
  }

  const backStepHandler = () => {
    if (formSteps.value.current === 'location') {
      useLocationStore().resetLocationStoreRequest()
      locationDialog.value = false
    }
    formSteps.value.current = 'location'
  }
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
            :disabled="!locationStoreRequest?.steps?.location?.completed"
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
