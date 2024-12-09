<script lang="ts" setup>
import AuthProvider from "~/components/authentication/AuthProvider.vue";
import { object, string } from "yup";

const {
  isLoading,
  form,
  errorMessage,
  showRegisterForm,
  showRegisterFormHandler,
  submitHandler,
} = useAuth();
const atLest8Characters = ref(false);
const containSpecialCharacter = ref(false);
const isPasswordVisible = ref(false);
const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const disabledButton = ref(true);
const phoneEmailErroMessage = ref("");
const prependInnerIcon = ref("mdi-account");
const prefix = ref("");

const validateIsEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

watch(
  form,
  async (value) => {
    if (value.password) {
      atLest8Characters.value = value.password.length >= 8;
      containSpecialCharacter.value = specialCharacters.test(value.password);
    }
    if (showRegisterForm.value) {
      disabledButton.value =
        !atLest8Characters.value || !containSpecialCharacter.value;
    } else {
      disabledButton.value =
        form.value.email === "" ||
        form.value.password === "" ||
        !validateIsEmail(form.value.email);
    }
    if (value.email) {
      const startsWithNumber = /^\d/.test(value.email);
      if (startsWithNumber) {
        prefix.value = "+";
        prependInnerIcon.value = "mdi-phone";
      } else {
        prependInnerIcon.value = "mdi-email";
      }
      await emailValidationMessage();
    } else {
      prependInnerIcon.value = "mdi-account";
      prefix.value = "";
      await emailValidationMessage();
    }
  },
  { deep: true },
);
const emailValidationMessage = async () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+\d{2}\d{10}$/;
  const schema = object().shape({
    input: string()
      .required("El campo es obligatorio.")
      .test(
        "is-email-or-phone",
        "Debe ser un correo electrónico o un número de teléfono válido.",
        (value) => {
          const validEmail = emailRegex.test(value);
          const validPhone = phoneRegex.test(value);
          if (validEmail) {
            prependInnerIcon.value = "mdi-email";
          } else if (validPhone) {
            prependInnerIcon.value = "mdi-phone";
          }
          return validEmail || validPhone;
        },
      ),
  });
  schema
    .validate({ input: form.value.email })
    .then(() => {
      phoneEmailErroMessage.value = "";
    })
    .catch((err) => {
      phoneEmailErroMessage.value = err.errors[0];
    });
};
onMounted(() => {
  const route = useRoute();
  if (route.query.email) {
    form.value.email = route.query.email as string;
  }
});
</script>
<template>
  <VCard class="pa-2" max-width="448" elevation="0" color="background">
    <VCardItem class="justify-center text-center">
      <Logo width="165" class="mx-auto" />
      <v-card-title class="text-black text-h4"
        >{{ showRegisterForm ? "Crea tu cuenta" : "Iniciar sesión" }}
      </v-card-title>
      <v-card-subtitle>Administra torneos y ligas fácilmente.</v-card-subtitle>
    </VCardItem>
    <VCardText>
      <VForm @submit.prevent="submitHandler" class="px-4">
        <VRow>
          <VCol cols="12" class="text-center mt-8">
            <AuthProvider />
          </VCol>
          <VCol cols="12" class="d-flex align-center">
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
            <label for="correo" class="text-caption"
              >Teléfono o Correo electrónico *</label
            >
            <VTextField
              :prefix="prefix"
              v-model.trim="form.email"
              placeholder="ingresa tu teléfono o correo electrónico "
              density="compact"
              :error-messages="phoneEmailErroMessage"
              hint="+52 222 222 2222 o ejemplo@correo.com"
              persistent-hint
              :prepend-inner-icon="prependInnerIcon"
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
              :append-inner-icon="
                isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>
          <VCol cols="12" v-auto-animate="{ duration: 600 }">
            <!-- remember me checkbox -->
            <div class="d-flex flex-column mb-4" v-if="showRegisterForm">
              <span>
                <Icon name="futzo-icon:check-circle"></Icon>
                Al menos 8 caracteres
              </span>
              <span>
                <Icon name="futzo-icon:check-circle"></Icon>
                Debe contener un carácter especial
              </span>
            </div>
            <!-- remember me checkbox -->
            <div
              v-else
              class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
            >
              <VCheckbox v-model="form.remember" label="Recuérdame" />

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
              {{ showRegisterForm ? "Empezar" : "Iniciar sesión" }}
            </VBtn>
          </VCol>
          <VCol class="d-flex align-content-center justify-start py-0">
            <small class="text-red pl-2 font-weight-bold" v-if="errorMessage">
              * {{ errorMessage }}
              <span>
                <nuxt-link
                  class="text-primary"
                  :to="'/verify-email?email=' + form.email"
                  >Verificar</nuxt-link
                >
              </span>
            </small>
          </VCol>
          <!-- create account -->
          <VCol cols="12" class="text-center text-base">
            <span>{{
              showRegisterForm ? "¿Ya tienes cuenta?" : "¿No tienes cuenta? "
            }}</span>
            <a
              href="#"
              class="text-primary ms-2"
              @click="showRegisterFormHandler"
            >
              {{ showRegisterForm ? "Iniciar sesión" : "Crea una cuenta" }}
            </a>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
