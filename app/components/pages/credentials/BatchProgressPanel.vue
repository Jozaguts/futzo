<script setup lang="ts">
import type { CredentialsBatch } from '~/types/credentials'

const props = defineProps<{
  batch: CredentialsBatch | null
  loading?: boolean
  title?: string
}>()

const safeBatch = computed(() => props.batch)

const percent = computed(() => {
  if (!safeBatch.value) return 0
  if (typeof safeBatch.value.progress_percent === 'number') {
    return Math.max(0, Math.min(100, Math.trunc(safeBatch.value.progress_percent)))
  }
  if (!safeBatch.value.selection_count) return 0
  return Math.max(
    0,
    Math.min(100, Math.round((safeBatch.value.processed_count / Math.max(1, safeBatch.value.selection_count)) * 100))
  )
})

const statusLabel = computed(() => {
  const status = safeBatch.value?.status
  if (!status) return 'Sin iniciar'
  const map: Record<string, string> = {
    queued: 'En cola',
    processing: 'Procesando',
    completed: 'Completado',
    failed: 'Fallido',
    partial: 'Completado parcialmente',
  }
  return map[status] || status
})

const statusTone = computed(() => {
  switch (safeBatch.value?.status) {
    case 'completed':
      return 'success'
    case 'partial':
      return 'warning'
    case 'failed':
      return 'error'
    default:
      return 'info'
  }
})
</script>

<template>
  <v-card class="batch-progress-card" variant="flat" data-testid="credentials-batch-progress">
    <v-card-title>{{ title || 'Progreso del lote' }}</v-card-title>
    <v-card-text>
      <v-skeleton-loader v-if="loading" type="paragraph" />
      <template v-else-if="safeBatch">
        <div class="batch-progress-card__head">
          <v-chip size="small" :color="statusTone" variant="tonal">{{ statusLabel }}</v-chip>
          <strong>{{ percent }}%</strong>
        </div>

        <v-progress-linear :model-value="percent" height="8" rounded color="primary" class="mb-4" />

        <div class="batch-progress-card__metrics">
          <div>
            <span>Seleccionados</span>
            <strong>{{ safeBatch.selection_count }}</strong>
          </div>
          <div>
            <span>Procesados</span>
            <strong>{{ safeBatch.processed_count }}</strong>
          </div>
          <div>
            <span>Exitosos</span>
            <strong>{{ safeBatch.success_count }}</strong>
          </div>
          <div>
            <span>Fallidos</span>
            <strong>{{ safeBatch.failed_count }}</strong>
          </div>
        </div>

        <p v-if="safeBatch.status === 'partial' || safeBatch.status === 'failed'" class="batch-progress-card__note">
          {{ safeBatch.message || 'El lote terminó con incidencias. Revisa el resultado antes de descargar.' }}
        </p>
      </template>
      <p v-else class="batch-progress-card__empty">Aún no hay un lote activo.</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.batch-progress-card {
  border: 1px solid #eaecf0;
}

.batch-progress-card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.batch-progress-card__metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.batch-progress-card__metrics div {
  background: #f9fafb;
  border: 1px solid #eaecf0;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #475467;
  font-size: 12px;
}

.batch-progress-card__metrics strong {
  color: #101828;
}

.batch-progress-card__note,
.batch-progress-card__empty {
  margin: 12px 0 0;
  color: #667085;
  font-size: 13px;
}
</style>
