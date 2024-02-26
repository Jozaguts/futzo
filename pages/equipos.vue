<script lang="ts" setup>
import NoTeamRegisteredCard from "~/components/pages/equipos/no-team-registered-card.vue";
import {useTeamStore} from "~/store/useTeamStore";
import {storeToRefs} from "pinia";
const teamStore = storeToRefs(useTeamStore())
const {teams} = teamStore

const noTeams = computed(() => teams.value?.length === 0)
const tab= ref('two')
onMounted(() => {
  useTeamStore().getTeams()
} )

console.log(useNuxtApp().$pwa)
</script>
<template>
<v-container fluid>
  <v-row v-if="noTeams"  class="justify-center align-center" style="height: 100vh">
    <v-col cols="12" class="text-center">
      <NoTeamRegisteredCard />
    </v-col>
  </v-row>
<!--   todo mostrar los diferentes torneos que tenga la liga mediante tabs-->
  <v-row v-else>
    <v-col cols="12">
      <v-tabs
          v-model="tab"
      >
        <v-tab value="one">Item One</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>
    </v-col>
  </v-row>
</v-container>
</template>
<style>


</style>
