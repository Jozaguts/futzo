<script lang="ts" setup>
import authV1MaskLight from "assets/images/pages/auth-v1-mask-light.png";
import authV1MaskDark from "assets/images/pages/auth-v1-mask-dark.png";
import {useTheme} from "vuetify";
const authThemeMask = computed(() => {
  return useTheme().global.name.value === 'light'
      ? authV1MaskLight
      : authV1MaskDark
}) as string
</script>
<template>
  <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
  />
</template>
