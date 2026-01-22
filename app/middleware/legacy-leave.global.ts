export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path === '/' && to.path !== '/') {
    // hard reload: limpia jQuery/plugins y cualquier side-effect
    return navigateTo(to.fullPath, { external: true, replace: true });
  }
});
