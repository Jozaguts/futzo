<script setup lang="ts">
import {useForm} from "vee-validate";
import {object, string} from "yup";
import {phoneRegex} from "~/utils/constants";
import {ref} from "vue";
import ForgotPasswordCard from "~/components/authentication/components/ForgotPasswordCard.vue";

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
const emits = defineEmits(['update:showForgotPassword', 'areaCodeHandler'])
const stepActive = defineModel<number>('stepActive')
const isPhone = ref(false)
const {defineField, errors} = useForm({
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
const code = ref('')
const password = ref('')
const showPassword = ref(false)
const subtitle = computed(() => {
  return isPhone.value
      ? `Enviamos un código via <br/> <b>Whatsapp</b> al número: ${areaCode.value}${username.value}`
      : `Enviamos un código via Correo electrónico ${username.value}`;
})
//# methods

const initCounter = () => {
  const counterId = setInterval(() => {
    if (counter.value > 0) {
      counter.value--
    } else {
      clearInterval(counterId.value)
    }
  }, 1000)
}
const verifyCode = () => {
  stepActive.value = 3
  return
  const client = useSanctumClient()
  client("/verify-reset-token", {
    method: "POST",
    body: {
      token: code.value,
      phone: `${areaCode.value}${username.value}`
    },
  })
      .then((response) => {
        console.log(response)
        if (response.code === 200) {
          stepActive.value = 3
        }
      })
      .catch((error) => {
        useToast().toast(
            "error",
            "Error",
            error?.data?.message ?? "El código de verificación no es válido",
        );
      })
}
const resendCode = () => {

}

//hooks
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
      <ForgotPasswordCard/>
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
                :disabled="code.length < 4 || fetching"
                size="large"
                block
                @click="verifyCode"
                :loading="fetching"
            >{{ isPhone ? 'Verificar' : 'Ingresa tu código' }}
            </v-btn>
            <div class="verify-card-options-container d-flex justify-space-between align-center">
              <span class="verify-card-didnt-get-email">¿No recibiste el mensaje?</span>
              <div class="d-flex align-center">
                <v-btn :disabled="!!counter" variant="text" class="mx-0 px-0 " @click="resendCode">Reenviar</v-btn>
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
      <div v-if="stepActive === 3">
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
                rounded="lg"
                :disabled="code.length < 4"
                size="large"
                block
                @click="verifyCode"
                :loading="fetching || fetching"
            >Restablecer contraseña
            </v-btn>
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

