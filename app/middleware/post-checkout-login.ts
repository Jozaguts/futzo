import { POST_CHECKOUT_LOGIN_ERROR_STATUS_CODE, POST_CHECKOUT_LOGIN_SUCCESS_STATUS_CODE } from '~/utils/constants';
let alreadyLoggedWithToken = false;
export default defineNuxtRouteMiddleware(async (to) => {
  if (to.name === 'bienvenido' && to.query.token && !alreadyLoggedWithToken) {
    alreadyLoggedWithToken = true;
    const token = to.query.token as string;
    try {
      const client = useSanctumClient();
      await client('/sanctum/csrf-cookie');
      await client('/api/v1/public/post-checkout-login', {
        method: 'POST',
        body: { token },
        credentials: 'include',
      });
      return navigateTo({
        name: 'bienvenido',
        replace: true,
        query: {
          status: POST_CHECKOUT_LOGIN_SUCCESS_STATUS_CODE,
        },
      });
    } catch (err) {
      console.error('Error al loguear con token');
      return navigateTo({
        name: 'bienvenido',
        replace: true,
        query: {
          status: POST_CHECKOUT_LOGIN_ERROR_STATUS_CODE,
        },
      });
    }
  }
});
