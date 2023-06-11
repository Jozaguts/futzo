// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  "app": {
    head: {
      link: [{rel: 'stylesheet', href: '/loader.css'}],
      script:[
        {
          innerHTML: `
        window.fbAsyncInit = function() {
        FB.init({
          appId      : '${process.env.FACEBOOK_APP_ID}',
          cookie     : true,
          xfbml      : true,
          version    : 'v16.0'
        });
        FB.AppEvents.logPageView();
      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      } (document, 'script', 'facebook-jssdk'));`
        },
      ],
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
