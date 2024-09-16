<script lang="ts" setup>
import Breadcrumbs from "~/components/breadcrumbs.vue";

const props = defineProps();
</script>
<template>
  <v-app-bar :border="false" elevation="0" density="compact" app>
    <template #title>
      <breadcrumbs />
    </template>
    <template #append>
      <slot name="buttons"> </slot>
      <!--      <ActionButtons />-->
    </template>
  </v-app-bar>
</template>
<style scoped>
header {
  padding-top: 40px;
}
</style>
