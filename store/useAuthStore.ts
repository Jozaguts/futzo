
import {defineStore} from "pinia";
import type {User} from "~/models/user";
export const useAuthStore = defineStore('authStore', () => {
    const user = useSanctumUser<User>();
    const role = computed (() => user.value?.roles[0])
    const isSuperAdmin = computed(() => role.value === 'super administrador')
    return {
        role,
        isSuperAdmin,
        user,
    }
})
