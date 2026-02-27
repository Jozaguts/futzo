<script setup lang="ts">
import {validateCredential} from '~/http/api/credentials'
import type {CredentialValidationResponse} from '~/types/credentials'
import {useCredentialsErrors} from '~/composables/credentials/useCredentialsErrors'

const { toast } = useToast()
const { parseError } = useCredentialsErrors()

const inputCode = ref('')
const loading = ref(false)
const result = ref<CredentialValidationResponse | null>(null)
const errorCount = ref(0)
const cooldownUntil = ref<number | null>(null)

const normalizedCode = computed(() => inputCode.value.trim().toUpperCase())
const now = ref(Date.now())
let timerId: ReturnType<typeof setInterval> | null = null

const cooldownSeconds = computed(() => {
  if (!cooldownUntil.value) return 0
  return Math.max(0, Math.ceil((cooldownUntil.value - now.value) / 1000))
})

const onTick = () => {
  now.value = Date.now()
}

const canValidate = computed(() => normalizedCode.value.length > 0 && cooldownSeconds.value === 0)

const statusMeta = computed(() => {
  const status = result.value?.status
  const map: Record<string, { color: string; icon: string; title: string }> = {
    active: { color: '#079455', icon: 'lucide:badge-check', title: 'Credencial activa' },
    suspended: { color: '#b54708', icon: 'lucide:shield-alert', title: 'Credencial suspendida' },
    expired: { color: '#475467', icon: 'lucide:clock-3', title: 'Credencial expirada' },
    invalidated: { color: '#d92d20', icon: 'lucide:ban', title: 'Credencial invalidada' },
    not_found: { color: 'var(--futzo-on-surface-muted)', icon: 'lucide:search-x', title: 'No encontrada' },
  }
  return status ? map[status] : null
})

const startCooldown = (seconds = 8) => {
  cooldownUntil.value = Date.now() + seconds * 1000
}

const validate = async () => {
  if (!canValidate.value) return

  loading.value = true
  try {
    result.value = await validateCredential(normalizedCode.value)
    errorCount.value = 0
  } catch (error: any) {
    const parsed = parseError(error)
    errorCount.value += 1

    if (errorCount.value >= 2) {
      startCooldown(8)
    }

    toast({
      type: 'error',
      msg: 'No fue posible validar',
      description: parsed.message,
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  timerId = window.setInterval(onTick, 1000)
})

onBeforeUnmount(() => {
  if (!timerId) return
  clearInterval(timerId)
  timerId = null
})
</script>

<template>
  <div class="credentials-validation" data-testid="credentials-validation-page">
    <section class="panel">
      <div class="panel__header">
        <h2 class="panel__title">Validación QR/manual</h2>
      </div>
      <div class="panel__body credentials-validation__form">
        <v-text-field
          v-model="inputCode"
          label="Código de credencial"
          variant="outlined"
          density="comfortable"
          placeholder="CRD123456"
        />
        <v-btn color="primary" :loading="loading" :disabled="!canValidate" @click="validate">
          {{ cooldownSeconds > 0 ? `Espera ${cooldownSeconds}s` : 'Validar' }}
        </v-btn>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <h2 class="panel__title">Escaneo</h2>
      </div>
      <div class="panel__body credentials-validation__scanner-placeholder">
        <Icon name="lucide:scan-line" size="30" />
        <p>Panel de escaneo disponible en próxima iteración de cámara.</p>
      </div>
    </section>

    <section class="panel" data-testid="credentials-validation-result">
      <div class="panel__header">
        <h2 class="panel__title">Resultado</h2>
      </div>
      <div v-if="result && statusMeta" class="panel__body credentials-validation__result">
        <div class="credentials-validation__result-status" :style="{ color: statusMeta.color }">
          <Icon :name="statusMeta.icon" size="22" />
          <strong>{{ statusMeta.title }}</strong>
        </div>

        <p class="credentials-validation__message">{{ result.message }}</p>
        <p v-if="result.reason_message" class="credentials-validation__reason">{{ result.reason_message }}</p>
        <small class="credentials-validation__timestamp">{{ result.validated_at }}</small>
      </div>
      <div v-else class="panel__body panel__empty">
        <p>Ingresa un código para validar.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.credentials-validation {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.credentials-validation__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.credentials-validation__scanner-placeholder {
  border: 1px dashed var(--futzo-border);
  border-radius: 12px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--futzo-on-surface-muted);
  text-align: center;
}

.credentials-validation__scanner-placeholder p {
  margin: 8px 0 0;
}

.credentials-validation__result {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.credentials-validation__result-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
}

.credentials-validation__message,
.credentials-validation__reason {
  margin: 0;
  color: var(--futzo-on-surface);
}

.credentials-validation__timestamp {
  color: var(--futzo-on-surface-muted);
}

@media (width > 600px) {
  .credentials-validation__form {
    max-width: 420px;
  }
}
</style>
