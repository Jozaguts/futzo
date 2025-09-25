<script lang="ts" setup>
  import StepperContainer from '~/components/pages/torneos/calendario/stepper/index.vue'
  import type { CurrentCalendarStep } from '~/models/Schedule'
  import { useScheduleStore } from '~/stores/useScheduleStore'
  import { storeToRefs } from '#imports'

  const { calendarSteps, scheduleDialog } = storeToRefs(useScheduleStore())
  const isFetching = ref(false)
  const loading = ref(false)
  const leaveHandler = () => {
    useScheduleStore().$resetScheduleStore()
  }
  const disabled = computed(() => {
    return calendarSteps.value.steps[calendarSteps.value.current].disable
  })
  const next = () => {
    if (calendarSteps.value.steps[calendarSteps.value.current].next_step === 'save') {
      loading.value = true
      useScheduleStore()
        .generateSchedule()
        .finally(() => {
          loading.value = false
        })
    } else {
      calendarSteps.value.current = calendarSteps.value.steps[calendarSteps.value.current]
        .next_step as CurrentCalendarStep
    }
  }
  const back = () => {
    if (calendarSteps.value.steps[calendarSteps.value.current].back_step === 'close') {
      scheduleDialog.value = false
    } else {
      calendarSteps.value.current = calendarSteps.value.steps[calendarSteps.value.current]
        .back_step as CurrentCalendarStep
    }
  }
</script>
<template>
  <Dialog
    minHeight="90vh"
    title="Crear un calendario"
    subtitle="Completa los detalles del calendario."
    :loading="isFetching"
    v-model="scheduleDialog"
    @leaving="leaveHandler"
  >
    <template #v-card-text>
      <StepperContainer />
    </template>
    <template #actions>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-btn
              variant="outlined"
              block
              color="secondary"
              class="text-capitalize"
              density="comfortable"
              size="large"
              @click="back"
              >{{ calendarSteps.steps[calendarSteps.current].back_label }}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              :disabled="disabled || loading"
              variant="elevated"
              block
              color="primary"
              density="comfortable"
              size="large"
              :loading="loading"
              @click="next"
              >{{ calendarSteps.steps[calendarSteps.current].next_label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Dialog>
</template>
