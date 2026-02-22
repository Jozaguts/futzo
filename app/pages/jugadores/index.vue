<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import NoPlayers from '~/components/pages/jugadores/no-players.vue'
import JugadoresForm from '~/components/pages/jugadores/form/index.vue'
import PlayersTable from '~/components/pages/jugadores/players-table.vue'
import ImportDialog from '@/components/pages/jugadores/import-dialog/index.vue'
import AssignTeamDialog from '@/components/pages/jugadores/assign-team-dialog.vue'
import PlayerKpis from '~/components/pages/jugadores/player-kpis.vue'
import PlayersFiltersPanel from '~/components/pages/jugadores/players-filters-panel.vue'
import ModuleTopShell from '~/components/shared/page/module-top-shell.vue'
import QuickActionsPanel from '~/components/shared/quick-actions-panel.vue'
import {usePlayersIndexPage} from '~/composables/players/usePlayersIndexPage'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const {
  teamFilter,
  positionFilter,
  teamFilterOptions,
  positionFilterOptions,
  players,
  noPlayers,
  pagination,
  tourSteps,
  quickActions,
  registerTourRef,
  searchPlayers,
  handleQuickAction,
  initializePage,
  disposePage,
} = usePlayersIndexPage()

onMounted(initializePage)
onBeforeUnmount(disposePage)
</script>

<template>
  <PageLayout styles="main jugadores-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>

    <template #default>
      <ModuleTopShell
        title="Jugadores"
        subtitle="Centraliza la operación y configuración de tus jugadores."
        top-shell-test-id="jugadores-page-top-shell"
        intro-test-id="jugadores-page-intro"
        controls-test-id="jugadores-filters-panel"
      >
        <template #controls>
          <PlayersFiltersPanel
            v-model:team-filter="teamFilter"
            v-model:position-filter="positionFilter"
            :team-options="teamFilterOptions"
            :position-options="positionFilterOptions"
            @search="searchPlayers"
          />
        </template>
      </ModuleTopShell>

      <section class="module-overview jugadores-page__overview" data-testid="jugadores-page-overview">
        <div class="module-overview__kpis jugadores-page__kpis">
          <PlayerKpis :players="players" :total-players="pagination.total" />
        </div>
        <QuickActionsPanel
          class="module-overview__actions jugadores-page__actions-panel"
          title="Acciones Rápidas"
          test-id="jugadores-page-actions"
          :actions="quickActions"
          primary-action-id="new_player"
          @action="handleQuickAction"
        />
      </section>

      <NoPlayers />

      <div v-if="!noPlayers" class="jugadores-page__table" data-testid="jugadores-table-panel">
        <PlayersTable :team-filter="teamFilter" :position-filter="positionFilter" />
      </div>

      <JugadoresForm />
      <ImportDialog />
      <AssignTeamDialog />
    </template>

    <template #tour>
      <LazyTour name="jugadores" :steps="tourSteps" @register="registerTourRef" />
    </template>
  </PageLayout>
</template>

<style lang="scss">
@use '~/assets/scss/pages/players-index.scss';
</style>
