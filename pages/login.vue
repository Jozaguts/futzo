<template>
  <v-container fluid class="pa-0 w-100">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="auth-wrapper d-flex  align-center justify-center pa-4" v-if="!loadingPage">
          <VCard
              class="auth-card pa-4 pt-7"
              max-width="448"
          >
            <VCardItem class="justify-center">
              <v-img width="200" max-width="200" src="/futzo/logos/horizontal/logo-14.png"></v-img>
            </VCardItem>

            <VCardText class="pt-2">
              <h5 class="text-h4 font-weight-semibold mb-1">
               Iniciar sesión
              </h5>

            </VCardText>

            <VCardText>
              <VForm @submit.prevent="signInHandler()">
                <VRow>
                  <transition
                      enter-active-class="scale-up-vertical-top-enter-active"
                      leave-active-class="scale-down-vertical-center-leave-active"
                     mode="out-in"
                  >
                    <VCol key="name" cols="6" v-if="showRegisterForm">
                      <VTextField
                          v-model="form.name"
                          label="Nombre"
                          type="text"
                      />
                    </VCol>
                  </transition>
                  <transition
                      enter-active-class="scale-up-vertical-top-enter-active"
                      leave-active-class="scale-down-vertical-center-leave-active"
                     mode="out-in"
                  >
                    <!-- lastname -->
                    <VCol  key="lastname" cols="6" v-if="showRegisterForm">
                      <VTextField
                          v-model="form.lastname"
                          label="Apellidos"
                          type="text"
                      />
                    </VCol>
                  </transition>
                  <VCol cols="12">
                    <VTextField
                        v-model="form.email"
                        label="Correo electronico"
                        type="email"
                    />
                  </VCol>
                  <!-- password -->
                  <VCol cols="12">
                    <VTextField
                        v-model="form.password"
                        label="Contraseña"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                        @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                  <transition
                      enter-active-class="scale-up-vertical-top-enter-active"
                      leave-active-class="scale-down-vertical-center-leave-active"
                      mode="out-in"
                  >
                    <VCol key="password_confirmation" cols="12" v-if="showRegisterForm">
                      <VTextField
                          v-model="form.password_confirmation"
                          label="Confirmar contraseña"
                          :type="isPasswordVisible ? 'text' : 'password'"
                          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                          @click:append-inner="isPasswordVisible = !isPasswordVisible"
                      />
                    </VCol>
                  </transition>
                  <VCol cols="12">
                    <!-- remember me checkbox -->
                    <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4" v-auto-animate="{duration:600}">
                      <VCheckbox
                          v-model="form.remember"
                          label="Recuerdame"
                      />

                      <a
                          class="ms-2 mb-1"
                          href="javascript:void(0)"
                      >
                        Olvidaste tu contraseña ?
                      </a>
                    </div>

                    <!-- login button -->
                    <VBtn
                        block
                        type="submit"
                        :loading="isLoading"
                        :disabled="isLoading"
                    >
                      {{showRegisterForm ? 'Registrar' : 'Iniciar sesión'}}
                    </VBtn>
                  </VCol>
                  <VCol class="d-flex align-content-center justify-start py-0">
                    <small class="text-red pl-2 font-weight-bold" v-if="errorMessage"> * {{ errorMessage }}</small>
                  </VCol>
                  <!-- create account -->
                  <VCol
                      cols="12"
                      class="text-center text-base"
                  >
                    <span v-if="!showRegisterForm">Nuevo en nuestra plataforma?</span>
                    <a href="#"
                       class="text-primary ms-2"
                       @click="showRegisterFormHandler"
                    >
                      {{showRegisterForm ? 'Iniciar sesión' : 'Crea una cuenta' }}
                    </a>
                  </VCol>
                  <VCol
                      cols="12"
                      class="d-flex align-center"
                  >
                    <VDivider />
                    <span class="mx-4">o</span>
                    <VDivider />
                  </VCol>

                  <!-- auth providers -->
                  <VCol
                      cols="12"
                      class="text-center"
                  >
                    <AuthProvider />
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCard>
          <VImg
              class="auth-footer-mask d-none d-md-block"
              :src="authThemeMask"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import AuthProvider from '@/components/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import {FetchError} from "ofetch";
const loadingPage = ref(true)
definePageMeta({
  middleware: ['sanctum:guest'],
  layout: 'blank',
  bodyAttrs: {
    class: 'd-none'
  }
});
const form = ref({
  name: 'test',
  lastname: 'test',
  email: 'test@test.com',
  password: 'password',
  password_confirmation: 'password',
  remember: false,
})
const showRegisterForm = ref(false)
const isPasswordVisible = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
      ? authV1MaskLight
      : authV1MaskDark
}) as string
const {
  signIn,
  signUp,
} = useAuth()
const signInHandler = async () => {
  try {
    errorMessage.value =  ''
    isLoading.value = true
    if (!showRegisterForm.value) {
      await signIn(form.value.email, form.value.password, true)
    } else {
    const response =   await signUp(  form.value.name, form.value.lastname, form.value.email, form.value.password, form.value.password_confirmation);
      if (response.data.value.message === 'register successful') {
        await signIn(form.value.email, form.value.password, true);
      } else {
        errorMessage.value = response.data.value.message
      }
    }
  }catch (error: FetchError) {
      const {code, message} = useApiError(error);
      errorMessage.value = message
  }finally {
    isLoading.value = false
  }
}
const showRegisterFormHandler = () => {
  errorMessage.value = ''
  showRegisterForm.value = !showRegisterForm.value
}
onMounted(() => {
  loadingPage.value = false
})
</script>
<style lang="scss">
@use "@/assets/scss/pages/page-auth.scss";
</style>
