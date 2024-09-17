<script setup lang="ts">
import HeaderCard from "~/components/pages/jugadores/dialog/header.vue";
import { storeToRefs } from "pinia";
import { useAuthStore, usePlayerStore, useTournamentStore } from "~/store";
import StepperContainer from "~/components/pages/jugadores/stepper/index.vue";

const { players, steps, dialog } = storeToRefs(usePlayerStore());
const leaveHandler = () => {
  steps.value.current = "basic-info";
  steps.value.completed = [];
};
onMounted(() => {
  const userId = useAuthStore().user?.id as number;
  useTournamentStore().fetchTournamentsByLeagueId(userId);
});
</script>
<template>
  <v-dialog
    v-model="dialog"
    max-width="690"
    @after-leave="leaveHandler"
    max-height="800"
    height="100%"
  >
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
<style>
@import "assets/scss/pages/create-team.sass";
</style>
