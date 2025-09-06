<script lang="ts" setup>
  import InputDay from '~/components/pages/ubicaciones/stepper/InputDay.vue'
  import type { PropType } from 'vue'
  import type { Field, Windows, All } from '~/models/Location'
  import { WINDOWS } from '~/utils/constants'
  import { inject } from 'vue'
  const { step, initForm } = defineProps({
    step: {
      type: Number,
      required: true,
    },
    initForm: {
      type: Object as PropType<Field>,
    },
  })
  const emits = defineEmits(['step-completed', 'update-field'])
  const form = ref<Field>({
    id: initForm?.id as number,
    name: initForm?.name ?? '',
    windows: initForm?.windows ?? WINDOWS,
  })
  const { form: parentForm } = inject('location_form') as any

  function emitUpdate() {
    emits('update-field', { ...form.value })
    // Mark fields step as completed when any change occurs
    if (parentForm?.value?.steps?.fields) parentForm.value.steps.fields.completed = true
  }

  function updateDayHandler(dayKey: keyof Windows, val: All) {
    const next: Windows = { ...(form.value.windows as Windows) }
    // Ensure array exists and update first window
    const arr = Array.isArray(next[dayKey]) ? (next[dayKey] as All[]) : ([] as All[])
    arr[0] = { ...arr[0], ...val }
    next[dayKey] = arr
    form.value.windows = next
    emitUpdate()
  }

  function updateEnabledHandler(dayKey: keyof Windows, enabled: boolean) {
    const next: Windows = { ...(form.value.windows as Windows) }
    const arr = Array.isArray(next[dayKey]) ? (next[dayKey] as All[]) : ([] as All[])
    // set default hours when enabling if empty
    const defaults: All = { start: '09:00', end: '17:00', enabled }
    arr[0] = { ...(arr[0] || defaults), ...(enabled ? defaults : {}), enabled }
    next[dayKey] = arr
    form.value.windows = next
    emitUpdate()
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
      ></v-text-field>
    </v-col>
  </v-row>
  <InputDay
    :day="form.windows.mon[0]"
    id="monday"
    label="Lunes"
    :onUpdateDay="(val) => updateDayHandler('mon', val)"
    @update-enabled="(enabled) => updateEnabledHandler('mon', enabled)"
  />
  <InputDay
    :day="form.windows.tue[0]"
    id="tuesday"
    label="Martes"
    :onUpdateDay="(val) => updateDayHandler('tue', val)"
    @update-enabled="(enabled) => updateEnabledHandler('tue', enabled)"
  />
  <InputDay
    :day="form.windows.wed[0]"
    id="wednesday"
    label="Miércoles"
    :onUpdateDay="(val) => updateDayHandler('wed', val)"
    @update-enabled="(enabled) => updateEnabledHandler('wed', enabled)"
  />
  <InputDay
    :day="form.windows.thu[0]"
    id="thursday"
    label="Jueves"
    :onUpdateDay="(val) => updateDayHandler('thu', val)"
    @update-enabled="(enabled) => updateEnabledHandler('thu', enabled)"
  />
  <InputDay
    :day="form.windows.fri[0]"
    id="friday"
    label="Viernes"
    :onUpdateDay="(val) => updateDayHandler('fri', val)"
    @update-enabled="(enabled) => updateEnabledHandler('fri', enabled)"
  />
  <InputDay
    :day="form.windows.sat[0]"
    id="saturday"
    label="Sábado"
    :onUpdateDay="(val) => updateDayHandler('sat', val)"
    @update-enabled="(enabled) => updateEnabledHandler('sat', enabled)"
  />
  <InputDay
    :day="form.windows.sun[0]"
    id="sunday"
    label="Domingo"
    :onUpdateDay="(val) => updateDayHandler('sun', val)"
    @update-enabled="(enabled) => updateEnabledHandler('sun', enabled)"
  />
  <v-row>
    <v-col>
      <v-checkbox @change="$emit('step-completed', 'next')">
        <template #label>
          <div>Marcar como completado</div>
        </template>
      </v-checkbox>
    </v-col>
  </v-row>
</template>
