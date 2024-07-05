<script lang="ts" setup>
import Breadcrumbs from "~/components/breadcrumbs.vue";
import ActionButtons from "~/components/ActionButtons.vue";
</script>
<template>
  <v-app-bar color="white"  :border="false" elevation="0" height="85" app>
    <template #title>
      <breadcrumbs />
    </template>
    <template #append>
     <ActionButtons />
    </template>
  </v-app-bar>
</template>