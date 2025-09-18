<script lang="ts" setup>
  import HeaderCard from '~/components/pages/torneos/dialog/header.vue'
  import StepperContainer from '~/components/pages/torneos/stepper/index.vue'
  import type { CurrentStep } from '~/models/tournament'
  import { storeToRefs, useTournamentStore } from '#imports'

  const { steps, dialog, isEdition } = storeToRefs(useTournamentStore())
  const loading = ref(false)
  const leaveHandler = () => {
    useTournamentStore().$reset()
  }
  const disabled = computed(() => {
    return steps.value.steps[steps.value.current].disable
  })
  const next = () => {
    if (steps.value.steps[steps.value.current].next_step === 'save') {
      loading.value = true
      if (isEdition.value) {
        useTournamentStore()
          .updateTournament()
          .finally(() => {
            loading.value = false
          })
      } else {
        useTournamentStore()
          .storeTournament()
          .finally(() => {
            loading.value = false
          })
      }
    } else {
      steps.value.current = steps.value.steps[steps.value.current].next_step as CurrentStep
    }
  }
  const back = () => {
    if (steps.value.steps[steps.value.current].back_step === 'close') {
      dialog.value = false
    } else {
      steps.value.current = steps.value.steps[steps.value.current].back_step as CurrentStep
    }
  }
</script>
<template>
  <v-dialog v-model="dialog" max-width="690" min-height="80vh" @after-leave="leaveHandler" scrollable>
    <v-card
      class="create-tournament-card futzo-rounded"
      height="100%"
      :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <HeaderCard />
      <StepperContainer :step="steps.current" />
      <v-card-actions>
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
              >
                {{ steps.steps[steps.current].back_label }}
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                :disabled="disabled || loading"
                variant="elevated"
                block
                :loading="loading"
                color="primary"
                density="comfortable"
                size="large"
                @click="next"
                >{{ steps.steps[steps.current].next_label }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
