<script lang="ts" setup>
  import { useForm } from 'vee-validate'
  import { object, string } from 'yup'
  import { specialCharacters } from '~/utils/constants'

  const authStore = useAuthStore()
  const { forgotPasswordState } = storeToRefs(authStore)
  const { handleSubmit, defineField, errors, meta } = useForm({
    validationSchema: toTypedSchema(
      object({
        password: string()
          .required('La contraseña es obligatoria')
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .matches(specialCharacters, 'La contraseña debe contener al menos un carácter especial'),
      })
    ),
  })
  const [password] = reactive(defineField('password'))
  const showPassword = ref(false)
  const resetPasswordHandler = handleSubmit((values) => {
    forgotPasswordState.value.isFetching = true
    const client = useSanctumClient()
    client('/reset-password', {
      method: 'POST',
      body: {
        password: values.password,
        token: forgotPasswordState.value.isPhone ? forgotPasswordState.value.code : forgotPasswordState.value.token,
        [forgotPasswordState.value.isPhone ? 'phone' : 'email']: forgotPasswordState.value.isPhone
          ? `${forgotPasswordState.value.areaCode}${forgotPasswordState.value.username}`
          : forgotPasswordState.value.username,
      },
    })
      .then((response) => {
        if (response.code === 200) {
          useToast().toast({
            type: 'success',
            msg: 'Éxito',
            description: 'Contraseña restablecida correctamente',
          })
          authStore.resetForgotPasswordState()

          useRouter().push({
            name: 'login',
          })
          emits('backToLogin')
        }
      })
      .catch((error) => {
        useToast().toast({
          type: 'error',
          msg: 'Error',
          description: error?.data?.message ?? 'Error al restablecer la contraseña',
        })
      })
      .finally(() => (forgotPasswordState.value.isFetching = false))
  })
  const emits = defineEmits(['backToLogin'])
  const backToLogin = () => {
    emits('backToLogin')
    forgotPasswordState.value.step = 'reset-password'
  }
  const disabled = computed(() => {
    console.log(
      forgotPasswordState.value.isFetching,
      forgotPasswordState.value.code.length,
      forgotPasswordState.value.isPhone
    )
    return (
      forgotPasswordState.value.isFetching ||
      !meta.value.valid ||
      (forgotPasswordState.value.isPhone && forgotPasswordState.value.code.length < 4)
    )
  })
</script>
<template>
  <div>
    <v-card-item class="d-flex justify-center align-center">
      <v-card-title class="d-flex justify-center align-center">
        <div class="icon-container">
          <Icon name="mdi-password-outline" class="mx-auto envelop-icon" size="32"></Icon>
        </div>
      </v-card-title>
      <v-card-title class="text-center verify-card-title"> Configura tu nueva contraseña </v-card-title>
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
            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            @click:append-inner="showPassword = !showPassword"
          />
          <div class="pl-2 mt-1" v-auto-animate="{ duration: 100 }">
            <small v-if="errors?.password" class="d-block text-error">{{ errors?.password }}</small>
          </div>
        </v-col>
        <v-btn
          class="my-5"
          :disabled="disabled"
          block
          @click="resetPasswordHandler"
          :loading="forgotPasswordState.isFetching"
          >Restablecer contraseña
        </v-btn>
        <v-btn block variant="text" color="secondary" prepend-icon="mdi-arrow-left" @click="backToLogin"
          >Regresar al login.</v-btn
        >
      </div>
    </v-card-text>
  </div>
</template>
