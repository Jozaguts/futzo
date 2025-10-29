<script setup lang="ts">
  import GameDetailsSection from '~/components/pages/calendario/game-report/game-details-section.vue'
  import GameEvents from '~/components/pages/calendario/game-report/game-events.vue'
  import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
  import type { Game } from '~/models/Game'
  import { CARDS, GOALS, SUBSTITUTIONS } from '~/utils/constants'
  import { useGame } from '~/composables/useGame'
  import { storeToRefs } from 'pinia'
  const gameStoreInstance = useGameStore()
  const { game, showFabBtn, gameActionFormRequest } = storeToRefs(gameStoreInstance)
  const { homeTeam, awayTeam, homeFormation, awayFormation, formations, homePlayers, awayPlayers } =
    storeToRefs(useTeamStore())
  const { dialogState, currentComponent, dialogHandler, updateDefaultFormationType } = useGame()
  const tab = ref('lineup')
  const leaving = () => {
    console.log('Leaving Game Report')
  }

  watch(game, async (newGame) => {
    if (!newGame?.home?.id || !newGame?.away?.id) return
    const initialize = await gameStoreInstance.initializeGameReport(newGame?.id)
    useTeamStore().initReportHandler(initialize)
  })
  onMounted(() => {
    useTeamStore().getFormations()
  })
  onUnmounted(() => {
    game.value = {} as Game
    gameStoreInstance.resetPenaltyShootout()
  })
</script>
<template>
  <v-sheet class="futzo-rounded" position="static">
    <v-fab
      v-if="tab === 'lineup'"
      :layout="true"
      :absolute="true"
      :color="'primary'"
      location="right bottom"
      icon
      style="transform: translate(-5rem, -9rem); z-index: 9999"
    >
      <v-icon>{{ showFabBtn ? 'mdi-close' : 'mdi-plus' }}</v-icon>
      <v-speed-dial
        v-model="showFabBtn"
        location="left center"
        transition="slide-y-reverse-transition"
        activator="parent"
      >
        <v-btn key="1" color="grey-900" @click="() => dialogHandler(GOALS)" icon v-tooltip:top="'Goles'">
          <Icon name="futzo-icon:goal" size="24" />
        </v-btn>
        <v-btn key="2" color="grey-900" @click="() => dialogHandler(CARDS)" icon v-tooltip:top="'Tarjetas'">
          <Icon name="futzo-icon:card" size="24" />
        </v-btn>
        <v-btn key="2" color="grey-900" @click="() => dialogHandler(SUBSTITUTIONS)" icon v-tooltip:top="'Cambios'">
          <Icon name="futzo-icon:substitution" size="24" color="white" />
        </v-btn>
      </v-speed-dial>
    </v-fab>
    <v-container>
      <v-row>
        <GameDetailsSection :game="game" />
        <v-divider />
        <v-col cols="12">
          <v-tabs align-tabs="center" v-model="tab" fixed-tabs class="bg-background">
            <v-tab class="text-uppercase" value="timeline">Cronología</v-tab>
            <v-tab class="text-uppercase" value="lineup">Alineaciones</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab" class="mt-4">
            <v-tabs-window-item value="lineup" transition="fade-transition" reverse-transition="fade-transition">
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
                @leaving="leaving"
              />
            </v-tabs-window-item>
            <v-tabs-window-item value="timeline" transition="fade-transition" reverse-transition="fade-transition">
              <v-divider />
              <GameEvents />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-col>
        <!--        <v-divider/>-->
        <!--        <game-team-actions/>-->
      </v-row>
    </v-container>
  </v-sheet>
  <Dialog
    :model-value="dialogState.show"
    :title="dialogState.title"
    :loading="false"
    :subtitle="dialogState.subtitle"
    icon-name="uil:schedule"
    min-height="700"
    max-height="700"
    @leaving="dialogState.show = false"
    width="800"
  >
    <template #v-card-text>
      <component :is="currentComponent"></component>
    </template>
    <template #actions>
      <v-row>
        <v-col cols="6">
          <v-btn
            variant="outlined"
            block
            color="secondary"
            density="comfortable"
            size="large"
            @click="dialogState.show = false"
          >
            Cerrar
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            variant="elevated"
            block
            color="primary"
            density="comfortable"
            size="large"
            :disabled="gameActionFormRequest.disabled"
            :loading="gameActionFormRequest.loading"
            @click="useGameStore().saveEventGameHandler"
          >
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </Dialog>
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
