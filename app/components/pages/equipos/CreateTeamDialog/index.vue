<script setup lang="ts">
  import HeaderCard from '~/components/pages/equipos/CreateTeamDialog/Header.vue'
  import { storeToRefs } from 'pinia'
  import StepperContainer from '~/components/pages/equipos/stepper/index.vue'

  const teamStore = useTeamStore()
  const { steps, isEdition, teamStoreRequest } = storeToRefs(teamStore)
  const leaveHandler = () => {
    // steps.value.current = 'createTeam'
    // steps.value.steps?.map((step) => (step.completed = false))
    // isEdition.value = false
    // teamStoreRequest.value = {}
  }
  onMounted(() => {
    if (teamStore.dialog) {
      useTournamentStore().fetchTournamentsByLeagueId()
    }
  })
</script>
<template>
  <v-dialog v-model="teamStore.dialog" max-width="690" @after-leave="leaveHandler" scrollable>
    <v-card class="create-tournament-card futzo-rounded" :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }">
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
                @click="() => formSteps.steps[formSteps.current].back()"
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
                @click="() => formSteps.steps[formSteps.current].next()"
                >Siguiente
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
