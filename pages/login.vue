<script setup lang="ts">
import AuthForm from "~/components/authentication/AuthForm.vue";

const loadingPage = ref(true);
definePageMeta({
  layout: "blank",
  bodyAttrs: {
    class: "d-none",
  },
});
// todo ya esta listo el login y el registro y arreglar la validacion del de registro, enviar mensae de confiramcion por sms o wahtsapp y correo
onMounted(() => {
  loadingPage.value = false;
});
</script>
<template>
  <v-container fluid class="fill-height py-0" v-if="!loadingPage">
    <v-row class="fill-height">
      <v-col cols="12" md="6" lg="6" class="d-flex justify-center align-center">
        <AuthForm />
      </v-col>
      <v-col
        class="d-none d-md-flex d-lg-flex bg-auth-section"
        md="6"
        lg="6"
      ></v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
@use "@/assets/scss/pages/page-auth.scss";
.bg-auth-section {
  background-image: url("~/assets/register-img.webp");
  background-size: cover;
  background-position: center;
}
</style>
