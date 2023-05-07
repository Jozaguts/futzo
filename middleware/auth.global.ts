export default defineNuxtRouteMiddleware((to) => {
  const token =  useCookie('XSRF-TOKEN')
  if(!token.value && to.name !== 'login'){
    return navigateTo('/login')
  }
})
