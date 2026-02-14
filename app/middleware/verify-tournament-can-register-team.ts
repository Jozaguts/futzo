export default defineNuxtRouteMiddleware(async (to) => {
  // Only apply to specific route

  if (to.name === 'torneos-torneo-equipos-inscripcion') {
    const slug = to.params.torneo as string;
    const config = useRuntimeConfig();
    const backendPrefix = String(config.public.backendPrefix || 'api/v1').replace(/^\/+|\/+$/g, '');

    try {
      // Call backend API
      const { canRegister } = await $fetch<{ canRegister: boolean }>(
        `/${backendPrefix}/public/tournaments/${slug}/can-register`,
        {
          baseURL: config.public.baseURLBackend,
          credentials: 'omit',
        }
      );

      if (!canRegister) {
        return navigateTo(`/torneos/${slug}/inscripcion-cerrada`);
      }
    } catch (error) {
      console.error('Error checking team registration');
      return navigateTo(`/torneos/${slug}/inscripcion-cerrada?status=error`);
    }
  }
});
