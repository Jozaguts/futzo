<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import NoPlayers from '~/components/pages/jugadores/no-players.vue'
import JugadoresForm from '~/components/pages/jugadores/form/index.vue'
import PlayersTable from '~/components/pages/jugadores/players-table.vue'
import ImportDialog from '@/components/pages/jugadores/import-dialog/index.vue'
import AssignTeamDialog from '@/components/pages/jugadores/assign-team-dialog.vue'
import PlayerKpis from '~/components/pages/jugadores/player-kpis.vue'
import SearchInput from '~/components/shared/SearchInput.vue'
import QuickActionsPanel from '~/components/shared/quick-actions-panel.vue'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const playerStore = usePlayerStore()
const teamStore = useTeamStore()
const positionsStore = usePositionsStore()
const { canCreatePlayer, canImportPlayers, isTeamScopedRole } = useRoleAccess()
const { toast } = useToast()
const { dialog, tourSteps, importModal, players, noPlayers, pagination } = storeToRefs(playerStore)
const { teams } = storeToRefs(teamStore)
const { positions } = storeToRefs(positionsStore)
const { registerTourRef, startTour, resetTour, recalculateTour } = playerStore
const { setActiveController, clearActiveController } = useTourHub()
const tourController = { registerTourRef, startTour, resetTour, recalculateTour }

const teamFilter = ref<number | 'all'>('all')
const positionFilter = ref<string | 'all'>('all')

const searchHandler = useDebounceFn(async (search: string) => {
  pagination.value.current_page = 1
  await playerStore.getPlayers(search)
}, 500)

const hasAvailableRosterSlots = computed(() => {
  if (!isTeamScopedRole.value) {
    return true
  }

  const ownTeam = teams.value?.[0] as any
  if (!ownTeam) {
    return false
  }

  const playersCount = Number(ownTeam?.players_count ?? 0)
  const maxPlayers = Number(
    ownTeam?.tournament?.max_players_per_team ??
      ownTeam?.tournament_configuration?.max_players_per_team ??
      ownTeam?.max_players_per_team ??
      0
  )

  if (!Number.isFinite(maxPlayers) || maxPlayers <= 0) {
    return true
  }

  return playersCount < maxPlayers
})

const canOpenCreatePlayer = computed(() => canCreatePlayer.value && hasAvailableRosterSlots.value)

const openCreatePlayer = () => {
  if (!canCreatePlayer.value) {
    return
  }
  if (!hasAvailableRosterSlots.value) {
    toast({
      type: 'warning',
      msg: 'Sin cupos disponibles',
      description: 'Tu equipo alcanzó el máximo de jugadores permitidos.',
    })
    return
  }
  dialog.value = true
}

type JugadoresQuickActionId = 'new_player' | 'import_players'
const jugadoresQuickActions = computed(() => [
  {
    id: 'new_player',
    label: 'Nuevo jugador',
    icon: 'lucide:user-plus',
    disabled: !canOpenCreatePlayer.value,
    className: 'players-primary-btn',
    testId: 'jugadores-new-player-btn',
  },
  {
    id: 'import_players',
    label: 'Importar jugadores',
    icon: 'lucide:upload',
    disabled: !canImportPlayers.value,
    testId: 'jugadores-import-btn',
  },
])

const handleJugadoresQuickAction = (actionId: string) => {
  switch (actionId as JugadoresQuickActionId) {
    case 'new_player':
      openCreatePlayer()
      return
    case 'import_players':
      if (canImportPlayers.value) {
        importModal.value = true
      }
  }
}

onMounted(async () => {
  await Promise.all([playerStore.getPlayers(), teamStore.list(), positionsStore.fetchPositions()])
  setActiveController(tourController)
})

onBeforeUnmount(() => {
  clearActiveController(tourController)
})
</script>

<template>
  <PageLayout styles="main jugadores-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>

    <template #default>
      <section class="jugadores-page__top-shell futzo-rounded" data-testid="jugadores-page-top-shell">
        <header class="jugadores-page__intro" data-testid="jugadores-page-intro">
          <div class="jugadores-page__header">
            <div class="jugadores-page__title-wrapper">
              <p class="jugadores-page__eyebrow">Gestión de torneos</p>
              <h1 class="jugadores-page__title">Jugadores</h1>
              <p class="jugadores-page__subtitle">Centraliza la operación y configuración de tus jugadores.</p>
            </div>
          </div>
        </header>

        <div class="jugadores-page__top-divider" aria-hidden="true"></div>

        <section class="jugadores-page__controls" data-testid="jugadores-filters-panel">
          <SearchInput
            placeholder="Buscar jugador..."
            min-width="100%"
            class="jugadores-page__search"
            @searching="searchHandler"
          />
          <v-select
            v-model="teamFilter"
            :items="[{ title: 'Todos los equipos', value: 'all' }, ...teams.map((team: any) => ({ title: team.name, value: team.id }))]"
            item-title="title"
            item-value="value"
            density="compact"
            variant="outlined"
            label="Equipo"
            hide-details
            class="jugadores-page__filter"
          />
          <v-select
            v-model="positionFilter"
            :items="[
              { title: 'Todas las posiciones', value: 'all' },
              ...positions.map((position: any) => ({ title: position.name, value: String(position.name).toLowerCase() })),
            ]"
            item-title="title"
            item-value="value"
            density="compact"
            variant="outlined"
            label="Posición"
            hide-details
            class="jugadores-page__filter"
          />
        </section>
      </section>

      <section class="jugadores-page__overview" data-testid="jugadores-page-overview">
        <div class="jugadores-page__kpis">
          <PlayerKpis :players="players" :total-players="pagination.total" />
        </div>
        <QuickActionsPanel
          class="jugadores-page__actions-panel"
          title="Acciones Rápidas"
          test-id="jugadores-page-actions"
          :actions="jugadoresQuickActions"
          primary-action-id="new_player"
          @action="handleJugadoresQuickAction"
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

<style scoped>
.jugadores-page__top-shell {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
}

.jugadores-page__intro {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.jugadores-page__header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.jugadores-page__title-wrapper {
  min-width: 0;
}

.jugadores-page__eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #667085;
  text-transform: uppercase;
}

.jugadores-page__title {
  margin: 2px 0 0;
  color: #101828;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
}

.jugadores-page__subtitle {
  margin: 4px 0 0;
  color: #667085;
  font-size: 13px;
  line-height: 1.4;
}

.jugadores-page__top-divider {
  width: 100%;
  height: 1px;
  background: #eaecf0;
}

.jugadores-page__controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.jugadores-page__search,
.jugadores-page__filter {
  width: 100%;
}

.jugadores-page__overview {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.jugadores-page__kpis {
  min-width: 0;
  height: 100%;
}

.jugadores-page__actions-panel {
  height: 100%;
}

.jugadores-page__table {
  min-height: 320px;
  display: flex;
  flex: 1 1 auto;
  border: 1px solid #eaecf0;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
}

@media (min-width: 960px) {
  .jugadores-page__intro {
    gap: 4px;
  }

  .jugadores-page__header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
  }

  .jugadores-page__title-wrapper {
    max-width: 680px;
  }

  .jugadores-page__title {
    font-size: 28px;
  }

  .jugadores-page__subtitle {
    font-size: 14px;
  }

  .jugadores-page__overview {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
    gap: 16px;
    align-items: stretch;
  }

  .jugadores-page__controls {
    grid-template-columns: minmax(240px, 1fr) 220px 220px;
    align-items: center;
  }
}
</style>
