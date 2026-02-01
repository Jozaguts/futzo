<script lang="ts" setup>
  import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
  import NextGamesToday from '~/components/pages/equipos/next-games-today.vue'
  import LastGames from '~/components/pages/equipos/equipo/last-games.vue'
  import NextGames from '~/components/pages/equipos/next-games.vue'
  import CreateTournamentDialog from '~/components/pages/torneos/dialog/index.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarBtn from '~/components/pages/torneos/torneo/app-bar-btn.vue'
  import StatsTable from '~/components/pages/torneos/stats-tables/index.vue'
  import Vue3EasyDataTable from 'vue3-easy-data-table'
  import 'vue3-easy-data-table/dist/style.css'
  import { useDisplay } from 'vuetify'
  import { publicTournamentStandingsHeaders } from '~/utils/publicTournamentStandingsHeaders'
  import { Icon } from '#components'
  import { last5Handler } from '~/utils/headers-table'

  const { standings, tournamentId, lastResults, nextGames, groupStanding, tournament } =
    storeToRefs(useTournamentStore())
  const loading = ref(false)
  const route = useRoute()
  onMounted(() => {
    if (tournamentId.value) {
      loading.value = true
      useTournamentStore()
        .getStandings()
        .then(() => {
          loading.value = false
        })
      useTournamentStore().getLastResults()
      useTournamentStore().getNextGames()
    } else {
      useTournamentStore()
        .getTournamentBySlug(route?.params?.torneo as string)
        .then(() => {
          useTournamentStore().getStandings()
          useTournamentStore().getLastResults()
          useTournamentStore().getNextGames()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
  const { mobile } = useDisplay()
  const championInfo = computed(() => {
    if (tournament.value?.status !== 'completado') {
      return null
    }
    const games = Array.isArray(lastResults.value) ? lastResults.value : []
    const winnerName = tournament.value?.winner
    const targetMatch = games.find((game: any) => {
      if (!game || game.status !== 'completado' || !game.winner_team_id) {
        return false
      }
      if (!winnerName) {
        return true
      }
      return game?.homeTeam?.name === winnerName || game?.awayTeam?.name === winnerName
    })
    const winnerTeam =
      targetMatch && targetMatch.homeTeam?.id === targetMatch.winner_team_id
        ? targetMatch.homeTeam
        : (targetMatch?.awayTeam ?? null)
    const resolvedWinnerName = winnerName ?? winnerTeam?.name ?? null
    const scoreText =
      targetMatch && targetMatch.homeTeam && targetMatch.awayTeam
        ? `${targetMatch.homeTeam.name} ${targetMatch.home_goals} - ${targetMatch.away_goals} ${targetMatch.awayTeam.name}`
        : null
    if (!resolvedWinnerName) {
      return null
    }
    return {
      winner: winnerTeam,
      winnerName: resolvedWinnerName,
      scoreText,
      game: targetMatch ?? null,
    }
  })
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="mobile">
        <template #buttons v-if="!mobile">
          <AppBarBtn />
        </template>
        <template #extension>
          <AppBarBtn />
        </template>
      </AppBar>
    </template>
    <template #default>
      <div class="teams-team-container">
        <div class="teams-team-column teams-team-column--left">
          <div class="primary-zone">
            <client-only>
              <p class="text-body-1 pb-2">Tabla de posiciones</p>
              <v-sheet class="futzo-rounded">
                <Vue3EasyDataTable
                  v-if="standings?.length"
                  header-text-direction="center"
                  class="futzo-rounded"
                  body-text-direction="center"
                  :headers="publicTournamentStandingsHeaders"
                  :items="standings"
                  hide-footer
                  :rows-per-page="standings?.length"
                  alternating
                >
                  <template #item-team.name="values">
                    <div class="d-flex">
                      <span class="mr-2">{{ values.rank }}</span>
                      <span class="d-inline-block text-truncate" style="max-width: 100px">
                        {{ values.team.name }}
                      </span>
                    </div>
                  </template>
                  <template #item-last_5="item">
                    <span v-for="color in last5Handler(item.last_5)" :key="item.id" class="text-lowercase">
                      <v-tooltip :text="color?.label" location="bottom">
                        <template v-slot:activator="{ props }">
                          <Icon
                            v-bind="props"
                            :name="color?.icon"
                            :class="`text-${color?.color}`"
                            :size="16"
                            class="cursor-pointer"
                          />
                        </template>
                      </v-tooltip>
                    </span>
                  </template>
                </Vue3EasyDataTable>
                <v-skeleton-loader v-else-if="loading" type="table" class="mb-6" />
                <v-empty-state
                  v-else
                  title="Tabla de posiciones no disponible"
                  text="La tabla aún no está lista. Vuelve más tarde."
                  image="/junior-soccer.svg"
                />
              </v-sheet>
            </client-only>
          </div>
          <div class="secondary-zone futzo-rounded">
            <NextGames :nextGames="nextGames" />
          </div>
        </div>
        <div class="teams-team-column teams-team-column--right">
          <div class="right-up-zone">
            <StatsTableContainer title="Líderes de estadísticas">
              <template #content>
                <StatsTable />
              </template>
            </StatsTableContainer>
          </div>
          <div class="right-down-zone futzo-rounded">
            <NextGamesToday title="Últimos resultados">
              <template #content>
                <div v-if="championInfo?.winnerName" class="champion-banner">
                  <span class="champion-banner__label">Campeón</span>
                  <span class="champion-banner__team">{{ championInfo.winnerName }}</span>
                  <span v-if="championInfo?.scoreText" class="champion-banner__score">
                    {{ championInfo.scoreText }}
                  </span>
                </div>
                <LastGames :lastGames="lastResults" :highlighted-match-id="championInfo?.game?.id ?? null" />
              </template>
            </NextGamesToday>
          </div>
        </div>
        <CreateTournamentDialog />
      </div>
    </template>
  </PageLayout>
</template>
<style lang="sass" scoped>
  @use '~/assets/scss/pages/teams-team.sass'

  .champion-banner
    display: flex
    flex-direction: column
    gap: 4px
    padding: 12px
    border-radius: 12px
    border: 1px solid rgba(83, 56, 158, 0.24)
    background: rgba(125, 86, 217, 0.08)
    margin-bottom: 12px

  .champion-banner__label
    font-size: 11px
    font-weight: 600
    text-transform: uppercase
    letter-spacing: 0.08em
    color: #53389e

  .champion-banner__team
    font-size: 16px
    font-weight: 600
    color: #182230

  .champion-banner__score
    font-size: 13px
    color: #475467
</style>
