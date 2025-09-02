import type { User } from '~/models/User';

export default defineNuxtRouteMiddleware(() => {
  const user = useSanctumUser<User>();
  const isLogged = !!user.value?.email;
  if (isLogged && !user.value?.roles?.includes('super administrador')) {
    return abortNavigation();
  }
});
