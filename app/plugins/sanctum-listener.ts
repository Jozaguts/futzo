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
});
