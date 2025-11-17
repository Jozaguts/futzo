<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import CategorySelectComponent from '~/components/inputs/CategoriesSelect.vue'
  import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
  import ColorsComponent from '~/components/pages/equipos/colors-component.vue'
  import { VueDatePicker } from '@vuepic/vue-datepicker'
  import { useForm } from 'vee-validate'
  import type { TeamStoreRequest } from '~/models/Team'
  import { mixed, number, object, string } from 'yup'
  import { vuetifyConfig } from '~/utils/constants'
  import type { Tournament } from '~/models/tournament'
  import type { Field } from '~/models/Location'
  import { useLeaguesStore } from '~/stores/useLeaguesStore'

  const leagueLocations = ref<Field[]>([])
  const { tournaments, tournament } = storeToRefs(useTournamentStore())
  const { teamStoreRequest, isEdition, steps } = storeToRefs(useTeamStore())
  const { getLeagueLocations } = useLeaguesStore()
  const { t } = useI18n()
  // @ts-ignore
  const { defineField, meta, values, resetForm, setValues } = useForm<TeamStoreRequest['team']>({
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
        category_id: number().required(t('forms.required')),
        home_location_id: number().nullable(),
        home_day_of_week: number()
          .nullable()
          .when('home_location_id', {
            is: (value: number | null) => value !== null && value !== undefined,
            then: (schema) => schema.required(t('forms.required')),
          }),
        home_start_time: string()
          .nullable()
          .when('home_location_id', {
            is: (value: number | null) => value !== null && value !== undefined,
            then: (schema) => schema.required(t('forms.required')),
          }),
        colors: object()
          .shape({
            home: object().shape({
              primary: string(),
              secondary: string(),
            }),
            away: object().shape({
              primary: string(),
              secondary: string(),
            }),
          })
          .nullable(),
        description: string().nullable(),
        tournament_id: number().required(t('forms.required')),
      })
    ),
    initialValues: {
      home_location_id: null,
      home_day_of_week: null,
      home_start_time: null,
      ...teamStoreRequest.value.team,
    },
  })
  const [id, id_props] = defineField('id', vuetifyConfig)
  const [name, name_props] = defineField('name', vuetifyConfig)
  const [home_location_id, home_location_id_props] = defineField('home_location_id', vuetifyConfig)
  const [home_day_of_week, home_day_of_week_props] = defineField('home_day_of_week', vuetifyConfig)
  const [home_start_time, home_start_time_props] = defineField('home_start_time', vuetifyConfig)
  const [image, image_props] = defineField('image', vuetifyConfig)
  const [category_id, category_id_props] = defineField('category_id', vuetifyConfig)
  const [tournament_id, tournament_id_props] = defineField('tournament_id', vuetifyConfig)
  const [description, description_props] = defineField('description', vuetifyConfig)
  const [colors, colors_props] = defineField('colors', vuetifyConfig)
  const isLocationSelected = computed(() => home_location_id.value !== null && home_location_id.value !== undefined)
  const dayOptions = [
    { label: 'Domingo', value: 0 },
    { label: 'Lunes', value: 1 },
    { label: 'Martes', value: 2 },
    { label: 'Miércoles', value: 3 },
    { label: 'Jueves', value: 4 },
    { label: 'Viernes', value: 5 },
    { label: 'Sábado', value: 6 },
  ]
  const timeFieldErrors = computed(() => (home_start_time_props as any)['error-messages'])
  const homeStartTimeProxy = computed({
    get: () => {
      if (!home_start_time.value) {
        return null
      }
      const [hours, minutes] = home_start_time.value.split(':')
      if (hours === undefined || minutes === undefined) {
        return null
      }
      const date = new Date()
      date.setHours(Number(hours), Number(minutes), 0, 0)
      return date
    },
    set: (val: any) => {
      if (!val) {
        home_start_time.value = null
        return
      }
      if (val instanceof Date) {
        const hours = String(val.getHours()).padStart(2, '0')
        const minutes = String(val.getMinutes()).padStart(2, '0')
        home_start_time.value = `${hours}:${minutes}`
        return
      }
      if (typeof val === 'object' && val !== null && 'hours' in val && 'minutes' in val) {
        const hours = String((val as { hours: number }).hours).padStart(2, '0')
        const minutes = String((val as { minutes: number }).minutes).padStart(2, '0')
        home_start_time.value = `${hours}:${minutes}`
        return
      }
      if (typeof val === 'string') {
        const [hours, minutes] = val.split(':')
        if (hours !== undefined && minutes !== undefined) {
          home_start_time.value = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
        }
      }
    },
  })
  watch(
    () => home_location_id.value,
    (value) => {
      if (!value) {
        home_day_of_week.value = null
        home_start_time.value = null
      }
    }
  )
  const categoryHandler = (value?: number) => {
    if (!value) {
      return
    }
    const t = tournaments.value.find<Tournament>((tournament: Tournament) => tournament.id === value)
    category_id.value = t.category_id
  }
  const isInscription = computed(() => {
    //@ts-ignore
    return useRoute().name === 'torneos-torneo-inscripcion'
  })
  const isPreInscription = computed(() => {
    //@ts-ignore
    return useRoute().name === 'torneos-torneo-equipos-inscripcion'
  })
  onMounted(async () => {
    try {
      const locations = await getLeagueLocations()
      leagueLocations.value = locations ?? []
    } catch (error) {
      leagueLocations.value = []
    }
    //@ts-ignore
    if (useRoute().name === 'torneos-torneo-inscripcion') {
      setValues({
        ...values.value,
        tournament_id: tournament.value.id as number,
        category_id: tournament.value?.category_id,
      })
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
        teamStoreRequest.value.team = { ...values }
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-container class="container" style="min-height: 480px">
    <BaseInput v-model="name" :props="name_props" label="Nombre del equipo" placeholder="p.ej. Equipo de verano" />
    <BaseInput label="Torneo">
      <template #input>
        <v-select
          placeholder="p.ej. Clausura"
          item-title="name"
          item-value="id"
          clearable
          :items="tournaments"
          outlined
          :disabled="isEdition || isInscription || isPreInscription"
          v-model="tournament_id"
          v-bind="tournament_id_props"
          density="compact"
          @update:model-value="categoryHandler"
        >
        </v-select>
      </template>
    </BaseInput>
    <BaseInput label="Categoría">
      <template #input>
        <CategorySelectComponent v-model="category_id" :errors="category_id_props" />
      </template>
    </BaseInput>
    <BaseInput label="Imagen del equipo" sublabel="Opcional">
      <template #input>
        <DragDropImage v-model="image" :error-messages="image_props" />
      </template>
    </BaseInput>
    <BaseInput label="Sede" sublabel="Opcional">
      <template #input>
        <v-select
          v-model="home_location_id"
          :items="leagueLocations"
          item-title="name"
          item-value="id"
          clearable
          outlined
          density="compact"
          v-bind="home_location_id_props"
          placeholder="Selecciona una sede"
        ></v-select>
      </template>
    </BaseInput>
    <BaseInput label="Día de juego" sublabel="Opcional">
      <template #input>
        <v-select
          v-model="home_day_of_week"
          :items="dayOptions"
          item-title="label"
          item-value="value"
          clearable
          outlined
          density="compact"
          :disabled="!isLocationSelected"
          v-bind="home_day_of_week_props"
          placeholder="Selecciona un día"
        ></v-select>
      </template>
    </BaseInput>
    <BaseInput label="Horario de juego" sublabel="Opcional">
      <template #input>
        <VueDatePicker
          v-model="homeStartTimeProxy"
          time-picker
          :is-24="true"
          :disabled="!isLocationSelected"
          :minutes-increment="5"
        >
          <template #dp-input="{ value }">
            <v-text-field
              :value="value"
              placeholder="HH:MM"
              density="compact"
              variant="outlined"
              :disabled="!isLocationSelected"
              :error-messages="timeFieldErrors"
              readonly
            ></v-text-field>
          </template>
        </VueDatePicker>
        <input type="hidden" v-model="home_start_time" v-bind="home_start_time_props" />
      </template>
    </BaseInput>
    <BaseInput label="Colores del equipo" sublabel="Opcional">
      <template #input>
        <ColorsComponent v-model:model-value="colors" :errors="colors_props" />
      </template>
    </BaseInput>
  </v-container>
</template>
