<script lang="ts" setup>
import Breadcrumbs from "~/components/breadcrumbs.vue";

const props = defineProps();
</script>
<template>
  <v-app-bar color="white" :border="false" elevation="0" app height="90">
    <template #title>
      <breadcrumbs />
    </template>
    <template #append>
      <slot name="buttons"> </slot>
    </template>
  </v-app-bar>
</template>
