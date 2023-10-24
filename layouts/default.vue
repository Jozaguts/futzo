<template>
  <client-only>
    <v-app>
        <DefaultLayoutWithVerticalNav>
         <slot/>
        </DefaultLayoutWithVerticalNav>
    </v-app>
  </client-only>
</template>

<script setup lang="ts">
import { useGlobalStore } from "~/store";
import DefaultLayoutWithVerticalNav from "~/layouts/components/defaultLayoutWithVerticalNav.vue";
</script>
<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
