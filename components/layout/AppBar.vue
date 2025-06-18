<script lang="ts" setup>
import Breadcrumbs from "~/components/breadcrumbs.vue";
import {storeToRefs} from "pinia";
import {useGlobalStore} from "~/store";
import {useDisplay} from "vuetify/framework";

const {drawer} = storeToRefs(useGlobalStore());
const {mobile} = useDisplay();
</script>
<template>
  <v-app-bar color="white" :border="false" elevation="0" app height="90">
    <template #prepend>
      <v-app-bar-nav-icon v-if="mobile" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <template #title>
      <breadcrumbs/>
    </template>
    <template #append>
      <slot name="buttons"></slot>
    </template>
  </v-app-bar>
</template>
