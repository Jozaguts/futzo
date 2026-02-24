<script setup lang="ts">
import {useDebounceFn} from '@vueuse/core'
import {
  createCredentialsBatch,
  downloadCredentialsBatchArtifact,
  getCredentialsGeneratorCatalogs,
} from '~/http/api/credentials'
import type {
  CredentialArtifactVariant,
  CredentialsCatalogFormatItem,
  CredentialsCatalogPlayer,
  CredentialsGeneratorCatalogsResponse,
} from '~/types/credentials'
import {useCredentialsBatchProgress} from '~/composables/credentials/useCredentialsBatchProgress'
import {useCredentialsErrors} from '~/composables/credentials/useCredentialsErrors'
import BatchProgressPanel from '~/components/pages/credentials/BatchProgressPanel.vue'
import CredentialsPaywallAlert from '~/components/pages/credentials/CredentialsPaywallAlert.vue'

const { toast } = useToast()
const { parseError } = useCredentialsErrors()
const { batch, loading: batchLoading, start: startBatchProgress } = useCredentialsBatchProgress()

const loading = ref(false)
const creatingBatch = ref(false)
const errorMessage = ref<string | null>(null)
const paywallCheckoutUrl = ref<string | null>(null)

const catalogs = ref<CredentialsGeneratorCatalogsResponse | null>(null)

const filters = reactive({
  tournament_id: null as number | null,
  team_id: null as number | null,
  status: 'all',
  search: '',
  include_unverified: true,
  include_suspended: true,
  per_page: 25,
})

const selectedPlayerIds = ref<number[]>([])
const selectedFormat = ref<string>('official_vertical')
const selectedOutputMode = ref<'print' | 'digital'>('print')
const selectedSideMode = ref<'front' | 'back' | 'both'>('front')
const selectedSizeKey = ref<'credential_standard' | 'letter' | 'half_letter' | 'custom'>('credential_standard')
const widthCm = ref<number | null>(null)
const heightCm = ref<number | null>(null)
const showQr = ref(true)
const showExpiry = ref(true)
const primaryColor = ref('#2d5bff')
const secondaryColor = ref('#1f2937')
const watermarkMode = ref<'forced' | 'optional' | 'disabled'>('optional')

const players = computed(() => catalogs.value?.players?.data ?? [])
const formatCards = computed(() => catalogs.value?.formats ?? [])
const outputModes = computed(() => catalogs.value?.generation?.output_modes ?? [])
const sideModes = computed(() => catalogs.value?.generation?.side_mode_options ?? [])
const sizeOptions = computed(() => catalogs.value?.generation?.size_options ?? [])
const watermarkLocked = computed(() => Boolean(catalogs.value?.plan?.watermark_locked_by_plan))

const canGenerate = computed(() => {
  if (!selectedPlayerIds.value.length) return false
  const selected = formatCards.value.find((item) => item.key === selectedFormat.value)
  if (!selected || selected.locked_by_plan) return false
  if (selectedSizeKey.value === 'custom') {
    const validWidth = typeof widthCm.value === 'number' && widthCm.value >= 5 && widthCm.value <= 30
    const validHeight = typeof heightCm.value === 'number' && heightCm.value >= 5 && heightCm.value <= 30
    if (!validWidth || !validHeight) return false
  }
  return true
})

const previewPlayer = computed<CredentialsCatalogPlayer | null>(() => {
  if (!players.value.length) return null
  const selected = players.value.find((item) => selectedPlayerIds.value.includes(item.id))
  return selected || players.value[0]
})

const selectedFormatCard = computed(() => formatCards.value.find((item) => item.key === selectedFormat.value) ?? null)

const visibleSideModes = computed(() => {
  if (selectedFormat.value === 'official_vertical') return sideModes.value
  return sideModes.value.filter((item) => item.key === 'front')
})

watch(
  () => selectedFormat.value,
  (format) => {
    if (format !== 'official_vertical' && selectedSideMode.value !== 'front') {
      selectedSideMode.value = 'front'
    }
  }
)

const syncDefaults = (payload: CredentialsGeneratorCatalogsResponse) => {
  const defaults = payload.generation.defaults
  selectedFormat.value = defaults.format || selectedFormat.value
  selectedOutputMode.value = defaults.output_mode || selectedOutputMode.value
  selectedSideMode.value = defaults.side_mode || selectedSideMode.value
  selectedSizeKey.value = defaults.size_key || selectedSizeKey.value
  showQr.value = defaults.show_qr
  showExpiry.value = defaults.show_expiry
  watermarkMode.value = defaults.watermark_mode || watermarkMode.value
  primaryColor.value = defaults.primary_color || primaryColor.value
  secondaryColor.value = defaults.secondary_color || secondaryColor.value
}

const loadCatalogs = async () => {
  loading.value = true
  errorMessage.value = null
  paywallCheckoutUrl.value = null

  try {
    const response = await getCredentialsGeneratorCatalogs({
      ...filters,
      tournament_id: filters.tournament_id ?? undefined,
      team_id: filters.team_id ?? undefined,
    })
    catalogs.value = response
    selectedPlayerIds.value = []
    syncDefaults(response)

    if (!outputModes.value.some((mode) => mode.key === selectedOutputMode.value && mode.enabled)) {
      const nextMode = outputModes.value.find((mode) => mode.enabled)
      if (nextMode) {
        selectedOutputMode.value = nextMode.key
      }
    }
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

const debouncedSearch = useDebounceFn(() => {
  void loadCatalogs()
}, 350)

const togglePlayer = (playerId: number) => {
  if (selectedPlayerIds.value.includes(playerId)) {
    selectedPlayerIds.value = selectedPlayerIds.value.filter((id) => id !== playerId)
    return
  }
  selectedPlayerIds.value = [...selectedPlayerIds.value, playerId]
}

const selectAllVisible = () => {
  const ids = players.value.map((item) => item.id)
  selectedPlayerIds.value = ids
}

const clearSelection = () => {
  selectedPlayerIds.value = []
}

const selectFormat = (format: CredentialsCatalogFormatItem) => {
  if (format.locked_by_plan) return
  selectedFormat.value = format.key
}

const createBatch = async () => {
  if (!canGenerate.value) return

  creatingBatch.value = true
  try {
    const response = await createCredentialsBatch({
      tournament_id: filters.tournament_id,
      team_id: filters.team_id,
      format: selectedFormat.value as any,
      output_mode: selectedOutputMode.value,
      player_ids: selectedPlayerIds.value,
      filters: {
        status: filters.status,
        search: filters.search,
        include_unverified: filters.include_unverified,
        include_suspended: filters.include_suspended,
      },
      customization: {
        primary_color: primaryColor.value,
        secondary_color: secondaryColor.value,
        show_qr: showQr.value,
        show_expiry: showExpiry.value,
        watermark_mode: watermarkMode.value,
        side_mode: selectedSideMode.value,
        size_key: selectedSizeKey.value,
        width_cm: selectedSizeKey.value === 'custom' ? widthCm.value : null,
        height_cm: selectedSizeKey.value === 'custom' ? heightCm.value : null,
      },
    })

    const createdBatch = response.data
    await startBatchProgress(createdBatch.id, createdBatch)
    toast({
      type: 'success',
      msg: 'Generación iniciada',
      description: 'Se encoló el lote de credenciales.',
    })
  } catch (error: any) {
    const parsed = parseError(error)
    if (parsed.status === 402) {
      paywallCheckoutUrl.value = parsed.checkoutUrl
    }
  } finally {
    creatingBatch.value = false
  }
}

const availableVariants = computed<CredentialArtifactVariant[]>(() => {
  return (batch.value?.available_artifact_variants || []).filter((variant): variant is CredentialArtifactVariant =>
    ['pdf', 'png', 'digital'].includes(variant)
  )
})

const downloadVariant = async (variant: CredentialArtifactVariant) => {
  if (!batch.value) return

  try {
    const blob = await downloadCredentialsBatchArtifact(batch.value.id, variant)
    const blobUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = blobUrl
    anchor.download = `credenciales-batch-${batch.value.id}.${variant === 'digital' ? 'png' : variant}`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(blobUrl)
  } catch (error: any) {
    const parsed = parseError(error)
    toast({
      type: 'error',
      msg: 'No se pudo descargar el archivo',
      description: parsed.message,
    })
  }
}

watch(
  () => filters.search,
  () => {
    debouncedSearch()
  }
)

// watch(
//   () => [filters.tournament_id, filters.team_id, filters.status, filters.include_unverified, filters.include_suspended],
//   () => {
//     void loadCatalogs()
//   }
// )

onMounted(() => {
  void loadCatalogs()
})
</script>

<template>
  <div class="credentials-generator" data-testid="credentials-generator-page">
    <CredentialsPaywallAlert :checkout-url="paywallCheckoutUrl" />

    <div v-if="loading" class="credentials-generator__loading">
      <v-skeleton-loader type="table, card" />
    </div>

    <div v-else-if="errorMessage" class="credentials-generator__error">
      <v-alert type="error" variant="tonal">{{ errorMessage }}</v-alert>
      <v-btn color="primary" variant="outlined" @click="loadCatalogs">Reintentar</v-btn>
    </div>

    <div v-else class="credentials-generator__grid">
      <section class="panel credentials-generator__panel">
        <div class="panel__header">
          <h2 class="panel__title">Filtros y jugadores</h2>
        </div>
        <div class="panel__body credentials-generator__filters">
          <v-autocomplete
            v-model="filters.tournament_id"
            :items="catalogs?.tournaments || []"
            item-title="name"
            item-value="id"
            density="compact"
            hide-details
            clearable
            label="Torneo"
            variant="outlined"
          />
          <v-autocomplete
            v-model="filters.team_id"
            :items="catalogs?.teams || []"
            item-title="name"
            item-value="id"
            density="compact"
            hide-details
            clearable
            label="Equipo"
            variant="outlined"
          />
          <v-autocomplete
            v-model="filters.status"
            :items="catalogs?.filters?.status_options || []"
            item-title="label"
            item-value="value"
            density="compact"
            hide-details
            label="Estado"
            variant="outlined"
          />

          <SearchInput placeholder="Buscar jugador" @searching="loadCatalogs" />

          <div class="credentials-generator__switches">
            <div class="d-flex justify-space-between align-center">
              <p class="text-body-1 font-weight-bold">Incluir no verificados</p><v-switch v-model="filters.include_unverified" color="primary"   />
            </div>
            <div class="d-flex justify-space-between align-center">
              <p class="text-body-1 font-weight-bold">Incluir suspendidos</p><v-switch v-model="filters.include_suspended" color="primary"   />
            </div>
          </div>

<!--          <div class="credentials-generator__list-actions">-->
<!--            <v-btn variant="text" @click="selectAllVisible">Seleccionar página</v-btn>-->
<!--            <v-btn variant="text" @click="clearSelection">Limpiar</v-btn>-->
<!--          </div>-->

<!--          <div class="credentials-generator__players" data-testid="credentials-generator-players">-->
<!--            <button-->
<!--              v-for="player in players"-->
<!--              :key="player.id"-->
<!--              type="button"-->
<!--              class="credentials-generator__player-item"-->
<!--              :class="{ 'credentials-generator__player-item&#45;&#45;active': selectedPlayerIds.includes(player.id) }"-->
<!--              @click="togglePlayer(player.id)"-->
<!--            >-->
<!--              <v-checkbox-btn :model-value="selectedPlayerIds.includes(player.id)" readonly />-->
<!--              <div>-->
<!--                <strong>{{ player.name }}</strong>-->
<!--                <small>{{ player.team?.name || 'Sin equipo' }}</small>-->
<!--              </div>-->
<!--              <span class="credentials-generator__player-badge">{{ player.current_credential_status || '—' }}</span>-->
<!--            </button>-->
<!--          </div>-->
        </div>
      </section>

      <section class="panel credentials-generator__panel">
        <div class="panel__header">
          <h2 class="panel__title">Formato y salida</h2>
        </div>
        <div class="panel__body">
          <div class="credentials-generator__formats" data-testid="credentials-generator-formats">
            <button
              v-for="format in formatCards"
              :key="format.key"
              type="button"
              class="credentials-generator__format-card"
              :class="{
                'credentials-generator__format-card--active': selectedFormat === format.key,
                'credentials-generator__format-card--locked': format.locked_by_plan,
              }"
              :disabled="format.locked_by_plan"
              @click="selectFormat(format)"
            >
              <strong>{{ format.label }}</strong>
              <small>{{ format.key }}</small>
              <p v-if="format.locked_by_plan" class="credentials-generator__locked-reason">
                {{ format.lock_reason || 'Bloqueado por plan actual.' }}
              </p>
            </button>
          </div>

          <v-select
            v-model="selectedOutputMode"
            :items="outputModes"
            item-title="label"
            item-value="key"
            variant="outlined"
            density="compact"
            label="Modo de salida"
          >
            <template #item="{ item, props: itemProps }">
              <v-list-item v-bind="itemProps" :disabled="!item.raw.enabled">
                <v-list-item-title>{{ item.raw.label }}</v-list-item-title>
                <v-list-item-subtitle v-if="!item.raw.enabled">
                  {{ item.raw.reason || 'Deshabilitado por configuración' }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-select>

          <v-select
            v-model="selectedSizeKey"
            :items="sizeOptions"
            item-title="label"
            item-value="key"
            variant="outlined"
            density="compact"
            label="Tamaño"
          />

          <div v-if="selectedSizeKey === 'custom'" class="credentials-generator__size-custom">
            <v-text-field v-model.number="widthCm" variant="outlined" density="compact" label="Ancho (cm)" />
            <v-text-field v-model.number="heightCm" variant="outlined" density="compact" label="Alto (cm)" />
          </div>

          <v-select
            v-model="selectedSideMode"
            :items="visibleSideModes"
            item-title="label"
            item-value="key"
            variant="outlined"
            density="compact"
            label="Lado"
          />
        </div>
      </section>

      <section class="panel credentials-generator__panel">
        <div class="panel__header">
          <h2 class="panel__title">Preview y acciones</h2>
        </div>
        <div class="panel__body">
          <div class="credentials-generator__preview" data-testid="credentials-generator-preview">
            <p class="credentials-generator__preview-label">Vista previa (1 jugador)</p>
            <div class="credentials-generator__preview-card">
              <strong>{{ previewPlayer?.name || 'Sin selección' }}</strong>
              <small>{{ previewPlayer?.team?.name || 'Sin equipo' }}</small>
              <small>Formato: {{ selectedFormat }}</small>
              <small>Salida: {{ selectedOutputMode }}</small>
            </div>
          </div>

          <div class="credentials-generator__quick-customization">
            <v-switch v-model="showQr" hide-details>
              <template #label>Mostrar QR</template>
            </v-switch>
            <v-switch v-model="showExpiry" hide-details>
              <template #label>Mostrar vigencia</template>
            </v-switch>
            <v-select
              v-model="watermarkMode"
              :items="[
                { title: 'Forzado', value: 'forced' },
                { title: 'Opcional', value: 'optional' },
                { title: 'Desactivado', value: 'disabled' },
              ]"
              item-title="title"
              item-value="value"
              :disabled="watermarkLocked"
              variant="outlined"
              density="compact"
              label="Marca de agua"
              data-testid="credentials-generator-watermark-mode"
            />
            <v-text-field v-model="primaryColor" label="Color primario" density="compact" variant="outlined" />
            <v-text-field v-model="secondaryColor" label="Color secundario" density="compact" variant="outlined" />
          </div>

          <v-btn
            color="primary"
            block
            :loading="creatingBatch"
            :disabled="!canGenerate"
            data-testid="credentials-generator-create-batch"
            @click="createBatch"
          >
            Crear lote
          </v-btn>

          <BatchProgressPanel :batch="batch" :loading="batchLoading" />

          <div v-if="batch && (batch.status === 'completed' || batch.status === 'partial')" class="credentials-generator__downloads">
            <v-btn
              v-for="variant in availableVariants"
              :key="variant"
              color="primary"
              variant="outlined"
              size="small"
              @click="downloadVariant(variant)"
            >
              Descargar {{ variant.toUpperCase() }}
            </v-btn>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.credentials-generator {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.credentials-generator__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.credentials-generator__panel {
  border: 1px solid var(--futzo-border);
}

.credentials-generator__filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .v-input{
    max-height: 50px;
  }
}

.credentials-generator__switches {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

.credentials-generator__list-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.credentials-generator__players {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 350px;
  overflow: auto;
}

.credentials-generator__player-item {
  border: 1px solid var(--futzo-border);
  border-radius: 10px;
  background: var(--futzo-surface);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  text-align: left;
}

.credentials-generator__player-item--active {
  border-color: #2d5bff;
  background: #eff4ff;
}

.credentials-generator__player-item small {
  display: block;
  color: var(--futzo-on-surface-muted);
}

.credentials-generator__player-badge {
  margin-left: auto;
  font-size: 11px;
  color: var(--futzo-on-surface-muted);
  text-transform: capitalize;
}

.credentials-generator__formats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

.credentials-generator__format-card {
  border: 1px solid var(--futzo-border);
  border-radius: 12px;
  background: var(--futzo-surface);
  text-align: left;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.credentials-generator__format-card--active {
  border-color: #2d5bff;
  box-shadow: 0 0 0 2px rgba(45, 91, 255, 0.12);
}

.credentials-generator__format-card--locked {
  opacity: 0.7;
}

.credentials-generator__locked-reason {
  margin: 0;
  color: #b54708;
  font-size: 12px;
}

.credentials-generator__size-custom {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.credentials-generator__preview {
  margin-bottom: 12px;
}

.credentials-generator__preview-label {
  margin: 0 0 8px;
  color: var(--futzo-on-surface-muted);
  font-size: 12px;
}

.credentials-generator__preview-card {
  border: 1px dashed #cfd4dc;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.credentials-generator__preview-card strong {
  color: var(--futzo-on-surface);
}

.credentials-generator__preview-card small {
  color: var(--futzo-on-surface-muted);
}

.credentials-generator__quick-customization {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.credentials-generator__downloads {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (width > 960px) {
  .credentials-generator__grid {
    grid-template-columns: 1.2fr 1fr 1fr;
  }

  .credentials-generator__formats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .credentials-generator__size-custom {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
