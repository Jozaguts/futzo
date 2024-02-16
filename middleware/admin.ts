export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSanctumUser()
    if (user.value?.roles[0] !== 'super administrador') {
        return abortNavigation()
    }

})