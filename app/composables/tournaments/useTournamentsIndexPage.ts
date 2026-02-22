export const useTournamentsIndexPage = () => {
  const tournamentStore = useTournamentStore()
  const { tournamentId, noTournaments, tourSteps, summary, listKpis, loading } = storeToRefs(tournamentStore)
  const { registerTourRef, startTour, resetTour, recalculateTour } = tournamentStore
  const { setActiveController, clearActiveController } = useTourHub()
  const tourController = { registerTourRef, startTour, resetTour, recalculateTour }

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
    registerTourRef,
    initializePage,
    disposePage,
  }
}
