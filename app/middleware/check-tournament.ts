import type { User } from '~/models/User';

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;
  const user = useSanctumUser<User>();
  const isLogged = !!user.value?.email || !!user.value?.phone;
  if (!isLogged) return;
  const tournamentStore = useTournamentStore();
  if (!tournamentStore.tournamentId) {
    //@ts-ignore
    return navigateTo({ name: 'torneos' });
  }
});
