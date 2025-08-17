<script setup lang="ts">
  import HeaderCard from '~/components/pages/jugadores/dialog/header.vue'
  import StepperContainer from '~/components/pages/jugadores/stepper/index.vue'

  const { steps, dialog, playerStoreRequest } = storeToRefs(usePlayerStore())
  const leaveHandler = () => {
    steps.value.current = 'basic-info'
    steps.value.completed = []
    playerStoreRequest.value = {}
  }
  onMounted(() => {
    useTournamentStore().fetchTournamentsByLeagueId()
  })
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
    </v-card>
  </v-dialog>
</template>
<style lang="sass">
  @use "assets/scss/pages/create-team.sass"
</style>
