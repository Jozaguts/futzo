import type { User } from "~/models/user";

export default defineNuxtRouteMiddleware(() => {
  const user = useSanctumUser<User>();
  if (!user.value?.roles?.includes("super administrador")) {
    return abortNavigation();
  }
});
