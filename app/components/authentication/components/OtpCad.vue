<script lang="ts" setup>
  const { forgotPasswordState } = storeToRefs(useAuthStore())
  const counter = ref(60)
  const counterId = ref()
  const subtitle = computed(() => {
    return forgotPasswordState.value.isPhone
      ? `Enviamos un código via <br/> <b>Whatsapp</b> al número: ${forgotPasswordState.value.areaCode}${forgotPasswordState.value.username}`
      : `Enviamos un código via Correo electrónico ${forgotPasswordState.value.username}`
  })
  const verifyCode = () => {
    forgotPasswordState.value.isFetching = true
    const client = useSanctumClient()
    client('/verify-reset-token', {
      method: 'POST',
      body: {
        token: forgotPasswordState.value.code,
        phone: `${forgotPasswordState.value.areaCode}${forgotPasswordState.value.username}`,
      },
    })
      .then((response) => {
        console.log(response)
        if (response.code === 200) {
          forgotPasswordState.value.step = 'confirm-password'
        }
      })
      .catch((error) => {
        useToast().toast('error', 'Error', error?.data?.message ?? 'El código de verificación no es válido')
      })
      .finally(() => (forgotPasswordState.value.isFetching = false))
  }
  const resendCode = () => {}
  const initCounter = () => {
    counterId.value = setInterval(() => {
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
  <div>
    <v-card-item class="d-flex justify-center align-center">
      <v-card-title class="d-flex justify-center align-center">
        <div class="icon-container">
          <Icon name="futzo-icon:inbox-02" class="mx-auto envelop-icon" size="32"></Icon>
        </div>
      </v-card-title>
      <v-card-title class="text-center verify-card-title"> Restablecer contraseña </v-card-title>
      <v-card-subtitle class="text-center verify-card-subtitle" v-html="subtitle"></v-card-subtitle>
    </v-card-item>
    <v-card-text class="d-flex flex-column">
      <v-otp-input
        v-model="forgotPasswordState.code"
        placeholder="0"
        length="4"
        width="356px"
        min-height="80px"
      ></v-otp-input>
      <v-btn
        block
        :disabled="forgotPasswordState.code.length < 4 || forgotPasswordState.isFetching"
        @click="verifyCode"
        :loading="forgotPasswordState.isFetching"
        >{{ forgotPasswordState.isPhone ? 'Verificar' : 'Ingresa tu código' }}
      </v-btn>
      <div class="verify-card-options-container d-flex justify-space-between align-center">
        <span class="verify-card-didnt-get-email">¿No recibiste el mensaje?</span>
        <div class="d-flex align-center">
          <v-btn :disabled="!!counter" variant="text" class="mx-0 px-0" @click="resendCode">Reenviar</v-btn>
          <span class="ml-1 counter-container">{{ counter }}</span>
        </div>
      </div>
      <div class="d-flex justify-center align-center my-5 cursor-pointer" @click="$router.push('/login')">
        <Icon name="futzo-icon:arrow-left" class="arrow-left mx-1"></Icon>
        <v-btn class="my-2" variant="text" color="secondary" prepend-icon="mdi-arrow-left" @click="$router.go(0)"
          >Regresar al login.</v-btn
        >
      </div>
    </v-card-text>
  </div>
</template>
