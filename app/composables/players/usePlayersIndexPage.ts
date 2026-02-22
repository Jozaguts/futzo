import type {Position} from '~/models/Position'
import type {Team} from '~/models/Team'
import type {TeamRosterSnapshot} from '~/utils/teamRosterCapacity'
import {hasAvailableTeamRosterSlots} from '~/utils/teamRosterCapacity'

type TeamFilterOption = {
  title: string
  value: number | 'all'
}

type PositionFilterOption = {
  title: string
  value: string | 'all'
}

type PlayersQuickActionId = 'new_player' | 'import_players'

type PlayersQuickAction = {
  id: PlayersQuickActionId
  label: string
  icon: string
  disabled: boolean
  className?: string
  testId: string
}

const mapTeamFilterOption = (team: Team): TeamFilterOption => ({
  title: team.name,
  value: team.id,
})

const mapPositionFilterOption = (position: Position): PositionFilterOption => ({
  title: position.name,
  value: String(position.name).toLowerCase(),
})

export const usePlayersIndexPage = () => {
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

  const teamFilterOptions = computed<TeamFilterOption[]>(() => {
    const options = (teams.value ?? []).map(mapTeamFilterOption)
    return [{ title: 'Todos los equipos', value: 'all' }, ...options]
  })

  const positionFilterOptions = computed<PositionFilterOption[]>(() => {
    const options = (positions.value ?? []).map(mapPositionFilterOption)
    return [{ title: 'Todas las posiciones', value: 'all' }, ...options]
  })

  const ownTeam = computed<TeamRosterSnapshot | null>(() => {
    return (teams.value?.[0] as TeamRosterSnapshot | undefined) ?? null
  })

  const hasAvailableRosterSlots = computed(() => {
    if (!isTeamScopedRole.value) {
      return true
    }

    return hasAvailableTeamRosterSlots(ownTeam.value)
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

  const quickActions = computed<PlayersQuickAction[]>(() => [
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
      icon: 'lucide:download',
      disabled: !canImportPlayers.value,
      testId: 'jugadores-import-btn',
    },
  ])

  const handleQuickAction = (actionId: string) => {
    switch (actionId as PlayersQuickActionId) {
      case 'new_player':
        openCreatePlayer()
        return
      case 'import_players':
        if (canImportPlayers.value) {
          importModal.value = true
        }
    }
  }

  const searchPlayers = useDebounceFn(async (search: string) => {
    pagination.value.current_page = 1
    await playerStore.getPlayers(search)
  }, 500)

  const initializePage = async () => {
    await Promise.all([playerStore.getPlayers(), teamStore.list(), positionsStore.fetchPositions()])
    setActiveController(tourController)
  }

  const disposePage = () => {
    clearActiveController(tourController)
  }

  return {
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
  }
}
