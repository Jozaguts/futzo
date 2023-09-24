import {useLocalStorage} from "@vueuse/core";
import {useAuthStore} from "~/store";

export default defineNuxtRouteMiddleware((to,from) => {
  if(!useLocalStorage('token',null).value && to.name !== 'login'){
    return navigateTo('/login')
  }
})
