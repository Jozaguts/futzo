<script setup lang="ts">
  import { Toaster } from 'vue-sonner'
  const { toastDuration } = storeToRefs(useGlobalStore())
  useHead({
    link: [{ rel: 'stylesheet', href: 'https://assets.calendly.com/assets/external/widget.css' }],
    script: [
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/jquery-3.3.1.min.js', tagPosition: 'bodyClose' },
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/popper.min.js', tagPosition: 'bodyClose' },
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/bootstrap.min.js', tagPosition: 'bodyClose' },
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/plugins.min.js', tagPosition: 'bodyClose' },
      { src: 'https://futzo.s3.us-east-2.amazonaws.com/assets/js/scripts.js', tagPosition: 'bodyClose' },
      { src: 'https://assets.calendly.com/assets/external/widget.js', tagPosition: 'bodyClose', async: true },
    ],
    meta: [
      { name: 'description', content: 'Futzo.io es una plataforma para organizar y administrar ligas deportivas.' },
      { property: 'og:site_name', content: 'Futzo.io' },
      { property: 'og:title', content: 'Futzo.io - Gestiona tu liga como un profesional' },
      {
        property: 'og:description',
        content:
          'Crea torneos, registra equipos y jugadores, genera calendarios y estadísticas desde una plataforma intuitiva.',
      },
      { property: 'og:image', content: 'https://futzo.io/images/futzo.png' },
      { property: 'og:url', content: 'https://futzo.io' },
      { property: 'og:site_name', content: 'Futzo.io' },
      { property: 'og:type', content: 'website' },
    ],
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
