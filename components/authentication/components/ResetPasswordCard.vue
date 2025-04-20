<script lang="ts" setup>
import {useAuthStore} from "~/store";
import {useForm} from "vee-validate";
import {object, string} from "yup";
import {phoneRegex, specialCharacters} from "~/utils/constants";

const {forgotPasswordState} = storeToRefs(useAuthStore())
const {handleSubmit, defineField, errors, meta} = useForm({
  validationSchema: toTypedSchema(
      object({
        password: string()
            .required("La contraseña es obligatoria")
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .matches(specialCharacters, "La contraseña debe contener al menos un carácter especial"),
      }),
  )
});
const [password] = reactive(defineField("password"))
const showPassword = ref(false)
const resetPasswordHandler = handleSubmit((values) => {
  const client = useSanctumClient()
  client("/reset-password", {
    method: "POST",
    body: {
      password: values.password,
      token: forgotPasswordState.value.code,
      [forgotPasswordState.value.isPhone ? 'phone' : 'email']: forgotPasswordState.value.isPhone ? `${forgotPasswordState.value.areaCode}${forgotPasswordState.value.username}` : forgotPasswordState.value.username
    },
  }).then((response) => {
    if (response.code === 200) {
      useToast().toast(
          "success",
          "Éxito",
          "Contraseña restablecida correctamente",
      )
      useRouter().push({
        name: "login",
      })
      emits('backToLogin')
    }
  }).catch((error) => {
    useToast().toast(
        "error",
        "Error",
        error?.data?.message ?? "Error al restablecer la contraseña",
    );
  })
})
const emits = defineEmits(['backToLogin'])
const backToLogin = () => {
  emits('backToLogin')
  forgotPasswordState.value.step = 1
}
</script>
<template>
  <div>
    <v-card-item class="d-flex justify-center align-center">
      <v-card-title class="d-flex justify-center align-center">
        <div class="icon-container">
          <Icon name="mdi-password-outline" class="mx-auto envelop-icon"></Icon>
        </div>
      </v-card-title>
      <v-card-title class="text-center verify-card-title">
        Configura tu nueva contraseña
      </v-card-title>
    </v-card-item>
    <v-card-text>
      <div class="w-100 mx-auto">
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
        <v-btn
            class="my-5"
            :disabled="forgotPasswordState.code.length < 4"
            block
            @click="resetPasswordHandler"
            :loading="forgotPasswordState.isFetching"
        >Restablecer contraseña
        </v-btn>
        <v-btn block variant="text" color="secondary" prepend-icon="mdi-arrow-left" @click="backToLogin">Regresar al login.</v-btn>
      </div>
    </v-card-text>
  </div>
</template>
