<script lang="ts" setup>
  import HeaderCard from '~/components/pages/torneos/dialog/header.vue'
  import StepperContainer from '~/components/pages/torneos/stepper/index.vue'

  const { steps, dialog } = storeToRefs(useTournamentStore())
  const leaveHandler = () => {
    useTournamentStore().$reset()
  }
  const disabled = computed(() => {
    return steps.value.steps[steps.value.current].disable
  })
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
                @click="() => steps.steps[steps.current].back()"
                >Anterior
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                :disabled="disabled"
                variant="elevated"
                block
                color="primary"
                density="comfortable"
                size="large"
                @click="() => steps.steps[steps.current].next()"
                >Siguiente
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
