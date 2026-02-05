import type {User} from '~/models/User';

export default defineNuxtRouteMiddleware((to) => {
  // skip middleware on server
  if (import.meta.server) return;
  if (to.meta?.sanctum?.excluded) return;
  const user = useSanctumUser<User>();
  const isLogin = !!user.value?.email;
  if (isLogin && !user.value?.verified && to.name !== 'verificar') {
    return navigateTo('/verificar');
  }
});
