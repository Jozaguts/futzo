export default defineNuxtRouteMiddleware((to) => {
  if(!useCookie('XSRF-TOKEN').value && to.name !== 'login'){
    return navigateTo('/login')
  }
})
