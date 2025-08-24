<script lang="ts" setup>
  import OtpCard from '~/components/pages/verify-email/cards/otp-card.vue'
  import VerifiedCard from '~/components/pages/verify-email/cards/verified-card.vue'
  type ComponentNames = 'OtpCard' | 'VerifiedCard'
  definePageMeta({
    layout: 'blank',
    bodyAttrs: {
      class: 'd-none',
    },
  })
  const { toast } = useToast()
  const queryParams = useRoute().query
  const param = computed(() => {
    return {
      type: Object.keys(queryParams)[0],
      value: Object.values(queryParams)[0],
    }
  })
  const currentComponent = ref<ComponentNames>('OtpCard')
  let setTimeoutId: any = null
  const loading = ref<boolean>(false)
  const disabled = ref<boolean>(false)
  const verify = (code?: string) => {
    const client = useSanctumClient()
    loading.value = true
    disabled.value = true
    client(`/verify`, {
      method: 'POST',
      body: {
        code: code,
        [param.value.type]: param.value.value,
      },
    })
      .then(() => {
        toast('success', 'Cuenta Verificada', 'Tu cuenta ha sido verificado exitosamente.')
        currentComponent.value = 'VerifiedCard'
      })
      .catch((error) => {
        const errorMessage =
          error?.data?.message ?? 'La verificación de tu cuenta ha fallado. Por favor, vuelve a intentarlo.'
        if (error.response.status === 401) {
          toast('info', 'Redirigiendo...', 'Por favor, espera mientras te llevamos a la siguiente página.')
          setTimeoutId = setTimeout(() => {
            useRouter().push({ name: 'login', params: { username: param.value.value as string } })
          }, 3000)
        } else {
          toast('error', 'Cuenta No Verificada', errorMessage)
        }
      })
      .finally(() => {
        loading.value = false
        disabled.value = false
      })
  }
  onUnmounted(() => {
    if (setTimeoutId) {
      clearTimeout(setTimeoutId)
    }
  })
  const components = {
    OtpCard,
    VerifiedCard,
  }
  const eventHandler = (event: { action: string; code?: string }) => {
    if (event.action === 'verificar') {
      verify(event?.code)
    }
    if (event.action === 'email-verified') {
      useRouter().push({ name: 'bienvenido' })
    }
  }
</script>
<template>
  <div class="verify-email-main-container">
    <Logo width="200" class="mx-auto"></Logo>
    <div class="verify-email-container">
      <component
        :is="components[currentComponent]"
        :loading="loading"
        :disabled="disabled"
        :type="param.type"
        @event="eventHandler"
      ></component>
    </div>
  </div>
</template>
<style lang="scss">
  @use '~/assets/scss/components/cards.scss';
  @use '~/assets/scss/pages/verify-email.scss';
</style>
