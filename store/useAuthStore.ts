import {Auth} from "~/interfaces";
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

    const isLogged = computed(() => !!token.value)

    const user = computed(() => { return auth.value.user })

    return {
        auth,
        token,
        initToken,
        destroySession,
        isLogged,
        user
    }
})
