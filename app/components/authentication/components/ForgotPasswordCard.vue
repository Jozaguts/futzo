<script lang="ts" setup>
import SearchCountry from '~/components/authentication/components/SearchCountry.vue'
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import { phoneRegex } from '~/utils/constants'
import { sendVerificationCode } from '~/http/api/auth'

const { forgotPasswordState } = storeToRefs(useAuthStore())
  const emits = defineEmits(['backToLogin'])

  const { handleSubmit, defineField, errors, meta } = useForm({
    validationSchema: toTypedSchema(
      object({
        username: string()
          .required('El correo o número teléfono  es obligatorio')
          .test(
            'is-valid-username',
            'El campo debe ser un número de teléfono o un correo electrónico válido',
            (value, context) => {
              const isEmail = string().email().isValidSync(value)
              forgotPasswordState.value.isPhone = phoneRegex.test(value)
              context.parent.inputType = forgotPasswordState.value.isPhone ? 'phone' : isEmail ? 'email' : null
              forgotPasswordState.value.username = value
              return isEmail || forgotPasswordState.value.isPhone
            }
          ),
      })
    ),
  })
  const [username] = reactive(defineField('username'))
  const isPhoneNumber = computed(() => {
    return (username.value?.length ?? 0) > 0 && /^\d/.test(username.value as string)
  })
  const areaCodeHandler = (code: string) => {
    forgotPasswordState.value.areaCode = code
  }
  const isValid = computed(() => meta.value.valid)
  const resetHandler = handleSubmit(async () => {
    forgotPasswordState.value.isFetching = true
    await sendVerificationCode(
      username.value as string,
      forgotPasswordState.value.areaCode,
      forgotPasswordState.value.isPhone ? 'phone' : 'email'
    )
      .then((response) => {
        if (response.code === 200) {
          forgotPasswordState.value.isPhone
            ? (forgotPasswordState.value.step = 'verify-code')
            : (forgotPasswordState.value.step = 'email-sent')
        }
      })
      .catch((error) => {
        useToast().toast({
          type: 'error',
          msg: 'Error',
          description: error?.data?.message ?? 'El correo o número de teléfono no es válido',
        })
      })
      .finally(() => (forgotPasswordState.value.isFetching = false))
  })
</script>
<template>
  <div>
    <v-card-item class="justify-center text-center mb-2">
      <Logo width="165" class="mx-auto" />
      <v-card-title class="text-black text-h5">¿Olvidaste tu contraseña?</v-card-title>
      <v-card-subtitle>No te preocupes, te enviaremos instrucciones para restablecerla</v-card-subtitle>
    </v-card-item>
    <v-card-text class="d-flex flex-column">
      <div class="mb-4">
        <label for="correo" class="input-label">Teléfono o Correo electrónico *</label>
        <VTextField
          tabindex="2"
          class="fz-auth-form__input username"
          v-model="username"
          placeholder="tucorreo@futzo.io/+52 999 999 9999"
          density="compact"
        >
          <template #prepend v-if="isPhoneNumber">
            <transition-slide :duration="400" :offset="[-24, 0]">
              <SearchCountry v-if="(username?.length ?? 0) > 1" @update-area-code="areaCodeHandler" />
            </transition-slide>
          </template>
        </VTextField>
      </div>
      <div class="pl-2 mt-1" v-auto-animate="{ duration: 100 }">
        <small v-if="errors?.username" class="d-block text-error">{{ errors?.username }}</small>
      </div>
      <v-btn
        block
        :disabled="!isValid || forgotPasswordState.isFetching"
        :loading="forgotPasswordState.isFetching"
        @click="resetHandler"
        >Restablecer contraseña</v-btn
      >
      <v-btn class="my-2" variant="text" color="secondary" prepend-icon="mdi-arrow-left" @click="emits('backToLogin')"
        >Regresar al login.</v-btn
      >
    </v-card-text>
  </div>
</template>
