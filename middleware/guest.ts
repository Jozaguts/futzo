import {useAuthStore} from "~/store";

export default defineNuxtRouteMiddleware((to,from) => {
    if (process.client) {
        const {isLogged,token} = useAuthStore()
        if (isLogged && to.name === 'login' ) {
            return navigateTo('/dashboard')
        }
    }
})
