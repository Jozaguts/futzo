<template>
  <v-app app>
    <ClientOnly>
      <Toaster position="top-right" offset="80px" :duration="5000" />
    </ClientOnly>
    <slot />
  </v-app>
</template>
<script setup lang="ts">
  import { Toaster } from 'vue-sonner'
</script>
