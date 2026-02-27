<script setup lang="ts">
import AppBar from '~/components/layout/AppBar.vue'
import TournamentDialog from '~/components/pages/torneos/dialog/index.vue'
import TournamentFilters from '~/components/pages/torneos/tournament-filters.vue'
import TournamentKpis from '~/components/pages/torneos/tournament-kpis.vue'
import TournamentTable from '~/components/pages/torneos/tournament-table.vue'
import NoTournaments from '~/components/pages/torneos/no-tournament.vue'
import ModuleTopShell from '~/components/shared/page/module-top-shell.vue'
import QuickActionsPanel from '~/components/shared/quick-actions-panel.vue'
import {useTournamentsIndexPage} from '~/composables/tournaments/useTournamentsIndexPage'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const {
  noTournaments,
  tourSteps,
  summary,
  listKpis,
  loading,
  quickActions,
  registerTourRef,
  handleQuickAction,
  initializePage,
  disposePage,
} = useTournamentsIndexPage()

onMounted(initializePage)
onBeforeUnmount(disposePage)
</script>
<template>
  <PageLayout styles="main torneos-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>
    <template #default>
      <ModuleTopShell
        title="Torneos"
        subtitle="Centraliza la operación de tus torneos desde una sola vista."
        top-shell-test-id="torneos-page-top-shell"
        intro-test-id="torneos-page-intro"
        controls-test-id="torneos-filters-panel"
        :show-controls="true"
      >
        <template #controls>
          <TournamentFilters />
        </template>
      </ModuleTopShell>
      <section class="module-overview torneos-page__overview" data-testid="torneos-page-overview">
        <TournamentKpis :summary="summary" :kpis="listKpis" />
        <QuickActionsPanel
          class="module-overview__actions torneos-page__actions-panel"
          title="Acciones Rápidas"
          test-id="torneos-page-actions"
          :actions="quickActions"
          primary-action-id="new_tournament"
          @action="handleQuickAction"
        />
      </section>
      <NoTournaments v-if="!loading" />
      <div v-if="!noTournaments || loading" class="table torneos-page__table" data-testid="torneos-table-panel">
        <div class="torneos-page__table-wrapper">
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
<style lang="scss">
@use '~/assets/scss/pages/tournaments-index.scss';
</style>
