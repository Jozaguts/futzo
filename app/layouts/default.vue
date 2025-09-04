<script setup lang="ts">
  import Navigation from '~/components/layout/navigation-drawer.vue'
  import { Toaster } from 'vue-sonner'
  const show = ref(false)
  const { rail, isMobile, toastDuration } = storeToRefs(useGlobalStore())
  const { user } = storeToRefs(useAuthStore())
  onMounted(() => {
    show.value = true
  })
  const paddingLeft = computed(() => {
    if (isMobile.value) {
      return '0px'
    }
    return rail.value ? '56px' : '256px'
  })
  const isNotConfigurationPage = computed(() => {
    return useRoute().name !== 'configuracion'
  })
</script>
<template>
  <div>
    <ClientOnly>
      <NuxtLoadingIndicator color="#9155FD" :height="6" />
    </ClientOnly>
    <v-layout>
      <v-app app>
        <ClientOnly>
          <Toaster position="top-right" offset="80px" :duration="toastDuration" />
        </ClientOnly>
        <ClientOnly>
          <Navigation />
          <v-main v-show="show" class="v-main" app>
            <slot></slot>
          </v-main>
        </ClientOnly>
        <AnimatedGradiendButton v-if="!user?.is_operational" />
        <ClientOnly>
          <VersionBadge />
        </ClientOnly>
      </v-app>
    </v-layout>
  </div>
</template>
<style>
  .v-main {
    padding-left: v-bind(paddingLeft);
    position: relative;
  }

  @media (min-width: 920px) {
    .v-main {
      padding-left: v-bind(paddingLeft);
    }
  }
</style>
