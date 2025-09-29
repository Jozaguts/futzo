<script lang="ts" setup>
  import Breadcrumbs from '~/components/breadcrumbs.vue'
  import { useDisplay } from 'vuetify/framework'

  const { mobile } = useDisplay()
  const { extended = true } = defineProps<{ extended?: boolean }>()
</script>
<template>
  <v-app-bar
    color="white"
    :border="false"
    elevation="0"
    class="pt-2 pt-lg-0 pt-md-0"
    app
    :height="mobile ? 40 : 90"
    :extension-height="mobile && extended ? 55 : 0"
    :extended="extended"
  >
    <template #title>
      <breadcrumbs />
    </template>
    <template #append>
      <slot name="buttons"></slot>
    </template>
    <template #extension>
      <slot name="extension"></slot>
    </template>
  </v-app-bar>
</template>
