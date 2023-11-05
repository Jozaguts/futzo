import {useAuthStore} from "~/store";

export default defineNuxtRouteMiddleware((to,from) => {
    const {isLogged} = useAuthStore()
      if (process.client) {
          if (isLogged && to.name === 'index' ) {
              return navigateTo('/dashboard')
          }else if (!isLogged && to.name !== 'index'){
              return navigateTo('/')
          }
      }
})
