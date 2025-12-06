<template>
  <v-app app>
    <ClientOnly>
      <Toaster position="top-right" offset="80px" :duration="toastDuration" />
    </ClientOnly>
    <slot />
  </v-app>
</template>
<script setup lang="ts">
  import { Toaster } from 'vue-sonner'
  const { toastDuration } = storeToRefs(useGlobalStore())
  const padding = computed(() => {
    return useRoute().name === 'index' ? 0 : '40px 40px 0 40px;'
  })
</script>
<style>
  .main {
    padding: v-bind(padding);
  }
</style>
