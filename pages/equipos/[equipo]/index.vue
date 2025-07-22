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
  import { getTeamFormation } from '~/http/api/team'
  import type { Team } from '~/models/Team'
  import type { TeamFormation } from '~/models/Game'
  import { sortFormation } from '~/utils/sort-formation'
  import type { TeamLineupAvailablePlayers } from '~/models/Player'
  const { homeTeam, nextGames, formations, homeFormation, homePlayers } =
    storeToRefs(useTeamStore())

  watchEffect(async () => {
    homeTeam.value = (await useTeamStore().getTeam(
      useRoute().params?.equipo as string
    )) as Team
    if (homeTeam.value?.id) {
      homePlayers.value =
        await usePlayerStore().getDefaultLineupAvailableTeamPlayers(
          homeTeam.value
        )
      await useTeamStore().getNextGames(homeTeam.value.id)
      await getTeamFormation(homeTeam.value as Team).then(
        (response: TeamFormation) => {
          response = sortFormation(response)
          homeFormation.value = response
        }
      )
      await useTeamStore().getFormations()
    }
  })
  const updateFormationType = (
    isHome: boolean,
    team_id: number,
    formation_id: number
  ) => {
    useTeamStore()
      .updateFormationType(team_id, formation_id)
      .then(() => {
        getTeamFormation({ id: team_id } as Team).then(
          (response: TeamFormation) => {
            response = sortFormation(response)
            if (isHome) {
              homeFormation.value = response
            }
          }
        )
      })
  }
  const leaving = () => {
    homeTeam.value = {} as Team
    homeFormation.value = {} as TeamFormation
  }
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
        <div class="primary-zone pa-0">
          <LinesupContainer
            :show-complete="false"
            :isReport="false"
            :homeTeam="homeTeam"
            :homeFormation="homeFormation"
            :formations="formations"
            :homePlayers
            @update-formation-type="updateFormationType"
            @leaving="leaving"
          />
        </div>
        <div class="secondary-zone">
          <NextGames :nextGames />
        </div>
        <div class="right-up-zone">
          <PlayersList title="Jugadores">
            <template #table-body>
              <tr v-for="player in homePlayers" :key="player.player_id">
                <td>
                  <p>{{ player.number }} {{ player.name }}</p>
                </td>
              </tr>
            </template>
          </PlayersList>
        </div>
        <div class="right-down-zone">
          <NextGamesToday title="Últimos resultados" />
        </div>
        <CreateTeamDialog />
      </div>
    </template>
  </PageLayout>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/teams-team.sass"
</style>
