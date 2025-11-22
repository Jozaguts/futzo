import type { User } from '~/models/User';

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  // if (to.name !== 'configuracion' && to.name !== 'bienvenido' && to.name !== 'verificar') {
  const userRef = useSanctumUser<User>();
  const isLogin = !!userRef.value?.email || !!userRef.value?.phone;
  if (!isLogin) return;

  // si no tiene liga, que lo trate el middleware 02-user-has-league
  if (!userRef.value?.has_league) return;

  // Prioridad al pago: si no está operacional, manda a checkout y no cargues onboarding
  // esto pasa cuando el trial venció y no tiene un subscription activa
  if (userRef.value && userRef.value.is_operational === false) {
    if (to.name !== 'configuracion') {
      return navigateTo(
        `/configuracion?step=account&is_operational=${userRef.value.is_operational}&subscribed=${userRef.value.subscribed}`
      );
    }
    return;
  }

  // Cargar onboarding de forma segura
  const onboarding = useOnboardingStore();
  // 1) Si ya está listo, no pidas nada
  if (onboarding.state.all_done === true) return;

  // 2) Si la ruta ya es accesible segun estado local, no pidas nada
  if (onboarding.canAccessPath(to.path)) return;

  // 3) Solo ahora refresca del backend, y maneja errores sin romper navegación
  try {
    await onboarding.loadSafe(); // no lanza error en 401/402
  } catch {} // No romper navegación; como fallback deja pasar o redirige a login si quieres

  if (!onboarding.state.all_done && !onboarding.canAccessPath(to.path)) {
    return navigateTo('/');
  }
  // }
});
