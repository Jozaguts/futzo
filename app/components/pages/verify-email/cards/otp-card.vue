<script setup lang="ts">
  const code = ref('')
  const queryParams = useRoute().query
  const param = computed(() => {
    return {
      type: Object.keys(queryParams)[0],
      value: Object.values(queryParams)[0],
    }
  })
  const { resendingVerificationCode } = storeToRefs(useAuthStore())
  const resendCode = () => {
    const { type = '', value } = param.value
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
  const { loading, disabled } = defineProps<{ loading: boolean; disabled: boolean }>()
  const isHydrated = ref(true)
  onMounted(() => (isHydrated.value = false))
</script>
<template>
  <div
    v-if="isHydrated"
    style="
      max-height: 550px;
      max-width: 540px;
      width: 100%;
      padding: 40px;
      border-radius: 24px;
      background-color: white;
    "
  >
    <v-skeleton-loader width="56" height="56" type="avatar" style="margin: 0 auto" />
    <v-skeleton-loader width="300" type="heading" style="margin: 0 auto" />
    <v-skeleton-loader type="sentences" />
    <div style="display: flex; justify-content: center">
      <v-skeleton-loader width="80" height="80" type="chip" />
      <v-skeleton-loader width="80" height="80" type="chip" />
      <v-skeleton-loader width="80" height="80" type="chip" />
      <v-skeleton-loader width="80" height="80" type="chip" />
    </div>
    <v-skeleton-loader type="button" style="margin: 0 auto" />
    <v-skeleton-loader type="text" />
    <v-skeleton-loader type="text" />
  </div>
  <v-card v-else width="100%" max-width="540" max-height="550" class="verify-card">
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
          :disabled="code.length < 4 || disabled"
          size="large"
          block
          :loading="loading"
          @click="$emit('event', { action: 'verificar', code })"
          >Verificar
        </v-btn>
        <div class="verify-card-options-container">
          <p class="verify-card-didnt-get-email">¿No recibiste el {{ type ?? 'mensaje' }}?</p>
          <v-btn variant="text" class="mx-0 px-0" @click="resendCode" :ripple="false">
            <span v-if="!resendingVerificationCode" class="ml-1">Reenviar</span>
            <span v-else class="dot-typing"></span>
          </v-btn>
        </div>
        <div class="d-flex justify-center align-center my-5 cursor-pointer" @click="$router.push('/login')">
          <Icon name="futzo-icon:arrow-left" class="arrow-left mx-1"></Icon>
          <p class="text-body-1 font-weight-bold">Regresar a registrarme</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<style lang="sass">
  @use 'three-dots' with (
    $dot-width: 6px,
    $dot-height: 6px,
    $dot-color: #8c57ff,
    $dot-bg-color: #8c57ff,
  );
</style>
