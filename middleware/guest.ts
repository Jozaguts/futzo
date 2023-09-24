import {useLocalStorage} from "@vueuse/core";
import {useAuthStore} from "~/store";

export default defineNuxtRouteMiddleware((to) => {
  if(useAuthStore().token && to.name === 'login') {
    return navigateTo('/')
  }
})
