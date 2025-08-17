<script lang="ts" setup>
  import createTeamStep from '~/components/pages/equipos/stepper/01-create-team.vue'
  import createDtStep from '~/components/pages/equipos/stepper/02-create-dt.vue'
  import createOwnerStep from '~/components/pages/equipos/stepper/03-create-owner.vue'
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  import type { CreateTeamForm, CurrentStep } from '~/models/Team'

  const loading = ref(false)
  const teamStore = useTeamStore()
  const { steps, isEdition, teamStoreRequest } = storeToRefs(teamStore)
  const stepRef = ref<{ validate: Function; handleSubmit: Function }>({
    validate: Function,
    handleSubmit: Function,
  })
  const emits = defineEmits(['registered-team'])
  const backHandler = () => {
    if (steps.value.current === 'createTeam') {
      teamStore.dialog = false
      return
    }
    const stepsOrder: CurrentStep[] = ['createTeam', 'createDt', 'createOwner']
    const currentStepIndex = stepsOrder.indexOf(steps.value.current)
    steps.value.current = stepsOrder[currentStepIndex - 1]
  }
  const nextHandler = async () => {
    const statusForm = await stepRef.value.validate()
    const formValues = stepRef.value.handleSubmit((values: CreateTeamForm) => values)
    const teamStoreRequestValues = await formValues()
    if (statusForm.valid) {
      if (steps.value.current === 'createTeam') {
        teamStoreRequest.value = {
          ...teamStoreRequest.value,
          team: { ...teamStoreRequestValues },
        }
      }
      if (steps.value.current === 'createDt') {
        teamStoreRequest.value = {
          ...teamStoreRequest.value,
          coach: { ...teamStoreRequestValues },
        }
      }
      if (steps.value.current === 'createOwner') {
        teamStoreRequest.value = {
          ...teamStoreRequest.value,
          president: { ...teamStoreRequestValues },
        }
      }
      const stepsOrder: CurrentStep[] = ['createTeam', 'createDt', 'createOwner']
      const currentStepIndex = stepsOrder.indexOf(steps.value.current)
      if (!steps.value.steps[currentStepIndex].completed) {
        // si el paso no está completado
        steps.value.steps[currentStepIndex].completed = true // se agrega al array de completados
      }
      if (currentStepIndex === stepsOrder.length - 1) {
        // si es el último paso
        loading.value = true
        if (teamStore.isEdition) {
          await teamStore.updateTeam(teamStoreRequest.value?.team?.id as number)
        } else {
          await teamStore.createTeam().then(() => {
            const route = useRoute()
            if (route.name === 'torneos-torneo-inscripcion') {
              emits('registered-team', teamStoreRequest.value)
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
    if (steps.value.current === 'createTeam') {
      return 'Cancelar'
    } else {
      return 'Regresar'
    }
  })
  const textButton = computed(() => {
    switch (steps.value.current) {
      case 'createTeam':
        return 'Siguiente'
      case 'createDt':
        return 'Siguiente'
      case 'createOwner':
        return isEdition.value ? 'Actualizar equipo' : 'Crear equipo'
      default:
        return 'Crear equipo'
    }
  })
</script>
<template>
  <PerfectScrollbar :options="{ suppressScrollX: true }">
    <v-card-text class="pb-2" style="overflow-x: hidden">
      <IndicatorStep :formSteps="steps" />
      <transition-slide
        group
        :offset="{
          enter: ['-100%', 0],
          leave: ['100%', 0],
        }"
      >
        <createTeamStep ref="stepRef" v-if="steps.current === 'createTeam'" :key="steps.current" />
        <createDtStep ref="stepRef" v-if="steps.current === 'createDt'" :key="steps.current" />
        <createOwnerStep ref="stepRef" v-if="steps.current === 'createOwner'" :key="steps.current" />
      </transition-slide>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-btn variant="outlined" block color="secondary" density="comfortable" size="large" @click="backHandler"
              >{{ textButtonCancel }}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              variant="elevated"
              block
              color="primary"
              density="comfortable"
              size="large"
              :loading="loading"
              @click="nextHandler"
              >{{ textButton }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </PerfectScrollbar>
</template>
