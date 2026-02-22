type TeamsQuickActionId = 'new_team' | 'import_teams'

type TeamsQuickAction = {
  id: TeamsQuickActionId
  label: string
  icon: string
  disabled: boolean
  className?: string
  testId: string
}

export const useTeamsIndexPage = () => {
  const teamStore = useTeamStore()
  const { canCreateTeam, canImportTeams } = useRoleAccess()
  const { noTeams, tourSteps, listKpis, dialog, importModal } = storeToRefs(teamStore)
  const { registerTourRef, startTour, resetTour, recalculateTour } = teamStore
  const { setActiveController, clearActiveController } = useTourHub()

  const tourController = { registerTourRef, startTour, resetTour, recalculateTour }

  const quickActions = computed<TeamsQuickAction[]>(() => [
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
      icon: 'lucide:download',
      disabled: !canImportTeams.value,
      testId: 'equipos-import-btn',
    },
  ])

  const handleQuickAction = (actionId: string) => {
    switch (actionId as TeamsQuickActionId) {
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

  const initializePage = async () => {
    await teamStore.getTeams()
    setActiveController(tourController)
  }

  const disposePage = () => {
    clearActiveController(tourController)
  }

  return {
    noTeams,
    tourSteps,
    listKpis,
    quickActions,
    registerTourRef,
    handleQuickAction,
    initializePage,
    disposePage,
  }
}
