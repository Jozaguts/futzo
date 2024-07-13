<script lang="ts" setup>
import {useTheme} from "vuetify";
const logo = ref(
    useTheme().global.current.value.dark
        ? '/futzo/logos/circular/logo-24.png'
        : '/futzo/logos/circular/logo-22.png'
)

watch(useTheme().global.current, (value) => {
  value.dark ? logo.value = '/futzo/logos/circular/logo-24.png' : logo.value = '/futzo/logos/circular/logo-22.png'
}, {deep: true})
</script>
<template>
  <v-img :src="logo" width="50" height="50"></v-img>
</template>