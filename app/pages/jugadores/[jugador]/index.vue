<script lang="ts" setup>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/es'
import AppBar from '~/components/layout/AppBar.vue'
import PageLayout from '~/components/shared/PageLayout.vue'
import type {Player, PlayerVerificationStatus} from '~/models/Player'
import type {Team} from '~/models/Team'
import type {Tournament} from '~/models/tournament'

dayjs.extend(customParseFormat)
  dayjs.locale('es')

  definePageMeta({
    middleware: ['sanctum:auth'],
  })

  type PlayerPerformanceStats = {
    games_played?: number
    games?: number
    goals?: number
    assists?: number
    yellow_cards?: number
    red_cards?: number
    fouls?: number
    fouls_committed?: number
    tournaments?: number
    tournaments_played?: number
    minutes_played?: number
    clean_sheets?: number
  }

  type PlayerExtended = Player & {
    last_name?: string | null
    birthdate?: string | Date | null
    nationality?: string | null
    image?: string | null
    dominant_foot?: string | null
    medical_notes?: string | null
    notes?: string | null
    iso_code?: number | string | null
    height?: number | null
    weight?: number | null
    stats?: PlayerPerformanceStats
    teams?: Team[]
    tournaments?: Tournament[]
    category?: Team['category'] | null
    number_of_goals?: number | null
    curp?: string | null
    is_minor?: boolean | null
    guardian?: {
      name?: string | null
      email?: string | null
      phone?: string | null
      relationship?: string | null
    } | null
    verification?: {
      status?: PlayerVerificationStatus | null
      verified_at?: string | null
      verified_by?: number | null
      notes?: string | null
      documents?: {
        document_url?: string | null
        photo_url?: string | null
      } | null
    } | null
    team_lock?: {
      expires_at?: string | null
      released_at?: string | null
      released_by?: number | null
      team_id?: number | null
      tournament_id?: number | null
    } | null
  }

  const route = useRoute()
  const router = useRouter()
  const playerStore = usePlayerStore()
  const { player } = storeToRefs(playerStore)
  const positionsStore = usePositionsStore()
  const { positions } = storeToRefs(positionsStore)
  const loading = ref(true)

  const fetchPlayer = async () => {
    if (!route.params.jugador) {
      loading.value = false
      return
    }
    loading.value = true
    await playerStore.getPlayer(route.params.jugador as string)
    loading.value = false
  }

  watch(
    () => route.params.jugador,
    async (value, oldValue) => {
      if (value && value !== oldValue) {
        await fetchPlayer()
      }
    }
  )

  const ensurePositionsLoaded = async () => {
    if (positions.value.length) {
      return
    }
    try {
      await positionsStore.fetchPositions()
    } catch (error) {
      console.error('Error al cargar posiciones', error)
    }
  }

  const currentPlayer = computed<PlayerExtended | null>(() => {
    return player.value ? (player.value as PlayerExtended) : null
  })

  const formatText = (value: string | number | null | undefined, suffix = '') => {
    if (value === null || value === undefined) return 'Sin registro'
    const parsed = typeof value === 'string' ? value.trim() : value
    if (parsed === '') return 'Sin registro'
    return suffix ? `${parsed} ${suffix}` : `${parsed}`
  }

  const numberFormatter = new Intl.NumberFormat('es-MX')
  const toNumber = (value?: number | string | null) => {
    if (value === null || value === undefined) return 0
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }
  const formatNumeric = (value?: number | string | null) => numberFormatter.format(toNumber(value))

  const playerFullName = computed(() => {
    if (!currentPlayer.value) return ''
    return [currentPlayer.value.name, currentPlayer.value.last_name].filter(Boolean).join(' ').trim()
  })

  const initials = computed(() => {
    if (!playerFullName.value) return currentPlayer.value?.name?.[0]?.toUpperCase() ?? 'J'
    return playerFullName.value
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase()
  })

  const avatar = computed(
    () => currentPlayer.value?.image ?? currentPlayer.value?.user?.image ?? currentPlayer.value?.team?.image ?? ''
  )

  const formatDate = (value?: string | Date | null) => {
    if (!value) return 'Sin registro'
    const parsed = dayjs(value)
    return parsed.isValid() ? parsed.format('DD MMM YYYY') : 'Sin registro'
  }

  const parseLockDate = (value?: string | null) => {
    if (!value) return null
    const parsed = dayjs(value, ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD', 'DD [de] MMMM YYYY', 'DD [de] MMMM YYYY HH:mm'], 'es', true)
    return parsed.isValid() ? parsed : null
  }

  const formatDateTime = (value?: string | null) => {
    if (!value) return 'Sin registro'
    const parsed = parseLockDate(value)
    return parsed ? parsed.format('DD [de] MMMM YYYY') : value
  }

  const playerAge = computed(() => {
    const birthdate = currentPlayer.value?.birthdate
    if (!birthdate) return null
    const parsed = dayjs(birthdate)
    if (!parsed.isValid()) return null
    const diff = dayjs().diff(parsed, 'year')
    return diff > 0 ? diff : null
  })

  const heroMeta = computed(() => [
    {
      label: 'Edad',
      value: playerAge.value ? `${playerAge.value} años` : 'Sin registro',
    },
    {
      label: 'Altura',
      value: formatText(currentPlayer.value?.height, 'cm'),
    },
    {
      label: 'Peso',
      value: formatText(currentPlayer.value?.weight, 'kg'),
    },
  ])

  const playerTeams = computed<Team[]>(() => {
    if (!currentPlayer.value) return []
    if (currentPlayer.value?.teams?.length) return currentPlayer.value.teams
    return currentPlayer.value.team ? [currentPlayer.value.team] : []
  })

  const teamCategoryLabel = computed(() => {
    if (!currentPlayer.value) return ''
    return playerTeams.value[0]?.category?.name ?? currentPlayer.value?.category?.name ?? ''
  })

  const phoneValue = computed(() => {
    const iso = currentPlayer.value?.iso_code
    const phone = currentPlayer.value?.phone
    if (!phone) return 'Sin registro'
    const normalized = phone.replace(/\s+/g, '')
    return iso ? `+${iso} ${normalized}` : normalized
  })

  const tournamentList = computed<Tournament[]>(() => {
    const tournaments = currentPlayer.value?.tournaments?.length
      ? currentPlayer.value.tournaments
      : playerTeams.value
          .map((team) => team.tournament)
          .filter((tournament): tournament is Tournament => Boolean(tournament))
    const unique = new Map<number, Tournament>()
    tournaments?.forEach((tournament) => unique.set(tournament.id, tournament))
    return Array.from(unique.values())
  })

  const statsHighlights = computed(() => {
    const stats = currentPlayer.value?.stats ?? {}
    const tournamentsCount = stats.tournaments ?? stats.tournaments_played ?? tournamentList.value.length
    const items = [
      { label: 'Partidos jugados', value: stats.games_played ?? stats.games ?? 0 },
      { label: 'Torneos', value: tournamentsCount ?? 0 },
      { label: 'Goles', value: stats.goals ?? currentPlayer.value?.number_of_goals ?? 0 },
      { label: 'Asistencias', value: stats.assists ?? 0 },
      { label: 'Faltas', value: stats.fouls ?? stats.fouls_committed ?? 0 },
      { label: 'Tarjetas amarillas', value: stats.yellow_cards ?? 0 },
      { label: 'Tarjetas rojas', value: stats.red_cards ?? 0 },
      { label: 'Minutos jugados', value: stats.minutes_played ?? 0 },
      { label: 'Porterías en cero', value: stats.clean_sheets ?? 0 },
    ]
    return items.map((item) => ({
      ...item,
      value: formatNumeric(item.value),
    }))
  })

  const positionLabel = computed(() => currentPlayer.value?.position?.name ?? 'Posición sin asignar')

  const verificationStatus = computed(() => currentPlayer.value?.verification?.status ?? null)
  const verificationStatusLabel = computed(() => {
    switch (verificationStatus.value) {
      case 'approved':
        return 'Aprobado'
      case 'pending':
        return 'Pendiente'
      case 'rejected':
        return 'Rechazado'
      case 'not_required':
        return 'No requerido'
      default:
        return 'Sin registro'
    }
  })
  const verificationNotes = computed(() => currentPlayer.value?.verification?.notes ?? '')
  const verificationDocumentUrl = computed(() => currentPlayer.value?.verification?.documents?.document_url ?? null)
  const verificationPhotoUrl = computed(() => currentPlayer.value?.verification?.documents?.photo_url ?? null)

  const lockExpiresAt = computed(() => currentPlayer.value?.team_lock?.expires_at ?? null)
  const lockReleasedAt = computed(() => currentPlayer.value?.team_lock?.released_at ?? null)
  const isLockActive = computed(() => {
    if (!lockExpiresAt.value) return false
    if (lockReleasedAt.value) return false
    const parsed = parseLockDate(lockExpiresAt.value)
    if (!parsed) return true
    return parsed.isAfter(dayjs())
  })
  const lockStatusLabel = computed(() => {
    if (isLockActive.value) {
      return `Bloqueado hasta ${formatDateTime(lockExpiresAt.value)}`
    }
    if (lockReleasedAt.value) {
      return `Liberado el ${formatDateTime(lockReleasedAt.value)}`
    }
    return 'Sin bloqueo activo'
  })

  const verificationDocument = ref<File | File[] | null>(null)
  const verificationPhoto = ref<File | File[] | null>(null)
  const isUploadingVerification = ref(false)
  const isApprovingVerification = ref(false)
  const isRejectingVerification = ref(false)
  const isReleasingLock = ref(false)
  const rejectDialog = ref(false)
  const rejectNotes = ref('')

  const submitVerification = async () => {
    const documentFile = Array.isArray(verificationDocument.value)
      ? verificationDocument.value[0]
      : verificationDocument.value
    const photoFile = Array.isArray(verificationPhoto.value) ? verificationPhoto.value[0] : verificationPhoto.value

    if (!currentPlayer.value?.id || !documentFile) return
    isUploadingVerification.value = true
    try {
      await playerStore.uploadVerification(currentPlayer.value.id, documentFile, photoFile ?? null)
      verificationDocument.value = null
      verificationPhoto.value = null
      await fetchPlayer()
    } finally {
      isUploadingVerification.value = false
    }
  }

  const approveVerificationHandler = async () => {
    if (!currentPlayer.value?.id) return
    isApprovingVerification.value = true
    try {
      await playerStore.approveVerification(currentPlayer.value.id)
      await fetchPlayer()
    } finally {
      isApprovingVerification.value = false
    }
  }

  const rejectVerificationHandler = async () => {
    if (!currentPlayer.value?.id || !rejectNotes.value) return
    isRejectingVerification.value = true
    try {
      await playerStore.rejectVerification(currentPlayer.value.id, rejectNotes.value)
      rejectDialog.value = false
      rejectNotes.value = ''
      await fetchPlayer()
    } finally {
      isRejectingVerification.value = false
    }
  }

  const releaseLockHandler = async () => {
    if (!currentPlayer.value?.id) return
    isReleasingLock.value = true
    try {
      await playerStore.releasePlayer(currentPlayer.value.id)
      await fetchPlayer()
    } finally {
      isReleasingLock.value = false
    }
  }

  const createDefaultEditableFields = () => ({
    name: '',
    last_name: '',
    birthdate: '',
    nationality: '',
    curp: '',
    is_minor: '',
    team_name: '',
    category_name: '',
    position_id: null as number | null,
    number: '',
    height: '',
    weight: '',
    dominant_foot: '',
    medical_notes: '',
    email: '',
    phone: '',
    notes: '',
    guardian_name: '',
    guardian_email: '',
    guardian_phone: '',
    guardian_relationship: '',
  })

  type EditableFields = ReturnType<typeof createDefaultEditableFields>

  type DetailSectionItem = {
    label: string
    field: keyof EditableFields
    fullWidth?: boolean
    displayFormatter?: (value: string | number | null | undefined) => string
    type?: 'text' | 'select'
    inputType?: string
    readonly?: boolean
    updatable?: boolean
  }

  type DetailSectionConfig = {
    id: string
    title: string
    description: string
    items: DetailSectionItem[]
  }

  const getPositionLabelById = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === '') {
      return 'Sin registro'
    }
    const normalizedValue = typeof value === 'string' ? Number(value) : value
    const match = positions.value.find((position) => position.id === normalizedValue)
    return match?.name ?? 'Sin registro'
  }

  const detailSections: DetailSectionConfig[] = [
    {
      id: 'basic',
      title: 'Información básica',
      description: 'Datos generales proporcionados durante el registro.',
      items: [
        { label: 'Nombre(s)', field: 'name' },
        { label: 'Apellido(s)', field: 'last_name' },
        {
          label: 'Fecha de nacimiento',
          field: 'birthdate',
          inputType: 'date',
          displayFormatter: (value) => formatDate(value as string),
        },
        { label: 'Nacionalidad', field: 'nationality' },
        {
          label: 'CURP',
          field: 'curp',
          readonly: true,
          updatable: false,
          displayFormatter: (value) => formatText(value),
        },
        {
          label: 'Menor de edad',
          field: 'is_minor',
          readonly: true,
          updatable: false,
          displayFormatter: (value) => formatText(value),
        },
        {
          label: 'Equipo actual',
          field: 'team_name',
          readonly: true,
          updatable: false,
          displayFormatter: (value) => formatText(value),
        },
        {
          label: 'Categoría',
          field: 'category_name',
          readonly: true,
          updatable: false,
          displayFormatter: (value) => formatText(value),
        },
      ],
    },
    {
      id: 'details',
      title: 'Detalles del jugador',
      description: 'Información deportiva y física del jugador.',
      items: [
        {
          label: 'Posición',
          field: 'position_id',
          type: 'select',
          displayFormatter: (value) => getPositionLabelById(value),
        },
        { label: 'Dorsal', field: 'number' },
        { label: 'Altura', field: 'height', displayFormatter: (value) => formatText(value, 'cm') },
        { label: 'Peso', field: 'weight', displayFormatter: (value) => formatText(value, 'kg') },
        { label: 'Pierna dominante', field: 'dominant_foot' },
        { label: 'Notas médicas', field: 'medical_notes', fullWidth: true },
      ],
    },
    {
      id: 'contact',
      title: 'Información de contacto',
      description: 'Datos de comunicación registrados.',
      items: [
        { label: 'Correo electrónico', field: 'email' },
        { label: 'Teléfono', field: 'phone' },
        {
          label: 'Tutor (nombre)',
          field: 'guardian_name',
          readonly: true,
          updatable: false,
          displayFormatter: (value) => formatText(value),
        },
        {
          label: 'Tutor (correo)',
          field: 'guardian_email',
          readonly: true,
          updatable: false,
          displayFormatter: (value) => formatText(value),
        },
        {
          label: 'Tutor (teléfono)',
          field: 'guardian_phone',
          readonly: true,
          updatable: false,
          displayFormatter: (value) => formatText(value),
        },
        {
          label: 'Tutor (parentesco)',
          field: 'guardian_relationship',
          readonly: true,
          updatable: false,
          displayFormatter: (value) => formatText(value),
        },
        { label: 'Notas adicionales', field: 'notes', fullWidth: true },
      ],
    },
  ]

  const editableFields = ref<EditableFields>(createDefaultEditableFields())
  type SectionState = Record<string, boolean>
  const buildSectionState = () =>
    detailSections.reduce((state, section) => {
      state[section.id] = false
      return state
    }, {} as SectionState)
  const sectionEditState = ref<SectionState>(buildSectionState())
  const sectionSavingState = ref<SectionState>(buildSectionState())
  const persistedFields = ref<EditableFields>(createDefaultEditableFields())
  const cloneFields = (fields: EditableFields): EditableFields => JSON.parse(JSON.stringify(fields))

  const initializeEditableFields = () => {
    const playerData = currentPlayer.value
    const defaults = createDefaultEditableFields()
    if (!playerData) {
      editableFields.value = defaults
      sectionEditState.value = buildSectionState()
      sectionSavingState.value = buildSectionState()
      persistedFields.value = cloneFields(defaults)
      return
    }

    const primaryTeam = playerTeams.value[0]
    const formattedPhone = phoneValue.value === 'Sin registro' ? '' : phoneValue.value

    editableFields.value = {
      ...defaults,
      name: playerData.name ?? '',
      last_name: playerData.last_name ?? '',
      birthdate: playerData.birthdate ? dayjs(playerData.birthdate).format('YYYY-MM-DD') : '',
      nationality: playerData.nationality ?? '',
      curp: playerData.curp ?? '',
      is_minor: playerData.is_minor ? 'Sí' : 'No',
      team_name: primaryTeam?.name ?? '',
      category_name: teamCategoryLabel.value || '',
      position_id: playerData.position?.id ?? null,
      number: playerData.number ? String(playerData.number) : '',
      height: playerData.height ? String(playerData.height) : '',
      weight: playerData.weight ? String(playerData.weight) : '',
      dominant_foot: playerData.dominant_foot ?? '',
      medical_notes: playerData.medical_notes ?? '',
      email: playerData.email ?? '',
      phone: formattedPhone,
      notes: playerData.notes ?? '',
      guardian_name: playerData.guardian?.name ?? '',
      guardian_email: playerData.guardian?.email ?? '',
      guardian_phone: playerData.guardian?.phone ?? '',
      guardian_relationship: playerData.guardian?.relationship ?? '',
    }

    sectionEditState.value = buildSectionState()
    sectionSavingState.value = buildSectionState()
    persistedFields.value = cloneFields(editableFields.value)
  }

  watch(
    currentPlayer,
    () => {
      initializeEditableFields()
    },
    { immediate: true }
  )

  const isSectionEditing = (sectionId: string) => Boolean(sectionEditState.value[sectionId])
  const isSectionSaving = (sectionId: string) => Boolean(sectionSavingState.value[sectionId])
  const isItemEditable = (sectionId: string, item: DetailSectionItem) =>
    item.readonly !== true && isSectionEditing(sectionId)
  const numericFieldSet = new Set<keyof EditableFields>(['number', 'height', 'weight'] as (keyof EditableFields)[])
  const normalizeFieldValue = (field: keyof EditableFields, value: any) => {
    if (value === '' || value === undefined) {
      return null
    }
    if (field === 'position_id') {
      return value === null ? null : Number(value)
    }
    if (numericFieldSet.has(field)) {
      const numericValue = Number(value)
      return Number.isFinite(numericValue) ? numericValue : null
    }
    if (typeof value === 'string') {
      const trimmed = value.trim()
      return trimmed === '' ? null : trimmed
    }
    return value ?? null
  }
  const buildSectionPayload = (sectionId: string) => {
    const section = detailSections.find((section) => section.id === sectionId)
    if (!section) {
      return {}
    }
    return section.items.reduce(
      (payload, item) => {
        if (item.updatable === false) {
          return payload
        }
        const field = item.field
        const nextValue = normalizeFieldValue(field, editableFields.value[field])
        const previousValue = normalizeFieldValue(field, persistedFields.value[field])
        if (nextValue !== previousValue) {
          payload[field] = nextValue
        }
        return payload
      },
      {} as Record<string, any>
    )
  }
  const saveSectionChanges = async (sectionId: string) => {
    const payload = buildSectionPayload(sectionId)
    if (!Object.keys(payload).length || !currentPlayer.value?.id) {
      sectionEditState.value[sectionId] = false
      return
    }
    sectionSavingState.value[sectionId] = true
    try {
      await playerStore.updatePlayer(currentPlayer.value.id, payload)
      persistedFields.value = cloneFields(editableFields.value)
      sectionEditState.value[sectionId] = false
    } catch (error) {
      console.error(error)
    } finally {
      sectionSavingState.value[sectionId] = false
    }
  }
  const toggleSectionEditing = async (sectionId: string) => {
    if (isSectionSaving(sectionId)) {
      return
    }
    if (isSectionEditing(sectionId)) {
      await saveSectionChanges(sectionId)
      return
    }
    sectionEditState.value[sectionId] = true
  }
  const getFieldDisplayValue = (sectionId: string, item: DetailSectionItem) => {
    const rawValue = editableFields.value[item.field] ?? ''
    if (isItemEditable(sectionId, item)) {
      return rawValue ?? ''
    }
    if (item.displayFormatter) {
      return item.displayFormatter(rawValue)
    }
    if (!rawValue || `${rawValue}`.toString().trim() === '') {
      return 'Sin registro'
    }
    return String(rawValue)
  }
  const handleFieldInput = (field: DetailSectionItem['field'], value: string | number | null) => {
    if (field === 'position_id') {
      editableFields.value[field] = value === null || value === '' ? null : Number(value)
      return
    }
    editableFields.value[field] = (value ?? '') as EditableFields[typeof field]
  }

  const goBack = () => {
    router.push('/jugadores')
  }

  const isCurrentPlayer = computed(() => {
    if (!currentPlayer.value?.id) return false
    return currentPlayer.value.id?.toString() === (route.params.jugador as string)
  })

  const isEmptyState = computed(() => !loading.value && !isCurrentPlayer.value)
  onMounted(async () => {
    await Promise.all([fetchPlayer(), ensurePositionsLoaded()])
  })
</script>

<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="false" />
    </template>
    <template #default>
      <div class="player-detail-page" data-testid="jugador-detail-page">
        <v-skeleton-loader
          v-if="loading"
          type="card, list-item-two-line@3, image"
          class="rounded-lg"
        ></v-skeleton-loader>
        <v-empty-state
          v-else-if="isEmptyState"
          title="No encontramos al jugador"
          text="Regresa a la tabla de jugadores e inténtalo nuevamente."
          image="/no-data.svg"
        ></v-empty-state>
        <div v-else class="player-detail-grid">
          <div class="player-detail-grid__main d-flex flex-column ga-4">
            <v-card class="player-hero futzo-rounded" variant="flat" data-testid="jugador-detail-hero">
              <div class="player-hero__info">
                <v-avatar size="84" rounded="lg" :image="avatar" color="primary" variant="tonal">
                  <span class="text-h5">{{ initials }}</span>
                </v-avatar>
                <div>
                  <p class="text-overline text-medium-emphasis mb-1">Ficha del jugador</p>
                  <h2 class="text-h5 mb-1 text-truncate d-inline-block w-lg-100 w-md-100 w-75">
                    {{ playerFullName || 'Sin nombre registrado' }}
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-2">
                    {{ positionLabel }}
                    <template v-if="playerTeams.length && playerTeams[0]?.name">
                      · {{ playerTeams[0]?.name }}
                    </template>
                  </p>
                  <div class="d-flex flex-wrap ga-2">
                    <v-chip v-if="playerTeams.length" color="primary" variant="tonal" size="small" class="mr-2">
                      {{ playerTeams[0]?.name }}
                    </v-chip>
                    <v-chip v-if="teamCategoryLabel" color="secondary" variant="tonal" size="small">
                      {{ teamCategoryLabel }}
                    </v-chip>
                  </div>
                </div>
              </div>
              <div class="player-hero__meta">
                <div v-for="meta in heroMeta" :key="meta.label" class="player-hero__meta-item">
                  <p>{{ meta.label }}</p>
                  <span>{{ meta.value }}</span>
                </div>
                <v-btn color="primary" variant="outlined" size="small" prepend-icon="mdi-arrow-left" @click="goBack">
                  Volver
                </v-btn>
              </div>
            </v-card>

            <v-card
              v-for="section in detailSections"
              :key="section.id"
              class="detail-card futzo-rounded"
              variant="flat"
            >
              <div class="detail-card__header d-flex align-start justify-space-between flex-wrap gap-2">
                <div>
                  <h3 class="text-subtitle-1 mb-1">{{ section.title }}</h3>
                  <p class="text-body-2 text-medium-emphasis">{{ section.description }}</p>
                </div>
                <v-btn
                  size="small"
                  active
                  color="primary"
                  variant="text"
                  :prepend-icon="isSectionEditing(section.id) ? 'mdi-check' : 'mdi-pencil'"
                  :loading="isSectionSaving(section.id)"
                  :disabled="isSectionSaving(section.id)"
                  class="ml-auto"
                  @click="toggleSectionEditing(section.id)"
                >
                  {{ isSectionEditing(section.id) ? 'Listo' : 'Editar' }}
                </v-btn>
              </div>
              <div class="detail-card__grid">
                <div
                  v-for="item in section.items"
                  :key="`${section.id}-${item.label}`"
                  class="detail-item"
                  :class="{ 'detail-item--full': item.fullWidth }"
                >
                  <v-select
                    v-if="item.type === 'select'"
                    :label="item.label"
                    :items="positions"
                    item-title="name"
                    item-value="id"
                    active
                    :model-value="editableFields[item.field]"
                    @update:model-value="(value) => handleFieldInput(item.field, value)"
                    density="comfortable"
                    hide-details
                    :variant="isItemEditable(section.id, item) ? 'outlined' : 'plain'"
                    :readonly="!isItemEditable(section.id, item)"
                    :placeholder="isItemEditable(section.id, item) ? 'Selecciona una opción' : 'Sin registro'"
                    class="detail-item__input"
                  />
                  <v-text-field
                    v-else
                    active
                    :label="item.label"
                    :model-value="getFieldDisplayValue(section.id, item)"
                    :type="item.inputType || 'text'"
                    @update:model-value="(value) => handleFieldInput(item.field, value)"
                    density="comfortable"
                    hide-details
                    :variant="isItemEditable(section.id, item) ? 'outlined' : 'plain'"
                    :readonly="!isItemEditable(section.id, item)"
                    class="detail-item__input"
                  />
                </div>
              </div>
            </v-card>
          </div>

          <div class="player-detail-grid__aside d-flex flex-column ga-4">
            <v-card class="detail-card futzo-rounded" variant="flat">
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">Estadísticas</h3>
                  <p class="text-body-2 text-medium-emphasis">Resumen de rendimiento acumulado.</p>
                </div>
              </div>
              <div class="player-stats">
                <div v-for="stat in statsHighlights" :key="stat.label" class="player-stats__item">
                  <p>{{ stat.label }}</p>
                  <span>{{ stat.value }}</span>
                </div>
              </div>
            </v-card>

            <v-card class="detail-card futzo-rounded" variant="flat">
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">Verificación</h3>
                  <p class="text-body-2 text-medium-emphasis">Estado de validación del jugador.</p>
                </div>
              </div>
              <div class="player-stats">
                <div class="player-stats__item">
                  <p>Estado</p>
                  <span>{{ verificationStatusLabel }}</span>
                </div>
                <div class="player-stats__item" v-if="verificationNotes">
                  <p>Notas</p>
                  <span>{{ verificationNotes }}</span>
                </div>
                <div class="player-stats__item" v-if="verificationDocumentUrl">
                  <p>Documento</p>
                  <a :href="verificationDocumentUrl" target="_blank" rel="noopener">Ver documento</a>
                </div>
                <div class="player-stats__item" v-if="verificationPhotoUrl">
                  <p>Foto</p>
                  <a :href="verificationPhotoUrl" target="_blank" rel="noopener">Ver foto</a>
                </div>
              </div>
              <v-divider class="my-4" />
              <div class="d-flex flex-column ga-3">
                <template v-if="!verificationDocumentUrl">
                  <v-file-input
                    v-model="verificationDocument"
                    density="comfortable"
                    label="Documento oficial"
                    variant="outlined"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <v-file-input
                    v-model="verificationPhoto"
                    density="comfortable"
                    label="Foto del jugador (opcional)"
                    variant="outlined"
                    accept=".jpg,.jpeg,.png"
                  />
                  <v-btn
                    color="primary"
                    variant="elevated"
                    :loading="isUploadingVerification"
                    :disabled="!verificationDocument"
                    @click="submitVerification"
                  >
                    Subir documentos
                  </v-btn>
                </template>
                <div class="d-flex ga-2">
                  <v-btn
                    color="success"
                    variant="tonal"
                    :loading="isApprovingVerification"
                    :disabled="!verificationDocumentUrl"
                    @click="approveVerificationHandler"
                  >
                    Aprobar
                  </v-btn>
                  <v-btn color="error" variant="tonal" @click="rejectDialog = true">Rechazar</v-btn>
                </div>
              </div>
            </v-card>

            <v-card class="detail-card futzo-rounded" variant="flat">
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">Bloqueo de transferencia</h3>
                  <p class="text-body-2 text-medium-emphasis">Restricciones para registrar al jugador en otro equipo.</p>
                </div>
              </div>
              <div class="player-stats">
                <div class="player-stats__item">
                  <p>Estado</p>
                  <span>{{ lockStatusLabel }}</span>
                </div>
              </div>
              <v-btn
                class="mt-3"
                color="primary"
                variant="outlined"
                :loading="isReleasingLock"
                :disabled="!isLockActive"
                @click="releaseLockHandler"
              >
                Liberar jugador
              </v-btn>
            </v-card>

            <v-card class="detail-card futzo-rounded" variant="flat">
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">Equipos</h3>
                  <p class="text-body-2 text-medium-emphasis">Historial de equipos vinculados.</p>
                </div>
              </div>
              <div v-if="playerTeams.length" class="player-lists">
                <div v-for="team in playerTeams" :key="team.id" class="player-list-item">
                  <div>
                    <p class="mb-1 text-body-1 font-weight-medium">{{ team.name }}</p>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      {{ team.category?.name ?? 'Sin categoría' }}
                      <span v-if="team.tournament?.name"> · {{ team.tournament?.name }}</span>
                    </p>
                  </div>
                  <v-avatar v-if="team.image" size="36" :image="team.image" />
                  <v-avatar v-else size="36" color="primary" variant="tonal">
                    {{ team.name?.charAt(0) }}
                  </v-avatar>
                </div>
              </div>
              <div v-else class="player-empty">Este jugador aún no tiene equipos registrados.</div>
            </v-card>

            <v-card class="detail-card futzo-rounded" variant="flat">
              <div class="detail-card__header">
                <div>
                  <h3 class="text-subtitle-1 mb-1">Torneos</h3>
                  <p class="text-body-2 text-medium-emphasis">Participaciones reportadas por la liga.</p>
                </div>
              </div>
              <div v-if="tournamentList.length" class="player-lists">
                <div v-for="tournament in tournamentList" :key="tournament.id" class="player-list-item">
                  <div>
                    <p class="mb-1 text-body-1 font-weight-medium">{{ tournament.name }}</p>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      {{ tournament.category?.name ?? 'Sin categoría' }}
                      <span v-if="tournament.start_date"> · {{ formatDate(tournament.start_date) }}</span>
                    </p>
                  </div>
                  <v-chip variant="tonal" color="primary" size="small" class="text-uppercase">
                    {{ tournament.status ?? 'En curso' }}
                  </v-chip>
                </div>
              </div>
              <div v-else class="player-empty">No tenemos torneos asociados a este jugador todavía.</div>
            </v-card>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>

  <v-dialog v-model="rejectDialog" max-width="520">
    <v-card class="futzo-rounded pa-4">
      <v-card-title class="text-subtitle-1">Rechazar verificación</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="rejectNotes"
          label="Motivo del rechazo"
          variant="outlined"
          rows="4"
          auto-grow
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="rejectDialog = false">Cancelar</v-btn>
        <v-btn
          color="error"
          variant="elevated"
          :loading="isRejectingVerification"
          :disabled="!rejectNotes"
          @click="rejectVerificationHandler"
        >
          Rechazar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="sass">
  @use '~/assets/scss/pages/player-detail.sass'
</style>
