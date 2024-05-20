<script lang="ts" setup>
import {useTheme} from "vuetify";
const logo = ref('/futzo/logos/horizontal/logo-12.png')

watch(useTheme().global.current, (value) => {
  value.dark ? logo.value = '/futzo/logos/horizontal/logo-14.png' : logo.value = '/futzo/logos/horizontal/logo-12.png'
}, {deep: true})
</script>
<template>
  <v-img :src="logo"></v-img>
</template>