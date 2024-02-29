<script lang="ts" setup>
import NoTeamRegisteredCard from "~/components/pages/equipos/no-team-registered-card.vue";
import {useTeamStore} from "~/store/useTeamStore";
import {storeToRefs} from "pinia";
const teamStore = storeToRefs(useTeamStore())
const {teams} = teamStore

const noTeams = computed(() => teams.value?.length === 0)
const tab= ref(1)
onMounted(() => {
  useTeamStore().getTeams()
} )
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
        <v-tab  v-for="team in teams" :value="team.id" :key="team.id">{{team.name}}</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
            v-for="team in teams"
            :value="team.id"
            :key="team.id"
        >
          <v-card>
            <v-card-item>
              <v-card-title>
                {{team.name}}
              </v-card-title>
            </v-card-item>
            <v-card-text>
              {{team}}
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</v-container>
</template>
<style>


</style>
