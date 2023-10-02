// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  "app": {
    head: {
      link: [{rel: 'stylesheet', href: '/loader.css'}],
    },
  },
  build: {transpile: ['vuetify']},
  css: [
    'vuetify/lib/styles/main.sass',
    '@/src/styles/styles.scss',
    '@/src/@core/scss/index.scss'
  ],
  googleFonts: {
    display: 'swap',
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700]
    }
  },
  modules: [
    'nuxt-typed-router',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  runtimeConfig: {
    public: {
      baseURLBackend: process.env.NUXT_PUBLIC_URL_BACKEND,
      backendPrefix: process.env.NUXT_PUBLIC_BACKEND_PREFIX,
    }
  },
})
