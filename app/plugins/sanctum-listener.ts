export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('sanctum:login', () => {
    console.log('Sanctum login hook triggered');
    console.log(nuxtApp);
  });
  nuxtApp.hook('sanctum:request', (app, ctx, logger) => {
    ctx.options.headers.set('X-Language', 'text');
  });
});
