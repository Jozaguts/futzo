<template>
    <v-app class="layout-wrapper layout-nav-type-vertical">
        <shared-loader v-if="useGlobalStore().isLoading"/>
        <v-main class="layout-wrapper layout-blank" v-else>
            <slot />
        </v-main>
    </v-app>
</template>
<script setup lang="ts" >
import { useGlobalStore } from "~/store";

onMounted(() => {
    useGlobalStore().isLoading = false
})
</script>
<style>
.layout-wrapper.layout-blank {
    flex-direction: column;
}
</style>
