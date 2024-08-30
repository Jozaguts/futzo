<script setup lang="ts">
import HeaderCard from "~/components/pages/equipos/CreateTeamDialog/Header.vue";
import { storeToRefs } from "pinia";
import { useTeamStore } from "~/store";
import StepperContainer from "~/components/pages/equipos/stepper/index.vue";

const { isEdition } = storeToRefs(useTeamStore());
const teamStore = useTeamStore();
const { steps } = storeToRefs(teamStore);
const leaveHandler = () => {
  steps.value.current = "createTeam";
  steps.value.completed = [];
};
</script>
<template>
  <v-dialog
    v-model="teamStore.dialog"
    max-width="688"
    @after-leave="leaveHandler"
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
@import "~/assets/scss/pages/create-team.scss";
</style>
