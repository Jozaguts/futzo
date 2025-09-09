export default defineNuxtRouteMiddleware(() => {
  const tournamentStore = useTournamentStore();
  if (!import.meta.server && !tournamentStore.tournamentId) {
    //@ts-ignore
    return navigateTo({ name: 'torneos' });
  }
});
