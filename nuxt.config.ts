// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: false,
  vite:{
    server:{
      hmr:{
        protocol: 'ws',
        host:' 0.0.0.0',
      }
    }
  },
  build: {transpile: ['vuetify','@vuepic/vue-datepicker','vue-sonner']},
  googleFonts: {
    display: 'swap',
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700]
    }
  },
  modules: [
      'nuxt-icons',
     'vuetify-nuxt-module',
    '@formkit/auto-animate/nuxt',
    // '@vite-pwa/nuxt',
    '@nuxtjs/i18n',
    '@vee-validate/nuxt',
    'nuxt-auth-sanctum',
    'nuxt-typed-router',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    'nuxt-lodash',
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: './vuetify.config.ts' // <== you can omit it
  },
  // i18n: {
  //   vueI18n: './i18n.config.ts' // if you are using custom path, default
  // },
  // nuxt-auth-sanctum options (also configurable via environment variables)
  sanctum: {
    baseUrl: process.env.NUXT_PUBLIC_URL_BACKEND, // Laravel API
    // origin: 'http://futzo.test', // Nuxt app, by default will be used 'useRequestURL().origin'
    userStateKey: 'sanctum.user.identity', // user state key for Vue `useState` composable
    redirectIfAuthenticated: false, // Redirect to onLogin if already authenticated
    csrf: {
      cookie: 'XSRF-TOKEN', // CSRF cookie name
      header: 'X-XSRF-TOKEN', // CSRF header name
    },
    client: {
      retry: false, // ofetch retry option (number | false)
    },
    redirect: {
      keepRequestedRoute: false, // Keep requested route in the URL for later redirect
      onLogin: '/', // Redirect to this page after successful login
      onLogout: '/login', // Redirect to this page after successful logout
      onAuthOnly: '/login', // Redirect to this page if user is not authenticated
      onGuestOnly: '/', // Redirect to this page if user is authenticated
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: false,
    },
    endpoints: {
      csrf: '/sanctum/csrf-cookie', // CSRF cookie endpoint
      login: '/auth/login', // Endpoint that accepts user credentials
      logout: '/auth/logout', // Endpoint to destroy the current session
      user: '/api/v1/me', // Endpoint that return current user information
    },
  },
  runtimeConfig: {
    googleMapsSecret: process.env.NUXT_GOOGLE_MAPS_API_KEY,
    public: {
      baseURLBackend: process.env.NUXT_PUBLIC_URL_BACKEND,
      backendPrefix: process.env.NUXT_PUBLIC_BACKEND_PREFIX,
      appName: process.env.NUXT_PUBLIC_APP_NAME,
    }
  },
})