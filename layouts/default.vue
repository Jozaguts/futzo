<template>
<div>
    <v-app class="layout-wrapper layout-nav-type-vertical">
        <v-app-bar app></v-app-bar>
        <v-navigation-drawer app>
            <v-btn @click="$router.push('/login')"> login</v-btn>
            <v-btn @click="$router.push('/')"> home</v-btn>
           <v-btn  @click.prevent="useNuxtApp().$api.auth.logout()">logout</v-btn>
        </v-navigation-drawer>
        <v-main app>
            default layout
            <slot />
        </v-main>
        <v-footer app>
           <v-btn to="/legales">legales</v-btn>
        </v-footer>
    </v-app>
</div>
</template>
<script setup lang="ts">



</script>
<style lang="scss">
@use "src/@layouts/styles/default-layout";
</style>

