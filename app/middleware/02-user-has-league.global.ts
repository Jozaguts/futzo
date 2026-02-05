import type {User} from '~/models/User';

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;
  if (to.meta?.sanctum?.excluded) return;
  const user = useSanctumUser<User>();
  const isLogin = !!user.value?.email || !!user.value?.phone;

  if (user.value?.roles.includes('super administrador')) {
    return;
  }
  if (isLogin && to.path !== '/bienvenido' && !user.value?.has_league) {
    //@ts-ignore
    return navigateTo({ name: 'bienvenido' });
  }
});
