<script lang="ts" setup>
import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
import { boolean, date, mixed, number, object, string } from 'yup'
import '@vuepic/vue-datepicker/dist/main.css'
import {dragDropImageRef} from '~/composables/useImage'
import {vuetifyConfig} from '~/utils/constants'
import type {PlayerStoreRequest} from '~/models/Player'
import type {Team} from '~/models/Team'
import {storeToRefs, toTypedSchema, useCategoryStore, useI18n, usePlayerStore, useTeamStore} from '#imports'

const { t } = useI18n()
  const { isEdition, playerStoreRequest, steps } = storeToRefs(usePlayerStore())
  const { teams } = storeToRefs(useTeamStore())
  const { categories } = storeToRefs(useCategoryStore())
  //@ts-ignore
  const isPreRegister = computed(() => useRoute().name === 'equipos-equipo-jugadores-inscripcion')
  //@ts-ignore
  const { defineField, meta, errors, values } = useForm<PlayerStoreRequest['basic']>({
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
        last_name: string().nullable(),
        birthdate: date().required(t('forms.required')),
        nationality: string().nullable(),
        team_id: number().nullable(),
        category_id: number().nullable(),
        curp: string().nullable(),
        is_minor: boolean().nullable(),
      })
    ),
    initialValues: playerStoreRequest.value.basic,
  })
  const [name, name_props] = defineField('name', vuetifyConfig)
  const [image, image_props] = defineField('image', vuetifyConfig)
  const [last_name, last_name_props] = defineField('last_name', vuetifyConfig)
  const [birthdate, birthdate_props] = defineField('birthdate', vuetifyConfig)
  const [nationality, nationality_props] = defineField('nationality', vuetifyConfig)
  const [team_id, team_id_props] = defineField('team_id', vuetifyConfig)
  const [category_id, category_id_props] = defineField('category_id', vuetifyConfig)
  const [curp, curp_props] = defineField('curp', vuetifyConfig)
  const [is_minor, is_minor_props] = defineField('is_minor', vuetifyConfig)
  const updateCategory = (teamId: number) => {
    const selectedTeam = teams.value?.find((t: Team) => t.id === teamId)
    if (!selectedTeam) return
    // Prefer single category if present; fallback to first of categories array in preregister context
    const categoryId = (selectedTeam as Team)?.category?.id ?? (selectedTeam as any)?.categories?.[0]?.id
    // @ts-ignore
    if (categoryId) category_id.value = categoryId as number
  }
  onMounted(() => {
    if (!isPreRegister.value) {
      usePlayerStore().initPlayerForm()
    }
  })

  watch(
    () => category_id,
    (newCategory) => {
      if (!newCategory) return
      // If category not present but team is, derive it from selected team
      if (newCategory) updateCategory(team_id.value as number)
      nextTick(() => {
        if (image.value) dragDropImageRef.value?.loadImage()
      })
    }
  )
  watch(
    meta,
    () => {
      steps.value.steps[steps.value.current].disable = !meta.value.valid
      if (meta.value.valid && meta.value.touched) {
        playerStoreRequest.value.basic = { ...values }
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-container class="pt-0" id="player-step-1">
    <BaseInput label="Nombre(s)" placeholder="p.ej. Cristiano" v-model="name" :props="name_props"></BaseInput>
    <BaseInput
      placeholder="p.ej. Ronaldo"
      label="Apellido(s)"
      sublabel="Opcional"
      v-model="last_name"
      :props="last_name_props"
    />
    <BaseInput label="Fecha de nacimiento">
      <template #input>
        <BaseCalendarInput
          :max-date="new Date()"
          v-model:start_date="birthdate"
          v-model:end_date="birthdate"
          :multiCalendar="false"
          :error-messages="birthdate_props"
        />
      </template>
    </BaseInput>
    <BaseInput
      v-model="nationality"
      :pros="nationality_props"
      label="Nacionalidad"
      placeholder="p.ej. Mexicana"
      sublabel="Opcional"
    ></BaseInput>
    <BaseInput v-model="curp" :props="curp_props" label="CURP" sublabel="Opcional" placeholder="18 caracteres" />
    <BaseInput label="¿Es menor de edad?" sublabel="Opcional">
      <template #input>
        <v-switch v-model="is_minor" v-bind="is_minor_props" color="primary" hide-details inset />
      </template>
    </BaseInput>
    <BaseInput label="Imagen del jugador" sublabel="opcional">
      <template #input>
        <DragDropImage v-model="image" :error-messages="image_props" />
      </template>
    </BaseInput>
    <BaseInput label="Equipo" sublabel="Opcional">
      <template #input>
        <v-autocomplete
          item-value="id"
          :disabled="isPreRegister || isEdition"
          item-title="name"
          v-model="team_id"
          density="compact"
          v-bind="team_id_props"
          :items="teams"
          @update:model-value="updateCategory"
        />
      </template>
    </BaseInput>
    <BaseInput :disabled="isPreRegister" label="Categoría" sublabel="Opcional">
      <template #input>
        <v-select
          item-value="id"
          item-title="name"
          v-model="category_id"
          density="compact"
          disabled
          v-bind="category_id_props"
          :items="categories"
        />
      </template>
    </BaseInput>
  </v-container>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/players.sass"
  @use "~/assets/css/vue-datepicker-custom"
</style>
