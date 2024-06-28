import type {User} from "~/models/user";
const USER_NOT_VERIFIED = 401

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client){
       const user = useSanctumUser<User>()
        const isLogged = user.value?.name != null
        if (isLogged && !user.value?.verified && to.name !== 'index') {
            return navigateTo({
                name: 'index',
                query: { code: 'USER_NOT_VERIFIED' }
            });
        }
    }

})