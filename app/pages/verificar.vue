<script lang="ts" setup>
import OtpCard from '~/components/pages/verify-email/cards/otp-card.vue'
import VerifiedCard from '~/components/pages/verify-email/cards/verified-card.vue'

type ComponentNames = 'OtpCard' | 'VerifiedCard'
  definePageMeta({
    layout: 'blank',
    bodyAttrs: {
      class: 'd-none',
    },
    middleware: (to) => {
      const allowedQueryKeys = ['email', 'phone']
      let valid = false
      for (const key of allowedQueryKeys) {
        const raw = to.query?.[key]
        const value = Array.isArray(raw) ? raw[0] : raw
        if (value && String(value).trim()) {
          valid = true
          break
        }
      }
      if (!valid) {
        if (import.meta.client) {
          const { toast } = useToast()
          toast({
            type: 'info',
            msg: 'Enlace inválido',
            description: 'Falta información para verificar tu cuenta. Intenta nuevamente desde el correo o WhatsApp.',
          })
        }
         navigateTo('/')
      }
    },
  })
  const { toast } = useToast()
  const route = useRoute()
  const param = computed(() => {
    const email = route.query.email
    const phone = route.query.phone
    if (email) {
      const value = Array.isArray(email) ? email[0] : email
      return { type: 'email', value: String(value).trim() }
    }
    if (phone) {
      const value = Array.isArray(phone) ? phone[0] : phone
      return { type: 'phone', value: String(value).trim() }
    }
    return { type: null, value: '' }
  })
  const currentComponent = ref<ComponentNames>('OtpCard')
  let setTimeoutId: any = null
  const loading = ref<boolean>(false)
  const disabled = ref<boolean>(false)
  const verify = (code?: string) => {
    if (!param.value.type || !param.value.value) return
    const client = useSanctumClient()
    const { refreshIdentity } = useSanctumAuth()
    // si da problemas verificar que la peticion del CSR  token se haga antes de hacer la peticion a /verify
    loading.value = true
    disabled.value = true
    client(`/verify`, {
      method: 'POST',
      body: {
        code: code,
        [param.value.type]: param.value.value,
      },
      credentials: 'include',
    })
      .then(() => {
        toast({
          type: 'success',
          msg: 'Cuenta Verificada',
          description: 'Tu cuenta ha sido verificado exitosamente.',
        })
        currentComponent.value = 'VerifiedCard'
        refreshIdentity()
      })
      .catch((error) => {
        const errorMessage =
          error?.data?.message ?? 'La verificación de tu cuenta ha fallado. Por favor, vuelve a intentarlo.'
        if (error.response.status === 401) {
          toast({
            type: 'info',
            msg: 'Redirigiendo...',
            description: 'Por favor, espera mientras te llevamos a la siguiente página.',
          })
          setTimeoutId = setTimeout(() => {
            useRouter().push({ name: 'login', params: { username: param.value.value as string } })
          }, 3000)
        } else {
          toast({
            type: 'error',
            msg: 'Cuenta No Verificada',
            description: errorMessage,
          })
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
