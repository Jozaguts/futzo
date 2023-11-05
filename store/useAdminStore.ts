import { Role} from "~/interfaces";
import {defineStore} from "pinia";
export const useAdminStore = defineStore('adminStore', () => {
    const rolesAndPermissions = ref<{roles: Role[], permissions: Permissions[]}>()
    const getRolesAndPermissions = async () => {
        rolesAndPermissions.value =  await useNuxtApp().$api.admin.getRolesAndPermissions()
    }
    const roles = computed(() => {
       return  rolesAndPermissions.value?.roles
    })
    const permissions = computed(() => {
       return  rolesAndPermissions.value?.permissions
    })
    const updateRole = (role: Role): Promise<Role[]> => {
        return useNuxtApp().$api.admin.updateRole(role)
    }
    return {
        roles,
        permissions,
        getRolesAndPermissions,
        updateRole,
    }
})
