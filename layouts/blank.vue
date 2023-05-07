<template>
    <v-app class="layout-wrapper layout-nav-type-vertical">
        <shared-loader v-if="isLoading"/>
        <v-main v-else class="layout-wrapper layout-blank">
            <slot />
        </v-main>
    </v-app>
</template>
<script setup lang="ts">
const isLoading = ref(true)
onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
})
</script>
<style>
.layout-wrapper.layout-blank {
    flex-direction: column;
}
</style>
