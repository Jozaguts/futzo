<script lang="ts" setup>
import HeaderCard from "~/components/pages/torneos/calendario/dialog/header.vue";
import StepperContainer from "~/components/pages/torneos/calendario/stepper/index.vue";
import { storeToRefs } from "pinia";
import { useTournamentStore } from "~/store";

const { calendarSteps, calendarDialog } = storeToRefs(useTournamentStore());
const leaveHandler = () => {
  useTournamentStore().$reset();
};
</script>
<template>
  <v-dialog
    v-model="calendarDialog"
    max-width="690"
    @after-leave="leaveHandler"
    scrollable
  >
    <v-card
      class="create-tournament-card futzo-rounded"
      height="100%"
      :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <HeaderCard />

      <StepperContainer :step="calendarSteps.current" />
    </v-card>
  </v-dialog>
</template>
