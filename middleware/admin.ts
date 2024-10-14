import type { User } from "~/models/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSanctumUser<User>();
  if (user.value?.roles[0] !== "super administrador") {
    return abortNavigation();
  }
});
