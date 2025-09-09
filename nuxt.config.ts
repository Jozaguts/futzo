// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import path from 'node:path';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
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
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NUXT_GOOGLE_MAPS_API_KEY}&libraries=places,marker&loading=async`,
          defer: true,
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
    defaultLocale: 'es',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  features: {
    inlineStyles: false,
  },
  icon: {
    customCollections: [
      {
        prefix: 'futzo-icon',
        dir: './app/assets/icons',
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
  },
  // end these 3 are necessary
  css: ['vuetify/styles', '~/assets/scss/main.scss'],
  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker', 'vue-sonner', 'v-phone-input'],
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-expect-error
        config.plugins.push(
          vuetify({
            styles: {
              configFile: 'assets/scss/settings.scss',
            },
          })
        )
      );
    },
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n',
    '@vee-validate/nuxt',
    'nuxt-auth-sanctum',
    'nuxt-typed-router',
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
    '@nuxt/test-utils/module',
    '@unlok-co/nuxt-stripe',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        // Use modern Sass compiler API (mejor rendimiento y menos edge-cases con PNPM)
        // @ts-expect-error
        sass: { api: 'modern-compiler' },
      },
    },
    resolve: {
      alias: {
        // Shim to provide named export { autoAnimate } for versions < commit 6d2950b
        '@formkit/auto-animate$': path.resolve(__dirname, 'app/shims/auto-animate.ts'),
      },
    },
  },
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
  runtimeConfig: {
    public: {
      stripe: {
        key: process.env.NUXT_PUBLIC_STRIPE_KEY,
        options: {},
      },
      baseURLBackend: process.env.NUXT_PUBLIC_URL_BACKEND,
      backendPrefix: process.env.NUXT_PUBLIC_BACKEND_PREFIX,
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || 'dev',
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
