<script lang="ts" setup>
  const { forgotPasswordState } = storeToRefs(useAuthStore())
  const counter = ref(60)
  const counterId = ref()
  const resendCode = () => {
    forgotPasswordState.value.isFetching = true
    const client = useSanctumClient()
    client('/verification-code/send', {
      method: 'POST',
      body: {
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
            description: forgotPasswordState.value.isPhone
              ? 'Código reenviado correctamente'
              : 'Correo reenviado correctamente',
          })
          counter.value = 60
          initCounter()
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
  }
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
      <v-card-title class="text-center verify-card-title"> ¡Recordatorio de contraseña enviado! </v-card-title>
      <v-card-subtitle class="text-center verify-card-subtitle">
        Revisa tu bandeja de entrada y sigue <br />
        las instrucciones para restablecer tu contraseña
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="d-flex flex-column">
      <div class="verify-card-options-container d-flex justify-center align-center flex-column">
        <span class="verify-card-didnt-get-email mb-4">¿No recibiste el correo?</span>
        <div class="d-flex align-center">
          <v-badge :content="counter" location="bottom right" :offset-x="-4">
            <v-btn
              block
              :disabled="!!counter || forgotPasswordState.isFetching"
              :loading="forgotPasswordState.isFetching"
              @click="resendCode"
              >Reenviar</v-btn
            >
          </v-badge>
        </div>
      </div>
      <div class="d-flex justify-center align-center my-5 cursor-pointer" @click="$router.push('/login')">
        <v-btn class="my-2" variant="text" color="secondary" prepend-icon="mdi-arrow-left" @click="$router.go(0)"
          >Regresar al login.</v-btn
        >
      </div>
    </v-card-text>
  </div>
</template>
