<script lang="ts" setup>
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  import LocationStep from '~/components/pages/ubicaciones/stepper/LocationStep.vue'
  import AvailabilityStep from '~/components/pages/ubicaciones/stepper/AvailabilityStep.vue'
  import type { Field, LocationPosition, LocationStoreRequest } from '~/models/Location'
  import { provide } from 'vue'

  const { isEdition, formSteps, locationDialog } = storeToRefs(useLocationStore())
  const emits = defineEmits(['next', 'back', 'close'])
  const locationStepRef = useTemplateRef<{
    validate: Function
    handleSubmit: Function
  }>('locationStepRef')
  const form = ref<LocationStoreRequest>({
    name: '',
    address: '',
    position: { lat: 16.8639515, lng: -99.8822807 } as LocationPosition,
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
  function updateForm(value: Partial<LocationStoreRequest>) {
    // Deep-merge to avoid losing nested structures like steps
    form.value = {
      ...form.value,
      ...value,
      steps: {
        ...(form.value.steps || { location: { completed: false }, fields: { completed: false } }),
        ...(value?.steps || {}),
      },
    } as LocationStoreRequest
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
    const firstStepCompleted = !!form.value?.steps?.location?.completed
    const secondStepCompleted = !!form.value?.steps?.fields?.completed
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
    storeRequest.value = { ...(form.value as any) }
    isEdition.value ? await store.updateLocation() : await store.storeLocation()
  }

  const backStepHandler = () => {
    if (formSteps.value.current === 'location') {
      useLocationStore().resetLocationStoreRequest()
      locationDialog.value = false
    }
    formSteps.value.current = 'location'
  }
  provide('location_form', { form })
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
            :disabled="!form?.steps?.location?.completed"
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
