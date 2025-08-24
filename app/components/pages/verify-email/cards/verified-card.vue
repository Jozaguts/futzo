<script setup lang="ts">
  const isHydrated = ref(true)
  onMounted(() => (isHydrated.value = false))
</script>
<template>
  <div
    v-if="isHydrated"
    style="
      max-height: 550px;
      max-width: 540px;
      width: 100%;
      padding: 40px;
      border-radius: 24px;
      background-color: white;
    "
  >
    <v-skeleton-loader width="56" height="56" type="avatar" style="margin: 0 auto" />
    <v-skeleton-loader width="300" type="heading" style="margin: 0 auto" />
    <v-skeleton-loader type="sentences" />
    <v-skeleton-loader type="button" style="margin: 0 auto" />
    <v-skeleton-loader type="text" />
  </div>
  <v-card v-else width="100%" max-width="540" max-height="550" class="verify-card">
    <div class="d-flex justify-center align-center"></div>
    <v-card-item class="d-flex justify-center align-center">
      <v-card-title class="d-flex justify-center align-center">
        <div class="icon-container">
          <Icon name="futzo-icon:check-circle" class="mx-auto envelop-icon" size="32"></Icon>
        </div>
      </v-card-title>
      <v-card-title class="text-center verify-card-title"> Correo verificado </v-card-title>
      <v-card-subtitle class="text-center verify-card-subtitle">
        Gracias por confirmar tu correo, ahora puedes <br />
        iniciar sesión con tu correo y contraseña.
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="my-5">
      <div class="w-75 mx-auto my-5">
        <v-btn class="my-5" rounded="lg" size="large" block @click="$emit('event', { action: 'email-verified' })">
          Crea tu liga
        </v-btn>
        <div
          class="d-flex justify-center align-center my-5 cursor-pointer"
          @click="$router.push({ name: 'bienvenido' })"
        >
          <Icon name="futzo-icon:arrow-left" class="arrow-left mx-1"></Icon>
          <p class="text-body-1 font-weight-bold">Regresar</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
