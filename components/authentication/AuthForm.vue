<script lang="ts" setup>
import AuthProvider from "~/components/authentication/AuthProvider.vue";
import {ref} from "vue";
import PasswordRules from "~/components/authentication/components/password-rules.vue";
import SearchCountry from "~/components/authentication/components/SearchCountry.vue";

const {
    name,
    password,
    username,
    terms,
    isLoading,
    remember,
    errors,
    meta,
    errorMessage,
    showRegisterForm,
    areaCode,
    showRegisterFormHandler,
    submitHandler,
} = useAuth();
const showPassword = ref(false);
const title = computed(() =>
    showRegisterForm.value ? "Crea tu cuenta" : "Iniciar sesión",
);
const isPhoneNumber = computed(() => {
    return (
        (username.value?.length ?? 0) > 0 && /^\d/.test(username.value as string)
    );
});
const areaCodeHandler = (code: string) => {
    areaCode.value = code;
};
</script>

<template>
    <VCard class="pa-2" max-width="448" elevation="0" color="background">
        <VCardItem class="justify-center text-center">
            <Logo width="165" class="mx-auto"/>
            <v-card-title class="text-black text-h4">{{ title }}</v-card-title>
            <v-card-subtitle>Administra torneos y ligas fácilmente.</v-card-subtitle>
        </VCardItem>
        <VCardText>
            <VForm @submit.prevent="submitHandler" class="px-4">
                <VRow>
                    <VCol cols="12" class="text-center mt-8 pb-0">
                        <AuthProvider/>
                    </VCol>
                    <VCol cols="12" class="d-flex align-center">
                        <VDivider/>
                        <span class="mx-4 separator-text">o</span>
                        <VDivider/>
                    </VCol>
                    <v-expand-transition>
                        <VCol key="name" cols="12" v-if="showRegisterForm" class="pb-0">
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
                        </VCol>
                    </v-expand-transition>
                    <VCol cols="12" class="pb-0">
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
                    </VCol>
                    <!-- password -->
                    <VCol cols="12" class="pb-0">
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
                    </VCol>
                    <VCol cols="12" class="pb-0">
                        <v-expand-transition>
                            <PasswordRules
                                :model-value="password as string"
                                :show="showRegisterForm"
                            />
                        </v-expand-transition>
                        <div
                            v-if="!showRegisterForm"
                            class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
                        >
                            <VCheckbox v-model="remember" label="Recuérdame"/>
                            <span class="forgot-password"> ¿Olvidaste tu contraseña? </span>
                        </div>
                        <div class="d-flex align-center justify-space-between flex-wrap">
                            <v-checkbox v-model="terms">
                                <template #label>
                  <span class="text-caption">
                    Entiendo que para completar el registro, recibiré un código
                    de verificación en mi número de WhatsApp.<Icon
                      name="logos:whatsapp-icon"
                  ></Icon>
                  </span>
                                </template>
                            </v-checkbox>
                        </div>
                        <!--                                             login button-->
                        <VBtn
                            block
                            tabindex="4"
                            type="submit"
                            size="40"
                            :loading="isLoading"
                            :disabled="isLoading || !meta.valid || !terms"
                            class="text-capitalize"
                        >
                            {{ showRegisterForm ? "Empezar" : "Iniciar sesión" }}
                        </VBtn>
                        <div
                            class="text-caption text-secondary text-justify mt-2 ml-1"
                            v-auto-animate="{ duration: 100 }"
                        >
                            <p v-if="showRegisterForm">Al crear una cuenta en Futzo aceptas los
                                <span class="text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                                      @click="$router.push({name: 'terminos-de-servicio'})">Términos de Servicio</span>
                                y
                                <span
                                    @click="$router.push({name: 'politica-de-privacidad'})"
                                    class="text-high-emphasis text-decoration-underline cursor-pointer text-justify"
                                >Políticas de privacidad.</span
                                >
                            </p>
                        </div>
                    </VCol>
                    <VCol class="d-flex align-content-center justify-start py-0">
                        <small class="text-red pl-2 font-weight-bold" v-if="errorMessage">
                            * {{ errorMessage }}
                            <span>
                <v-btn
                    variant="text"
                    class="text-primary"
                    :to="'/verify-email?email=' + username"
                >Verificar</v-btn
                >
              </span>
                        </small>
                    </VCol>
                    <!--                     create account -->
                    <VCol cols="12" class="text-center text-base pb-0">
            <span>{{
                    showRegisterForm ? "¿Ya tienes cuenta?" : "¿No tienes cuenta? "
                }}</span>
                        <a
                            tabindex="5"
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
