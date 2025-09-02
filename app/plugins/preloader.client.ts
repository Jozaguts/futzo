export default defineNuxtPlugin((nuxtApp) => {
  // Hide and remove the static preloader as soon as the app mounts
  nuxtApp.hook('app:mounted', () => {
    const el = document.getElementById('loading-bg');
    const st = document.getElementById('loader-styles');
    if (el) el.classList.add('d-none');
    setTimeout(() => {
      el?.remove();
      st?.remove();
    }, 300);
  });
});

