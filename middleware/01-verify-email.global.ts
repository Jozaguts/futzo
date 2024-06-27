import type {User} from "~/models/user";
const USER_NOT_VERIFIED = 401

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client){
       const user = useSanctumUser<User>()
        const isLogged = user.value?.name != null
        console.log({isLogged})
        console.log({user: user.value})
        if (isLogged){
            if (!user.value?.verified){
                if (to.name !== 'index'){
                    return navigateTo({
                        name: 'index',
                        query: {
                            code: USER_NOT_VERIFIED,
                        }
                    })
                }
            }
        }
    }

})