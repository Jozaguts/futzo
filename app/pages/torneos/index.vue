<script setup lang="ts">
import TournamentTable from '~/components/pages/torneos/tournament-table.vue'
import NoTournaments from '~/components/pages/torneos/no-tournament.vue'
import TournamentDialog from '~/components/pages/torneos/dialog/index.vue'
import TournamentKpis from '~/components/pages/torneos/tournament-kpis.vue'
import TournamentFilters from '~/components/pages/torneos/tournament-filters.vue'
import {storeToRefs} from '#imports'
import AppBar from "~/components/layout/AppBar.vue";

definePageMeta({
  middleware: ['sanctum:auth'],
})
const tournamentStore = useTournamentStore()
  const { tournamentId, noTournaments, tourSteps, summary, loading } = storeToRefs(tournamentStore)
  const { registerTourRef, startTour, resetTour, recalculateTour } = tournamentStore
  const { setActiveController, clearActiveController } = useTourHub()
  const tourController = { registerTourRef, startTour, resetTour, recalculateTour }
  onMounted(() => {
    tournamentId.value = undefined
    useTournamentStore().loadTournaments()
    setActiveController(tourController)
  })
  onBeforeUnmount(() => {
    clearActiveController(tourController)
  })
</script>
<template>
  <PageLayout styles="main torneos-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>
    <template #default>

      <TournamentKpis :summary="summary" />
      <TournamentFilters />
      <NoTournaments v-if="!loading" />
      <div v-if="!noTournaments || loading" class="table torneos-page__table">
        <div class="table-wrapper">
          <TournamentTable />
        </div>
      </div>
      <TournamentDialog />
    </template>
    <template #tour>
      <LazyTour name="torneos" :steps="tourSteps" @register="registerTourRef" />
    </template>
  </PageLayout>
</template>
<style scoped>
  .table-wrapper {
    height: 100%;
    min-height: 0;
    display: flex;
    flex: 1 1 auto;
  }

  .torneos-page__header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
  }

  .torneos-page__title {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }

  .torneos-page__table {
    margin-top: 12px;
    flex: 1 1 0;
    min-height: 0;
    display: flex;
  }
</style>
