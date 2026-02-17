<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import NoTeams from '~/components/pages/equipos/NoTeams.vue'
import CreateTeamDialog from '~/components/pages/equipos/CreateTeamDialog/index.vue'
import TeamsTable from '~/components/pages/equipos/teams-table.vue'
import ImportDialog from '~/components/pages/equipos/import-dialog/index.vue'
import TeamKpis from '~/components/pages/equipos/team-kpis.vue'
import SearchInput from '~/components/pages/equipos/app-bar-search-input.vue'
import QuickActionsPanel from '~/components/shared/quick-actions-panel.vue'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const teamStore = useTeamStore()
const { canCreateTeam, canImportTeams } = useRoleAccess()
const { noTeams, tourSteps, listKpis, dialog, importModal } = storeToRefs(teamStore)
const { registerTourRef, startTour, resetTour, recalculateTour } = teamStore
const { setActiveController, clearActiveController } = useTourHub()

const tourController = { registerTourRef, startTour, resetTour, recalculateTour }

onMounted(() => {
  teamStore.getTeams()
  setActiveController(tourController)
})

onBeforeUnmount(() => {
  clearActiveController(tourController)
})

type EquiposQuickActionId = 'new_team' | 'import_teams'

const equiposQuickActions = computed(() => [
  {
    id: 'new_team',
    label: 'Nuevo equipo',
    icon: 'lucide:shirt',
    disabled: !canCreateTeam.value,
    className: 'teams-primary-btn',
    testId: 'equipos-new-team-btn',
  },
  {
    id: 'import_teams',
    label: 'Importar equipos',
    icon: 'lucide:upload',
    disabled: !canImportTeams.value,
    testId: 'equipos-import-btn',
  },
])

const handleEquiposQuickAction = (actionId: string) => {
  switch (actionId as EquiposQuickActionId) {
    case 'new_team':
      if (canCreateTeam.value) {
        dialog.value = true
      }
      return
    case 'import_teams':
      if (canImportTeams.value) {
        importModal.value = true
      }
  }
}
</script>
<template>
  <PageLayout styles="main equipos-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>
    <template #default>
      <section class="equipos-page__top-shell futzo-rounded" data-testid="equipos-page-top-shell">
        <header class="equipos-page__intro" data-testid="equipos-page-intro">
          <div class="equipos-page__header">
            <div class="equipos-page__title-wrapper">
              <p class="equipos-page__eyebrow">Gestión de torneos</p>
              <h1 class="equipos-page__title">Equipos</h1>
              <p class="equipos-page__subtitle">Centraliza la operación de tus equipos desde una sola vista.</p>
            </div>
          </div>
        </header>
        <div class="equipos-page__top-divider" aria-hidden="true"></div>
        <section class="equipos-page__controls" data-testid="equipos-filters-panel">
          <SearchInput min-width="100%" placeholder="Buscar equipo..." class="equipos-page__search" />
        </section>
      </section>
      <section class="equipos-page__overview" data-testid="equipos-page-overview">
        <div class="equipos-page__kpis">
          <TeamKpis :kpis="listKpis" />
        </div>
        <QuickActionsPanel
          title="Acciones Rápidas"
          test-id="equipos-page-actions"
          :actions="equiposQuickActions"
          primary-action-id="new_team"
          @action="handleEquiposQuickAction"
        />
      </section>
      <NoTeams />
      <div v-if="!noTeams" class="table equipos-page__table" data-testid="equipos-table-panel">
        <div class="table-wrapper">
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
<style scoped>
  .equipos-page__top-shell {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
  }

  .equipos-page__intro {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .equipos-page__header {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .equipos-page__title-wrapper {
    min-width: 0;
  }

  .equipos-page__eyebrow {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .03em;
    color: #667085;
    text-transform: uppercase;
  }

  .equipos-page__title {
    margin: 2px 0 0;
    color: #101828;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
  }

  .equipos-page__subtitle {
    margin: 4px 0 0;
    color: #667085;
    font-size: 13px;
    line-height: 1.4;
  }

  .equipos-page__top-divider {
    width: 100%;
    height: 1px;
    background: #eaecf0;
  }

  .equipos-page__controls {
    width: 100%;
  }

  .equipos-page__search {
    width: 100%;
  }

  .equipos-page__overview {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .equipos-page__kpis {
    min-width: 0;
  }

  .table-wrapper {
    height: auto;
    min-height: 260px;
    display: flex;
    flex: 1 1 auto;
    padding: 12px;
    max-height: 100%;
  }

  .equipos-page__table {
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
    .equipos-page__intro {
      gap: 4px;
    }

    .equipos-page__header {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
    }

    .equipos-page__title-wrapper {
      max-width: 680px;
    }

    .equipos-page__title {
      font-size: 28px;
    }

    .equipos-page__subtitle {
      font-size: 14px;
    }

    .equipos-page__overview {
      grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
      gap: 16px;
      align-items: start;
    }

    .table-wrapper {
      height: 100%;
      min-height: 0;
    }

    .equipos-page__table {
      flex: 1 1 0;
      min-height: 0;
    }
  }
</style>
