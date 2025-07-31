// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  experimental: {
    typedPages: false,
    appManifest: true,
  },
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        {
          name: 'facebook-domain-verification',
          content: '0qihdsq3uqi5n4uaim0ao378p6e5xv',
        },
        {
          property: 'og:title',
          content: process.env.NUXT_PUBLIC_APP_NAME || 'Futzo',
        },
        {
          property: 'og:image',
          content: 'https://futzo.io/og-futzo.png',
        },
        {
          property: 'og:description',
          content: 'Futzo es una plataforma para gestionar partidos de fútbol, equipos y torneos.',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'fb:app_id',
          content: '624608699554291',
        },
      ],
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NUXT_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`,
        },
      ],
    },
  },
  components: [
    { path: '~/components/shared', pathPrefix: false },
    { path: '~/components/inputs/forms', pathPrefix: false },
    '~/components',
  ],
  // these 3 are necessary
  ssr: true,
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  vuetify: {
    moduleOptions: {
      styles: { configFile: 'assets/scss/components.scss' },
    },
    vuetifyOptions: './vuetify.config.ts',
  },
  features: {
    inlineStyles: false,
  },
  icon: {
    customCollections: [
      {
        prefix: 'futzo-icon',
        dir: './assets/icons',
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
  },
  // end these 3 are necessary
  css: ['~/assets/scss/main.scss', '~/assets/scss/globals.scss'],
  build: {
    transpile: [
      // "vuetify",
      '@vuepic/vue-datepicker',
      'vue-sonner',
      'v-phone-input',
    ],
  },
  modules: [
    'vuetify-nuxt-module',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n',
    '@vee-validate/nuxt',
    'nuxt-auth-sanctum',
    // "nuxt-typed-router",
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@morev/vue-transitions/nuxt',
    'vue3-perfect-scrollbar/nuxt',
    '@nuxt/icon',
    'vue-sonner/nuxt',
    'nuxt-svgo',
    '@nuxt/image',
  ],
  sanctum: {
    baseUrl: process.env.NUXT_PUBLIC_URL_BACKEND, // Laravel API
    // origin: 'http://futzo.test', // Nuxt app, by default will be used 'useRequestURL().origin'
    userStateKey: 'sanctum.user.identity', // user state key for Vue `useState` composable
    redirectIfAuthenticated: true, // Redirect to onLogin if already authenticated
    redirectIfUnauthenticated: true,
    csrf: {
      cookie: 'XSRF-TOKEN', // CSRF cookie name
      header: 'X-XSRF-TOKEN', // CSRF header name
    },
    client: {
      retry: false, // ofetch retry option (number | false)
      initialRequest: true,
    },
    redirect: {
      keepRequestedRoute: false, // Keep requested route in the URL for later redirect
      onLogin: '/', // Redirect to this page after successful login
      onLogout: '/login', // Redirect to this page after successful logout
      onAuthOnly: '/login', // Redirect to this page if user is not authenticated
      onGuestOnly: '/', // Redirect to this page if user is authenticated
    },
    globalMiddleware: {
      enabled: false,
      allow404WithoutAuth: false,
    },
    endpoints: {
      csrf: '/sanctum/csrf-cookie', // CSRF cookie endpoint
      login: '/auth/login', // Endpoint that accepts user credentials
      logout: '/auth/logout', // Endpoint to destroy the current session
      user: '/api/v1/me', // Endpoint that return current user information
    },
  },
  vite: {
    // server: {
    //   hmr: {
    //     protocol: "ws",
    //     host: "0.0.0.0",
    //   },
    // },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          api: 'modern-compiler',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      baseURLBackend: process.env.NUXT_PUBLIC_URL_BACKEND,
      backendPrefix: process.env.NUXT_PUBLIC_BACKEND_PREFIX,
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      googleMapsAPIKey: process.env.NUXT_GOOGLE_MAPS_API_KEY,
      googleMapId: process.env.NUXT_GOOGLE_MAP_ID,
      baseUrl: process.env.NUXT_PUBLIC_URL,
    },
  },
  googleFonts: {
    families: {
      Inter: '200..900',
    },
    display: 'swap',
  },
});
