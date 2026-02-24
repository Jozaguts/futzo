<script setup lang="ts">
import type { TournamentRule, TournamentRulePayload, TournamentRuleTemplate } from '~/models/settings'
import { useToast } from '~/composables/useToast'
import { getHttpStatusFromError } from '~/utils/auth-csrf'
import { notifyApiError } from '~/utils/apiToast'
import * as settingsAPI from '~/http/api/settings'
import TournamentRuleFormDialog from '~/components/pages/configuration/tournament-rule-form-dialog.vue'

const props = defineProps<{
  tournamentId: number | null
}>()

const { toast } = useToast()

const loadingTemplates = ref(false)
const loadingRules = ref(false)
const savingRules = ref(false)
const templatesLoaded = ref(false)

const templates = ref<TournamentRuleTemplate[]>([])
const rules = ref<TournamentRule[]>([])

const dialogOpen = ref(false)
const dialogMode = ref<'create' | 'edit'>('create')
const currentRule = ref<TournamentRulePayload | null>(null)

const hasTournament = computed(() => typeof props.tournamentId === 'number' && props.tournamentId > 0)
const hasRules = computed(() => rules.value.length > 0)

const parseCollection = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[]
  }

  if (value && typeof value === 'object' && 'data' in value) {
    const data = (value as { data?: unknown }).data
    if (Array.isArray(data)) {
      return data as T[]
    }
  }

  return []
}

const parseErrorData = (error: unknown) => {
  const value = error as {
    data?: unknown
    response?: {
      data?: unknown
      _data?: unknown
    }
  }

  return value?.data ?? value?.response?.data ?? value?.response?._data
}

const notifyRequestError = (error: unknown, fallbackDescription: string) => {
  const status = getHttpStatusFromError(error)
  if (status) {
    notifyApiError(status, parseErrorData(error))
    return
  }

  toast({
    type: 'error',
    msg: 'Error',
    description: fallbackDescription,
  })
}

const normalizeType = (type: unknown): TournamentRule['type'] => {
  if (type === 'edad' || type === 'age') return 'edad'
  return 'cantidad'
}

const normalizeCondition = (condition: unknown): TournamentRule['condition'] => {
  if (condition === 'menores de' || condition === 'sub') return 'menores de'
  if (condition === 'mayores de' || condition === 'mayor') return 'mayores de'
  return null
}

const normalizeRule = (rule: TournamentRule): TournamentRule => ({
  ...rule,
  type: normalizeType(rule.type),
  rule_template_id: rule.rule_template_id ?? null,
  condition: normalizeType(rule.type) === 'edad' ? normalizeCondition(rule.condition) : null,
  age: normalizeType(rule.type) === 'edad' ? (rule.age ?? null) : null,
  max_players: Number(rule.max_players ?? 0),
})

const toPayload = (rule: TournamentRule | TournamentRulePayload): TournamentRulePayload => ({
  ...(rule.id ? { id: rule.id } : {}),
  rule_template_id: rule.rule_template_id ?? null,
  name: String(rule.name || '').trim(),
  type: normalizeType(rule.type),
  condition: normalizeType(rule.type) === 'edad' ? normalizeCondition(rule.condition) : null,
  age: normalizeType(rule.type) === 'edad' ? (rule.age ?? null) : null,
  max_players: Number(rule.max_players ?? 0),
})

const loadTemplates = async () => {
  if (templatesLoaded.value) return

  loadingTemplates.value = true
  try {
    const response = await settingsAPI.getTournamentRuleTemplates()
    templates.value = parseCollection<TournamentRuleTemplate>(response)
    templatesLoaded.value = true
  } catch (error) {
    notifyRequestError(error, 'No se pudieron cargar las plantillas de reglas.')
  } finally {
    loadingTemplates.value = false
  }
}

const loadRules = async (tournamentId: number) => {
  loadingRules.value = true
  try {
    const response = await settingsAPI.getTournamentRules(tournamentId)
    rules.value = parseCollection<TournamentRule>(response).map(normalizeRule)
  } catch (error) {
    rules.value = []
    notifyRequestError(error, 'No se pudieron cargar las reglas del torneo.')
  } finally {
    loadingRules.value = false
  }
}

const persistRules = async (nextRules: TournamentRulePayload[], successDescription: string) => {
  if (!props.tournamentId) return false

  savingRules.value = true
  try {
    const response = await settingsAPI.syncTournamentRules(props.tournamentId, { rules: nextRules })
    rules.value = parseCollection<TournamentRule>(response).map(normalizeRule)
    toast({
      type: 'success',
      msg: 'Reglas guardadas',
      description: successDescription,
    })
    return true
  } catch (error) {
    notifyRequestError(error, 'No se pudieron guardar las reglas del torneo.')
    return false
  } finally {
    savingRules.value = false
  }
}

const openCreateRule = () => {
  dialogMode.value = 'create'
  currentRule.value = null
  dialogOpen.value = true
}

const openEditRule = (rule: TournamentRule) => {
  dialogMode.value = 'edit'
  currentRule.value = toPayload(rule)
  dialogOpen.value = true
}

const confirmDelete = () => {
  if (!process.client) return true
  return window.confirm('¿Eliminar esta regla del torneo?')
}

const removeRule = async (ruleId: number) => {
  if (!confirmDelete()) return

  const payload = rules.value
    .filter((rule) => rule.id !== ruleId)
    .map((rule) => toPayload(rule))

  await persistRules(payload, 'La regla se eliminó correctamente.')
}

const saveRule = async (payload: TournamentRulePayload) => {
  const currentPayload = rules.value.map((rule) => toPayload(rule))
  const existingIndex = currentPayload.findIndex((rule) => rule.id && payload.id && rule.id === payload.id)

  if (existingIndex >= 0) {
    currentPayload[existingIndex] = payload
  } else {
    currentPayload.push(payload)
  }

  const saved = await persistRules(currentPayload, 'Las reglas se actualizaron correctamente.')
  if (!saved) return

  dialogOpen.value = false
  currentRule.value = null
}

const typeLabel = (type: TournamentRule['type']) => {
  return normalizeType(type) === 'edad' ? 'Edad' : 'Cantidad'
}

watch(
  () => props.tournamentId,
  (value) => {
    rules.value = []
    if (!value) return
    loadRules(value)
  },
  { immediate: true }
)

onMounted(() => {
  loadTemplates()
})
</script>

<template>
  <section class="tournament-rules-settings" data-testid="tournament-rules-settings">
    <header class="tournament-rules-settings__header">
      <div>
        <h3 class="tournament-rules-settings__title">Reglas del torneo</h3>
        <p class="tournament-rules-settings__subtitle">
          Administra las reglas por torneo y define su límite máximo de jugadores.
        </p>
      </div>
      <v-btn
        color="primary"
        variant="elevated"
        :disabled="!hasTournament || loadingRules || savingRules"
        data-testid="tournament-rules-add"
        @click="openCreateRule"
      >
        Agregar regla
      </v-btn>
    </header>

    <v-alert
      v-if="!hasTournament"
      type="info"
      variant="tonal"
      class="mt-4"
    >
      Selecciona un torneo para configurar sus reglas.
    </v-alert>

    <v-skeleton-loader
      v-else-if="loadingRules || loadingTemplates"
      class="mt-4"
      type="article,table"
    />

    <div v-else class="tournament-rules-settings__table-wrap mt-4">
      <v-table density="comfortable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Condición</th>
            <th>Edad</th>
            <th>Máximo</th>
            <th class="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!hasRules">
            <td colspan="6" class="tournament-rules-settings__empty">No hay reglas configuradas.</td>
          </tr>
          <tr v-for="rule in rules" :key="rule.id">
            <td>{{ rule.name }}</td>
            <td>{{ typeLabel(rule.type) }}</td>
            <td>{{ rule.condition ?? '-' }}</td>
            <td>{{ rule.age ?? '-' }}</td>
            <td>{{ rule.max_players }}</td>
            <td class="text-right">
              <div class="tournament-rules-settings__actions">
                <v-btn size="small" variant="text" color="primary" @click="openEditRule(rule)">Editar</v-btn>
                <v-btn
                  size="small"
                  variant="text"
                  color="error"
                  :loading="savingRules"
                  :disabled="savingRules"
                  :data-testid="`tournament-rules-delete-${rule.id}`"
                  @click="removeRule(rule.id)"
                >
                  Eliminar
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <TournamentRuleFormDialog
      v-model="dialogOpen"
      :mode="dialogMode"
      :initial-rule="currentRule"
      :templates="templates"
      :saving="savingRules"
      @submit="saveRule"
    />
  </section>
</template>

<style scoped>
.tournament-rules-settings__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.tournament-rules-settings__title {
  font-size: 18px;
  line-height: 1.3;
  font-weight: 600;
}

.tournament-rules-settings__subtitle {
  margin-top: 4px;
  color: #667085;
}

.tournament-rules-settings__table-wrap {
  border: 1px solid #eaecf0;
  border-radius: 14px;
  overflow: hidden;
}

.tournament-rules-settings__empty {
  text-align: center;
  padding: 24px;
  color: #667085;
}

.tournament-rules-settings__actions {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}
</style>
