<script setup lang="ts">

import SearchCountry from "~/components/authentication/components/SearchCountry.vue";

const props = defineProps({
  showForgotPassword: {
    type: Boolean,
    default: false,
  },
  isPhoneNumber: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
  stepActive: {
    type: Number,
    default: 1,
  }
})
const username = defineModel('username')
const emits = defineEmits(['update:showForgotPassword', 'areaCodeHandler'])
</script>
<template>
  <v-card
      v-if="showForgotPassword"
      class="pa-2"
      max-width="448"
      elevation="0"
      color="background"
  >
    <v-card-item class="justify-center text-center mb-2">
      <Logo width="165" class="mx-auto"/>
      <v-card-title class="text-black text-h5">Olvidaste tu contraseña?</v-card-title>
      <v-card-subtitle>No te preocupes, te enviaremos instrucciones para restablecerla</v-card-subtitle>
    </v-card-item>
    <v-card-text class="d-flex flex-column">
      <div class="mb-4">
        <label for="correo" class="input-label"
        >Teléfono o Correo electrónico *</label
        >
        <VTextField
            tabindex="2"
            class="fz-auth-form__input username"
            v-model="username"
            placeholder="tucorreo@futzo.io/+52 999 999 9999"
            density="compact"
        >
          <template #prepend v-if="isPhoneNumber">
            <transition-slide :duration="400" :offset="[-24, 0]">
              <SearchCountry
                  v-if="(username?.length ?? 0) > 1"
                  @update-area-code="emits('areaCodeHandler')"
              />
            </transition-slide>
          </template>
        </VTextField>
      </div>
      <div class="pl-2 mt-1" v-auto-animate="{ duration: 100 }">
        <small v-if="errors?.username" class="d-block text-error">{{
            errors?.username
          }}</small>
      </div>
      <v-btn block>Restablecer contraseña</v-btn>
      <v-btn class="my-2" variant="text" color="secondary" prepend-icon="mdi-arrow-left" @click="emits('update:showForgotPassword')">Regresar al login.</v-btn>
    </v-card-text>
    <div class="forgot-password-steps-container" :class="['step-' + stepActive]">
      <span class="step"></span>
      <span class="step"></span>
      <span class="step"></span>
      <span class="step"></span>
    </div>
  </v-card>
</template>
<style lang="sass">
.forgot-password-steps-container
  position: absolute
  width: 100%
  bottom: 0
  left: 50%
  transform: translateX(-50%)
  display: flex
  justify-content: center
  align-items: center

  .step
    width: calc(100% / 4)
    height: 8px
    background-color: #ccc
    border-radius: 4px
    margin: 0 5px


</style>

