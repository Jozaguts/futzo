<script lang="ts" setup>
import StepperContainer from '~/components/pages/torneos/calendario/stepper/index.vue'
import type {CurrentCalendarStep} from '~/models/Schedule'
import {useScheduleStore} from '~/stores/useScheduleStore'
import {storeToRefs} from '#imports'

const scheduleStore = useScheduleStore()
  const { calendarSteps, scheduleDialog } = storeToRefs(scheduleStore)
  const isFetching = ref(false)
  const loading = ref(false)
  const totalSteps = computed(() => Object.keys(calendarSteps.value.steps).length)
  const currentStep = computed(() => calendarSteps.value.steps[calendarSteps.value.current])
  const currentStepNumber = computed(() => currentStep.value?.number ?? 1)

  const leaveHandler = () => {
    scheduleStore.$resetScheduleStore()
  }

  const disabled = computed(() => {
    return currentStep.value.disable
  })

  const next = () => {
    if (currentStep.value.next_step === 'save') {
      loading.value = true
      scheduleStore
        .generateSchedule()
        .finally(() => {
          loading.value = false
        })
    } else {
      calendarSteps.value.current = currentStep.value.next_step as CurrentCalendarStep
    }
  }

  const back = () => {
    if (currentStep.value.back_step === 'close') {
      scheduleDialog.value = false
    } else {
      calendarSteps.value.current = currentStep.value.back_step as CurrentCalendarStep
    }
  }
</script>

<template>
  <Dialog
    minHeight="90vh"
    title="Crear calendario"
    subtitle="Configura las opciones para generar el calendario de jornadas."
    icon-name="lucide:settings"
    width="640px"
    :loading="isFetching"
    v-model="scheduleDialog"
    @leaving="leaveHandler"
    data-testid="create-calendar-dialog"
  >
    <template #v-card-text>
      <StepperContainer />
    </template>
    <template #actions>
      <div class="calendar-dialog-footer">
        <v-btn
          variant="text"
          color="secondary"
          class="calendar-dialog-footer__back"
          density="comfortable"
          @click="back"
        >
          <template #prepend>
            <Icon name="lucide:chevron-left" size="16" />
          </template>
          {{ currentStep.back_label }}
        </v-btn>

        <span class="calendar-dialog-footer__step">Paso {{ currentStepNumber }} de {{ totalSteps }}</span>

        <v-btn
          :disabled="disabled || loading"
          variant="elevated"
          color="primary"
          density="comfortable"
          :loading="loading"
          @click="next"
          class="calendar-dialog-footer__next"
        >
          {{ currentStep.next_label }}
          <template #append v-if="currentStep.next_step !== 'save'">
            <Icon name="lucide:chevron-right" size="16" />
          </template>
        </v-btn>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="sass">
  .calendar-dialog-footer
    width: 100%
    display: grid
    grid-template-columns: auto 1fr auto
    align-items: center
    gap: 12px
    border-top: 1px solid var(--futzo-border-strong)
    padding-top: 4px

  .calendar-dialog-footer__back
    text-transform: none
    letter-spacing: normal

  .calendar-dialog-footer__step
    text-align: center
    color: var(--futzo-on-surface-muted)
    font-size: 12px
    font-weight: 500

  .calendar-dialog-footer__next
    text-transform: none
    letter-spacing: normal

  @media (max-width: 600px)
    .calendar-dialog-footer
      grid-template-columns: 1fr

    .calendar-dialog-footer__step
      order: -1
</style>
