<script setup lang="ts">
import InfoHeaderSection from "~/components/pages/calendario/game-report/info-header-section.vue";

import TeamTable from "~/components/pages/calendario/game-report/team-table.vue";
import GameTeamActions from "~/components/pages/calendario/game-report/game-team-actions.vue";
import {useGameStore} from "~/store";

const {game, gamePlayers, showFabBtn} = storeToRefs(useGameStore())

const tab = ref('home')

</script>
<template>
  <v-sheet class="futzo-rounded" position="static">
    <v-fab
        :layout="true"
        :absolute="true"
        :color="'primary'"
        location="right bottom"
        size="large"
        icon
        class="mr-12"
        style="transform: translate(-2rem, -3rem); z-index: 9999"
    >
      <v-icon>{{ showFabBtn ? 'mdi-close' : 'mdi-plus' }}</v-icon>
      <v-speed-dial v-model="showFabBtn" location="left center" transition="slide-y-reverse-transition" activator="parent">
        <v-btn key="1" color="secondary" icon v-tooltip:top="'Goles'">
          <Icon name="icon-park-outline:soccer-one" size="24"/>
        </v-btn>
        <v-btn key="2" color="secondary" icon v-tooltip:top="'Tarjetas'">
          <Icon name="streamline:cards-solid" size="24"/>
        </v-btn>
        <v-btn key="2" color="secondary" icon v-tooltip:top="'Cambios'">
          <Icon name="game-icons:babyfoot-players" size="24"/>
        </v-btn>
      </v-speed-dial>

    </v-fab>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex text-body-2">
            <span class="text-primary">{{ game?.details?.tournament }}</span>·<span class="ml-2 text-secondary text-capitalize">{{ game?.details?.date }}</span>
            <span class="ml-auto text-secondary text-capitalize ">{{ game?.status }}</span>
          </div>
          <div class="score-container">
            <div class="team-score-container">
              <div class="team-container">
                <v-avatar
                    :image=game?.home?.image
                    size="50"
                />
                <span class="d-inline-block text-truncate mt-4" style="max-width: 150px"> {{ game?.home?.name }}</span>
              </div>
              <div class="team-score">
                <span class="text-h4">{{ game?.home?.goals }}</span>
              </div>
            </div>
            -
            <div class="team-score-container">
              <div class="team-score">
                <span class="text-h4">{{ game?.away?.goals }}</span>
              </div>
              <div class="team-container">
                <v-avatar
                    :image=game?.away?.image
                    size="50"
                />
                <span class="d-inline-block text-truncate mt-4" style="max-width: 150px">  {{ game?.away?.name }}</span>
              </div>
            </div>
          </div>
          <div class="round-container">
            <p class="text-body-2"> Jornada <span>{{ game?.round }}</span></p>
          </div>
        </v-col>
        <v-divider/>
        <v-col cols="12">
          <v-tabs align-tabs="center" v-model="tab" fixed-tabs class="bg-background">
            <v-tab class="text-uppercase" value="home">Cronología</v-tab>
            <v-tab class="text-uppercase" value="away">Alineaciones</v-tab>
            <v-tab class="text-uppercase" value="away">ESTADÍSTICAS</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab" class="mt-4">
            <v-tabs-window-item value="home" transition="fade-transition" reverse-transition="fade-transition">
              <div class="d-flex justify-space-between">
                <info-header-section :text="game?.home?.name" label="Alineacion"/>
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
    </v-container>
  </v-sheet>
</template>
<style lang="sass">
.score-container
  display: flex
  align-items: center
  justify-content: space-around
  margin-top: 1.5rem

.team-score-container
  display: flex
  align-items: center
  justify-content: space-around
  width: 100%

.team-container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.round-container
  display: flex
  align-items: center
  justify-content: center
</style>