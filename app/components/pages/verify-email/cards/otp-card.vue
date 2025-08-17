<script setup lang="ts">
  const code = ref('')
  const queryParams = useRoute().query
  const param = computed(() => {
    return {
      type: Object.keys(queryParams)[0],
      value: Object.values(queryParams)[0],
    }
  })
  const resendCode = () => {
    const { type, value } = param.value
    if (value) {
      useAuthStore().reSendCode(type === 'phone' ? `+${value.toString().trim()}` : value.toString().trim(), type)
    }
  }
  const title = computed(() => {
    return param.value.type === 'email' ? 'Verificar correo' : 'Verificar teléfono'
  })
  const subtitle = computed(() => {
    return param.value.type === 'email'
      ? 'Te enviamos un correo de verificación al'
      : 'Mensaje de WhatsApp enviado para verificar tu'
  })
  const type = computed(() => {
    return param.value.type === 'email' ? 'correo' : 'teléfono'
  })
</script>
<template>
  <v-card width="100%" max-width="540" max-height="550" class="verify-card">
    <v-card-item class="d-flex justify-center align-center">
      <v-card-title class="d-flex justify-center align-center">
        <div class="icon-container">
          <Icon name="futzo-icon:inbox-02" class="mx-auto envelop-icon" size="32"></Icon>
        </div>
      </v-card-title>
      <v-card-title class="text-center verify-card-title">
        {{ title }}
      </v-card-title>
      <v-card-subtitle class="text-center verify-card-subtitle">
        {{ subtitle }} <br />
        {{ type }}: <strong class="font-weight-bold text-black">{{ param.value }}</strong
        >.
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <div class="w-75 mx-auto">
        <v-otp-input v-model="code" placeholder="0" length="4" width="356px" min-height="80px"></v-otp-input>
        <v-btn
          class="my-5"
          rounded="lg"
          :disabled="code.length < 4"
          size="large"
          block
          @click="$emit('event', { action: 'verificar', code })"
          >Verificar {{ type }}
        </v-btn>
        <div class="verify-card-options-container">
          <p class="verify-card-didnt-get-email">¿No recibiste el {{ type ?? 'mensaje' }}?</p>
          <v-btn variant="text" class="mx-0 px-0" @click="resendCode">Reenviar </v-btn>
        </div>
        <div class="d-flex justify-center align-center my-5 cursor-pointer" @click="$router.push('/login')">
          <Icon name="futzo-icon:arrow-left" class="arrow-left mx-1"></Icon>
          <p class="text-body-1 font-weight-bold">Regresar a registrarme</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
