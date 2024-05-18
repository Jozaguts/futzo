
<script setup lang="ts">
import AuthForm from '~/components/authentication/AuthForm.vue'
import MaskPage from "~/components/authentication/MaskPage.vue";
const loadingPage = ref(true)
definePageMeta({
  middleware: ['sanctum:guest'],
  layout: 'blank',
  bodyAttrs: {
    class: 'd-none'
  }
});
// todo ya esta listo el login y el registro y arreglar la validacion del de registro, enviar mensae de confiramcion por sms o wahtsapp y correo
onMounted(() => {
  loadingPage.value = false
})
</script>
<template>
  <v-container fluid class="pa-0 w-100">
    <v-row no-gutters>
      <v-col cols="12" class="auth-wrapper d-flex  align-center justify-center pa-4" v-if="!loadingPage">
        <AuthForm />
      </v-col>
    </v-row>
    <MaskPage />
  </v-container>
</template>
<style lang="scss">
@use "@/assets/scss/pages/page-auth.scss";
</style>