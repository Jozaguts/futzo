export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('sanctum:response', (app, { request, options, response }, logger) => {
    const leagueId = response?.headers?.get('X-League-Id');
    if (leagueId) {
      useCookie('league_id').value = leagueId;
    }
  });

  nuxtApp.hook('sanctum:request', (app, ctx, logger) => {
    const leagueId = useCookie('league_id').value;
    if (leagueId) {
      ctx.options.headers.set('X-League-Id', leagueId);
    }
  });
  nuxtApp.hook('sanctum:error:response', async (request) => {
    // Si recibimos 401 o 402, limpiamos el estado de onboarding
    const status = request?.response?.status;
    if (status === 401) {
      try {
        const { logout } = useSanctumAuth();
        await logout?.().catch(() => {});
      } finally {
        const user = useSanctumUser();
        user.value = null as any;
        const route = useRoute();
        if (!['/login', '/'].includes(route.path)) navigateTo('/login');
      }
    }
    if (status === 402) {
      const route = useRoute();
      if (route.path !== '/configuracion') navigateTo('/configuracion');
    }
    console.log(status);
  });
});
