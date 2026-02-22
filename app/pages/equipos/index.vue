<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import NoTeams from '~/components/pages/equipos/NoTeams.vue'
import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
import TeamsTable from '~/components/pages/equipos/teams-table.vue'
import ImportDialog from '~/components/pages/equipos/import-dialog/index.vue'
import TeamKpis from '~/components/pages/equipos/team-kpis.vue'
import SearchInput from '~/components/pages/equipos/app-bar-search-input.vue'
import ModuleTopShell from '~/components/shared/page/module-top-shell.vue'
import QuickActionsPanel from '~/components/shared/quick-actions-panel.vue'
import {useTeamsIndexPage} from '~/composables/teams/useTeamsIndexPage'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const {
  noTeams,
  tourSteps,
  listKpis,
  quickActions,
  registerTourRef,
  handleQuickAction,
  initializePage,
  disposePage,
} = useTeamsIndexPage()

onMounted(initializePage)
onBeforeUnmount(disposePage)
</script>
<template>
  <PageLayout styles="main equipos-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>
    <template #default>
      <ModuleTopShell
        title="Equipos"
        subtitle="Centraliza la operación de tus equipos desde una sola vista."
        top-shell-test-id="equipos-page-top-shell"
        intro-test-id="equipos-page-intro"
        controls-test-id="equipos-filters-panel"
      >
        <template #controls>
          <SearchInput min-width="100%" placeholder="Buscar equipo..." class="equipos-page__search" />
        </template>
      </ModuleTopShell>
      <section class="module-overview equipos-page__overview" data-testid="equipos-page-overview">
        <div class="module-overview__kpis equipos-page__kpis">
          <TeamKpis :kpis="listKpis" />
        </div>
        <QuickActionsPanel
          class="module-overview__actions equipos-page__actions-panel"
          title="Acciones Rápidas"
          test-id="equipos-page-actions"
          :actions="quickActions"
          primary-action-id="new_team"
          @action="handleQuickAction"
        />
      </section>
      <NoTeams />
      <div v-if="!noTeams" class="table equipos-page__table" data-testid="equipos-table-panel">
        <div class="equipos-page__table-wrapper">
          <TeamsTable />
        </div>
      </div>
      <CreateTeamDialog />
      <ImportDialog />
    </template>
    <template #tour>
      <LazyTour name="equipos" :steps="tourSteps" @register="registerTourRef" />
    </template>
  </PageLayout>
</template>
<style lang="scss">
@use '~/assets/scss/pages/teams-index.scss';
</style>
