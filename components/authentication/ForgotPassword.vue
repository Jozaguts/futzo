<script setup lang="ts">
import SearchCountry from "~/components/authentication/components/SearchCountry.vue";
import {useForm} from "vee-validate";
import {boolean, object, string} from "yup";
import {specialCharacters, phoneRegex} from "~/utils/constants";
import {ref} from "vue";

defineProps({
  showForgotPassword: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Object,
    default: () => ({}),
  }
})
const stepActive = defineModel<number>('stepActive')
const emits = defineEmits(['update:showForgotPassword', 'areaCodeHandler'])
const isPhone = ref(false)
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
const [username] = reactive(defineField("username"))
const areaCode = ref("+52")
const counter = ref(60)
const counterId = ref(null)
const fetching = ref(false)
const resetHandler = handleSubmit((values) => {
  fetching.value = true;
  const client = useSanctumClient()
  client("/forgot-password", {
    method: "POST",
    body: {
      [isPhone.value ? 'phone' : 'email']: isPhone.value ? `${areaCode.value}${username.value}` : username.value,
    },
  })
      .then((response) => {
        if (response.status === 200) {
          stepActive.value = 2
        }
      })
      .catch((error) => {
        console.error(error)
      }).finally(() => fetching.value = false)

})
const isValid = computed(() => meta.value.valid)
const isPhoneNumber = computed(() => {
  return (
      (username.value?.length ?? 0) > 0 && /^\d/.test(username.value as string)
  )
})
const code = ref(1234)
const resendCode = () => {

}
const areaCodeHandler = (code: string) => {
  areaCode.value = code
}
const subtitle = computed(() => {
  return isPhone.value
      ? `Enviamos un código via <br/> <b>Whatsapp</b> al número: ${areaCode.value}${username.value}`
      : `Enviamos un código via Correo electrónico ${username.value}`;
})
const initCounter = () => {
  const counterId = setInterval(() => {
    if (counter.value > 0) {
      counter.value--
    } else {
      clearInterval(counterId.value)
    }
  }, 1000)
}
onMounted(() => {
  initCounter()
})
onBeforeUnmount(() => {
  clearInterval(counterId.value as number)
  counterId.value = null
})

</script>
<template>
  <v-card
      v-if="showForgotPassword"
      class="pa-2"
      max-width="448"
      elevation="0"
      color="background"
  >
    <transition-expand :offset="[100, 200]" mode="out-in">
      <div v-if="stepActive === 1">
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
      <div v-if="stepActive === 2">
        <v-card-item class="d-flex justify-center align-center">
          <v-card-title class="d-flex justify-center align-center">
            <div class="icon-container">
              <Icon name="futzo-icon:inbox-02" class="mx-auto envelop-icon"></Icon>
            </div>
          </v-card-title>
          <v-card-title class="text-center verify-card-title">
            Restablecer contraseña
          </v-card-title>
          <v-card-subtitle class="text-center verify-card-subtitle" v-html="subtitle"></v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <div class="w-100 mx-auto">
            <v-otp-input
                v-model="code"
                placeholder="0"
                length="4"
                width="356px"

                min-height="80px"
            ></v-otp-input>
            <v-btn
                class="my-5"
                rounded="lg"
                :disabled="code.length < 4"
                size="large"
                block
                :loading="fetching"
            >Verificar
            </v-btn>
            <div class="verify-card-options-container d-flex justify-space-between align-center">
              <span class="verify-card-didnt-get-email">¿No recibiste el mensaje?</span>
              <div class="d-flex align-center">
                <v-btn :disabled="counter" variant="text" class="mx-0 px-0 " @click="resendCode">Reenviar</v-btn>
                <span class="ml-1 counter-container">{{ counter }}</span>
              </div>
            </div>
            <div
                class="d-flex justify-center align-center my-5 cursor-pointer"
                @click="$router.push('/login')"
            >
              <Icon name="futzo-icon:arrow-left" class="arrow-left mx-1"></Icon>
              <p class="text-body-1 font-weight-bold" @click="stepActive = 1">Regresar</p>
            </div>
          </div>
        </v-card-text>
      </div>
    </transition-expand>
    <div class="forgot-password-steps-container" :class="['step-' + stepActive]">
      <span class="step" :class="stepActive === 1 ? 'bg-primary' :''"></span>
      <span class="step" :class="stepActive === 2 ? 'bg-primary' :''"></span>
      <span class="step" :class="stepActive === 3 ? 'bg-primary' :''"></span>
      <span class="step" :class="stepActive === 4 ? 'bg-primary' :''"></span>
    </div>
  </v-card>
</template>
<style lang="sass">
.forgot-password-steps-container
  position: absolute
  width: 100%
  bottom: 0
  left: 50%
  transform: translateX(-50%)
  display: flex
  justify-content: center
  align-items: center

  .step
    width: calc(100% / 4)
    height: 8px
    background-color: #ccc
    border-radius: 4px
    margin: 0 5px

.counter-container
  min-width: 1.5em
  width: 1.5em
  max-width: 100%
  text-align: center
</style>

