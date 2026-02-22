<script setup lang="ts">
import {
  getCredentialHistory,
  getCredentialHistoryDetail,
  invalidateCredentialFromHistory,
  reprintCredentialFromHistory,
} from '~/http/api/credentials'
import type {CredentialHistoryCollection, CredentialHistoryDetail, CredentialStatus} from '~/types/credentials'
import {useCredentialsBatchProgress} from '~/composables/credentials/useCredentialsBatchProgress'
import {useCredentialsErrors} from '~/composables/credentials/useCredentialsErrors'
import BatchProgressPanel from '~/components/pages/credentials/BatchProgressPanel.vue'

const route = useRoute()
const { toast } = useToast()
const { parseError } = useCredentialsErrors()
const { batch, loading: batchLoading, start: startBatchProgress } = useCredentialsBatchProgress()

const loading = ref(false)
const errorMessage = ref<string | null>(null)
const history = ref<CredentialHistoryCollection | null>(null)
const detail = ref<CredentialHistoryDetail | null>(null)
const detailOpen = ref(false)

const invalidateDialog = reactive({
  open: false,
  credentialId: 0,
  reason: '',
  saving: false,
})

const filters = reactive({
  tournament_id: null as number | null,
  team_id: null as number | null,
  format: null as string | null,
  status: null as CredentialStatus | null,
  date_from: null as string | null,
  date_to: null as string | null,
  per_page: 25,
  page: 1,
})

const rows = computed(() => history.value?.data ?? [])

const loadHistory = async () => {
  loading.value = true
  errorMessage.value = null

  try {
    history.value = await getCredentialHistory(filters)
  } catch (error: any) {
    errorMessage.value = parseError(error).message
  } finally {
    loading.value = false
  }
}

const openDetail = async (credentialId: number) => {
  try {
    detail.value = await getCredentialHistoryDetail(credentialId)
    detailOpen.value = true
  } catch (error: any) {
    toast({ type: 'error', msg: 'No se pudo obtener el detalle', description: parseError(error).message })
  }
}

const reprint = async (credentialId: number) => {
  try {
    const response = await reprintCredentialFromHistory(credentialId)
    await startBatchProgress(response.data.id, response.data)
    toast({ type: 'success', msg: 'Reimpresión encolada' })
  } catch (error: any) {
    const parsed = parseError(error)
    if (parsed.status === 422) {
      toast({ type: 'warning', msg: 'No se puede reimprimir', description: parsed.message })
      return
    }
    toast({ type: 'error', msg: 'No se pudo reimprimir', description: parsed.message })
  }
}

const openInvalidate = (credentialId: number) => {
  invalidateDialog.open = true
  invalidateDialog.credentialId = credentialId
  invalidateDialog.reason = ''
}

const confirmInvalidate = async () => {
  invalidateDialog.saving = true
  try {
    await invalidateCredentialFromHistory(invalidateDialog.credentialId, invalidateDialog.reason.trim())
    toast({ type: 'success', msg: 'Credencial invalidada' })
    invalidateDialog.open = false
    await loadHistory()
  } catch (error: any) {
    toast({ type: 'error', msg: 'No se pudo invalidar', description: parseError(error).message })
  } finally {
    invalidateDialog.saving = false
  }
}

watch(
  () => [filters.tournament_id, filters.team_id, filters.format, filters.status, filters.date_from, filters.date_to, filters.page],
  () => {
    void loadHistory()
  }
)

onMounted(async () => {
  await loadHistory()

  const requestedCredential = Number(route.query.credential_id ?? 0)
  if (requestedCredential > 0) {
    await openDetail(requestedCredential)
  }
})
</script>

<template>
  <div class="credentials-history" data-testid="credentials-history-page">
    <section class="panel">
      <div class="panel__header">
        <h2 class="panel__title">Filtros</h2>
      </div>
      <div class="panel__body credentials-history__filters">
        <v-text-field v-model="filters.tournament_id" type="number" label="Torneo ID" variant="outlined" density="compact" />
        <v-text-field v-model="filters.team_id" type="number" label="Equipo ID" variant="outlined" density="compact" />
        <v-select
          v-model="filters.status"
          :items="[
            { title: 'Activo', value: 'active' },
            { title: 'Suspendido', value: 'suspended' },
            { title: 'Expirado', value: 'expired' },
            { title: 'Invalidado', value: 'invalidated' },
          ]"
          item-title="title"
          item-value="value"
          label="Estado"
          clearable
          variant="outlined"
          density="compact"
        />
        <v-text-field v-model="filters.date_from" type="date" label="Desde" variant="outlined" density="compact" />
        <v-text-field v-model="filters.date_to" type="date" label="Hasta" variant="outlined" density="compact" />
      </div>
    </section>

    <section class="panel" data-testid="credentials-history-table">
      <div class="panel__header">
        <h2 class="panel__title">Historial</h2>
      </div>
      <div v-if="loading" class="panel__body">
        <v-skeleton-loader type="table" />
      </div>
      <div v-else-if="errorMessage" class="panel__body">
        <v-alert type="error" variant="tonal">{{ errorMessage }}</v-alert>
      </div>
      <div v-else-if="rows.length" class="panel__body credentials-history__table-wrap">
        <table class="credentials-history__table">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Equipo</th>
              <th>Torneo</th>
              <th>Formato</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in rows" :key="item.id">
              <td>{{ item.player_name }}</td>
              <td>{{ item.team_name }}</td>
              <td>{{ item.tournament_name }}</td>
              <td>{{ item.format }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.issued_at }}</td>
              <td>
                <div class="credentials-history__table-actions">
                  <v-btn size="x-small" variant="text" :disabled="!item.actions.can_view" @click="openDetail(item.id)">Ver</v-btn>
                  <v-btn
                    size="x-small"
                    variant="text"
                    :disabled="!item.actions.can_reprint"
                    @click="reprint(item.id)"
                  >
                    Reimprimir
                  </v-btn>
                  <v-btn
                    size="x-small"
                    variant="text"
                    :disabled="!item.actions.can_invalidate"
                    @click="openInvalidate(item.id)"
                  >
                    Invalidar
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="panel__body panel__empty">
        <p>No hay resultados para los filtros actuales.</p>
      </div>
    </section>

    <BatchProgressPanel v-if="batch" :batch="batch" :loading="batchLoading" title="Progreso de reimpresión" />

    <v-dialog v-model="detailOpen" max-width="720">
      <v-card>
        <v-card-title>Detalle de credencial</v-card-title>
        <v-card-text>
          <pre class="credentials-history__detail-pre">{{ detail }}</pre>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="detailOpen = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="invalidateDialog.open" max-width="520">
      <v-card>
        <v-card-title>Invalidar credencial</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="invalidateDialog.reason"
            label="Motivo"
            variant="outlined"
            maxlength="160"
            counter
            rows="3"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="invalidateDialog.open = false">Cancelar</v-btn>
          <v-btn color="error" :loading="invalidateDialog.saving" @click="confirmInvalidate">Invalidar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.credentials-history {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.credentials-history__filters {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.credentials-history__table-wrap {
  overflow-x: auto;
}

.credentials-history__table {
  width: 100%;
  border-collapse: collapse;
}

.credentials-history__table th,
.credentials-history__table td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid var(--futzo-border-strong);
  font-size: 13px;
}

.credentials-history__table th {
  color: var(--futzo-on-surface-muted);
  font-weight: 600;
  background: #f9fafb;
}

.credentials-history__table-actions {
  display: flex;
  gap: 4px;
}

.credentials-history__detail-pre {
  margin: 0;
  max-height: 360px;
  overflow: auto;
  background: #f8f9fb;
  border-radius: 10px;
  border: 1px solid var(--futzo-border);
  padding: 10px;
  font-size: 12px;
}

@media (width > 960px) {
  .credentials-history__filters {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
