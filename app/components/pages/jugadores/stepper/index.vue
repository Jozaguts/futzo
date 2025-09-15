<script lang="ts" setup>
  import BasicInfoStep from '~/components/pages/jugadores/stepper/01-basic-info.vue'
  import DetailsInfoStep from '~/components/pages/jugadores/stepper/02-details-info.vue'
  import ContactInfoStep from '~/components/pages/jugadores/stepper/03-contact-info.vue'
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  import type { CreatePlayerForm, CurrentStep } from '~/models/Player'

  const loading = ref(false)
  const { steps, isEdition, playerStoreRequest, dialog } = storeToRefs(usePlayerStore())
  const stepRef = ref<{ validate: Function; handleSubmit: Function }>({
    validate: Function,
    handleSubmit: Function,
  })
  const emits = defineEmits(['registered-player'])
  const backHandler = () => {
    if (steps.value.current === 'basic-info') {
      dialog.value = false
      return
    }
    const stepsOrder: CurrentStep[] = ['basic-info', 'details-info', 'contact-info']
    const currentStepIndex = stepsOrder.indexOf(steps.value.current)
    steps.value.current = stepsOrder[currentStepIndex - 1] as CurrentStep
  }
  const nextHandler = async () => {
    const statusForm = await stepRef.value.validate()
    const formValues = stepRef.value.handleSubmit((values: CreatePlayerForm) => values)
    const playerStoreRequestValues = await formValues()
    if (statusForm.valid) {
      if (steps.value.current === 'basic-info') {
        playerStoreRequest.value = {
          ...playerStoreRequest.value,
          basic: { ...playerStoreRequestValues },
        }
      }
      if (steps.value.current === 'details-info') {
        playerStoreRequest.value = {
          ...playerStoreRequest.value,
          details: { ...playerStoreRequestValues },
        }
      }
      if (steps.value.current === 'contact-info') {
        playerStoreRequest.value = {
          ...playerStoreRequest.value,
          contact: { ...playerStoreRequestValues },
        }
      }
      const stepsOrder: CurrentStep[] = ['basic-info', 'details-info', 'contact-info']
      const currentStepIndex = stepsOrder.indexOf(steps.value.current)
      if (!steps.value?.steps[currentStepIndex]?.completed) {
        steps.value.steps[currentStepIndex].completed = true
      }
      if (currentStepIndex === stepsOrder.length - 1) {
        // si es el último paso
        loading.value = true
        if (isEdition.value) {
          await usePlayerStore().updatePlayer(playerStoreRequest.value.basic.id as number)
        } else {
          await usePlayerStore()
            .createPlayer()
            .then(() => {
              const route = useRoute()
              if (route.name === 'equipos-equipo-jugadores-inscripcion') {
                emits('registered-player', playerStoreRequest.value)
              }
            })
        }
        loading.value = false
        return
      }
      steps.value.current = stepsOrder[currentStepIndex + 1] // siguiente paso
    }
  }
  const textButtonCancel = computed(() => {
    if (steps.value.current === 'basic-info') {
      return 'Cancelar'
    } else {
      return 'Regresar'
    }
  })
  const textButton = computed(() => {
    switch (steps.value.current) {
      case 'basic-info':
        return 'Siguiente'
      case 'details-info':
        return 'Siguiente'
      case 'contact-info':
        return isEdition.value ? 'Actualizar jugadores' : 'Crear jugadores'
      default:
        return 'Crear jugadores'
    }
  })
</script>
<template>
  <PerfectScrollbar
    :options="{
      suppressScrollX: true,
    }"
  >
    <v-card-text>
      <v-container class="pa-0">
        <v-row>
          <v-col>
            <IndicatorStep :steps="steps" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <transition-slide
              group
              :offset="{
                enter: ['-100%', 0],
                leave: ['100%', 0],
              }"
            >
              <BasicInfoStep ref="stepRef" v-if="steps.current === 'basic-info'" :key="steps.current" />
              <DetailsInfoStep ref="stepRef" v-if="steps.current === 'details-info'" :key="steps.current" />
              <ContactInfoStep ref="stepRef" v-if="steps.current === 'contact-info'" :key="steps.current" />
            </transition-slide>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </PerfectScrollbar>
</template>
