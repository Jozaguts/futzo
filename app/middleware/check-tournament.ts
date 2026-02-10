import type { User } from '~/models/User';

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server && import.meta.env.MODE !== 'test') return;
  const user = useSanctumUser<User>();
  const isLogged = !!user.value?.email || !!user.value?.phone;
  if (!isLogged) return;
  const { tournamentId } = storeToRefs(useTournamentStore());
  if (!tournamentId.value) {
    //@ts-ignore
    return navigateTo({ name: 'torneos' });
  }
});
