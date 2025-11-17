<script setup lang="ts">
  import { createSubscriptionIntent } from '~/http/api/stripe'
  const props = defineProps<{
    planSku?: string
    period?: 'month' | 'year'
    planName?: string
  }>()
  const dialog = defineModel<boolean>('dialog')
  const emit = defineEmits(['update:modelValue', 'success'])
  const { toast } = useToast()
  const { stripe, isLoading } = useClientStripe()

  const clientSecret = ref<string | null>(null)
  let elements: any = null
  let paymentElement: any = null
  const errorMessage = ref('')
  const { user } = storeToRefs(useAuthStore())

  const mountElements = async () => {
    if (!clientSecret.value) return
    if (!dialog.value) return
    if (!stripe.value) return
    await nextTick()
    const host = document.querySelector('#payment-element') as HTMLElement | null
    if (!host) return
    const appearance = {
      theme: 'flat',
      variables: { colorPrimaryText: '#8c57ff' },
    }
    const options = {
      business: { name: 'Futzo.io' },
    }
    elements = stripe.value.elements({ clientSecret: clientSecret.value, locale: 'es', appearance })
    paymentElement = elements.create('payment', options)
    paymentElement.mount(host)
  }

  const unmountElements = () => {
    try {
      paymentElement?.unmount?.()
    } catch {}
    paymentElement = null
    elements = null
    clientSecret.value = null
    errorMessage.value = ''
  }

  const ensureIntent = async () => {
    if (!props.planSku || !props.period) return
    isLoading.value = true
    try {
      const res = await createSubscriptionIntent(props.planSku, props.period, user.value?.email || undefined)
      clientSecret.value = res.client_secret
      // mostrar contenedor antes de montar
      isLoading.value = false
      await nextTick()
      await mountElements()
    } catch (e: any) {
      console.log(e)
      errorMessage.value = e?.data?.message || 'No fue posible iniciar el pago.'
      isLoading.value = false
    } finally {
    }
  }

  const onOpenChanged = async (v: boolean) => {
    if (v) {
      await ensureIntent()
    } else {
      unmountElements()
    }
  }

  watch(dialog, onOpenChanged)
  watch(
    stripe,
    async (s) => {
      if (s && dialog.value && clientSecret.value && !paymentElement) {
        await nextTick()
        await mountElements()
      }
    },
    { immediate: false }
  )

  const confirming = ref(false)
  const confirm = async () => {
    if (!stripe.value || !elements) return
    confirming.value = true
    try {
      const { error, paymentIntent } = await stripe.value.confirmPayment({ elements, redirect: 'if_required' })
      if (error) {
        errorMessage.value = error.message || 'No pudimos procesar tu pago.'
        return
      }
      if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'requires_capture') {
        await useSanctumAuth().refreshIdentity()
        toast({ type: 'success', msg: '¡Pago confirmado!', description: 'Tu suscripción está activa.' })
        emit('success')
        dialog.value = false
        return
      }
      errorMessage.value = 'El pago no se pudo completar todavía. Intenta de nuevo.'
    } catch (e: any) {
      errorMessage.value = e?.message || 'Error al confirmar el pago.'
    } finally {
      confirming.value = false
    }
  }
</script>

<template>
  <v-navigation-drawer v-model="dialog" location="right" class="stripe-drawer" v-if="dialog">
    <div class="d-flex align-center justify-space-between pa-4">
      <div>
        <div class="text-subtitle-1 font-weight-medium">Completar pago</div>
        <div class="text-caption text-medium-emphasis" v-if="planName">{{ planName }}</div>
      </div>
      <v-btn size="small" variant="text" icon="mdi-close" @click="dialog = false" />
    </div>
    <v-divider />
    <div class="pa-4">
      <div v-if="isLoading" class="text-medium-emphasis mt-4">
        <v-skeleton-loader type="heading, actions "></v-skeleton-loader>
      </div>
      <form v-if="!errorMessage" id="payment-form">
        <div v-if="!errorMessage" id="payment-element" />
      </form>
      <v-alert v-if="errorMessage" type="error" class="mt-4" density="comfortable">{{ errorMessage }}</v-alert>
    </div>
    <template #append>
      <div class="pa-4 d-flex ga-2">
        <v-btn variant="text" @click="dialog = false">Cancelar</v-btn>
        <v-btn color="primary" :loading="confirming" :disabled="!clientSecret" @click="confirm">Pagar</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
  #payment-element {
    min-height: 140px;
  }
  .stripe-drawer :deep(.v-navigation-drawer__content) {
    display: flex;
    flex-direction: column;
  }
</style>
