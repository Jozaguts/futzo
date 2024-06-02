export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client){
        const user = useSanctumUser()
        // Comprueba si la ruta actual es la de verificación de correo
        const isVerificationRoute = to.path.startsWith('/verify-email/');
        // Si es la ruta de verificación, permite el acceso
        if (isVerificationRoute  || user.value?.roles.includes('super administrador')) {
            return;
        }


        if (to.path !== '/bienvenido' && user.value?.league === 'No league assigned') {
            return navigateTo({name: "bienvenido"})
        }
    }

})