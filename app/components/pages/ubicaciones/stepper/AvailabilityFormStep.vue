<script lang="ts" setup>
  import InputDay from '~/components/pages/ubicaciones/stepper/InputDay.vue'
  import type { Field, Windows, All } from '~/models/Location'
  import { WINDOWS } from '~/utils/constants'
  const { initForm, isLast } = defineProps<{ initForm: Field; isLast: boolean }>()
  const emits = defineEmits(['step-completed', 'update-field'])
  const form = ref<Field>({
    id: initForm?.id as number,
    name: initForm?.name ?? '',
    windows: { ...WINDOWS, ...initForm.windows },
    completed: initForm?.completed,
  })
  const disable = computed(() => {
    return !form.value.name
  })
  const { locationStoreRequest, formSteps } = storeToRefs(useLocationStore())

  function emitUpdate(value) {
    if (!value) {
      form.value.completed = false
      markAsCompleted()
    }
    emits('update-field', { ...form.value })
    // Mark fields step as completed when any change occurs
    if (locationStoreRequest?.value?.steps?.fields) locationStoreRequest.value.steps.fields.completed = true
  }

  function updateDayHandler(dayKey: keyof Windows, val: All) {
    const next: Windows = { ...(form.value.windows as Windows) }
    // Ensure array exists and update first window
    const arr = Array.isArray(next[dayKey]) ? (next[dayKey] as All[]) : ([] as All[])
    arr[0] = { ...arr[0], ...val }
    next[dayKey] = arr
    form.value.windows = next
    emitUpdate(true)
  }

  function updateEnabledHandler(dayKey: keyof Windows, enabled: boolean) {
    const next: Windows = { ...(form.value.windows as Windows) }
    const arr = Array.isArray(next[dayKey]) ? (next[dayKey] as All[]) : ([] as All[])
    const defaults: All = { start: '09:00', end: '17:00', enabled, label: '' }
    arr[0] = { ...(arr[0] || defaults), ...(enabled ? defaults : {}), enabled }
    next[dayKey] = arr
    form.value.windows = next
    emitUpdate(true)
  }
  const markAsCompleted = () => {
    emits('step-completed', { completed: form.value.completed, isLast, form: form.value })
  }
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="form.name"
        variant="outlined"
        label="Nombre o Identificador del campo de juego*"
        @update:model-value="emitUpdate"
        :rules="[(value) => !!value || 'Campo requerido.']"
      ></v-text-field>
    </v-col>
  </v-row>
  <InputDay
    :day="form.windows.mon?.[0]"
    id="monday"
    label="Lunes"
    :clearable="false"
    :onUpdateDay="(val: All) => updateDayHandler('mon', val)"
    @update-enabled="(enabled) => updateEnabledHandler('mon', enabled)"
  />
  <InputDay
    :day="form?.windows?.tue?.[0]"
    id="tuesday"
    :clearable="false"
    label="Martes"
    :onUpdateDay="(val) => updateDayHandler('tue', val)"
    @update-enabled="(enabled) => updateEnabledHandler('tue', enabled)"
  />
  <InputDay
    :day="form?.windows?.wed?.[0]"
    id="wednesday"
    label="Miércoles"
    :clearable="false"
    :onUpdateDay="(val) => updateDayHandler('wed', val)"
    @update-enabled="(enabled) => updateEnabledHandler('wed', enabled)"
  />
  <InputDay
    :day="form?.windows?.thu?.[0]"
    id="thursday"
    label="Jueves"
    :clearable="false"
    :onUpdateDay="(val) => updateDayHandler('thu', val)"
    @update-enabled="(enabled) => updateEnabledHandler('thu', enabled)"
  />
  <InputDay
    :day="form?.windows?.fri?.[0]"
    id="friday"
    label="Viernes"
    :clearable="false"
    :onUpdateDay="(val) => updateDayHandler('fri', val)"
    @update-enabled="(enabled) => updateEnabledHandler('fri', enabled)"
  />
  <InputDay
    :day="form?.windows?.sat?.[0]"
    id="saturday"
    label="Sábado"
    :clearable="false"
    :onUpdateDay="(val) => updateDayHandler('sat', val)"
    @update-enabled="(enabled) => updateEnabledHandler('sat', enabled)"
  />
  <InputDay
    :day="form?.windows?.sun?.[0]"
    id="sunday"
    label="Domingo"
    :clearable="false"
    :onUpdateDay="(val) => updateDayHandler('sun', val)"
    @update-enabled="(enabled) => updateEnabledHandler('sun', enabled)"
  />
  <v-row>
    <v-col>
      <v-checkbox v-model="form.completed" @change="markAsCompleted" :disabled="disable">
        <template #label>
          <div>Marcar como completado</div>
        </template>
      </v-checkbox>
    </v-col>
  </v-row>
</template>
