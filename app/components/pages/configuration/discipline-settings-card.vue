<script setup lang="ts">
import { useToast } from '~/composables/useToast'
import { notifyApiError } from '~/utils/apiToast'
import type {
  DisciplineSettingsDefaults,
  DisciplineSettingsDefaultsPayload,
  DisciplineViolationPayload,
  DisciplineViolationSetting,
} from '~/models/settings'
import * as settingsAPI from '~/http/api/settings'

type ViolationItemView = {
  id: number
  name: string
  description: string
  isActive: boolean
  tags: string[]
}

const { toast } = useToast()

const loading = reactive({
  violations: false,
  defaults: false,
  savingDefaults: false,
  savingViolation: false,
  updatingViolationId: null as number | null,
})

const violations = ref<ViolationItemView[]>([])
const defaults = reactive<DisciplineSettingsDefaults>({
  alignment_default_goals_against: 3,
  alignment_default_match_lost: true,
  alignment_default_preset_id: null,
  enable_appeals: false,
  enable_recidivism_escalation: false,
  presets: [],
})

const violationDialog = reactive({
  open: false,
  mode: 'create' as 'create' | 'edit',
  id: null as number | null,
  name: '',
  description: '',
  isActive: true,
})

const saveViolationDisabled = computed(() => {
  return loading.savingViolation || !violationDialog.name.trim().length
})

const presetItems = computed(() => {
  return (defaults.presets || []).map((preset) => ({
    title: preset.label,
    value: preset.id,
  }))
})

const withPayload = <T>(value: unknown): T => {
  if (value && typeof value === 'object' && 'data' in value) {
    const payload = value as { data: T }
    if (payload.data && !Array.isArray(payload.data)) {
      return payload.data
    }
  }

  return value as T
}

const withCollection = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[]
  }

  if (value && typeof value === 'object' && 'data' in value) {
    const payload = value as { data?: unknown }
    if (Array.isArray(payload.data)) {
      return payload.data as T[]
    }
  }

  return []
}

const parseTagLabel = (entry: unknown) => {
  if (typeof entry === 'string') {
    return entry
  }

  if (!entry || typeof entry !== 'object') {
    return ''
  }

  const current = entry as {
    label?: string | null
    name?: string | null
    description?: string | null
    type?: string | null
  }

  const title = current.label || current.name || current.type || ''
  const description = current.description || ''

  if (!title && !description) {
    return ''
  }

  if (!description) {
    return title
  }

  return title ? `${title}: ${description}` : description
}

const parseTags = (item: DisciplineViolationSetting) => {
  const source = item.default_sanctions || item.sanctions || item.templates || []
  if (!Array.isArray(source)) {
    return []
  }

  return source
    .map(parseTagLabel)
    .filter((tag) => tag.length > 0)
}

const toViolationView = (item: DisciplineViolationSetting): ViolationItemView => ({
  id: Number(item.id),
  name: item.name || 'Sin nombre',
  description: item.description || 'Sin descripcion',
  isActive: Boolean(item.active ?? item.is_active ?? true),
  tags: parseTags(item),
})

const mapError = (error: unknown) => {
  const current = error as {
    status?: number
    statusCode?: number
    data?: unknown
    response?: {
      status?: number
      data?: unknown
      _data?: unknown
    }
  }

  const status = Number(current.statusCode || current.status || current.response?.status || 0)
  const data = current.data ?? current.response?.data ?? current.response?._data

  return {
    status: status > 0 ? status : null,
    data,
  }
}

const notifyRequestError = (error: unknown, fallbackDescription: string) => {
  const parsed = mapError(error)
  if (parsed.status) {
    notifyApiError(parsed.status, parsed.data)
    return
  }

  toast({
    type: 'error',
    msg: 'Error',
    description: fallbackDescription,
  })
}

const applyDefaults = (payload: Partial<DisciplineSettingsDefaults> | null | undefined) => {
  defaults.alignment_default_goals_against = Number(payload?.alignment_default_goals_against ?? 3)
  defaults.alignment_default_match_lost = Boolean(payload?.alignment_default_match_lost ?? true)
  defaults.alignment_default_preset_id = payload?.alignment_default_preset_id ?? null
  defaults.enable_appeals = Boolean(payload?.enable_appeals ?? false)
  defaults.enable_recidivism_escalation = Boolean(payload?.enable_recidivism_escalation ?? false)
  defaults.presets = Array.isArray(payload?.presets) ? payload.presets : []
}

const loadViolations = async () => {
  loading.violations = true

  try {
    const response = await settingsAPI.getDisciplineViolations()
    const list = withCollection<DisciplineViolationSetting>(response)
    violations.value = list.map(toViolationView)
  } catch (error) {
    notifyRequestError(error, 'No se pudo cargar el catalogo de faltas.')
  } finally {
    loading.violations = false
  }
}

const loadDefaults = async () => {
  loading.defaults = true

  try {
    const response = await settingsAPI.getDisciplineSettingsDefaults()
    const payload = withPayload<DisciplineSettingsDefaults>(response)
    applyDefaults(payload)
  } catch (error) {
    notifyRequestError(error, 'No se pudo cargar la configuracion de disciplina.')
  } finally {
    loading.defaults = false
  }
}

const openCreateViolation = () => {
  violationDialog.mode = 'create'
  violationDialog.id = null
  violationDialog.name = ''
  violationDialog.description = ''
  violationDialog.isActive = true
  violationDialog.open = true
}

const openEditViolation = (item: ViolationItemView) => {
  violationDialog.mode = 'edit'
  violationDialog.id = item.id
  violationDialog.name = item.name
  violationDialog.description = item.description
  violationDialog.isActive = item.isActive
  violationDialog.open = true
}

const buildViolationPayload = (): DisciplineViolationPayload => {
  const isActive = Boolean(violationDialog.isActive)
  return {
    name: violationDialog.name.trim(),
    description: violationDialog.description.trim() || null,
    active: isActive,
    is_active: isActive,
  }
}

const saveViolation = async () => {
  if (saveViolationDisabled.value) {
    return
  }

  loading.savingViolation = true

  try {
    const payload = buildViolationPayload()
    if (violationDialog.mode === 'edit' && violationDialog.id) {
      await settingsAPI.updateDisciplineViolation(violationDialog.id, payload)
    } else {
      await settingsAPI.createDisciplineViolation(payload)
    }

    toast({
      type: 'success',
      msg: 'Configuracion guardada',
      description: violationDialog.mode === 'edit'
        ? 'La falta se actualizo correctamente.'
        : 'La falta se creo correctamente.',
    })

    violationDialog.open = false
    await loadViolations()
  } catch (error) {
    notifyRequestError(error, 'No se pudo guardar la falta.')
  } finally {
    loading.savingViolation = false
  }
}

const toggleViolationActive = async (item: ViolationItemView, nextValue: boolean | null) => {
  const next = Boolean(nextValue)
  const previous = item.isActive
  item.isActive = next
  loading.updatingViolationId = item.id

  try {
    await settingsAPI.updateDisciplineViolation(item.id, {
      name: item.name,
      description: item.description,
      active: next,
      is_active: next,
    })
    toast({
      type: 'success',
      msg: 'Estado actualizado',
      description: `La falta ${next ? 'quedo activa' : 'fue desactivada'}.`,
    })
  } catch (error) {
    item.isActive = previous
    notifyRequestError(error, 'No se pudo actualizar el estado de la falta.')
  } finally {
    loading.updatingViolationId = null
  }
}

const saveDefaults = async () => {
  loading.savingDefaults = true

  try {
    const payload: DisciplineSettingsDefaultsPayload = {
      alignment_default_goals_against: Number(defaults.alignment_default_goals_against || 0),
      alignment_default_match_lost: Boolean(defaults.alignment_default_match_lost),
      alignment_default_preset_id: defaults.alignment_default_preset_id,
      enable_appeals: Boolean(defaults.enable_appeals),
      enable_recidivism_escalation: Boolean(defaults.enable_recidivism_escalation),
    }

    const response = await settingsAPI.updateDisciplineSettingsDefaults(payload)
    const parsed = withPayload<DisciplineSettingsDefaults>(response)
    applyDefaults(parsed)

    toast({
      type: 'success',
      msg: 'Configuracion guardada',
      description: 'Los ajustes de disciplina se actualizaron correctamente.',
    })
  } catch (error) {
    notifyRequestError(error, 'No se pudo guardar la configuracion de disciplina.')
  } finally {
    loading.savingDefaults = false
  }
}

onMounted(async () => {
  await Promise.all([loadViolations(), loadDefaults()])
})
</script>

<template>
  <v-card class="secondary-card pa-6 discipline-settings" width="100%" height="100%" variant="text">
    <v-card-item class="secondary-card-item">
      <div class="discipline-settings__heading">
        <div class="discipline-settings__title-row">
          <Icon name="lucide:shield" size="18" />
          <v-card-text class="secondary-card__title">Disciplina</v-card-text>
        </div>
        <v-card-subtitle class="secondary-card__subtitle">
          Configura el catalogo de faltas, plantillas de sanciones y reglas globales.
        </v-card-subtitle>
      </div>
    </v-card-item>

    <v-card-text class="pt-6">
      <v-skeleton-loader v-if="loading.violations || loading.defaults" type="heading, list-item-three-line, actions" />

      <div v-else class="discipline-settings__body">
        <section class="discipline-settings__section">
          <header class="discipline-settings__section-header">
            <h3>Catalogo de faltas</h3>
            <v-btn
              data-testid="discipline-add-violation"
              variant="outlined"
              color="primary"
              size="small"
              prepend-icon="mdi-plus"
              @click="openCreateViolation"
            >
              Agregar falta
            </v-btn>
          </header>

          <div v-if="violations.length" class="discipline-settings__violations">
            <article v-for="item in violations" :key="item.id" class="discipline-violation">
              <div class="discipline-violation__info">
                <div class="discipline-violation__title">
                  <strong>{{ item.name }}</strong>
                  <v-chip :color="item.isActive ? 'success' : 'default'" variant="tonal" size="x-small">
                    {{ item.isActive ? 'Activa' : 'Inactiva' }}
                  </v-chip>
                </div>
                <p>{{ item.description }}</p>

                <div v-if="item.tags.length" class="discipline-violation__tags">
                  <v-chip
                    v-for="(tag, index) in item.tags"
                    :key="`${item.id}-tag-${index}`"
                    size="x-small"
                    variant="tonal"
                    color="primary"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </div>

              <div class="discipline-violation__actions">
                <v-btn
                  icon
                  variant="text"
                  size="small"
                  aria-label="Editar falta"
                  @click="openEditViolation(item)"
                >
                  <Icon name="mdi-pencil" size="16" />
                </v-btn>

                <v-switch
                  :model-value="item.isActive"
                  hide-details
                  inset
                  color="primary"
                  density="compact"
                  :loading="loading.updatingViolationId === item.id"
                  :disabled="loading.updatingViolationId === item.id"
                  @update:model-value="toggleViolationActive(item, $event)"
                />
              </div>
            </article>
          </div>

          <div v-else class="discipline-settings__empty">
            <Icon name="lucide:shield-off" size="20" />
            <span>No hay faltas configuradas.</span>
          </div>
        </section>

        <v-divider />

        <section class="discipline-settings__section">
          <h3>Valores predeterminados: Alineacion indebida</h3>
          <p class="discipline-settings__hint">
            Estos valores se aplican automaticamente al crear un caso de alineacion indebida.
          </p>

          <div class="discipline-settings__defaults-grid">
            <div class="discipline-settings__field">
              <label>Goles en contra por defecto</label>
              <v-text-field
                v-model.number="defaults.alignment_default_goals_against"
                data-testid="discipline-default-goals-against"
                type="number"
                min="0"
                density="compact"
                variant="outlined"
                hide-details
              />
            </div>

            <div class="discipline-settings__field">
              <label>Resultado administrativo por defecto</label>
              <v-select
                v-model="defaults.alignment_default_preset_id"
                data-testid="discipline-default-preset"
                :items="presetItems"
                item-title="title"
                item-value="value"
                density="compact"
                variant="outlined"
                hide-details
                clearable
                placeholder="Selecciona un preset"
              />
            </div>
          </div>

          <div class="discipline-settings__switch-row">
            <div>
              <p>Partido perdido automatico</p>
              <small>Aplica resultado de partido perdido cuando corresponde.</small>
            </div>
            <v-switch v-model="defaults.alignment_default_match_lost" inset color="primary" hide-details />
          </div>
        </section>

        <v-divider />

        <section class="discipline-settings__section">
          <h3>Reglas globales</h3>
          <div class="discipline-settings__switch-row">
            <div>
              <p>Habilitar apelaciones</p>
              <small>Los equipos pueden apelar sanciones.</small>
            </div>
            <v-switch v-model="defaults.enable_appeals" inset color="primary" hide-details />
          </div>

          <div class="discipline-settings__switch-row">
            <div>
              <p>Escalamiento por reincidencia</p>
              <small>Sanciones mas severas para faltas repetidas.</small>
            </div>
            <v-switch v-model="defaults.enable_recidivism_escalation" inset color="primary" hide-details />
          </div>
        </section>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        data-testid="discipline-save-defaults"
        color="primary"
        :loading="loading.savingDefaults"
        @click="saveDefaults"
      >
        Guardar configuracion
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="violationDialog.open" max-width="560">
    <v-card class="futzo-rounded">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ violationDialog.mode === 'edit' ? 'Editar falta' : 'Nueva falta' }}</span>
        <v-btn icon variant="text" size="x-small" @click="violationDialog.open = false">
          <Icon name="mdi-close" size="18" />
        </v-btn>
      </v-card-title>

      <v-card-text class="discipline-dialog__body">
        <v-text-field
          v-model="violationDialog.name"
          data-testid="discipline-violation-name"
          label="Nombre *"
          density="compact"
          variant="outlined"
          hide-details
        />

        <v-textarea
          v-model="violationDialog.description"
          data-testid="discipline-violation-description"
          label="Descripcion"
          rows="3"
          density="compact"
          variant="outlined"
          hide-details
        />

        <v-switch
          v-model="violationDialog.isActive"
          data-testid="discipline-violation-active"
          label="Falta activa"
          inset
          color="primary"
          hide-details
          density="compact"
        />
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="violationDialog.open = false">Cancelar</v-btn>
        <v-btn
          data-testid="discipline-save-violation"
          color="primary"
          :loading="loading.savingViolation"
          :disabled="saveViolationDisabled"
          @click="saveViolation"
        >
          {{ violationDialog.mode === 'edit' ? 'Guardar cambios' : 'Crear falta' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.discipline-settings {
  overflow: auto;
}

.discipline-settings__heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.discipline-settings__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discipline-settings__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.discipline-settings__section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.discipline-settings__section h3 {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #101828;
}

.discipline-settings__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.discipline-settings__hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: #475467;
}

.discipline-settings__violations {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.discipline-violation {
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.discipline-violation__info {
  min-width: 0;
}

.discipline-violation__title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discipline-violation__title strong {
  font-size: 13px;
  line-height: 20px;
  color: #101828;
}

.discipline-violation__info p {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 18px;
  color: #475467;
}

.discipline-violation__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.discipline-violation__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.discipline-settings__empty {
  border: 1px dashed #d0d5dd;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475467;
  font-size: 13px;
}

.discipline-settings__defaults-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
}

.discipline-settings__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.discipline-settings__field label {
  font-size: 12px;
  line-height: 18px;
  color: #344054;
  font-weight: 500;
}

.discipline-settings__switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 10px 12px;
}

.discipline-settings__switch-row p {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: #101828;
  font-weight: 500;
}

.discipline-settings__switch-row small {
  display: block;
  color: #667085;
  font-size: 11px;
  line-height: 16px;
  margin-top: 2px;
}

.discipline-dialog__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 960px) {
  .discipline-settings__defaults-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
