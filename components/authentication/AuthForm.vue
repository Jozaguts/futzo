<script lang="ts" setup>
import AuthProvider from '~/components/authentication/AuthProvider.vue'
import {ref} from 'vue'
import SearchCountry from '~/components/authentication/components/SearchCountry.vue'
import ErrorMessages from '~/components/authentication/components/ErrorMessages.vue'
import PasswordRules from "~/components/authentication/components/PasswordRules.vue";

const {
  name,
  password,
  username,
  isLoading,
  remember,
  errors,
  meta,
  errorMessage,
  showRegisterForm,
  areaCode,
  isSignUp,
  showRegisterFormHandler,
  submitHandler,
} = useAuth()
const showPassword = ref(false)
const title = computed(() =>
    showRegisterForm.value ? 'Crea tu cuenta' : 'Iniciar sesión'
)
const isPhoneNumber = computed(() => {
  return (
      (username.value?.length ?? 0) > 0 && /^\d/.test(username.value as string)
  )
})
const areaCodeHandler = (code: string) => {
  areaCode.value = code
}
const terms = ref(false)
const isDisabled = computed(() => {
  if (isSignUp.value) {
    return isLoading.value || !meta.value.valid || !terms.value
  } else {
    return isLoading.value || !meta.value.valid
  }
})
</script>

<template>
  <v-card class="pa-2" max-width="448" elevation="0" color="background">
    <v-card-item class="justify-center text-center">
      <Logo width="165" class="mx-auto"/>
      <v-card-title class="text-black text-h4">{{ title }}</v-card-title>
      <v-card-subtitle>Administra torneos y ligas fácilmente.</v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-form @submit.prevent="submitHandler" class="px-4">
        <v-row>
          <v-col cols="12" class="text-center mt-8 pb-0">
            <AuthProvider/>
          </v-col>
          <v-col cols="12" class="d-flex align-center">
            <VDivider/>
            <span class="mx-4 separator-text">o</span>
            <VDivider/>
          </v-col>
          <v-expand-transition>
            <v-col key="name" cols="12" v-if="showRegisterForm" class="pb-0">
              <label for="nombre" class="input-label">Nombre*</label>
              <VTextField
                  tabindex="1"
                  class="fz-auth-form__input"
                  v-model="name"
                  placeholder="Escribe tu nombre"
                  density="compact"
              />
              <div class="pl-2 mt-1" v-auto-animate="{ duration: 100 }">
                <small v-if="errors?.name" class="d-block text-error">{{
                    errors?.name
                  }}</small>
              </div>
            </v-col>
          </v-expand-transition>
          <v-col cols="12" class="pb-0">
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
                      @update-area-code="areaCodeHandler"
                  />
                </transition-slide>
              </template>
            </VTextField>
            <div class="pl-2 mt-1" v-auto-animate="{ duration: 100 }">
              <small v-if="errors?.username" class="d-block text-error">{{
                  errors?.username
                }}</small>
            </div>
          </v-col>
          <!-- password -->
          <v-col cols="12" class="pb-0">
            <label for="password" class="input-label">Contraseña*</label>
            <VTextField
                tabindex="3"
                class="fz-auth-form__input"
                density="compact"
                placeholder="Crea una contraseña"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="
                showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
                @click:append-inner="showPassword = !showPassword"
            />
            <div class="pl-2 mt-1" v-auto-animate="{ duration: 100 }">
              <small v-if="errors?.password" class="d-block text-error">{{
                  errors?.password
                }}</small>
            </div>
          </v-col>
          <v-col cols="12" class="pb-0">

            <div
                v-if="!showRegisterForm"
                class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
            >
              <VCheckbox v-model="remember" label="Recuérdame"/>
              <span class="forgot-password"> ¿Olvidaste tu contraseña? </span>
            </div>
            <div
                class="d-flex align-center justify-space-between flex-wrap"
                v-auto-animate="{ duration: 100 }"
            >
              <v-checkbox v-if="isSignUp" v-model="terms">
                <template #label
                ><span class="text-caption">
                    Entiendo que recibiré un código de verificación por WhatsApp <Icon
                    name="logos:whatsapp-icon"
                ></Icon> si uso mi número o por correo si elijo esa opción.

                  </span>
                </template>
              </v-checkbox>
            </div>
            <!--                                             login button-->
            <v-btn
                block
                tabindex="4"
                type="submit"
                size="40"
                :loading="isLoading"
                :disabled="isDisabled"
                class="text-capitalize"
            >
              {{ showRegisterForm ? 'Empezar' : 'Iniciar sesión' }}
            </v-btn>
            <v-expand-transition>
              <PasswordRules
                  v-model:model-value="password"
                  :show="showRegisterForm"
              />
            </v-expand-transition>
            <div
                class="text-caption text-secondary text-justify mt-2 ml-1"
                v-auto-animate="{ duration: 100 }"
            >
              <p v-if="showRegisterForm">
                Al crear una cuenta en Futzo aceptas los
                <span
                    class="text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                    @click="$router.push({ name: 'terminos-de-servicio' })"
                >Términos de Servicio</span
                >
                y
                <span
                    @click="$router.push({ name: 'politica-de-privacidad' })"
                    class="text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                >Políticas de privacidad.</span
                >
              </p>
            </div>
          </v-col>
          <ErrorMessages
              v-model:errors="errorMessage"
              :username="username"
              :area-code="areaCode"
          />
          <!--                     create account -->
          <v-col cols="12" class="text-center text-base pb-0">
            <span>{{
                showRegisterForm ? '¿Ya tienes cuenta?' : '¿No tienes cuenta? '
              }}</span>
            <a
                tabindex="5"
                href="#"
                class="text-primary ms-2"
                @click="showRegisterFormHandler"
            >
              {{ showRegisterForm ? 'Iniciar sesión' : 'Crea una cuenta' }}
            </a>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
