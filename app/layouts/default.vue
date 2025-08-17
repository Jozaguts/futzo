<template>
  <NuxtLoadingIndicator color="#9155FD" :height="6" />
  <div>
    <v-layout>
      <v-app app>
        <ClientOnly>
          <Toaster position="top-right" offset="80px" :duration="3000" />
        </ClientOnly>
        <ClientOnly>
          <Navigation />
          <v-main v-show="show" class="v-main" app>
            <slot></slot>
          </v-main>
        </ClientOnly>
      </v-app>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
  import Navigation from '~/components/layout/navigation-drawer.vue'
  import { Toaster } from 'vue-sonner'
  const show = ref(false)
  const { rail, isMobile } = storeToRefs(useGlobalStore())
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
<style>
  .v-main {
    padding-left: v-bind(paddingLeft);
    padding-bottom: 64px;
    position: relative;
  }

  @media (min-width: 920px) {
    .v-main {
      padding-left: v-bind(paddingLeft);
    }
  }
</style>
