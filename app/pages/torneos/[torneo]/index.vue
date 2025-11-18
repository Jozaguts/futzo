<script lang="ts" setup>
  import PositionsTable from '~/components/pages/equipos/positions-table.vue'
  import StatsTableContainer from '~/components/pages/equipos/live-games.vue'
  import NextGamesToday from '~/components/pages/equipos/next-games-today.vue'
  import LastGames from '~/components/pages/equipos/equipo/last-games.vue'
  import NextGames from '~/components/pages/equipos/next-games.vue'
  import CreateTournamentDialog from '~/components/pages/torneos/dialog/index.vue'
  import PageLayout from '~/components/shared/PageLayout.vue'
  import AppBar from '~/components/layout/AppBar.vue'
  import AppBarBtn from '~/components/pages/torneos/torneo/app-bar-btn.vue'
  import StatsTable from '~/components/pages/torneos/stats-tables/index.vue'
  import { useDisplay } from 'vuetify'
  import MarkAsInput from '~/components/pages/torneos/torneo/mark-as-input.vue'
  const { standings, tournamentId, lastResults, nextGames, groupStanding, tournament } =
    storeToRefs(useTournamentStore())
  const route = useRoute()
  onMounted(() => {
    if (tournamentId.value) {
      useTournamentStore().getStandings()
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
        <template #buttons>
          <AppBarBtn />
        </template>
        <template #extension>
          <div class="d-flex d-md-none d-lg-none flex-column w-100">
            <MarkAsInput class="mx-4" />
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <div class="teams-team-container">
        <div class="primary-zone">
          <PositionsTable :standings="standings" :groupStanding="groupStanding" />
        </div>
        <div class="secondary-zone futzo-rounded">
          <NextGames :nextGames="nextGames" />
        </div>
        <div class="right-up-zone">
          <v-card class="futzo-rounded mb-4">
            <v-card-title> Historial </v-card-title>
            <v-slide-group show-arrows>
              <v-slide-group-item v-for="n in 25" :key="n" v-slot="{ isSelected, toggle }">
                <SecondaryBtn class="ma-2" @click="toggle" :text="'Options' + n"> </SecondaryBtn>
              </v-slide-group-item>
            </v-slide-group>
          </v-card>
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
