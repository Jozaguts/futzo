<script lang="ts" setup>
  import PlayersList from '~/components/pages/equipos/live-games.vue'
  import NextGamesToday from '~/components/pages/equipos/next-games-today.vue'
  import NextGames from '~/components/pages/equipos/next-games.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarBtn from '~/components/pages/equipos/equipo/app-bar-btn.vue'
  import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
  import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
  import { usePlayerStore, useTeamStore } from '~/store'
  const { defaultLineupAvailableTeamPlayers } = storeToRefs(usePlayerStore())
  const { homeTeam } = storeToRefs(useTeamStore())

  watchEffect(async () => {
    homeTeam.value = await useTeamStore().getTeam(
      useRoute().params?.equipo as string
    )
  })
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <AppBarBtn />
        </template>
      </AppBar>
    </template>
    <template #default>
      <div class="teams-team-container">
        <div class="primary-zone">
          <LinesupContainer :show-complete="false" />
        </div>
        <div class="secondary-zone">
          <NextGames />
        </div>
        <div class="right-up-zone">
          <PlayersList title="Jugadores">
            <template #table-body>
              <tr
                v-for="player in defaultLineupAvailableTeamPlayers"
                :key="player.id"
              >
                <td>
                  <p>{{ player.number }} {{ player.name }}</p>
                </td>
              </tr>
            </template>
          </PlayersList>
        </div>
        <div class="right-down-zone">
          <NextGamesToday />
        </div>
        <CreateTeamDialog />
      </div>
    </template>
  </PageLayout>
</template>
<style lang="sass">
  @use "@/assets/scss/pages/teams-team.sass"
</style>
