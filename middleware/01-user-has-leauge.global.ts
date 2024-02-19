export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSanctumUser()
    if (to.path !== '/ligas' && user.value?.league === 'No league assigned') {
        return navigateTo('/ligas')
    }
})