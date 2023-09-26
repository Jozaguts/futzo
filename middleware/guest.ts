import {useAuthStore} from "~/store";

export default defineNuxtRouteMiddleware((to,from) => {
    if (process.client) {
        const {isLogged,token} = useAuthStore()
        console.log(token,isLogged , to.name === 'login')
        if (isLogged && to.name === 'login' ) {
            return navigateTo('/')
        }
    }
})
