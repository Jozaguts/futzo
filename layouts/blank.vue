<template>
  <v-app app>
    <ClientOnly>
      <VSonner position="top-right"  />
    </ClientOnly>
      <slot></slot>
    <v-footer v-if="useGlobalStore().showFooter" absolute app style="max-width: 50%" color="background">
     {{new Date().getFullYear()}} &copy; Futzo
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import {VSonner} from "vuetify-sonner";
import {useGlobalStore} from "~/store";
</script>
