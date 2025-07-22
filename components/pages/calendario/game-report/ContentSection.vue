<script setup lang="ts">
  import InfoHeaderSection from '~/components/pages/calendario/game-report/info-header-section.vue'
  import { useGameStore, useTeamStore } from '~/store'
  import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
  import type { Team } from '~/models/Team'
  import type { Game } from '~/models/Game'
  import type { TeamLineupAvailablePlayers } from '~/models/Player'
  import { sortFormation } from '~/utils/sort-formation'

  const { game, gamePlayers, showFabBtn } = storeToRefs(useGameStore())
  const tab = ref('lineup')
  const {
    homeTeam,
    awayTeam,
    homeFormation,
    awayFormation,
    formations,
    homePlayers,
    awayPlayers,
  } = storeToRefs(useTeamStore())
  watch(game, async (newGame) => {
    if (!newGame?.home?.id || !newGame?.away?.id) return
    const initialize = await useGameStore().initializeGameReport(newGame?.id)
    homeTeam.value = initialize.home.team as Team
    awayTeam.value = initialize.away.team as Team
    homePlayers.value = initialize.home.players as TeamLineupAvailablePlayers[]
    awayPlayers.value = initialize.away.players as TeamLineupAvailablePlayers[]
    delete initialize.home.team
    delete initialize.away.team
    delete initialize.home.players
    delete initialize.away.players
    homeFormation.value = sortFormation(initialize.home)
    awayFormation.value = sortFormation(initialize.away)
  })
  onMounted(() => {
    useTeamStore().getFormations()
  })
  onUnmounted(() => {
    game.value = {} as Game
  })
  const updateDefaultFormationType = (
    isHome: boolean,
    team_id: number,
    formation_id: number
  ) => {
    useTeamStore()
      .updateGameTeamFormationType(team_id, game.value.id, formation_id)
      .then(() => {
        useGameStore()
          .initializeGameReport(game.value.id)
          .then((initialize) => {
            homeTeam.value = initialize.home.team as Team
            awayTeam.value = initialize.away.team as Team
            homePlayers.value = initialize.home
              .players as TeamLineupAvailablePlayers[]
            awayPlayers.value = initialize.away
              .players as TeamLineupAvailablePlayers[]
            delete initialize.home.team
            delete initialize.away.team
            delete initialize.home.players
            delete initialize.away.players
            homeFormation.value = sortFormation(initialize.home)
            awayFormation.value = sortFormation(initialize.away)
          })
      })
  }

  const reloadPlayers = () => {}
  const leaving = () => {
    console.log('Leaving Game Report')
  }
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
      <v-speed-dial
        v-model="showFabBtn"
        location="left center"
        transition="slide-y-reverse-transition"
        activator="parent"
      >
        <v-btn key="1" color="grey-900" icon v-tooltip:top="'Goles'">
          <Icon name="futzo-icon:goal" size="24" />
        </v-btn>
        <v-btn key="2" color="grey-900" icon v-tooltip:top="'Tarjetas'">
          <Icon name="futzo-icon:card" size="24" />
        </v-btn>
        <v-btn key="2" color="grey-900" icon v-tooltip:top="'Cambios'">
          <Icon name="futzo-icon:substitution" size="24" color="white" />
        </v-btn>
      </v-speed-dial>
    </v-fab>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex text-body-2">
            <span class="text-primary">{{ game?.details?.tournament }}</span
            >·<span class="ml-2 text-secondary text-capitalize">{{
              game?.details?.date
            }}</span>
            <span class="ml-auto text-secondary text-capitalize">{{
              game?.status
            }}</span>
          </div>
          <div class="score-container">
            <div class="team-score-container">
              <div class="team-container">
                <v-avatar :image="game?.home?.image" size="50" />
                <span
                  class="d-inline-block text-truncate mt-4"
                  style="max-width: 150px"
                >
                  {{ game?.home?.name }}</span
                >
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
                <v-avatar :image="game?.away?.image" size="50" />
                <span
                  class="d-inline-block text-truncate mt-4"
                  style="max-width: 150px"
                >
                  {{ game?.away?.name }}</span
                >
              </div>
            </div>
          </div>
          <div class="round-container">
            <p class="text-body-2">
              Jornada <span>{{ game?.round }}</span>
            </p>
          </div>
        </v-col>
        <v-divider />
        <v-col cols="12">
          <v-tabs
            align-tabs="center"
            v-model="tab"
            fixed-tabs
            class="bg-background"
          >
            <v-tab class="text-uppercase" value="home">Cronología</v-tab>
            <v-tab class="text-uppercase" value="lineup">Alineaciones</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab" class="mt-4">
            <v-tabs-window-item
              value="lineup"
              transition="fade-transition"
              reverse-transition="fade-transition"
            >
              <linesupContainer
                show-complete
                is-report
                :homeTeam
                :awayTeam
                :formations
                :awayFormation
                :homeFormation
                :homePlayers
                :awayPlayers
                @updateFormationType="updateDefaultFormationType"
                @reloadPlayers="reloadPlayers"
                @leaving="leaving"
              />
            </v-tabs-window-item>
            <v-tabs-window-item
              value="away"
              transition="fade-transition"
              reverse-transition="fade-transition"
            >
              <info-header-section :text="game?.away?.name" label="Visitante" />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-col>
        <!--        <v-divider/>-->
        <!--        <game-team-actions/>-->
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
