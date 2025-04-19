<script setup lang="ts">
import {ref} from "vue";
import ForgotPasswordCard from "~/components/authentication/components/ForgotPasswordCard.vue";
import OtpCard from "~/components/authentication/components/OtpCad.vue";
import {useAuthStore} from "~/store";

const {forgotPasswordState} = storeToRefs(useAuthStore())
defineProps({
  showForgotPassword: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Object,
    default: () => ({}),
  }
})
const emits = defineEmits(['update:showForgotPassword', 'areaCodeHandler'])
const stepActive = defineModel<number>('stepActive')
const isPhone = ref(false)
</script>
<template>
  <v-card
      v-if="showForgotPassword"
      class="pa-2"
      max-width="448"
      elevation="0"
      color="background"
  >
    <transition-expand :offset="[100, 200]" mode="out-in">
      <ForgotPasswordCard v-if="forgotPasswordState.step === 1"/>
      <OtpCard v-if="forgotPasswordState.step === 2"/>

      <!--      <div v-if="stepActive === 3">-->
      <!--        <v-card-item class="d-flex justify-center align-center">-->
      <!--          <v-card-title class="d-flex justify-center align-center">-->
      <!--            <div class="icon-container">-->
      <!--              <Icon name="mdi-password-outline" class="mx-auto envelop-icon"></Icon>-->
      <!--            </div>-->
      <!--          </v-card-title>-->
      <!--          <v-card-title class="text-center verify-card-title">-->
      <!--            Configura tu nueva contraseña-->
      <!--          </v-card-title>-->
      <!--        </v-card-item>-->
      <!--        <v-card-text>-->
      <!--          <div class="w-100 mx-auto">-->
      <!--            <v-col cols="12" class="pb-0">-->
      <!--              <label for="password" class="input-label">Contraseña*</label>-->
      <!--              <VTextField-->
      <!--                  tabindex="3"-->
      <!--                  class="fz-auth-form__input"-->
      <!--                  density="compact"-->
      <!--                  placeholder="Crea una contraseña"-->
      <!--                  v-model="password"-->
      <!--                  :type="showPassword ? 'text' : 'password'"-->
      <!--                  :append-inner-icon="-->
      <!--                showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'-->
      <!--              "-->
      <!--                  @click:append-inner="showPassword = !showPassword"-->
      <!--              />-->
      <!--              <div class="pl-2 mt-1" v-auto-animate="{ duration: 100 }">-->
      <!--                <small v-if="errors?.password" class="d-block text-error">{{-->
      <!--                    errors?.password-->
      <!--                  }}</small>-->
      <!--              </div>-->
      <!--            </v-col>-->
      <!--            <v-btn-->
      <!--                class="my-5"-->
      <!--                rounded="lg"-->
      <!--                :disabled="code.length < 4"-->
      <!--                size="large"-->
      <!--                block-->
      <!--                @click="verifyCode"-->
      <!--                :loading="fetching || fetching"-->
      <!--            >Restablecer contraseña-->
      <!--            </v-btn>-->
      <!--            <div-->
      <!--                class="d-flex justify-center align-center my-5 cursor-pointer"-->
      <!--                @click="$router.push('/login')"-->
      <!--            >-->
      <!--              <Icon name="futzo-icon:arrow-left" class="arrow-left mx-1"></Icon>-->
      <!--              <p class="text-body-1 font-weight-bold" @click="stepActive = 1">Regresar</p>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </v-card-text>-->
      <!--      </div>-->
    </transition-expand>
    <div class="forgot-password-steps-container" :class="['step-' + stepActive]">
      <span class="step" :class="stepActive === 1 ? 'bg-primary' :''"></span>
      <span class="step" :class="stepActive === 2 ? 'bg-primary' :''"></span>
      <span class="step" :class="stepActive === 3 ? 'bg-primary' :''"></span>
      <span class="step" :class="stepActive === 4 ? 'bg-primary' :''"></span>
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

