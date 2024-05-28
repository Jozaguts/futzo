<script lang="ts" setup>
import AuthProvider from "~/components/authentication/AuthProvider.vue";
const {
  isLoading,
  form,
  errorMessage,
  showRegisterForm,
  showRegisterFormHandler,
  submitHandler
} = useAuth()
const atLest8Characters = ref (false)
const containSpecialCharacter  = ref(false)
const isPasswordVisible = ref(false)
const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const disabledButton = ref(true)
const validateIsEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

watch(form, (value)=>{
  if (value.password){
    atLest8Characters.value = value.password.length >= 8
    containSpecialCharacter.value = specialCharacters.test(value.password)
  }
  if (showRegisterForm.value){
    disabledButton.value = !atLest8Characters.value || !containSpecialCharacter.value
  }else {
    disabledButton.value = form.value.email === '' || form.value.password === '' || !validateIsEmail(form.value.email)
  }
},{deep: true})
</script>
<template>
  <VCard
      class=" pa-2"
      max-width="448"
      elevation="0"
      color="background"
  >
    <VCardItem class="justify-center text-center">
      <Logo width="165" class="mx-auto"/>
      <v-card-title class="text-black text-h4">{{showRegisterForm ? 'Crea tu cuenta' : 'Iniciar sesión'}}</v-card-title>
      <v-card-subtitle >Administra torneos y ligas fácilmente.</v-card-subtitle>
    </VCardItem>
    <VCardText>
      <VForm @submit.prevent="submitHandler" class="px-4">
        <VRow>
          <VCol
              cols="12"
              class="text-center mt-8"
          >
            <AuthProvider />
          </VCol>
          <VCol
              cols="12"
              class="d-flex align-center"
          >
            <VDivider />
            <span class="mx-4">o</span>
            <VDivider />
          </VCol>
          <transition
              enter-active-class="scale-up-vertical-top-enter-active"
              leave-active-class="scale-down-vertical-center-leave-active"
              mode="out-in"
          >
            <VCol key="name" cols="12" v-if="showRegisterForm">
              <label for="nombre" class="text-caption">Nombre*</label>
              <VTextField
                  v-model="form.name"
                  type="text"
                  placeholder="Escribe tu nombre"
                  density="compact"
              />
            </VCol>
          </transition>
          <VCol cols="12">
            <label for="correo" class="text-caption">Correo electrónico*</label>
            <VTextField
                v-model="form.email"
                type="email"
                placeholder="Tu correo@futzo.io"
                density="compact"
            />
          </VCol>
          <!-- password -->
          <VCol cols="12">
            <label for="password" class="text-caption">Contraseña*</label>
            <VTextField
                density="compact"
                placeholder="Crea una contraseña"
                v-model="form.password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>
          <VCol cols="12" v-auto-animate="{duration:600}">
            <!-- remember me checkbox -->
            <div class="d-flex flex-column mb-4" v-if="showRegisterForm" >
             <span>
                <Icon name="icon-park-solid:check-one"
                      :color="atLest8Characters ? '#9155FD' : '#DDCAFE'"
                      size="20"
                      class="my-1 mr-1"
                />
               Al menos 8 caracteres
             </span>
            <span>
                 <Icon name="icon-park-solid:check-one"
                       size="20"
                       :color="containSpecialCharacter ? '#9155FD' : '#DDCAFE'"
                       color="#DDCAFE"
                       class="my-1 mr-1"
                 />
                Debe contener un carácter especial
              </span>

            </div>
            <!-- remember me checkbox -->
            <div v-else class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
              <VCheckbox
                  v-model="form.remember"
                  label="Recuérdame"
              />

              <nuxt-link
                  class="text-primary ms-2 mb-1"
                  href="javascript:void(0)"

              >
                ¿Olvidaste tu contraseña?
              </nuxt-link>
            </div>

            <!-- login button -->
            <VBtn
                block
                type="submit"
                size="40"
                :loading="isLoading"
                :disabled="isLoading || disabledButton"
                class="text-capitalize"
            >
              {{showRegisterForm ? 'Empezar' : 'Iniciar sesión'}}
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
            <span >{{ showRegisterForm ? '¿Ya tienes cuenta?' : '¿No tienes cuenta? '}}</span>
            <a href="#"
               class="text-primary ms-2"
               @click="showRegisterFormHandler"
            >
               {{showRegisterForm ? 'Iniciar sesión' : 'Crea una cuenta' }}
            </a>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>