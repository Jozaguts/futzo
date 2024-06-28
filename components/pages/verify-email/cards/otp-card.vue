<script setup lang="ts">
const code = ref('')
const email = useRoute().query.email ?? ''
</script>
<template>
  <v-card
      width="100%"
      max-width="540"
      max-height="550"
      class="verify-card"
  >
    <v-card-item class="d-flex justify-center align-center">
      <v-card-title class="d-flex justify-center align-center">
       <div class="icon-container">
         <nuxt-icon  name="inbox-02" filled class="mx-auto envelop-icon"></nuxt-icon>
       </div>
      </v-card-title>
      <v-card-title class="text-center verify-card-title">
        Revisa tu correo
      </v-card-title>
      <v-card-subtitle class="text-center verify-card-subtitle">
        Te enviamos un correo de verificación al <br> correo <strong class="font-weight-bold text-black">{{email}}</strong>.
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <div class="w-75 mx-auto">
        <v-otp-input
            v-model="code"
            placeholder="0"
            length="4"
            width="356px"
            min-height="80px"

        ></v-otp-input>
        <v-btn class="my-5" rounded="lg" :disabled="code.length < 4" size="large" block  @click="$emit('event',{action: 'verify-email', code})">Verificar correo</v-btn>
        <div
            class="verify-card-options-container"
        >
          <p class="verify-card-didnt-get-email" >¿No recibiste el correo?</p> <v-btn variant="text" class="mx-0 px-0">Reenviar</v-btn>
        </div>
        <div
            class="d-flex justify-center align-center my-5 cursor-pointer"
            @click="$router.push('/login')"
        >
          <nuxt-icon name="arrow-left" filled class="arrow-left mx-1"></nuxt-icon>
          <p class="text-body-1 font-weight-bold" >Regresar a registrarme</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>