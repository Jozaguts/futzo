import {useAuthStore} from "~/store";

export default defineNuxtRouteMiddleware((to,from) => {

        const {isLogged} = useAuthStore()

        if (!isLogged && to.name !== 'index' ) {
            return navigateTo('/')
        }

})
