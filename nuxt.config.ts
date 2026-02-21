// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineOrganization} from 'nuxt-schema-org/schema';
import defaults from './config/vuetify/defaults';
import theme from './config/vuetify/theme';

const isTest = process.env.NODE_ENV === 'test' || Boolean(process.env.VITEST) || process.env.NUXT_TEST === '1';
const protectedNoIndexRule = {
  ssr: false,
  headers: { 'x-robots-tag': 'noindex, nofollow' },
};

// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  // nitro: {
    // externals: {
      // inline: ['vue', '@vue/server-renderer', 'unhead', '@unhead/schema-org'],
      // alternativa si no quieres inline:
      // trace: ['vue', '@vue/server-renderer'],
    // },
  // },
  app: {
    head: {
      meta: [
        {
          name: 'facebook-domain-verification',
          content: '0qihdsq3uqi5n4uaim0ao378p6e5xv',
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
  ssr: true,
  features: {
    inlineStyles: false,
  },
  css: ['~/assets/scss/main.scss'],
  build: {
    transpile: ['@vuepic/vue-datepicker', 'vue-sonner', 'v-phone-input'],
  },
  modules: [
    'vuetify-nuxt-module',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n',
    '@vee-validate/nuxt',
    'nuxt-auth-sanctum',
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
    ...(isTest ? ['@nuxt/test-utils/module'] : []),
    '@unlok-co/nuxt-stripe',
    'nuxt-tour',
    // 'nuxt-umami',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    'nuxt-gtag',
    // 'nuxt-meta-pixel' // no funciona en nuxt 4
  ],
  gtag: {
    id: 'G-6B315LGN56',
    enabled: process.env.NODE_ENV === 'production',
  },
  site: {
    url: 'https://futzo.io',
  },
  schemaOrg: {
    identity: defineOrganization({
      '@type': 'Organization',
      name: 'Futzo',
      description: 'Software para administrar ligas de fútbol: equipos, jugadores, calendarios, resultados y estadísticas.',
      url: 'https://futzo.io',
      logo: '/futzo/logos/logo-17.png',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+52 322 327 8118',
          availableLanguage: ['Spanish'],
        },
      ],
      sameAs: [
        'https://www.facebook.com/futzo.io',
        'https://www.instagram.com/futzo.io/',
        'https://www.youtube.com/@futzo-oficial',
      ],
    }),
  },
  routeRules: {
    '/dashboard': protectedNoIndexRule,
    '/dashboard/**': protectedNoIndexRule,
    '/equipos': protectedNoIndexRule,
    '/equipos/**': protectedNoIndexRule,
    '/jugadores': protectedNoIndexRule,
    '/jugadores/**': protectedNoIndexRule,
    '/ubicaciones': protectedNoIndexRule,
    '/ubicaciones/**': protectedNoIndexRule,
    '/login': protectedNoIndexRule,
    '/login/**': protectedNoIndexRule,
    '/torneos': protectedNoIndexRule,
    '/torneos/**': protectedNoIndexRule,
    '/bienvenido': protectedNoIndexRule,
    '/bienvenido/**': protectedNoIndexRule,
    '/authorize': protectedNoIndexRule,
    '/authorize/**': protectedNoIndexRule,
    '/configuracion': protectedNoIndexRule,
    '/configuracion/**': protectedNoIndexRule,
    '/credenciales': protectedNoIndexRule,
    '/credenciales/**': protectedNoIndexRule,
    '/suscripcion': protectedNoIndexRule,
    '/suscripcion/**': protectedNoIndexRule,
    '/verificar': protectedNoIndexRule,
    '/verificar/**': protectedNoIndexRule,
  },
  robots: {
    disallow: [
      '/dashboard',
      '/equipos',
      '/jugadores',
      '/ubicaciones',
      '/login',
      '/torneos',
      '/bienvenido',
      '/authorize',
      '/configuracion',
      '/credenciales',
      '/suscripcion',
      '/verificar'
    ],
    sitemap: 'https://futzo.io/sitemap.xml',
  },
  sitemap:{
    debug: process.env.NODE_ENV !== 'production',
    excludeAppSources: true,
    zeroRuntime: true,
    urls: [
      '/',
      '/politica-de-privacidad',
      '/terminos-de-servicio'
    ],
    exclude: [
      '/dashboard/**',
      '/equipos/**',
      '/jugadores/**',
      '/ubicaciones/**',
      '/login/**',
      '/torneos/**',
      '/bienvenido/**',
      '/authorize/**',
      '/configuracion/**',
      '/credenciales/**',
      '/suscripcion/**',
      '/verificar/**'
    ],
    sitemaps: false,
  },
  vite: {
    server:{
      allowedHosts: ['futzo.test','futzo.io'],
    }
    // css: {
    //   preprocessorOptions: {
    //     // Use modern Sass compiler API (mejor rendimiento y menos edge-cases con PNPM)
    //     // @ts-expect-error
    //     sass: { api: 'modern-compiler' },
    //   },
    // },
    // optimizeDeps: {
    //   include: ['brace-expansion', 'minimatch'],
    //   needsInterop: ['brace-expansion'],
    // },
    // resolve: {
    //   alias: {
    //     // Shim to provide named export { autoAnimate } for versions < commit 6d2950b
    //     '@formkit/auto-animate$': path.resolve(__dirname, 'app/shims/auto-animate.ts'),
    //   },
    // },
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
      metapixel: {
        default: { id: process.env.NUXT_PUBLIC_META_PIXEL_ID || '543648128091975', pageView: '/' },
      }
    },
  },
  googleFonts: {
    families: {
      Inter: '200..900',
    },
    display: 'swap',
  },
  // umami: {
  //   id:  process.env.NUXT_PUBLIC_UMAMI_ID,
  //   host: process.env.NUXT_PUBLIC_UMAMI_HOST,
  //   autoTrack: true,
  //   // proxy: 'cloak',
  //   // useDirective: true,
  //   ignoreLocalhost: true,
  //   // excludeQueryParams: false,
  //   // domains: ['cool-site.app', 'my-space.site'],
  //   // customEndpoint: '/my-custom-endpoint',
  //   enabled: false,
  //   // logErrors: true,
  // },
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
      initialRequest: false,
    },
    redirect: {
      keepRequestedRoute: false, // Keep requested route in the URL for later redirect
      onLogin: '/dashboard', // Redirect to this page after successful login
      onLogout: '/', // Redirect to this page after successful logout
      onAuthOnly: '/', // Redirect to this page if user is not authenticated
      onGuestOnly: '/dashboard', // Redirect to this page if user is authenticated
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
  tour: {
    prefix: 'V',
  },
  vuetify: {
    moduleOptions: {
      styles: {
        configFile: 'assets/scss/settings.scss',
      },
    },
    vuetifyOptions: {
      theme,
      defaults,
    },
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
  i18n: {
    locales: [{ code: 'es', iso: 'es-MX', name: 'Español' }],
    defaultLocale: 'es',
    strategy: 'no_prefix'
  },
});
