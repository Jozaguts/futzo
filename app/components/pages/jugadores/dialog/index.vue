<script setup lang="ts">
  import HeaderCard from '~/components/pages/jugadores/dialog/header.vue'
  import StepperContainer from '~/components/pages/jugadores/stepper/index.vue'
  import { storeToRefs, usePlayerStore, useTournamentStore } from '#imports'
  import type { CurrentStep } from '~/models/Player'

  const { steps, dialog, isEdition, playerId } = storeToRefs(usePlayerStore())
  const loading = ref(false)
  const leaveHandler = () => {
    usePlayerStore().$storeReset()
  }
  onMounted(() => {
    useTournamentStore().fetchTournamentsByLeagueId()
  })
  const disabled = computed(() => {
    return steps.value.steps[steps.value.current].disable
  })
  const next = () => {
    if (steps.value.steps[steps.value.current].next_step === 'save') {
      loading.value = true
      if (isEdition.value) {
        usePlayerStore()
          .updatePlayer(playerId.value as number)
          .finally(() => (loading.value = false))
      } else {
        usePlayerStore()
          .createPlayer()
          .finally(() => (loading.value = false))
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
  <v-dialog v-model="dialog" max-width="690" @after-leave="leaveHandler" scrollable>
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
                >{{ steps.steps[steps.current].back_label }}
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
                >{{ steps.steps[steps.current].next_label }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/create-team.sass"
</style>
