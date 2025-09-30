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
  const { standings, tournamentId, lastResults, nextGames, groupStanding } = storeToRefs(useTournamentStore())
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
          <StatsTableContainer title="Líderes de estadísticas">
            <template #content>
              <StatsTable />
            </template>
          </StatsTableContainer>
        </div>
        <div class="right-down-zone futzo-rounded">
          <NextGamesToday title="Últimos resultados">
            <template #content>
              <LastGames :lastGames="lastResults" />
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
</style>
