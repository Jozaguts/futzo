import type { User } from '~/models/user';

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  const user = useSanctumUser<User>();
  const isLogin = !!user.value?.email || !!user.value?.phone;
  if (!isLogin) return;
  if (!user.value?.has_league) return; // 02-user-has-league maneja esto

  const onboarding = useOnboardingStore();
  await onboarding.load(); // TTL evita sobrecarga

  if (!onboarding.state.all_done && !onboarding.canAccessPath(to.path)) {
    return navigateTo('/');
  }
});
