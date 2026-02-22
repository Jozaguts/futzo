<script setup lang="ts">
import Navigation from '~/components/layout/navigation-drawer.vue'
import {Toaster} from 'vue-sonner'
import StripeElementsDrawer from '~/components/pages/configuration/plans/StripeElementsDrawer.vue'

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
  const { stripeDialog } = storeToRefs(useAuthStore())
const theme = useTheme()
const currentTheme = computed(() => theme.global.name.value)
</script>
<template>
  <div>
    <ClientOnly>
      <NuxtLoadingIndicator color="#9155FD" :height="6" />
    </ClientOnly>
    <v-layout>
      <v-app :theme="currentTheme" app>
        <ClientOnly>
          <Toaster position="top-right" offset="80px" :duration="toastDuration" />
        </ClientOnly>
        <ClientOnly>
          <Navigation />
          <v-main v-show="show" class="v-main" app>
            <slot></slot>
            <StripeElementsDrawer
              v-model:dialog="stripeDialog.open"
              :plan-sku="stripeDialog.sku"
              :plan-name="stripeDialog.name"
              :period="stripeDialog.period"
              @success="
                async () => {
                  await useSanctumAuth().refreshIdentity()
                }
              "
            />
          </v-main>
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
