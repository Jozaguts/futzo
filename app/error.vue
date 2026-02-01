<script setup lang="ts">
  const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="d-flex justify-center items-center h-screen">
    <v-empty-state
      headline="Whoops, 404"
      title="Pagina no encontrada"
      text="La página que buscas no existe o ha sido movida."
      image="/images/logo-07.png"
      @click:action="handleError"
      action-text="Volver al inicio"
    ></v-empty-state>
  </div>
  x
</template>
