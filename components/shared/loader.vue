<template>
    <Teleport to="body">
        <div id="loading-bg">
            <div class="loading-logo">
                <img src="/logo.png" height="50" alt="Logo" />
            </div>
            <div class="loading">
                <div class="effect-1 effects"></div>
                <div class="effect-2 effects"></div>
                <div class="effect-3 effects"></div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import {useLocalStorage} from "@vueuse/core";

const loaderColor = useLocalStorage('Materio-initial-loader-bg', '#FFFFFF')
const primaryColor = useLocalStorage('Materio-initial-loader-color', '#9155FD')

//--initial-loader-bg:#FFFFFF; --initial-loader-color:#9155FD;
useHead({
    htmlAttrs:{
        style: `--initial-loader-bg: ${loaderColor.value}; --initial-loader-color: ${primaryColor.value};`,
    }
})

</script>
