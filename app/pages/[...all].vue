<script setup lang="ts">
definePageMeta({
  layout: 'blank',
  sanctum: {
    excluded: true,
  },
});

useHead({
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
});

useResponseHeader('x-robots-tag', 'noindex, nofollow');
setResponseStatus(404, 'Not Found');

const backToHome = () => navigateTo('/');
</script>

<template>
  <div class="d-flex justify-center items-center h-screen">
    <v-empty-state
      headline="Whoops, 404"
      title="Pagina no encontrada"
      text="La página que buscas no existe o ha sido movida."
      image="/images/logo-07.png"
      @click:action="backToHome"
      action-text="Volver al inicio"
    ></v-empty-state>
  </div>
</template>
