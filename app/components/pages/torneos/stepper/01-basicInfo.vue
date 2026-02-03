<script lang="ts" setup>
import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
import CategorySelectComponent from '~/components/inputs/CategoriesSelect.vue'
import {FUTBOL_11_ID, MAX_TEAMS, MIN_TEAMS, vuetifyConfig} from '~/utils/constants'
import {useForm} from 'vee-validate'
import {array, date, mixed, number, object, string} from 'yup'
import type {TournamentStoreRequest} from '~/models/tournament'
import {storeToRefs} from 'pinia'

const { footballTypes } = storeToRefs(useLeaguesStore())
  const { formats } = storeToRefs(useCategoryStore())
  const { isEdition, tournamentStoreRequest, steps } = storeToRefs(useTournamentStore())
  const { t } = useI18n()
  const { defineField, meta, values, resetForm } = useForm<TournamentStoreRequest['basic']>({
    validationSchema: toTypedSchema(
      object({
        id: number().nullable(),
        name: string()
          .required(t('forms.required'))
          .test('no-leading-space', 'No se permite espacio en blanco al inicio', (value) => {
            return !(value && value.startsWith(' '))
          }),
        image: mixed()
          .nullable()
          .test('File is required', 'Solo imágenes .jgp, png, svg ', (value: any) => {
            if (!value) return true
            return value?.type?.includes('image/') || typeof value === 'string'
          }),
        min_max: array()
          .required(t('forms.required'))
          .default([8, 30])
          .test('min_max', 'El mínimo debe ser menor que el máximo', function (value) {
            return value[0] < value[1]
          }),
        start_date: date().required(t('forms.required')),
        end_date: date().nullable(t('forms.required')),
        substitutions_per_team: number().required(t('forms.required')),
        category_id: number().required(t('forms.required')),
        tournament_format_id: number().required(t('forms.required')),
        football_type_id: number().required(t('forms.required')),
      })
    ),
    initialValues: tournamentStoreRequest.value.basic,
  })
  const [id, id_props] = defineField('id', vuetifyConfig)
  const [name, name_props] = defineField('name', vuetifyConfig)
  const [image, image_props] = defineField('image', vuetifyConfig)
  const [min_max, min_max_props] = defineField('min_max', vuetifyConfig)
  const [start_date, start_date_props] = defineField('start_date', vuetifyConfig)
  const [end_date, end_date_props] = defineField('end_date', vuetifyConfig)
  const [substitutions_per_team, substitutions_per_team_props] = defineField('substitutions_per_team', vuetifyConfig)
  const [category_id, category_id_props] = defineField('category_id', vuetifyConfig)
  const [tournament_format_id, tournament_format_id_props] = defineField('tournament_format_id', vuetifyConfig)
  const [football_type_id, football_type_id_props] = defineField('football_type_id', vuetifyConfig)
  onMounted(() => {
    steps.value.current = 'basicInfo'
    useCategoryStore().fetchCategories()
    useCategoryStore().fetchFormats()
    min_max.value = [MIN_TEAMS, MAX_TEAMS]
    if (!isEdition.value) {
      football_type_id.value = FUTBOL_11_ID
    }
  })
  onUnmounted(() => {
    resetForm()
  })
  watch(
    meta,
    () => {
      steps.value.steps[steps.value.current].disable = !meta.value.valid
      if (meta.value.valid && meta.value.touched) {
        tournamentStoreRequest.value.basic = { ...values }
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-container class="container">
    <BaseInput v-model="name" :props="name_props" label="Nombre del torneo*" placeholder="p.ej. Torneo de verano"  id="tournament-name" />
    <BaseInput label="Fecha de inicio*" :props="start_date_props" id="tournament-date">
      <template #input>
        <BaseCalendarInput
          v-model:start_date="start_date"
          v-model:end_date="end_date"
          :multiCalendar="false"
          :error-messages="start_date_props"

        />
      </template>
    </BaseInput>
    <BaseInput label="Imagen del torneo">
      <template #input>
        <DragDropImage v-model="image" :error-messages="image_props" />
      </template>
    </BaseInput>
    <BaseInput label="Formato*" id="tournament-format">
      <template #input>
        <v-select
          :items="formats"
          density="compact"
          item-title="name"
          item-value="id"
          placeholder="Formato"
          menu-icon="mdi-chevron-down"
          v-model="tournament_format_id"
          v-bind="tournament_format_id_props"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-tooltip activator="parent" location="top" max-width="300">
                {{ item.raw?.description }}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-select>
      </template>
    </BaseInput>
    <BaseInput label="Tipo de torneo*" id="tournament-type">
      <template #input>
        <v-select

          :items="footballTypes"
          density="compact"
          item-title="name"
          item-value="id"
          placeholder="Tipo"
          menu-icon="mdi-chevron-down"
          v-model="football_type_id"
          v-bind="football_type_id_props"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-tooltip activator="parent" location="top" max-width="300">
                {{ item.raw.description }}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-select>
      </template>
    </BaseInput>
    <BaseInput label="Categoría*" id="tournament-category">
      <template #input>
        <CategorySelectComponent :disabled="false" v-model="category_id" :errors="category_id_props"/>
      </template>
    </BaseInput>
    <BaseInput label="Equipos*" sublabel="Mínimo y máximo" id="tournament-min-max">
      <template #input>
        <v-range-slider
          step="1"
          :max="40"
          density="comfortable"
          hide-spin-buttons
          hint="Selecciona la cantidad de equipos requeridos para iniciar el torneo y el límite de participantes permitidos."
          persistent-hint
          v-model="min_max"
          v-bind="min_max_props"
          strict
        >
        </v-range-slider>
      </template>
    </BaseInput>
    <BaseInput label="Cambios permitidos*" id="tournament-substitutions">
      <template #input>
        <v-text-field
          v-model="substitutions_per_team"
          v-bind="substitutions_per_team_props"
          step="1"
          type="number"
          :min="-1"
          hint="-1 para ilimitados"
          persistent-hint
          density="compact"

        >
        </v-text-field>
      </template>
    </BaseInput>
  </v-container>
</template>
