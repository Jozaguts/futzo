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
const { login } = useSanctumAuth();
const loadingPage = ref(true)
definePageMeta({
  middleware: ['sanctum:guest'],
  layout: 'blank',
  bodyAttrs: {
    class: 'd-none'
  }
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
       // todo handler register
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
onMounted(() => {
  loadingPage.value = false

})
</script>
<style lang="scss">
@use "@/assets/scss/pages/page-auth.scss";
</style>
