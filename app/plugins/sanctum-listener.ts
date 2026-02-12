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
    const route = useRoute();
    const skipRedirect = route.meta?.sanctum?.excluded;
    const requestPath = String(request?.request ?? '');
    const user = useSanctumUser();
    const isAuthEndpoint = ['/sanctum/csrf-cookie', '/auth/login', '/auth/logout', '/api/v1/me'].some((endpoint) =>
      requestPath.includes(endpoint)
    );
    const isLoginLikeRoute = route.path === '/login' || route.path === '/';
    // Si recibimos 401 o 402, limpiamos el estado de onboarding
    const status = request?.response?.status;
    if (status === 401) {
      if (isAuthEndpoint || isLoginLikeRoute) {
        return;
      }
      try {
        const { logout } = useSanctumAuth();
        await logout?.().catch(() => {});
      } finally {
        user.value = null as any;
        if (!skipRedirect && !['/login', '/'].includes(route.path)) navigateTo('/login');
      }
    }
    if (status === 402) {
      //@ts-ignore
      if (!skipRedirect && route.path !== '/configuracion') {
        navigateTo({ name: 'configuracion', query: { step: 'account' } });
      }
    }
  });
});
