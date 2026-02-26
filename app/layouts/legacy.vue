<script setup lang="ts">
import {Toaster} from 'vue-sonner'

const { toastDuration } = storeToRefs(useGlobalStore())
  const siteUrl = 'https://futzo.io'
  const route = useRoute()
  useHead({
    htmlAttrs: { lang: 'es' },
    titleTemplate: (titleChunk) =>
        titleChunk ? `${titleChunk}` : 'Software para Administrar Ligas de Fútbol Online | Futzo',
    link: [
      // Canonical dinámico por ruta
      { rel: 'canonical', href: siteUrl + route.path }
    ],
    meta: [
      { name: 'description', content: 'Administra ligas de fútbol: equipos, jugadores, calendarios, resultados y estadísticas. Empieza gratis con Futzo en minutos.' },
      { name: 'robots', content: 'index,follow,max-image-preview:large' },

      // Open Graph (para compartir)
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Futzo' },
      { property: 'og:url', content: siteUrl + route.path },
      { property: 'og:title', content: 'Software para Administrar Ligas de Fútbol Online | Futzo' },
      { property: 'og:description', content: 'Administra ligas de fútbol: equipos, calendarios, resultados y estadísticas. Empieza gratis.' },
      { property: 'og:image', content: 'https://futzo.io/og-futzo.png' },
      // Twitter (opcional)
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  })
</script>
<template>
  <v-app app>
    <ClientOnly>
      <Toaster position="top-right" offset="80px" :duration="toastDuration" />
    </ClientOnly>
    <slot />
  </v-app>
</template>
