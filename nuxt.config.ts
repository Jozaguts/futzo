// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src:
            "https://maps.googleapis.com/maps/api/js?key=" +
            process.env.NUXT_GOOGLE_MAPS_API_KEY +
            "&libraries=places",
          async: true,
          defer: true,
        },
      ],
    },
  },

  ssr: true,

  css: ["~/assets/scss/main.scss"],

  devtools: {
    enabled: true,
  },

  build: {
    transpile: [
      "vuetify",
      "@vuepic/vue-datepicker",
      "vue-sonner",
      "v-phone-input",
    ],
  },

  googleFonts: {
    families: {
      Inter: "200..900",
    },
    display: "swap",
  },

  modules: [
    "nuxt-icons",
    "vuetify-nuxt-module",
    "@formkit/auto-animate/nuxt",
    // '@vite-pwa/nuxt',
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "nuxt-auth-sanctum",
    "nuxt-typed-router",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-lodash",
    "@morev/vue-transitions/nuxt",
    "vue3-perfect-scrollbar/nuxt",
  ],

  vuetify: {
    moduleOptions: {
      styles: { configFile: "/assets/scss/settings.scss" },
      prefixComposables: true,
    },
    vuetifyOptions: {
      /* vuetify options */
    },
    // moduleOptions: {
    //   styles: { configFile: '/assets/scss/settings.scss' }
    // },
    // vuetifyOptions: './vuetify.config.ts' // <== you can omit it
  },

  features: {
    inlineStyles: false,
  },

  // i18n: {
  //   vueI18n: './i18n.config.ts' // if you are using custom path, default
  // },
  sanctum: {
    baseUrl: process.env.NUXT_PUBLIC_URL_BACKEND, // Laravel API
    // origin: 'http://futzo.test', // Nuxt app, by default will be used 'useRequestURL().origin'
    userStateKey: "sanctum.user.identity", // user state key for Vue `useState` composable
    redirectIfAuthenticated: false, // Redirect to onLogin if already authenticated
    csrf: {
      cookie: "XSRF-TOKEN", // CSRF cookie name
      header: "X-XSRF-TOKEN", // CSRF header name
    },
    client: {
      retry: false, // ofetch retry option (number | false)
    },
    redirect: {
      keepRequestedRoute: false, // Keep requested route in the URL for later redirect
      onLogin: "/", // Redirect to this page after successful login
      onLogout: "/login", // Redirect to this page after successful logout
      onAuthOnly: "/login", // Redirect to this page if user is not authenticated
      onGuestOnly: "/", // Redirect to this page if user is authenticated
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: false,
    },
    endpoints: {
      csrf: "/sanctum/csrf-cookie", // CSRF cookie endpoint
      login: "/auth/login", // Endpoint that accepts user credentials
      logout: "/auth/logout", // Endpoint to destroy the current session
      user: "/api/v1/me", // Endpoint that return current user information
    },
  },

  runtimeConfig: {
    googleMapsSecret: process.env.NUXT_GOOGLE_MAPS_API_KEY,
    public: {
      baseURLBackend: process.env.NUXT_PUBLIC_URL_BACKEND,
      backendPrefix: process.env.NUXT_PUBLIC_BACKEND_PREFIX,
      appName: process.env.NUXT_PUBLIC_APP_NAME,
    },
  },

  compatibilityDate: "2024-07-12",
});
