<template>
  <v-app app>
    <ClientOnly>
      <Toaster position="top-right" offset="80px" :duration="toastDuration" />
    </ClientOnly>
    <slot />
    <ClientOnly>
      <VersionBadge />
    </ClientOnly>
  </v-app>
</template>
<script setup lang="ts">
  import { Toaster } from 'vue-sonner'
  const { toastDuration } = storeToRefs(useGlobalStore())
</script>
