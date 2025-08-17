<template>
  <v-app app>
    <ClientOnly>
      <VSonner position="top-right" />
    </ClientOnly>
    <slot />
  </v-app>
</template>
<script setup lang="ts">
  import { VSonner } from 'vuetify-sonner'
</script>
