<script lang="ts" setup>
import PlayersList from '~/components/pages/equipos/live-games.vue'
import NextGamesToday from '~/components/pages/equipos/next-games-today.vue'
import NextGames from '~/components/pages/equipos/next-games.vue'
import PageLayout from '~/components/shared/PageLayout.vue'
import AppBar from '~/components/layout/AppBar.vue'
import AppBarBtn from '~/components/pages/equipos/equipo/app-bar-btn.vue'
import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
import LinesupContainer from '~/components/pages/calendario/game-report/linesup-container.vue'
import LastGames from '~/components/pages/equipos/equipo/last-games.vue'
import {getTeamFormation} from '~/http/api/team'
import type {Team} from '~/models/Team'
import type {TeamFormation} from '~/models/Game'
import {sortFormation} from '~/utils/sort-formation'
import {Icon} from '#components'

definePageMeta({
    middleware: ['sanctum:auth'],
  })
  const { homeTeam, nextGames, lastGames, formations, homeFormation, homePlayers } = storeToRefs(useTeamStore())
  const teamPlayers = computed(() => {
    const value = homePlayers.value as any
    if (Array.isArray(value)) return value
    if (Array.isArray(value?.data)) return value.data
    return []
  })

  watchEffect(async () => {
    homeTeam.value = (await useTeamStore().getTeam(useRoute().params?.equipo as string)) as Team
    if (homeTeam.value?.id) {
      homePlayers.value = await usePlayerStore().getDefaultLineupAvailableTeamPlayers(homeTeam.value)
      await useTeamStore().getNextGames(homeTeam.value.id)
      await useTeamStore().getLastGames(homeTeam.value.id)
      await getTeamFormation(homeTeam.value as Team).then((response: TeamFormation) => {
        response = sortFormation(response)
        homeFormation.value = response
      })
      await useTeamStore().getFormations()
    }
  })
  const updateFormationType = (isHome: boolean, team_id: number, formation_id: number) => {
    useTeamStore()
      .updateDefaultFormationType(team_id, formation_id)
      .then(() => {
        getTeamFormation({ id: team_id } as Team).then((response: TeamFormation) => {
          response = sortFormation(response)
          if (isHome) {
            homeFormation.value = response
          }
        })
      })
  }
  const leaving = () => {
    homeTeam.value = {} as Team
    homeFormation.value = {} as TeamFormation
  }
  const open = ref(false)
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="false">
        <template #buttons>
          <AppBarBtn />
        </template>
      </AppBar>
    </template>
    <template #default>
      <div class="teams-team-container">
        <div class="teams-team-column teams-team-column--left">
          <div class="primary-zone pa-4 futzo-rounded">
            <LinesupContainer
              :show-complete="false"
              :isReport="false"
              fixed-height-desktop="400px"
              :homeTeam="homeTeam"
              :homeFormation="homeFormation"
              :formations="formations"
              :homePlayers
              @update-formation-type="updateFormationType"
              @leaving="leaving"
            />
          </div>
          <div class="secondary-zone futzo-rounded">
            <NextGames :nextGames />
          </div>
        </div>
        <div class="teams-team-column futzo-rounded teams-team-column--right">
          <div class="right-up-zone">
            <PlayersList title="Jugadores" v-if="teamPlayers.length > 0">
              <template #content>
                <table class="w-100">
                  <tbody>
                    <tr v-for="player in teamPlayers" :key="player.player_id">
                      <td>
                        <p>{{ player.number ? `${player.number} ` : '' }}{{ player.name }}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </PlayersList>
            <v-card height="100%" v-else>
              <v-empty-state
                image="/no-data.svg"
                size="100"
                text="No hay jugadores en este equipo"
                title="Jugadores"
              ></v-empty-state>
            </v-card>
          </div>
          <div class="right-down-zone">
            <NextGamesToday title="Últimos resultados" v-if="lastGames.length > 0">
              <template #content>
                <LastGames :lastGames="lastGames" />
              </template>
            </NextGamesToday>
            <v-card height="100%" width="100%" v-else>
              <v-empty-state
                image="/no-data.svg"
                size="100"
                text="El equipo no ha finalizado algun partido"
                title="Partidos"
              ></v-empty-state>
            </v-card>
          </div>
        </div>
        <CreateTeamDialog />
      </div>
    </template>
    <template #fab>
      <v-fab color="primary" icon @click="open = !open">
        <Icon name="futzo-icon:plus" class="mobile-fab" :class="open ? 'opened' : ''" size="24"></Icon>
        <v-speed-dial v-model="open" location="left center" transition="slide-y-reverse-transition" activator="parent">
          <v-btn key="1" color="secondary" icon @click="useTeamStore().showTeamHandler($route.params.equipo)">
            <v-icon size="16">$edit</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-fab>
    </template>
  </PageLayout>
</template>
<style lang="sass" scoped>
  @use "~/assets/scss/pages/teams-team-equipo.sass"
</style>
