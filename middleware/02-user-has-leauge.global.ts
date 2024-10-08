import type { User } from "~/models/user";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = useSanctumUser<User>();
    if (user.value?.roles.includes("super administrador")) {
      return;
    }

    if (
      to.path !== "/bienvenido" &&
      user.value?.league === "No league assigned"
    ) {
      return navigateTo({ name: "bienvenido" });
    }
  }
});
