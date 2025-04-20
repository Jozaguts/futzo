<script setup lang="ts">
import ForgotPasswordCard from "~/components/authentication/components/ForgotPasswordCard.vue";
import OtpCard from "~/components/authentication/components/OtpCad.vue";
import {useAuthStore} from "~/store";
import ResetPasswordCard from "~/components/authentication/components/ResetPasswordCard.vue";

const {forgotPasswordState} = storeToRefs(useAuthStore())
defineProps({
  showForgotPassword: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['backToLogin'])

</script>
<template>
  <v-card
      v-if="showForgotPassword"
      class="pa-2"
      max-width="100%"
      min-width="500"
      elevation="0"
      color="background"
  >
    <transition-expand :offset="[100, 200]" mode="out-in">
      <ForgotPasswordCard v-if="forgotPasswordState.step === 'reset-password'" @back-to-login="emits('backToLogin')"/>
      <OtpCard v-if="forgotPasswordState.step === 'verify-code'"/>
      <ResetPasswordCard v-if="forgotPasswordState.step === 'confirm-password'" @back-to-login="emits('backToLogin')"/>
    </transition-expand>
    <div class="forgot-password-steps-container">
      <span class="step" :class="forgotPasswordState.step === 'reset-password' ? 'bg-primary' :''"></span>
      <span class="step" :class="forgotPasswordState.step === 'verify-code' ? 'bg-primary' :''"></span>
      <span class="step" :class="forgotPasswordState.step === 'confirm-password' ? 'bg-primary' :''"></span>
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

.counter-container
  min-width: 1.5em
  width: 1.5em
  max-width: 100%
  text-align: center
</style>

