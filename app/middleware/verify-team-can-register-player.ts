export default defineNuxtRouteMiddleware(async (to) => {
  // Only apply to specific route

  if (to.name === 'equipos-equipo-jugadores-inscripcion') {
    const slug = to.params.equipo as string;
    const config = useRuntimeConfig();
    const backendPrefix = String(config.public.backendPrefix || 'api/v1').replace(/^\/+|\/+$/g, '');

    try {
      // Call backend API
      const { canRegister } = await $fetch<{ canRegister: boolean }>(
        `/${backendPrefix}/public/teams/${slug}/can-register`,
        {
          baseURL: config.public.baseURLBackend,
          credentials: 'omit',
        }
      );

      if (!canRegister) {
        return navigateTo(`/equipos/${slug}/inscripcion-cerrada`);
      }
    } catch (error) {
      console.error('Error checking team registration', error);
      return navigateTo(`/equipos/${slug}/inscripcion-cerrada?status=error`);
    }
  }
});
