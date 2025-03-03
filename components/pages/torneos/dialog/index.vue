<script lang="ts" setup>
import HeaderCard from "~/components/pages/torneos/dialog/header.vue";
import StepperContainer from "~/components/pages/torneos/stepper/index.vue";
import {storeToRefs} from "pinia";
import {useTournamentStore} from "~/store";

const {steps, dialog} = storeToRefs(useTournamentStore());
const leaveHandler = () => {
  useTournamentStore().$reset();
};
</script>
<template>
  <v-dialog
      v-model="dialog"
      max-width="690"
      @after-leave="leaveHandler"
      scrollable
  >
    <v-card
        class="create-tournament-card futzo-rounded"
        height="100%"
        :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <HeaderCard/>

      <StepperContainer :step="steps.current"/>
    </v-card>
  </v-dialog>
</template>
