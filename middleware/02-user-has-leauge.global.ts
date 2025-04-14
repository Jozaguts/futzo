import type {User} from "~/models/user";

export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.server) return;
    const user = useSanctumUser<User>();
    const isLogin = !!user.value?.email || !!user.value?.phone;

    if (user.value?.roles.includes("super administrador")) {
        return;
    }
    if (isLogin && to.path !== "/bienvenido" && !user.value?.has_league) {
        return navigateTo({name: "bienvenido"});
    }
});
