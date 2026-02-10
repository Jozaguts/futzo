<script lang="ts" setup>
import DragDropImage from '~/components/pages/torneos/drag-drop-image.vue'
import {boolean, date, mixed, number, object, string} from 'yup'
import '@vuepic/vue-datepicker/dist/main.css'
import {dragDropImageRef} from '~/composables/useImage'
import {vuetifyConfig} from '~/utils/constants'
import type {PlayerStoreRequest} from '~/models/Player'
import type {Team} from '~/models/Team'
import type {PlayerVerificationMethod, PlayerVerificationSettings} from '~/models/settings'
import type {User} from '~/models/User'
import * as settingsAPI from '~/http/api/settings'
import {storeToRefs, toTypedSchema, useCategoryStore, useI18n, usePlayerStore, useTeamStore} from '#imports'

const { t } = useI18n()
  const { isEdition, playerStoreRequest, steps } = storeToRefs(usePlayerStore())
  const { teams } = storeToRefs(useTeamStore())
  const { categories } = storeToRefs(useCategoryStore())
  //@ts-ignore
  const isPreRegister = computed(() => useRoute().name === 'equipos-equipo-jugadores-inscripcion')
  const user = useSanctumUser<User>()
  const isGuest = computed(() => !user.value?.email && !user.value?.phone)
  const teamSlug = computed(() => String(useRoute().params?.equipo ?? ''))
  const initialBasicValues = {
    ...playerStoreRequest.value.basic,
    birthdate: isEdition.value ? playerStoreRequest.value.basic?.birthdate ?? null : null,
    name: [playerStoreRequest.value.basic?.name, playerStoreRequest.value.basic?.last_name].filter(Boolean).join(' ').trim(),
  }
  const fileFromInput = (value: File | File[] | string | null | undefined) => {
    if (!value) return null
    if (Array.isArray(value)) return value[0] ?? null
    return value
  }
  //@ts-ignore
  const { defineField, meta, values } = useForm<PlayerStoreRequest['basic']>({
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
        birthdate: date().required(t('forms.required')),
        team_id: number().nullable(),
        category_id: number().nullable(),
        is_minor: boolean().nullable(),
        identification_method: string()
          .nullable()
          .test('required-when-needed', t('forms.required'), (value) => {
            if (!requiresVerification.value) return true
            return !!value
          }),
        identification_document: mixed()
          .nullable()
          .test('required-when-needed', t('forms.required'), (value: any) => {
            if (!requiresVerification.value || isEdition.value) return true
            return !!fileFromInput(value)
          })
          .test('file-type', 'Solo PDF o imágenes (jpg, png)', (value: any) => {
            const file = fileFromInput(value)
            if (!file || typeof file === 'string') return true
            const type = file.type ?? ''
            return type.includes('pdf') || type.includes('image/jpeg') || type.includes('image/png')
          }),
      })
    ),
    initialValues: initialBasicValues,
  })
  const [name, name_props] = defineField('name', vuetifyConfig)
  const [image, image_props] = defineField('image', vuetifyConfig)
  const [birthdate, birthdate_props] = defineField('birthdate', vuetifyConfig)
  const [team_id, team_id_props] = defineField('team_id', vuetifyConfig)
  const [category_id, category_id_props] = defineField('category_id', vuetifyConfig)
  const [is_minor] = defineField('is_minor', vuetifyConfig)
  const [identification_method, identification_method_props] = defineField('identification_method', vuetifyConfig)
  const [identification_document, identification_document_props] = defineField('identification_document', vuetifyConfig)
  const verificationSettings = ref<PlayerVerificationSettings | null>(null)
  const tournamentVerificationOverride = ref<boolean | null>(null)

  const verificationOptions: Array<{ title: string; value: PlayerVerificationMethod }> = [
    { title: 'CURP', value: 'curp' },
    { title: 'INE', value: 'ine' },
    { title: 'Pasaporte', value: 'passport' },
    { title: 'Otro', value: 'other' },
  ]

  const allowedVerificationMethods = computed<PlayerVerificationMethod[]>(() => {
    const methods = verificationSettings.value?.player_verification_methods
    if (Array.isArray(methods) && methods.length > 0) return methods
    const legacy = verificationSettings.value?.player_verification_method
    return legacy ? [legacy] : []
  })

  const identificationOptions = computed(() =>
    verificationOptions.filter((option) => allowedVerificationMethods.value.includes(option.value))
  )

  const selectedTeam = computed(() => teams.value?.find((team: Team) => team.id === team_id.value))
  const selectedTournamentId = computed(
    () => selectedTeam.value?.tournament?.id ?? (selectedTeam.value as any)?.tournament_id ?? null
  )

  const requiresVerification = computed(() => {
    if (tournamentVerificationOverride.value !== null && tournamentVerificationOverride.value !== undefined) {
      return !!tournamentVerificationOverride.value
    }
    return !!verificationSettings.value?.requires_player_verification
  })

  const splitFullName = (value?: string | null) => {
    const cleaned = value?.trim().replace(/\s+/g, ' ') ?? ''
    if (!cleaned) {
      return { firstName: '', lastName: null }
    }
    const parts = cleaned.split(' ')
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(' ') || null,
    }
  }

  const computeIsMinor = (value?: string | Date | null) => {
    if (!value) return null
    const dateValue = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(dateValue.getTime())) return null
    const today = new Date()
    let age = today.getFullYear() - dateValue.getFullYear()
    const monthDiff = today.getMonth() - dateValue.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateValue.getDate())) {
      age -= 1
    }
    return age < 18
  }
  const updateCategory = (teamId: number) => {
    const selectedTeam = teams.value?.find((t: Team) => t.id === teamId)
    if (!selectedTeam) return
    // Prefer single category if present; fallback to first of categories array in preregister context
    const categoryId = (selectedTeam as Team)?.category?.id ?? (selectedTeam as any)?.categories?.[0]?.id
    // @ts-ignore
    if (categoryId) category_id.value = categoryId as number
  }
  const fetchVerificationSettings = async () => {
    try {
      if (isPreRegister.value && isGuest.value && teamSlug.value) {
        verificationSettings.value = await settingsAPI.getPlayerVerificationSettingsPublic(teamSlug.value)
        return
      }
      verificationSettings.value = await settingsAPI.getPlayerVerificationSettings()
    } catch {
      verificationSettings.value = null
    }
  }

  onMounted(() => {
    if (!isPreRegister.value) {
      usePlayerStore().initPlayerForm()
    }
    fetchVerificationSettings()
  })

  watch(
    selectedTournamentId,
    (tournamentId) => {
      if (!tournamentId) {
        tournamentVerificationOverride.value = null
        return
      }
      if (isGuest.value) {
        tournamentVerificationOverride.value = null
        return
      }
      settingsAPI
        .getTournamentConfiguration(tournamentId)
        .then((response) => {
          tournamentVerificationOverride.value = response.requires_player_verification ?? null
        })
        .catch(() => {
          tournamentVerificationOverride.value = null
        })
    },
    { immediate: true }
  )

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
    birthdate,
    (value) => {
      is_minor.value = computeIsMinor(value)
    },
    { immediate: true }
  )

  watch(
    [() => requiresVerification.value, () => allowedVerificationMethods.value],
    ([value]) => {
      if (!value) {
        identification_method.value = null
        identification_document.value = null
      } else if (!identification_method.value && allowedVerificationMethods.value.length > 0) {
        identification_method.value = allowedVerificationMethods.value[0]
      }
    },
    { immediate: true }
  )
  watch(
    meta,
    () => {
      steps.value.steps[steps.value.current].disable = !meta.value.valid
      if (meta.value.valid && meta.value.touched) {
        const { firstName, lastName } = splitFullName(values.name)
        playerStoreRequest.value.basic = {
          ...values,
          name: firstName,
          last_name: lastName ?? null,
          is_minor: is_minor.value ?? null,
          identification_document: fileFromInput(values.identification_document as any),
        }
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-container class="pt-0" id="player-step-1">
    <BaseInput label="Nombre completo" placeholder="p.ej. Cristiano Ronaldo" v-model="name" :props="name_props" />
    <BaseInput label="Fecha de nacimiento">
      <template #input>
        <BaseCalendarInput
          :max-date="new Date()"
          v-model:start_date="birthdate"
          v-model:end_date="birthdate"
          :multiCalendar="false"
          start-empty
          :error-messages="birthdate_props"
        />
      </template>
    </BaseInput>
    <BaseInput v-if="requiresVerification" label="Identificación">
      <template #input>
        <v-select
          v-model="identification_method"
          :items="identificationOptions"
          item-title="title"
          item-value="value"
          density="compact"
          variant="outlined"
          :disabled="identificationOptions.length === 0"
          placeholder="Selecciona un método"
          v-bind="identification_method_props"
        />
      </template>
    </BaseInput>
    <BaseInput v-if="requiresVerification" label="Documento de identificación">
      <template #input>
        <v-file-input
          v-model="identification_document"
          density="comfortable"
          variant="outlined"
          accept=".pdf,.jpg,.jpeg,.png"
          :show-size="true"
          v-bind="identification_document_props"
        />
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
