<script lang="ts" setup>
  import useSchemas from '~/composables/useSchemas'
  import type { AutocompletePrediction, Prediction } from '~/interfaces'
  import { useForm } from 'vee-validate'
  import type { TournamentStoreRequest } from '~/models/tournament'
  import { object } from 'yup'
  import * as yup from 'yup'
  import { vuetifyConfig } from '~/utils/constants'
  import type { Field } from '~/models/Location'

  const { isEdition, tournamentStoreRequest, dialog, steps } = storeToRefs(useTournamentStore())
  const { t } = useI18n()
  const { defineField, handleSubmit, resetForm } = useForm<TournamentStoreRequest['details']>({
    validationSchema: toTypedSchema(
      object({
        location_ids: yup.array().of(yup.number()).required(t('forms.required')),
        prize: yup
          .string()
          .test('no-leading-space', 'No se permite espacio en blanco al inicio', (value) => {
            return !(value && value.startsWith(' '))
          })
          .nullable(),
        description: yup
          .string()
          .test('no-leading-space', 'No se permite espacio en blanco al inicio', (value) => {
            return !(value && value.startsWith(' '))
          })
          .nullable(),
        // estos dos no se ven en el formulario, por lo menos a la hora de crear el torneo
        status: yup
          .string()
          .test('no-leading-space', 'No se permite espacio en blanco al inicio', (value) => {
            return !(value && value.startsWith(' '))
          })
          .nullable(),
        winner: yup
          .string()
          .test('no-leading-space', 'No se permite espacio en blanco al inicio', (value) => {
            return !(value && value.startsWith(' '))
          })
          .nullable(),
      })
    ),
    initialValues: tournamentStoreRequest.value.details,
  })
  const [location_ids, location_ids_props] = defineField('location_ids', vuetifyConfig)
  const [prize, prize_props] = defineField('prize', vuetifyConfig)
  const [winner, winner_props] = defineField('winner', vuetifyConfig)
  const [description, description_props] = defineField('description', vuetifyConfig)
  const [status, status_props] = defineField('status', vuetifyConfig)
  const search2 = ref('')
  const fields = ref<Field[]>([] as Field[])
  const searchHandler2 = (term: string) => console.log(term)
  const nextHandler = () => {}
  onMounted(() => {
    useLeaguesStore()
      .getLeagueLocations()
      .then((locations) => {
        fields.value = locations
      })
  })
  onUnmounted(() => {
    resetForm()
  })
</script>
<template>
  <v-container class="container">
    <BaseInput label="Ubicaciones*" sublabel="Donde se llevaran acabo los partidos">
      <template #input>
        <v-autocomplete
          multiple
          item-value="id"
          item-title="name"
          :item-props="(item) => ({ title: item?.name, subtitle: `Campos disponibles :${item?.field_count}` })"
          :search="search2"
          :items="fields"
          v-model="location_ids"
          v-bind="location_ids_props"
          @update:search="searchHandler2"
        >
        </v-autocomplete>
      </template>
    </BaseInput>
    <BaseInput label="Premio">
      <template #input>
        <v-text-field
          placeholder="p.ej. trofeo y premio en efectivo..."
          density="compact"
          variant="outlined"
          v-model="prize"
          v-bind="prize_props"
        >
          <template #append-inner>
            <Icon name="futzo-icon:help-circle" class="cursor-pointer"></Icon>
            <v-tooltip activator="parent">Premio será otorgado al finalizar el torneo.</v-tooltip>
          </template>
        </v-text-field>
      </template>
    </BaseInput>
    <BaseInput label="Descripción">
      <template #input>
        <v-textarea
          v-model="description"
          v-bind="description_props"
          variant="outlined"
          dense
          rows="2"
          class="rounded-lg"
          placeholder="Una breve descripción del torneo..."
        ></v-textarea>
      </template>
    </BaseInput>
  </v-container>
</template>
