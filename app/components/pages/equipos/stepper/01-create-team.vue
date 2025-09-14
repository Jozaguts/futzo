<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import CategorySelectComponent from '~/components/inputs/CategoriesSelect.vue'
  import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
  import ColorsComponent from '~/components/pages/equipos/colors-component.vue'
  import { VPhoneInput } from 'v-phone-input'
  import { dragDropImageRef } from '~/composables/useImage'
  import { usePlaceSearch } from '~/utils/googleSearch'
  import { useForm } from 'vee-validate'
  import type { CreateTeamForm, TeamStoreRequest } from '~/models/Team'
  import { array, mixed, number, object, string } from 'yup'
  import { vuetifyConfig } from '~/utils/constants'

  let locationsFind = ref([])
  const { tournaments, tournament } = storeToRefs(useTournamentStore())
  const { teamStoreRequest, isEdition, steps } = storeToRefs(useTeamStore())
  const { search } = usePlaceSearch()
  const { t } = useI18n()
  const { defineField, meta, values, resetForm, setValues, errors } = useForm<TeamStoreRequest['team']>({
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
        address: object()
          .shape({
            description: string(),
            matched_substrings: array().of(string()),
            place_id: string(),
            reference: string(),
            structured_formatting: object().shape({
              main_text: string(),
              secondary_text: string(),
              main_text_matched_substrings: array().of(object().shape({ fg: array() })),
              terms: array().of(string()),
              types: array().of(string()),
            }),
          })
          .nullable(),
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
        email: string().email().nullable(),
        tournament_id: number().required(t('forms.required')),
        phone: string()
          .transform((value) => (value === '' ? null : value))
          .nullable()
          .notRequired()
          .matches(/^(\+52)?(\d{10})$/, 'Número de teléfono no es válido'),
      })
    ),
    initialValues: teamStoreRequest.value.team,
  })
  const [id, id_props] = defineField('id', vuetifyConfig)
  const [name, name_props] = defineField('name', vuetifyConfig)
  const [address, address_props] = defineField('address', vuetifyConfig)
  const [image, image_props] = defineField('image', vuetifyConfig)
  const [category_id, category_id_props] = defineField('category_id', vuetifyConfig)
  const [tournament_id, tournament_id_props] = defineField('tournament_id', vuetifyConfig)
  const [phone, phone_props] = defineField('phone', vuetifyConfig)
  const [email, email_props] = defineField('email', vuetifyConfig)
  const [description, description_props] = defineField('description', vuetifyConfig)
  const [colors, colors_props] = defineField('colors', vuetifyConfig)
  const searchHandler = async (place: string) => {
    const response = await search(place)
    if (response) {
      locationsFind.value = response
    }
  }
  const categoryHandler = (value?: number) => {
    if (!value) {
      return
    }
    const t = tournaments.value.find((tournament) => tournament.id === value)
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
  onMounted(() => {
    if (teamStoreRequest.value?.team) {
      setValues({ ...teamStoreRequest.value.team })
      if (teamStoreRequest.value.team.image) {
        dragDropImageRef.value?.loadImage()
      }
    }
    //@ts-ignore
    if (useRoute().name === 'torneos-torneo-inscripcion') {
      setValues({
        tournament_id: tournament.value.id,
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
  <pre>
    {{ errors }}
  </pre>
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
    <BaseInput label="Dirección" sublabel="Opcional">
      <template #input>
        <v-autocomplete
          v-model="address"
          :items="locationsFind"
          outlined
          return-object
          hide-selected
          clear-on-select
          clearable
          density="compact"
          no-filter
          v-bind="address_props"
          @update:search="searchHandler($event)"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              two-line
              :title="item.value.structured_formatting.main_text"
              :subtitle="item.value.structured_formatting.secondary_text"
            ></v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <v-list-item>
              <v-list-item-title v-text="item.value.structured_formatting.main_text"></v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>
      </template>
    </BaseInput>
    <BaseInput label="Colores del equipo" sublabel="Opcional">
      <template #input>
        <ColorsComponent v-model:model-value="colors" :errors="colors_props" />
      </template>
    </BaseInput>
  </v-container>
</template>
