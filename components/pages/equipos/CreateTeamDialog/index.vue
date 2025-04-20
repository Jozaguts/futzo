<script setup lang="ts">
import HeaderCard from "~/components/pages/equipos/CreateTeamDialog/Header.vue";
import {storeToRefs} from "pinia";
import {useTeamStore, useTournamentStore} from "~/store";
import StepperContainer from "~/components/pages/equipos/stepper/index.vue";

const teamStore = useTeamStore();
const {steps, isEdition, teamStoreRequest} = storeToRefs(teamStore);
const leaveHandler = () => {
  steps.value.current = "createTeam";
  steps.value.completed = [];
  isEdition.value = false;
  teamStoreRequest.value = {};
};
onMounted(() => {
  loadGoogleMapsScript();
  useTournamentStore().fetchTournamentsByLeagueId();
});
const loadGoogleMapsScript = () => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsAPIKey}&libraries=places&loading=async`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};
onUnmounted(() => {
  const script = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsAPIKey}&libraries=places&loading=async"]`);
  if (script) {
    script.remove();
  }
})
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
      <HeaderCard/>
      <StepperContainer :step="steps.current"/>
    </v-card>
  </v-dialog>
</template>
<style lang="sass">
@use "assets/scss/pages/create-team.sass"
</style>
