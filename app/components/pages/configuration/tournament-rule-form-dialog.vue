<script setup lang="ts">
import type { TournamentRuleCondition, TournamentRulePayload, TournamentRuleTemplate, TournamentRuleType } from '~/models/settings'

type RuleFormState = {
  id?: number
  rule_template_id: number | null
  name: string
  type: TournamentRuleType
  condition: TournamentRuleCondition | null
  age: number | null
  max_players: number | null
}

const props = withDefaults(defineProps<{
  modelValue: boolean
  initialRule: TournamentRulePayload | null
  templates: TournamentRuleTemplate[]
  saving?: boolean
  mode?: 'create' | 'edit'
}>(), {
  saving: false,
  mode: 'create',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [value: TournamentRulePayload]
}>()

const conditionItems = [
  { title: 'Menores de', value: 'menores de' },
  { title: 'Mayores de', value: 'mayores de' },
] as const

const typeItems = [
  { title: 'Cantidad', value: 'cantidad' },
  { title: 'Edad', value: 'edad' },
] as const

const defaultFormState = (): RuleFormState => ({
  rule_template_id: null,
  name: '',
  type: 'cantidad',
  condition: null,
  age: null,
  max_players: null,
})

const form = ref<RuleFormState>(defaultFormState())

const dialogTitle = computed(() => {
  return props.mode === 'edit' ? 'Editar regla' : 'Nueva regla'
})

const showAgeFields = computed(() => form.value.type === 'edad')

const isInvalid = computed(() => {
  const hasName = form.value.name.trim().length > 0
  const maxPlayers = Number(form.value.max_players ?? 0)
  const hasMaxPlayers = Number.isFinite(maxPlayers) && maxPlayers >= 1

  if (!hasName || !hasMaxPlayers) {
    return true
  }

  if (!showAgeFields.value) {
    return false
  }

  const hasCondition = !!form.value.condition
  const age = Number(form.value.age ?? 0)
  const hasAge = Number.isFinite(age) && age >= 1

  return !hasCondition || !hasAge
})

const closeDialog = () => {
  emit('update:modelValue', false)
}

const onTypeChange = (value: TournamentRuleType) => {
  if (value === 'cantidad') {
    form.value.condition = null
    form.value.age = null
  }
}

const onTemplateChange = (templateId: number | null) => {
  const template = props.templates.find((item) => item.id === Number(templateId))
  if (!template) return

  form.value.rule_template_id = template.id
  form.value.name = template.name
  form.value.type = template.type
  form.value.condition = template.type === 'edad' ? template.condition : null
  form.value.age = template.type === 'edad' ? template.age : null
}

const toPayload = (): TournamentRulePayload => {
  const payload: TournamentRulePayload = {
    name: form.value.name.trim(),
    type: form.value.type,
    condition: form.value.type === 'edad' ? form.value.condition : null,
    age: form.value.type === 'edad' ? Number(form.value.age) : null,
    max_players: Number(form.value.max_players),
  }

  if (form.value.id) {
    payload.id = form.value.id
  }

  payload.rule_template_id = form.value.rule_template_id

  return payload
}

const submit = () => {
  if (isInvalid.value) return
  emit('submit', toPayload())
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) return
    const source = props.initialRule
    if (!source) {
      form.value = defaultFormState()
      return
    }

    form.value = {
      id: source.id,
      rule_template_id: source.rule_template_id ?? null,
      name: source.name,
      type: source.type,
      condition: source.condition,
      age: source.age,
      max_players: source.max_players,
    }
  }
)
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="640" @update:model-value="emit('update:modelValue', $event)">
    <v-card class="futzo-rounded">
      <v-card-title class="text-h6">{{ dialogTitle }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-select
              :model-value="form.rule_template_id"
              :items="templates"
              item-title="name"
              item-value="id"
              label="Plantilla base (opcional)"
              variant="solo-filled"
              density="compact"
              :rounded="16"
              clearable
              data-testid="tournament-rule-template"
              @update:model-value="onTemplateChange"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              variant="solo-filled"
              density="compact"
              :rounded="16"
              data-testid="tournament-rule-name"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :model-value="form.type"
              :items="typeItems"
              item-title="title"
              item-value="value"
              label="Tipo"
              variant="solo-filled"
              density="compact"
              :rounded="16"
              data-testid="tournament-rule-type"
              @update:model-value="(value) => { form.type = value; onTypeChange(value) }"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.max_players"
              type="number"
              min="1"
              label="Máximo de jugadores"
              variant="solo-filled"
              density="compact"
              :rounded="16"
              data-testid="tournament-rule-max-players"
            />
          </v-col>
          <template v-if="showAgeFields">
            <v-col cols="12" md="6">
              <v-select
                v-model="form.condition"
                :items="conditionItems"
                item-title="title"
                item-value="value"
                label="Condición"
                variant="solo-filled"
                density="compact"
                :rounded="16"
                data-testid="tournament-rule-condition"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.age"
                type="number"
                min="1"
                label="Edad límite"
                variant="solo-filled"
                density="compact"
                :rounded="16"
                data-testid="tournament-rule-age"
              />
            </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-end ga-2">
        <v-btn variant="text" :disabled="saving" @click="closeDialog">Cancelar</v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :loading="saving"
          :disabled="isInvalid"
          data-testid="tournament-rule-save"
          @click="submit"
        >
          Guardar regla
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
