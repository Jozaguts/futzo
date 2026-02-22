<script setup lang="ts">
import {getCredentialsDashboard, reprintCredentialFromHistory} from '~/http/api/credentials'
import type {CredentialsDashboardResponse, CredentialsLatestGeneratedItem} from '~/types/credentials'
import BatchProgressPanel from '~/components/pages/credentials/BatchProgressPanel.vue'
import CredentialsPaywallAlert from '~/components/pages/credentials/CredentialsPaywallAlert.vue'
import {useCredentialsBatchProgress} from '~/composables/credentials/useCredentialsBatchProgress'
import {useCredentialsErrors} from '~/composables/credentials/useCredentialsErrors'

const { toast } = useToast()
const router = useRouter()
const { parseError } = useCredentialsErrors()
const { batch, loading: batchLoading, start: startBatchProgress } = useCredentialsBatchProgress()

const loading = ref(false)
const errorMessage = ref<string | null>(null)
const paywallCheckoutUrl = ref<string | null>(null)
const dashboard = ref<CredentialsDashboardResponse | null>(null)

const metrics = computed(() => {
  const source = dashboard.value?.metrics
  if (!source) return []
  return [
    { title: 'Activas', value: source.active, icon: 'lucide:badge-check', iconTone: 'green' as const },
    { title: 'Suspendidas', value: source.suspended, icon: 'lucide:shield-alert', iconTone: 'orange' as const },
    { title: 'Expiradas', value: source.expired, icon: 'lucide:clock-3', iconTone: 'blue' as const },
    {
      title: 'Generadas (temporada)',
      value: source.generated_this_season,
      icon: 'lucide:id-card',
      iconTone: 'purple' as const,
    },
  ]
})

const latest = computed(() => dashboard.value?.latest_generated ?? [])

const goToPath = (path: string) => router.push(path)

const loadDashboard = async () => {
  loading.value = true
  errorMessage.value = null
  paywallCheckoutUrl.value = null

  try {
    dashboard.value = await getCredentialsDashboard()
  } catch (error: any) {
    const parsed = parseError(error)
    errorMessage.value = parsed.message
    if (parsed.status === 402) {
      paywallCheckoutUrl.value = parsed.checkoutUrl
    }
  } finally {
    loading.value = false
  }
}

const openDetail = (item: CredentialsLatestGeneratedItem) => {
  router.push(`/credenciales/historial?credential_id=${item.id}`)
}

const reprint = async (item: CredentialsLatestGeneratedItem) => {
  try {
    const response = await reprintCredentialFromHistory(item.id)
    const reprintBatch = response.data
    await startBatchProgress(reprintBatch.id, reprintBatch)
    toast({
      type: 'success',
      msg: 'Reimpresión encolada',
      description: `Se inició la reimpresión de ${item.player_name}.`,
    })
  } catch (error: any) {
    const parsed = parseError(error)
    if (parsed.status === 422) {
      toast({ type: 'warning', msg: 'No se pudo reimprimir', description: parsed.message })
    }
  }
}

onMounted(() => {
  void loadDashboard()
})
</script>

<template>
  <div class="credentials-summary">
    <CredentialsPaywallAlert :checkout-url="paywallCheckoutUrl" />

    <section class="credentials-summary__actions" data-testid="credentials-summary-actions">
      <v-btn color="primary" @click="goToPath('/credenciales/generar')">Generar credenciales</v-btn>
      <v-btn variant="outlined" @click="goToPath('/configuracion/credenciales')">Configuración</v-btn>
    </section>

    <div v-if="loading" class="credentials-summary__skeleton">
      <v-skeleton-loader type="card, table" />
    </div>

    <div v-else-if="errorMessage" class="credentials-summary__error">
      <v-alert type="error" variant="tonal">{{ errorMessage }}</v-alert>
      <v-btn color="primary" variant="outlined" @click="loadDashboard">Reintentar</v-btn>
    </div>

    <template v-else>
      <KpisMetricsSection :items="metrics" test-id-prefix="credentials-summary-metrics" />

      <section class="panel credentials-summary__quick-actions">
        <div class="panel__header">
          <h2 class="panel__title">Accesos rápidos</h2>
        </div>
        <div class="panel__body">
          <div class="credentials-summary__quick-grid">
            <button
              v-for="action in dashboard?.quick_actions || []"
              :key="action.key"
              type="button"
              class="credentials-summary__quick-item"
              @click="goToPath(action.path)"
            >
              <Icon name="lucide:arrow-up-right" size="16" />
              <span>{{ action.label }}</span>
            </button>
          </div>
        </div>
      </section>

      <section class="panel" data-testid="credentials-summary-latest">
        <div class="panel__header">
          <h2 class="panel__title">Últimas generadas</h2>
        </div>
        <div v-if="latest.length" class="panel__body credentials-summary__table-wrap">
          <table class="credentials-summary__table">
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>Torneo</th>
                <th>Formato</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in latest.slice(0, 6)" :key="item.id">
                <td>{{ item.player_name }}</td>
                <td>{{ item.team_name }}</td>
                <td>{{ item.tournament_name }}</td>
                <td>{{ item.format }}</td>
                <td>{{ item.issued_at }}</td>
                <td>
                  <div class="credentials-summary__table-actions">
                    <v-btn size="small" variant="text" @click="openDetail(item)">Ver</v-btn>
                    <v-btn size="small" variant="text" @click="reprint(item)">Reimprimir</v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="panel__body panel__empty">
          <div class="credentials-summary__empty">
            <p>No hay credenciales generadas todavía.</p>
            <v-btn color="primary" @click="goToPath('/credenciales/generar')">Generar ahora</v-btn>
          </div>
        </div>
      </section>

      <BatchProgressPanel v-if="batch" :batch="batch" :loading="batchLoading" title="Progreso de reimpresión" />
    </template>
  </div>
</template>

<style scoped>
.credentials-summary {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.credentials-summary__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.credentials-summary__quick-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.credentials-summary__quick-item {
  border: 1px solid var(--futzo-border);
  border-radius: 12px;
  background: var(--futzo-surface);
  color: var(--futzo-on-surface);
  padding: 12px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.credentials-summary__table-wrap {
  overflow-x: auto;
}

.credentials-summary__table {
  width: 100%;
  border-collapse: collapse;
}

.credentials-summary__table th,
.credentials-summary__table td {
  text-align: left;
  border-bottom: 1px solid var(--futzo-border-strong);
  padding: 10px;
  font-size: 13px;
}

.credentials-summary__table th {
  color: var(--futzo-on-surface-muted);
  font-weight: 600;
  background: #f9fafb;
}

.credentials-summary__table-actions {
  display: flex;
  gap: 4px;
}

.credentials-summary__empty {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

@media (width > 600px) {
  .credentials-summary__quick-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
