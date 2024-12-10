<script lang="ts" setup>
import AuthProvider from "~/components/authentication/AuthProvider.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const {
  isLoading,
  form,
  errorMessage,
  showRegisterForm,
  showRegisterFormHandler,
  submitHandler,
} = useAuth();
const isPasswordVisible = ref(false);
const prependInnerIcon = ref("mdi-account");
const prefix = ref("");
const { fields, meta } = useSchemas("signup");
onMounted(() => {
  const route = useRoute();
  if (route.query.email) {
    form.value.email = route.query.email as string;
  }
});

const vMaskInput = {
  beforeMount: (el, binding) => {
    el.addEventListener("input", (e) => {
      if (binding.value === "phone") {
        let cleaned = e.target.value.replace(/\D/g, "");
        const match = cleaned.match(/^(\d{1,2})(\d{1,3})?(\d{1,3})?(\d{1,4})?/);
        if (!match) return;
        const [, group1, group2, group3, group4] = match;
        e.target.value = [group1, group2, group3, group4]
          .filter(Boolean)
          .join(" ");
        el.dispatchEvent(new Event("input"));
      }
    });
  },
};
watch(showRegisterForm, () => {
  fields.isSignup.fieldValue = showRegisterForm.value;
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
          <v-expand-transition>
            <VCol key="name" cols="12" v-if="showRegisterForm">
              <label for="nombre" class="text-caption">Nombre*</label>
              <VTextField
                v-model="fields.name.fieldValue"
                v-bind="fields.name.fieldPropsValue"
                type="text"
                placeholder="Escribe tu nombre"
                density="compact"
              />
            </VCol>
          </v-expand-transition>
          <VCol cols="12">
            <label for="correo" class="text-caption"
              >Teléfono o Correo electrónico *</label
            >
            <VTextField
              v-mask-input="'phone'"
              :prefix="prefix"
              v-model="fields.username.fieldValue"
              placeholder="ingresa tu teléfono o correo electrónico "
              density="compact"
              hint="+52 222 222 2222 o ejemplo@correo.com"
              persistent-hint
              :prepend-inner-icon="prependInnerIcon"
            >
              <template #message="{ message }">
                <span
                  v-if="
                    !fields.username.fieldPropsValue['error-messages'].length
                  "
                  class="d-block"
                  >{{ message }}
                </span>

                <span v-else class="d-block text-error">{{
                  fields.username.fieldPropsValue["error-messages"][0]
                }}</span>
              </template>
            </VTextField>
          </VCol>
          <!-- password -->
          <VCol cols="12">
            <label for="password" class="text-caption">Contraseña*</label>
            <VTextField
              density="compact"
              placeholder="Crea una contraseña"
              v-model="fields.password.fieldValue"
              v-bind="fields.password.fieldPropsValue"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="
                isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>
          <VCol cols="12">
            <v-expand-transition>
              <!-- remember me checkbox -->
              <div class="d-flex flex-column mb-4" v-if="showRegisterForm">
                <span>
                  <Icon
                    :name="
                      fields?.password?.fieldValue?.length < 7
                        ? 'futzo-icon:check-circle'
                        : 'futzo-icon:check-icon'
                    "
                    class="text-primary"
                  ></Icon>
                  Al menos 8 caracteres
                </span>
                <span>
                  <Icon
                    :name="
                      fields?.password?.fieldPropsValue['error-messages']
                        ?.length
                        ? 'futzo-icon:check-circle'
                        : 'futzo-icon:check-icon'
                    "
                  ></Icon>
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
            </v-expand-transition>

            <!-- login button -->
            <VBtn
              block
              type="submit"
              size="40"
              :loading="isLoading"
              :disabled="isLoading || !meta.valid"
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
