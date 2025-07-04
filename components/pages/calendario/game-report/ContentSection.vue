<script setup lang="ts">
import InfoHeaderSection from "~/components/pages/calendario/game-report/info-header-section.vue";

import TeamTable from "~/components/pages/calendario/game-report/team-table.vue";
import GameTeamActions from "~/components/pages/calendario/game-report/game-team-actions.vue";
import {useGameStore} from "~/store";

const {game, gamePlayers} = storeToRefs(useGameStore())

const tab = ref('home')
</script>
<template>
  <v-row class="futzo-rounded">
    <v-col cols="12">
      <div class=" d-flex justify-center justify-space-evenly ">
        <div class="d-flex flex-column align-center">
          <span class="text-h4 font-weight-bold">{{ game?.home?.goals }}</span>
          <span class="text-caption d-inline-block text-truncate text-medium-emphasis">
             {{ game?.home?.name }}
          </span>
        </div>
        VS
        <div class="d-flex flex-column align-center">
          <span class="text-h4 font-weight-bold">{{ game?.away?.goals }}</span>
          <span class="text-caption d-inline-block text-truncate text-medium-emphasis" style="max-width: 150px;">
             {{ game?.away?.name }}
          </span>
        </div>
      </div>

    </v-col>
    <v-col cols="12">
      <v-tabs align-tabs="center" v-model="tab">
        <v-tab value="home">Local</v-tab>
        <v-tab value="away">Visitante</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab" class="mt-4">
        <v-tabs-window-item value="home" transition="fade-transition" reverse-transition="fade-transition">
          <div class="d-flex justify-space-between">
            <info-header-section :text="game?.home?.name" label="Equipo"/>
            <div>
              <v-btn variant="outlined" density="compact">Cambios</v-btn>
            </div>
          </div>
          <team-table team-type="home"/>

        </v-tabs-window-item>
        <v-tabs-window-item value="away" transition="fade-transition" reverse-transition="fade-transition">
          <info-header-section :text="game?.away?.name" label="Visitante"/>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-col>
    <v-divider/>
    <game-team-actions/>
  </v-row>
</template>
<style lang="sass">
.content-container
  display: grid
  grid-template-columns: 1fr 1fr
  column-gap: 1rem
  padding: 1rem

.score-container
  display: flex

</style>