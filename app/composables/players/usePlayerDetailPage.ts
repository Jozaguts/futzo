import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/es'
import type {Player, PlayerVerificationStatus} from '~/models/Player'
import type {Position} from '~/models/Position'
import type {Team} from '~/models/Team'
import type {Tournament} from '~/models/tournament'
import {sanitizeAvatarImage} from '~/utils/avatar'

dayjs.extend(customParseFormat)
dayjs.locale('es')

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
  slug?: string | null
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

const parseLockDate = (value?: string | null) => {
  if (!value) return null
  const parsed = dayjs(value, ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD', 'DD [de] MMMM YYYY', 'DD [de] MMMM YYYY HH:mm'], 'es', true)
  return parsed.isValid() ? parsed : null
}

export const formatPlayerDate = (value?: string | Date | null) => {
  if (!value) return 'Sin registro'
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format('DD MMM YYYY') : 'Sin registro'
}

const formatDateTime = (value?: string | null) => {
  if (!value) return 'Sin registro'
  const parsed = parseLockDate(value)
  return parsed ? parsed.format('DD [de] MMMM YYYY') : value
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

export type EditableFields = ReturnType<typeof createDefaultEditableFields>

const playerEditableFields = new Set<keyof EditableFields>([
  'name',
  'last_name',
  'birthdate',
  'nationality',
  'email',
  'phone',
  'height',
  'weight',
  'dominant_foot',
  'medical_notes',
  'notes',
])

export type DetailSectionItem = {
  label: string
  field: keyof EditableFields
  fullWidth?: boolean
  displayFormatter?: (value: string | number | null | undefined) => string
  type?: 'text' | 'select'
  inputType?: string
  readonly?: boolean
  updatable?: boolean
}

export type DetailSectionConfig = {
  id: string
  title: string
  description: string
  items: DetailSectionItem[]
}

type SectionState = Record<string, boolean>

const cloneFields = (fields: EditableFields): EditableFields => JSON.parse(JSON.stringify(fields))

export const usePlayerDetailPage = () => {
  const route = useRoute()
  const router = useRouter()
  const playerStore = usePlayerStore()
  const { isPlayerRole, canManageSensitivePlayerActions } = useRoleAccess()
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

  const avatar = computed(() =>
    sanitizeAvatarImage(currentPlayer.value?.image ?? currentPlayer.value?.user?.image ?? currentPlayer.value?.team?.image)
  )

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

  const getPositionLabelById = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === '') {
      return 'Sin registro'
    }
    const normalizedValue = typeof value === 'string' ? Number(value) : value
    const match = positions.value.find((position) => position.id === normalizedValue)
    return match?.name ?? 'Sin registro'
  }

  const detailSections = computed<DetailSectionConfig[]>(() => [
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
          displayFormatter: (value) => formatPlayerDate(value as string),
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
  ])

  const buildSectionState = () =>
    detailSections.value.reduce((state, section) => {
      state[section.id] = false
      return state
    }, {} as SectionState)

  const editableFields = ref<EditableFields>(createDefaultEditableFields())
  const sectionEditState = ref<SectionState>(buildSectionState())
  const sectionSavingState = ref<SectionState>(buildSectionState())
  const persistedFields = ref<EditableFields>(createDefaultEditableFields())

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
  const canEditFieldByRole = (field: keyof EditableFields) => !isPlayerRole.value || playerEditableFields.has(field)

  const canSectionBeEdited = (sectionId: string) => {
    const section = detailSections.value.find((item) => item.id === sectionId)
    if (!section) return false
    return section.items.some((item) => item.readonly !== true && item.updatable !== false && canEditFieldByRole(item.field))
  }

  const isItemEditable = (sectionId: string, item: DetailSectionItem) =>
    item.readonly !== true && isSectionEditing(sectionId) && canEditFieldByRole(item.field)

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
    const section = detailSections.value.find((section) => section.id === sectionId)
    if (!section) {
      return {}
    }
    return section.items.reduce(
      (payload, item) => {
        if (item.updatable === false) {
          return payload
        }
        if (!canEditFieldByRole(item.field)) {
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
    if (!canSectionBeEdited(sectionId)) {
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

  const openRejectDialog = () => {
    rejectDialog.value = true
  }

  const isEmptyState = computed(() => !loading.value && !currentPlayer.value?.id)

  onMounted(async () => {
    await Promise.all([fetchPlayer(), ensurePositionsLoaded()])
  })

  return {
    loading,
    isEmptyState,
    avatar,
    initials,
    playerFullName,
    positionLabel,
    playerTeams,
    teamCategoryLabel,
    heroMeta,
    detailSections,
    positions,
    editableFields,
    isSectionEditing,
    isSectionSaving,
    canSectionBeEdited,
    isItemEditable,
    getFieldDisplayValue,
    handleFieldInput,
    toggleSectionEditing,
    canManageSensitivePlayerActions,
    statsHighlights,
    verificationStatusLabel,
    verificationNotes,
    verificationDocumentUrl,
    verificationPhotoUrl,
    verificationDocument,
    verificationPhoto,
    isUploadingVerification,
    isApprovingVerification,
    isRejectingVerification,
    isReleasingLock,
    submitVerification,
    approveVerificationHandler,
    releaseLockHandler,
    rejectDialog,
    rejectNotes,
    openRejectDialog,
    rejectVerificationHandler,
    lockStatusLabel,
    isLockActive,
    tournamentList,
    goBack,
  }
}
