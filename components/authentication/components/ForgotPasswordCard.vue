<script lang="ts" setup>
import SearchCountry from "~/components/authentication/components/SearchCountry.vue";
import {object, string} from "yup";
import {useForm} from "vee-validate";
import {phoneRegex} from "~/utils/constants";
import {ref} from "vue";
import {useAuthStore} from "~/store";

const {forgotPasswordStep} = storeToRefs(useAuthStore())

const {handleSubmit, defineField, errors, meta, resetForm} = useForm({
  validationSchema: toTypedSchema(
      object({
        username: string()
            .required("El correo o número teléfono  es obligatorio")
            .test(
                "is-valid-username",
                "El campo debe ser un número de teléfono o un correo electrónico válido",
                (value, context) => {
                  const isEmail = string().email().isValidSync(value);
                  isPhone.value = phoneRegex.test(value);
                  context.parent.inputType = isPhone.value
                      ? "phone"
                      : isEmail
                          ? "email"
                          : null;
                  return isEmail || isPhone.value;
                },
            ),
      }),
  )
});
const isPhone = ref(false)
const areaCode = ref("+52")
const [username] = reactive(defineField("username"))
const fetching = ref(false)
const isPhoneNumber = computed(() => {
  return (
      (username.value?.length ?? 0) > 0 && /^\d/.test(username.value as string)
  )
})
const areaCodeHandler = (code: string) => {
  areaCode.value = code
}
const isValid = computed(() => meta.value.valid)
const resetHandler = handleSubmit(() => {
  forgotPasswordStep.value = 2
  return;
  const client = useSanctumClient()
  client("/forgot-password", {
    method: "POST",
    body: {
      [isPhone.value ? 'phone' : 'email']: isPhone.value ? `${areaCode.value}${username.value}` : username.value,
    },
  }).then((response) => {
    console.log(response)
    if (response.code === 200) {
      forgotPasswordStep.value = 2
    }
  }).catch((error) => {
    console.error(error)
  }).finally(() => fetching.value = false)

})
</script>
<template>
  <div v-if="forgotPasswordStep === 1">
    <v-card-item class="justify-center text-center mb-2">
      <Logo width="165" class="mx-auto"/>
      <v-card-title class="text-black text-h5">Olvidaste tu contraseña?</v-card-title>
      <v-card-subtitle>No te preocupes, te enviaremos instrucciones para restablecerla</v-card-subtitle>
    </v-card-item>
    <v-card-text class="d-flex flex-column">
      <div class="mb-4">
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
      </div>
      <div class="pl-2 mt-1" v-auto-animate="{ duration: 100 }">
        <small v-if="errors?.username" class="d-block text-error">{{
            errors?.username
          }}</small>
      </div>
      <v-btn block :disabled="!isValid" @click="resetHandler">Restablecer contraseña</v-btn>
      <v-btn class="my-2" variant="text" color="secondary" prepend-icon="mdi-arrow-left" @click="emits('update:showForgotPassword')">Regresar al login.</v-btn>
    </v-card-text>
  </div>
</template>
