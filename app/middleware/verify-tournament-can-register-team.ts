export default defineNuxtRouteMiddleware(async (to) => {
  // Only apply to specific route

  if (to.name === 'torneos-torneo-equipos-inscripcion') {
    const slug = to.params.torneo as string;

    try {
      // Call backend API
      const { canRegister } = await useSanctumClient()<<{ canRegister: boolean }>(
        `/api/v1/public/tournaments/${slug}/can-register`
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
