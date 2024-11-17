<script setup lang="ts"></script>
<template>
  <v-card width="100%" max-width="540" max-height="550" class="verify-card">
    <div class="d-flex justify-center align-center"></div>
    <v-card-item class="d-flex justify-center align-center">
      <v-card-title class="d-flex justify-center align-center">
        <div class="icon-container">
          <Icon
            name="futzo-icon:check-circle"
            class="mx-auto envelop-icon"
          ></Icon>
        </div>
      </v-card-title>
      <v-card-title class="text-center verify-card-title">
        Correo verificado
      </v-card-title>
      <v-card-subtitle class="text-center verify-card-subtitle">
        Gracias por confirmar tu correo, ahora puedes <br />
        iniciar sesión con tu correo y contraseña.
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="my-5">
      <div class="w-75 mx-auto my-5">
        <v-btn
          class="my-5"
          rounded="lg"
          size="large"
          block
          @click="$emit('event', { action: 'email-verified' })"
        >
          Continuar
        </v-btn>
        <div
          class="d-flex justify-center align-center my-5 cursor-pointer"
          @click="$router.push('/login')"
        >
          <Icon name="futzo-icon:arrow-left" class="arrow-left mx-1"></Icon>
          <p class="text-body-1 font-weight-bold">Regresar a registrarme</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
