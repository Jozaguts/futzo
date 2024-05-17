export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSanctumUser()
    // Comprueba si la ruta actual es la de verificación de correo
    const isVerificationRoute = to.path.startsWith('/verify-email/');

    // Si es la ruta de verificación, permite el acceso
    if (isVerificationRoute) {
        return;
    }

    if (to.path !== '/ligas' && user.value?.league === 'No league assigned') {
        return navigateTo('/ligas')
    }
})