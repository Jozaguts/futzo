import { icons } from "~/nuxt-icon-set/svg";

// import { icons } from '~/nuxt-icon-set/css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vuetify:before-create", ({ vuetifyOptions }) => {
    vuetifyOptions.icons = icons;
  });
});
