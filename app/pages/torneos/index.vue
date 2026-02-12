<script setup lang="ts">
import {storeToRefs} from '#imports'
import AppBar from '~/components/layout/AppBar.vue'
import TournamentDialog from '~/components/pages/torneos/dialog/index.vue'
import TournamentFilters from '~/components/pages/torneos/tournament-filters.vue'
import TournamentKpis from '~/components/pages/torneos/tournament-kpis.vue'
import TournamentTable from '~/components/pages/torneos/tournament-table.vue'
import NoTournaments from '~/components/pages/torneos/no-tournament.vue'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const tournamentStore = useTournamentStore()
const { tournamentId, noTournaments, tourSteps, summary, listKpis, loading } = storeToRefs(tournamentStore)
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
      <header class="torneos-page__intro" data-testid="torneos-page-intro">
        <p class="torneos-page__eyebrow">Gestión de torneos</p>
        <h1 class="torneos-page__title">Torneos</h1>
        <p class="torneos-page__subtitle">Centraliza la operación de tus torneos desde una sola vista.</p>
      </header>
      <TournamentKpis :summary="summary" :kpis="listKpis" />
      <section class="torneos-page__filters" data-testid="torneos-filters-panel">
        <TournamentFilters />
      </section>
      <NoTournaments v-if="!loading" />
      <div v-if="!noTournaments || loading" class="table torneos-page__table" data-testid="torneos-table-panel">
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
  .torneos-page__intro {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .torneos-page__eyebrow {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .03em;
    color: #667085;
    text-transform: uppercase;
  }

  .torneos-page__title {
    margin: 0;
    color: #101828;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
  }

  .torneos-page__subtitle {
    margin: 0;
    color: #667085;
    font-size: 13px;
    line-height: 1.4;
  }

  .torneos-page__filters {
    border: 1px solid #eaecf0;
    border-radius: 16px;
    background: #fff;
    padding: 14px 16px;
  }

  .table-wrapper {
    height: auto;
    min-height: 260px;
    display: flex;
    flex: 1 1 auto;
    padding: 12px;
  }

  .torneos-page__table {
    flex: 0 0 auto;
    min-height: 292px;
    display: flex;
    border: 1px solid #eaecf0;
    border-radius: 16px;
    background: #fff;
    padding: 0;
    overflow: hidden;
  }

  @media (min-width: 960px) {
    .torneos-page__intro {
      gap: 4px;
    }

    .torneos-page__title {
      font-size: 28px;
    }

    .torneos-page__subtitle {
      font-size: 14px;
    }

    .torneos-page__filters {
      padding: 16px;
    }

    .table-wrapper {
      height: 100%;
      min-height: 0;
    }

    .torneos-page__table {
      flex: 1 1 0;
      min-height: 0;
    }
  }
</style>
