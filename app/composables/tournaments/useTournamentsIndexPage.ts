type TournamentsQuickActionId = 'new_tournament'

type TournamentsQuickAction = {
  id: TournamentsQuickActionId
  label: string
  icon: string
  testId: string
}

export const useTournamentsIndexPage = () => {
  const tournamentStore = useTournamentStore()
  const { tournamentId, noTournaments, tourSteps, summary, listKpis, loading, dialog } = storeToRefs(tournamentStore)
  const { registerTourRef, startTour, resetTour, recalculateTour } = tournamentStore
  const { setActiveController, clearActiveController } = useTourHub()
  const tourController = { registerTourRef, startTour, resetTour, recalculateTour }

  const quickActions = computed<TournamentsQuickAction[]>(() => [
    {
      id: 'new_tournament',
      label: 'Nuevo torneo',
      icon: 'lucide:trophy',
      testId: 'torneos-new-tournament-btn',
    },
  ])

  const handleQuickAction = (actionId: string) => {
    switch (actionId as TournamentsQuickActionId) {
      case 'new_tournament':
        dialog.value = true
    }
  }

  const initializePage = async () => {
    tournamentId.value = undefined
    await tournamentStore.loadTournaments()
    setActiveController(tourController)
  }

  const disposePage = () => {
    clearActiveController(tourController)
  }

  return {
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
  }
}
