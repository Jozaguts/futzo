<script setup lang="ts">
  import InfoHeaderSection from '~/components/pages/calendario/game-report/info-header-section.vue'
  import GameDetailsSection from '~/components/pages/calendario/game-report/game-details-section.vue'
  import { useGameStore, useTeamStore } from '~/store'
  import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
  import type { Team } from '~/models/Team'
  import type { Game } from '~/models/Game'
  import type { TeamLineupAvailablePlayers } from '~/models/Player'
  import { sortFormation } from '~/utils/sort-formation'
  const { game, showFabBtn } = storeToRefs(useGameStore())
  const asyncComponents = {
    Goals: defineAsyncComponent(
      () =>
        import('~/components/pages/calendario/game-report/sections/goals.vue')
    ),
    Substitutions: defineAsyncComponent(
      () =>
        import(
          '~/components/pages/calendario/game-report/sections/substitutions.vue'
        )
    ),
    Cards: defineAsyncComponent(
      () =>
        import('~/components/pages/calendario/game-report/sections/cards.vue')
    ),
  }
  const componentToRender = ref<keyof typeof asyncComponents>('Goals')
  const currentComponent = computed(() => {
    return asyncComponents[componentToRender.value]
  })
  const dialogState = ref<{
    show?: boolean
    title: string
    subtitle: string
    type: 'info' | 'success' | 'error'
  }>({
    show: false,
    title: '',
    subtitle: '',
    type: 'info',
  })

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
  const dialogHandler = (type: 'goles' | 'tarjetas' | 'cambios') => {
    if (type === 'goles') {
      dialogState.value = {
        title: 'Registrar Goles',
        subtitle: 'Añade los goles del partido',
        type: 'info',
      }
      componentToRender.value = 'Goals'
    } else if (type === 'tarjetas') {
      dialogState.value = {
        title: 'Registrar Tarjetas',
        subtitle: 'Añade las tarjetas del partido',
        type: 'info',
      }
      componentToRender.value = 'Cards'
    } else if (type === 'cambios') {
      dialogState.value = {
        title: 'Registrar Cambios',
        subtitle: 'Añade los cambios realizados durante el partido',
        type: 'info',
      }
      componentToRender.value = 'Substitutions'
    }
    dialogState.value.show = true
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
        <v-btn
          key="1"
          color="grey-900"
          @click="() => dialogHandler('goles')"
          icon
          v-tooltip:top="'Goles'"
        >
          <Icon name="futzo-icon:goal" size="24" />
        </v-btn>
        <v-btn
          key="2"
          color="grey-900"
          @click="() => dialogHandler('tarjetas')"
          icon
          v-tooltip:top="'Tarjetas'"
        >
          <Icon name="futzo-icon:card" size="24" />
        </v-btn>
        <v-btn
          key="2"
          color="grey-900"
          @click="() => dialogHandler('cambios')"
          icon
          v-tooltip:top="'Cambios'"
        >
          <Icon name="futzo-icon:substitution" size="24" color="white" />
        </v-btn>
      </v-speed-dial>
    </v-fab>
    <v-container>
      <v-row>
        <GameDetailsSection :game="game" />
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
