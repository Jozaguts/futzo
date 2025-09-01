import type { User } from '~/models/user';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  const user = useSanctumUser<User>();
  const isLogin = !!user.value?.email || !!user.value?.phone;

  // No autenticado: no hace nada
  if (!isLogin) return;

  // Si no tiene liga, deja que 02-user-has-league maneje /bienvenido
  if (!user.value?.has_league) return;

  const ob = user.value?.onboarding;
  if (!ob) return;

  // Si ya terminó, no hace nada
  if (ob.all_done) return;

  // Permitir solo rutas que el backend indica
  const allowed = ob.allowed_paths || ['/'];
  if (!allowed.includes(to.path)) {
    return navigateTo('/');
  }
});
