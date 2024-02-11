<template>
  <div class="auth-wrapper d-flex  align-center justify-center pa-4">
    <VCard
        class="auth-card pa-4 pt-7"
        max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Futzo
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Bienvenido a Futzo! 👋🏻
        </h5>
        <p class="mb-0">
          Por favor inicia sesion para continuar con la aventura
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="signInHandler()">
          <VRow v-auto-animate="{duration:600}">
            <!-- name -->
            <VCol cols="6" v-if="showRegisterForm">
              <VTextField
                  v-model="form.name"
                  label="Nombre"
                  type="text"
              />
            </VCol>
            <!-- lastname -->
            <VCol cols="6" v-if="showRegisterForm">
              <VTextField
                  v-model="form.lastname"
                  label="Apellidos"
                  type="text"
              />
            </VCol>
            <!-- email -->

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
                {{showRegisterForm ? 'Registrar' : 'Iniciar sesion'}}
              </VBtn>
            </VCol>
            <VCol class="d-flex align-content-center justify-start py-0">
              <small class="text-red pl-2 font-weight-bold" v-if="error"> * {{ error }}</small>
            </VCol>

            <!-- create account -->
            <VCol
                cols="12"
                class="text-center text-base"
            >
              <span>Nuevo en nuestra plataforma?</span>
              <a href="#"
                 class="text-primary ms-2"
                 @click="showRegisterFormHandler"
              >
                Crea una cuenta
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
        class="auth-footer-start-tree d-none d-md-block"
        :src="authV1Tree"
        :width="250"
    />

    <VImg
        :src="authV1Tree2"
        class="auth-footer-end-tree d-none d-md-block"
        :width="350"
    />

    <!-- bg img -->
    <VImg
        class="auth-footer-mask d-none d-md-block"
        :src="authThemeMask"
    />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import AuthProvider from '@/components/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
const { login } = useSanctumAuth();
definePageMeta({
  middleware: ['sanctum:guest'],
  layout: 'blank',
});
const [parent] = useAutoAnimate({ duration: 300 })
const form = ref({
  name: '',
  lastname: '',
  email: 'admin@sls.com',
  password: 'password',
  remember: false,
})
const showRegisterForm = ref(false)
const isPasswordVisible = ref(false)
const isLoading = ref(false)
const error = ref('')
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
      ? authV1MaskLight
      : authV1MaskDark
})
const signInHandler = async () => {
  try {
    error.value =  ''
    isLoading.value = true
    let response
    if (!showRegisterForm.value) {

      response = await login({
        email: form.value.email,
        password: form.value.password,
        remember: true,
      });
    } else {
       response  = await useNuxtApp().$api.auth.register(form.value)
    }
  }catch (e) {
    const error = useApiError(e);
    if (error.isValidationError) {
      // form.setErrors(error.bag);

      return;
    }
    console.error('Request failed not because of a validation', error);
  }finally {
    isLoading.value = false
  }
}
const showRegisterFormHandler = () => {
  error.value = ''
  showRegisterForm.value = !showRegisterForm.value
}

</script>
<style lang="scss">
@use "@/assets/scss/pages/page-auth.scss";
</style>
