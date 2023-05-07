<template>
<div>
    <shared-loader v-if="useGlobalStore().isLoading"/>
    <v-app v-else class="layout-wrapper layout-nav-type-vertical">
        <v-app-bar ></v-app-bar>
        <v-navigation-drawer >
            <v-btn @click="$router.push('/login')"> login</v-btn>
            <v-btn @click="$router.push('/')"> home</v-btn>
           <v-btn   @click="useNuxtApp().$api.auth.logout()">logout</v-btn>
        </v-navigation-drawer>
        <v-main>
            default layout
            <slot />
        </v-main>
        <v-footer>
            footer
        </v-footer>
    </v-app>
</div>
</template>
<script setup lang="ts">
import { useGlobalStore } from "~/store";
useGlobalStore().$state.isLoading = true
onMounted(() => {
    useGlobalStore().$state.isLoading = false
})
</script>
<style lang="scss">
@use "src/@layouts/styles/default-layout";
</style>

