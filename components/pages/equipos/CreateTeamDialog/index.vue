<script setup lang="ts">
import HeaderCard from "~/components/pages/equipos/CreateTeamDialog/Header.vue";
import { storeToRefs } from "pinia";
import { useAuthStore, useTeamStore, useTournamentStore } from "~/store";
import StepperContainer from "~/components/pages/equipos/stepper/index.vue";

const teamStore = useTeamStore();
const { steps, isEdition, teamStoreRequest } = storeToRefs(teamStore);
const leaveHandler = () => {
  steps.value.current = "createTeam";
  steps.value.completed = [];
  isEdition.value = false;
  teamStoreRequest.value = {};
};
onMounted(() => {
  const userId = useAuthStore().user?.id as number;
  useTournamentStore().fetchTournamentsByLeagueId(userId);
});
</script>
<template>
  <v-dialog
    v-model="teamStore.dialog"
    max-width="690"
    @after-leave="leaveHandler"
    scrollable
  >
    <v-card
      class="create-tournament-card futzo-rounded"
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
