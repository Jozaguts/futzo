<script lang="ts" setup>
  import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
  import useSchemas from '~/composables/useSchemas'
  import CategorySelectComponent from '~/components/inputs/CategoriesSelect.vue'
  import { FUTBOL_11_ID, MAX_TEAMS, MIN_TEAMS } from '~//utils/constants'

  const { footballTypes } = storeToRefs(useLeaguesStore())
  const { formats } = storeToRefs(useCategoryStore())
  const { isEdition, tournamentStoreRequest } = storeToRefs(useTournamentStore())
  const { handleSubmit, resetForm, fields, validate, setValues } = useSchemas(
    isEdition.value ? 'edit-tournament-basic-info' : 'create-tournament-basic-info'
  )
  const minMax = ref<number[]>()
  onMounted(() => {
    minMax.value = [MIN_TEAMS, MAX_TEAMS]
    if (tournamentStoreRequest.value?.basic) {
      setValues({ ...tournamentStoreRequest.value.basic })
      if (tournamentStoreRequest.value.basic.image) {
        fields.image = tournamentStoreRequest.value.basic.image
      }
    }
    if (!isEdition.value) {
      fields.football_type_id.fieldValue = FUTBOL_11_ID
    }
  })
  onUnmounted(() => {
    resetForm()
  })
  watch(minMax, (value) => {
    fields.minMax.fieldValue = value
  })
  defineExpose({
    validate,
    handleSubmit,
  })
</script>
<template>
  <v-container class="container">
    <BaseInput v-model="fields.name" label="Nombre del torneo*" placeholder="p.ej. Torneo de verano" />
    <BaseInput label="Fecha de inicio*">
      <template #input>
        <BaseCalendarInput
          v-model:start_date="fields.start_date.fieldValue"
          v-model:end_date="fields.end_date.fieldValue"
          :multiCalendar="isEdition"
        />
      </template>
    </BaseInput>
    <BaseInput label="Imagen del torneo">
      <template #input>
        <DragDropImage v-model="fields.image.fieldValue" />
        <span
          class="text-error text-caption"
          :class="fields.image.fieldPropsValue['error-messages'][0] ? 'ml-2' : ''"
          >{{ fields.image.fieldPropsValue['error-messages'][0] ?? '' }}</span
        >
      </template>
    </BaseInput>
    <BaseInput label="Formato*">
      <template #input>
        <v-select
          :items="formats"
          density="compact"
          item-title="name"
          item-value="id"
          placeholder="Formato"
          menu-icon="mdi-chevron-down"
          v-model="fields.tournament_format_id.fieldValue"
          v-bind="fields.tournament_format_id.fieldPropsValue"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-tooltip activator="parent" location="end" max-width="300">
                {{ item.raw.description }}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-select>
      </template>
    </BaseInput>
    <BaseInput label="Tipo de torneo*">
      <template #input>
        <v-select
          :items="footballTypes"
          density="compact"
          item-title="name"
          item-value="id"
          placeholder="Tipo"
          menu-icon="mdi-chevron-down"
          v-model="fields.football_type_id.fieldValue"
          v-bind="fields.football_type_id.fieldPropsValue"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-tooltip activator="parent" location="end" max-width="300">
                {{ item.raw.description }}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-select>
      </template>
    </BaseInput>
    <BaseInput label="Categoría*">
      <template #input>
        <CategorySelectComponent
          :disabled="false"
          v-model="fields.category_id.fieldValue"
          :errors="fields.category_id.fieldPropsValue"
        />
      </template>
    </BaseInput>
    <BaseInput label="Equipos*" sublabel="Mínimo y máximo">
      <template #input>
        <v-range-slider
          step="1"
          :max="40"
          density="comfortable"
          hide-spin-buttons
          hint="Selecciona la cantidad de equipos requeridos para iniciar el torneo y el límite de participantes permitidos."
          persistent-hint
          v-model="minMax"
          strict
        >
        </v-range-slider>
      </template>
    </BaseInput>
    <BaseInput label="Cambios permitidos*">
      <template #input>
        <v-text-field
          v-model="fields.substitutions_per_team.fieldValue"
          :errors="fields.substitutions_per_team.fieldPropsValue"
          step="1"
          type="number"
          :min="-1"
          hint="-1 para ilimitados"
          density="compact"
        >
        </v-text-field>
      </template>
    </BaseInput>
  </v-container>
</template>
