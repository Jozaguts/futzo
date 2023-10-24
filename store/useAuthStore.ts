import {Auth, User} from "~/interfaces";
import {defineStore, skipHydrate} from "pinia";
import {logger} from "@nuxt/kit";
export const useAuthStore = defineStore('authStore', () => {
   const auth = ref<Auth>({user: null, loggedIn: false, token: null})

    const initToken = (token: string) => {
        useLocalStorage('token', token)
    }

    const token = computed(() => {
        const token: null | string = useLocalStorage('token', null).value
        return token
    })
    const destroySession = () => {
        const token = useLocalStorage<string|null>('token', null)
        token.value = null
        auth.value.loggedIn = false
        auth.value.user = null
        window.location.reload()
    }
    const logout = () =>{
        useNuxtApp().$api.auth.logout()
                    .then(() => {
                        destroySession()
                    })
    }

    const getUser = () => {
        if (isLogged.value) {
            if (auth.value.user === null){
                useNuxtApp().$api.auth.user()
                    .then((user: User) => {
                        auth.value.user = user
                    })
            }
        }
        console.log(auth.value.user)
        return auth.value.user
    }

    const isLogged = computed(() => !!token.value)

    const roles = computed(() => {
        return auth.value.user.roles.map((role: string) => role).join(' | ') ?? 'No role assigned'
    })
    return {
        auth,
        token,
        isLogged,
        roles,
        initToken,
        destroySession,
        logout,
        getUser,
    }
})
