<template>
<div id="app-layout">
    <v-app class="layout-wrapper layout-nav-type-vertical">
      <VAlert
          v-if="!!errorMessage"
          :color="colorErrorMessage"
      >
        {{errorMessage}}
      </VAlert>
        <v-app-bar app v-if="useAuthStore().isLogged"></v-app-bar>
        <v-navigation-drawer app v-if="useAuthStore().isLogged">
            <v-btn @click="$router.push('/login')"> login</v-btn>
            <v-btn @click="$router.push('/')"> home</v-btn>
           <v-btn  @click.prevent="useNuxtApp().$api.auth.logout()">logout</v-btn>
        </v-navigation-drawer>
        <v-main
            :style="[loginClasses]"
            app
        >
          <slot />
        </v-main>
        <v-footer
            v-if="useAuthStore().isLogged"
            :app="true">
           <v-btn to="/legales">legales</v-btn>
        </v-footer>
    </v-app>
</div>
</template>
<script setup lang="ts">
import {useAuthStore,useGlobalStore} from "~/store";

const errorMessage = computed(()=>{
  return useGlobalStore().computedError.value.message
})
const colorErrorMessage = computed(()=>{
  return useGlobalStore().computedError.value.color
})
const loginClasses = computed(()=>{
  return useRoute().name === 'login' ? 'flex-direction: column' : ''
})
</script>
<style lang="scss">
@use "src/@layouts/styles/default-layout";
</style>

