export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/bienvenido' && to.query.token) {
    const token = to.query.token as string;
    console.log(token);
    try {
      const client = useSanctumClient();
      await client('/api/v1/public/post-checkout-login', {
        method: 'POST',
        body: { token },
        credentials: 'include',
      });
      navigateTo('/bienvenido', { replace: true });
    } catch (err) {
      console.error('Error al loguear con token', err);
      navigateTo('/login');
    }
  }
});
