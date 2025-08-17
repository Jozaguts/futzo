export default defineNuxtRouteMiddleware(async (to) => {
  // Only apply to specific route

  if (to.name === 'equipos-equipo-jugadores-inscripcion') {
    const slug = to.params.equipo as string;

    try {
      // Call backend API
      const { canRegister } = await useSanctumClient()(`/api/v1/public/teams/${slug}/can-register`);

      if (!canRegister) {
        return navigateTo(`/equipos/${slug}/inscripcion-cerrada`);
      }
    } catch (error) {
      console.error('Error checking team registration', error);
      return navigateTo(`/equipos/${slug}/inscripcion-cerrada?status=error`);
    }
  }
});
