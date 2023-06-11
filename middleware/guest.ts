import {useLocalStorage} from "@vueuse/core";

export default defineNuxtRouteMiddleware((to) => {
  if(useLocalStorage('futzo_token',null).value && to.name === 'login'){
    return navigateTo('/')
  }
})
