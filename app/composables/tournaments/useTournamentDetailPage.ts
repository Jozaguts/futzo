import {
  getTournamentMetrics,
  getTournamentNextAvailableRound,
  getTournamentRegistrationQRCode,
  getTournamentScheduleQRCode,
  updateTournamentTeamCompetitionStatus,
  type UpdateTournamentTeamCompetitionStatusPayload,
} from '~/http/api/tournament'
import type {TeamStoreRequest} from '~/models/Team'
import type {Team as TournamentTeam} from '~/models/Schedule'
import type {TournamentDetailKpis, TournamentKpiMetric, TournamentShareAction} from '~/models/tournament'
import {useDisplay} from 'vuetify'
import {ga4Event} from '~/utils/ga4'

const validSectionTabs = ['resumen', 'calendario', 'disciplina'] as const
export type SectionTab = (typeof validSectionTabs)[number]

const resolveSectionTab = (value: unknown): SectionTab => {
  if (typeof value !== 'string') {
    return 'resumen'
  }
  return (validSectionTabs as readonly string[]).includes(value) ? (value as SectionTab) : 'resumen'
}

export const useTournamentDetailPage = () => {
  const tournamentStore = useTournamentStore()
  const teamStore = useTeamStore()
  const { standings, tournamentId, tournament } = storeToRefs(tournamentStore)
  const { dialog: teamDialog, teamStoreRequest, steps: teamSteps, isEdition: isTeamEdition } = storeToRefs(teamStore)
  const { canCreateTeam } = useRoleAccess()
  const { start, finish } = useLoadingIndicator()
  const { toast } = useToast()
  const route = useRoute()
  const router = useRouter()
  const runtimeConfig = useRuntimeConfig()
  const { mobile } = useDisplay()

  const loading = ref(false)
  const tab = ref<SectionTab>(resolveSectionTab(route.query.tab))
  const sections: Array<{ value: SectionTab; label: string }> = [
    { value: 'resumen', label: 'Resumen' },
    { value: 'calendario', label: 'Calendario' },
    { value: 'disciplina', label: 'Disciplina' },
  ]

  const share = ref({
    title: '',
    image: '',
    isLoading: false,
    hasError: false,
    showQr: false,
  })

  const tournamentName = computed(() => tournament.value?.name ?? '')
  const tournamentMeta = computed(() => {
    const format = tournament.value?.format_label || tournament.value?.format?.name
    const type = tournament.value?.football_type_label || tournament.value?.football_type?.name
    const location = tournament.value?.location?.name
    return [format, type, location].filter((value) => Boolean(value)).join(' · ')
  })

  const publicBaseUrl = computed(() => runtimeConfig.public.baseUrl || useRequestURL().origin)
  const tournamentSlug = computed(() => tournament.value?.slug ?? String(route.params.torneo ?? ''))
  const publicStatusUrl = computed(() => `${publicBaseUrl.value}/torneos/${tournamentSlug.value}/status`)

  const statusLabel = computed(() => {
    switch (tournament.value?.status) {
      case 'creado':
        return { text: 'Próximo', color: 'warning' }
      case 'en curso':
        return { text: 'Activo', color: 'success' }
      case 'completado':
        return { text: 'Finalizado', color: 'grey-lighten-1' }
      case 'cancelado':
        return { text: 'Cancelado', color: 'error' }
      default:
        return { text: '-', color: 'grey-lighten-1' }
    }
  })

  const gamesProgressPercent = computed(() => {
    if (typeof tournament.value?.games_progress?.percent === 'number') {
      return tournament.value.games_progress.percent
    }
    return tournament.value?.progress?.percent ?? 0
  })

  const resolveProgressTotalFromLabel = (label?: string | null) => {
    if (!label || typeof label !== 'string') {
      return 0
    }
    const parts = label.split('/')
    if (parts.length < 2) {
      return 0
    }
    const total = Number(parts[1]?.trim())
    return Number.isFinite(total) ? total : 0
  }

  const hasGeneratedSchedule = computed(() => {
    const totalFromGamesProgress = Number(tournament.value?.games_progress?.total ?? 0)
    if (Number.isFinite(totalFromGamesProgress) && totalFromGamesProgress > 0) {
      return true
    }
    return resolveProgressTotalFromLabel(tournament.value?.games_progress?.label ?? tournament.value?.progress?.label) > 0
  })

  const createZeroMetric = () => ({
    total: 0,
    current: 0,
    dailyData: [] as number[],
    label: 'vs último mes',
  })

  const createDefaultMetrics = (): TournamentDetailKpis => ({
    registeredTeams: createZeroMetric(),
    registeredPlayers: createZeroMetric(),
    matchesPlayed: {
      ...createZeroMetric(),
      targetTotal: 0,
    },
    disciplinaryCases: createZeroMetric(),
  })

  const normalizeMetric = (metric?: Partial<TournamentKpiMetric>) => ({
    total: Number(metric?.total ?? 0),
    current: Number(metric?.current ?? 0),
    dailyData: Array.isArray(metric?.dailyData) ? metric.dailyData.map((value) => Number(value ?? 0)) : [],
    label: metric?.label || 'vs último mes',
  })

  const normalizeTournamentMetrics = (metrics?: Partial<TournamentDetailKpis>): TournamentDetailKpis => ({
    registeredTeams: normalizeMetric(metrics?.registeredTeams),
    registeredPlayers: normalizeMetric(metrics?.registeredPlayers),
    matchesPlayed: {
      ...normalizeMetric(metrics?.matchesPlayed),
      targetTotal: Number(metrics?.matchesPlayed?.targetTotal ?? 0),
    },
    disciplinaryCases: normalizeMetric(metrics?.disciplinaryCases),
  })

  const tournamentMetrics = ref<TournamentDetailKpis>(createDefaultMetrics())

  const matchesPlayedValue = computed(() => {
    const played = tournamentMetrics.value.matchesPlayed.total ?? 0
    const total = tournamentMetrics.value.matchesPlayed.targetTotal ?? 0
    return `${played}/${total}`
  })

  const progressStart = computed(() => tournament.value?.start_date_to_string ?? '')
  const progressEnd = computed(() => tournament.value?.end_date_to_string ?? '')
  const currentTournamentId = computed(() => tournament.value?.id ?? tournamentId.value ?? null)

  const standingsRows = computed<any[]>(() => {
    if (Array.isArray(standings.value)) {
      return standings.value
    }
    if (Array.isArray((standings.value as any)?.data)) {
      return (standings.value as any).data
    }
    if (Array.isArray((standings.value as any)?.standings)) {
      return (standings.value as any).standings
    }
    return []
  })

  const fallbackTeamsFromStandings = computed<TournamentTeam[]>(() => {
    const uniqueTeams = new Map<number, { id: number; name: string }>()
    standingsRows.value.forEach((row: any) => {
      const id = Number(row?.team?.id ?? row?.team_id ?? 0)
      const name = String(row?.team?.name ?? row?.name ?? '').trim()
      if (!id || !name || uniqueTeams.has(id)) {
        return
      }
      uniqueTeams.set(id, { id, name })
    })
    return Array.from(uniqueTeams.values()).map(({ id, name }) => ({
      id,
      name,
      pivot: {
        tournament_id: Number(currentTournamentId.value ?? 0),
        team_id: id,
        is_active: true,
        inactive_from_round: null,
      },
    }))
  })

  const tournamentTeams = computed<TournamentTeam[]>(() => {
    if (Array.isArray(tournament.value?.teams) && tournament.value.teams.length > 0) {
      return tournament.value.teams
    }
    return fallbackTeamsFromStandings.value
  })

  const selectedCompetitionTeamId = ref<number | null>(null)
  const isUpdatingCompetitionStatus = ref(false)
  const isOpeningTeamDialog = ref(false)
  const competitionManagementDialog = ref(false)
  const retireCompetitionDialog = ref(false)

  const tournamentTeamOptions = computed(() =>
    tournamentTeams.value.map((team) => ({
      title: team.name,
      value: team.id,
    }))
  )

  const competitionConfigContext = computed(() => {
    if (!tournamentTeamOptions.value.length) {
      return 'Podrás activar o retirar equipos cuando haya equipos inscritos en el torneo.'
    }
    return 'Puedes activar o retirar equipos de la competencia.'
  })

  const selectedCompetitionTeam = computed(
    () => tournamentTeams.value.find((team) => team.id === selectedCompetitionTeamId.value) ?? null
  )
  const selectedCompetitionTeamName = computed(() => selectedCompetitionTeam.value?.name ?? 'este equipo')

  const currentTournamentCategoryId = computed(() => {
    const categoryId = Number(tournament.value?.category_id ?? tournament.value?.category?.id ?? 0)
    return Number.isFinite(categoryId) && categoryId > 0 ? categoryId : null
  })

  const canOpenRegisterTeamQuickAction = computed(
    () => Boolean(canCreateTeam.value && currentTournamentId.value) && !isOpeningTeamDialog.value
  )

  type TournamentQuickActionId = 'register_team' | 'remove_team'

  const tournamentQuickActions = computed(() => [
    {
      id: 'register_team',
      label: 'Registrar equipo',
      icon: 'lucide:shirt',
      loading: isOpeningTeamDialog.value,
      disabled: !canOpenRegisterTeamQuickAction.value,
      testId: 'tournament-quick-action-register-team',
    },
    {
      id: 'remove_team',
      label: 'Remover equipo',
      icon: 'lucide:user-minus',
      testId: 'tournament-quick-action-remove-team',
    },
  ])

  const isSelectedTeamActive = computed(() => selectedCompetitionTeam.value?.pivot?.is_active !== false)

  const competitionStatusSummary = computed(() => {
    if (!selectedCompetitionTeam.value) {
      return 'Selecciona un equipo para actualizar su estado competitivo.'
    }
    if (isSelectedTeamActive.value) {
      return 'Equipo activo en competencia.'
    }
    const inactiveFromRound = selectedCompetitionTeam.value.pivot?.inactive_from_round
    if (typeof inactiveFromRound === 'number') {
      return `Equipo retirado desde la jornada ${inactiveFromRound}.`
    }
    return 'Equipo retirado de la competencia.'
  })

  const competitionActionLabel = computed(() =>
    isSelectedTeamActive.value ? 'Retirar de competencia' : 'Reactivar equipo'
  )

  const canToggleTeamCompetitionStatus = computed(
    () => Boolean(currentTournamentId.value && selectedCompetitionTeam.value) && !isUpdatingCompetitionStatus.value
  )

  const tournamentKpiItems = computed(() => [
    {
      title: 'Equipos',
      value: tournamentMetrics.value.registeredTeams.total,
      icon: 'lucide:shirt',
      iconTone: 'green',
      trendValue: tournamentMetrics.value.registeredTeams.current,
      trendLabel: tournamentMetrics.value.registeredTeams.label,
    },
    {
      title: 'Jugadores',
      value: tournamentMetrics.value.registeredPlayers.total,
      icon: 'lucide:users',
      iconTone: 'blue',
      trendValue: tournamentMetrics.value.registeredPlayers.current,
      trendLabel: tournamentMetrics.value.registeredPlayers.label,
    },
    {
      title: 'Partidos',
      value: matchesPlayedValue.value,
      icon: 'lucide:calendar-days',
      iconTone: 'orange',
      trendValue: tournamentMetrics.value.matchesPlayed.current,
      trendLabel: tournamentMetrics.value.matchesPlayed.label,
    },
    {
      title: 'Disciplina',
      value: tournamentMetrics.value.disciplinaryCases.total,
      icon: 'lucide:shield',
      iconTone: 'red',
      trendValue: tournamentMetrics.value.disciplinaryCases.current,
      trendLabel: tournamentMetrics.value.disciplinaryCases.label,
    },
  ])

  const loadTournamentMetrics = async (id: number) => {
    try {
      const response = await getTournamentMetrics(id, 'lastMonth')
      tournamentMetrics.value = normalizeTournamentMetrics(response?.data)
    } catch {
      tournamentMetrics.value = createDefaultMetrics()
      toast({
        type: 'error',
        msg: 'No se pudieron cargar las métricas del torneo',
      })
    }
  }

  const refreshTournamentSummary = async () => {
    const slug = String(route.params.torneo ?? '')
    if (!slug) {
      return
    }
    await tournamentStore.getTournamentBySlug(slug)
    if (tournamentId.value) {
      await Promise.all([tournamentStore.getStandings(), loadTournamentMetrics(tournamentId.value)])
    }
  }

  const executeToggleTeamCompetitionStatus = async () => {
    if (!canToggleTeamCompetitionStatus.value || !selectedCompetitionTeam.value || !currentTournamentId.value) {
      return
    }

    const nextIsActive = !isSelectedTeamActive.value

    isUpdatingCompetitionStatus.value = true
    try {
      const payload: UpdateTournamentTeamCompetitionStatusPayload = {
        is_active: nextIsActive,
      }
      if (!nextIsActive) {
        const effectiveRound = await getTournamentNextAvailableRound(currentTournamentId.value)
        if (typeof effectiveRound === 'number' && effectiveRound > 0) {
          payload.effective_round = effectiveRound
        }
      }

      await updateTournamentTeamCompetitionStatus(currentTournamentId.value, selectedCompetitionTeam.value.id, payload)
      toast({
        type: 'success',
        msg: nextIsActive ? 'Equipo reactivado en competencia' : 'Equipo retirado de competencia',
      })
      await refreshTournamentSummary()
    } catch (error: any) {
      const backendMessage =
        error?.data?.message ||
        (Array.isArray(error?.data?.errors?.effective_round) ? error.data.errors.effective_round[0] : null)
      toast({
        type: 'error',
        msg: 'No se pudo actualizar el estado competitivo del equipo',
        description: backendMessage || undefined,
      })
    } finally {
      isUpdatingCompetitionStatus.value = false
    }
  }

  const requestToggleTeamCompetitionStatus = async () => {
    if (!canToggleTeamCompetitionStatus.value || !selectedCompetitionTeam.value) {
      return
    }
    if (isSelectedTeamActive.value) {
      retireCompetitionDialog.value = true
      return
    }
    await executeToggleTeamCompetitionStatus()
  }

  const closeRetireCompetitionDialog = () => {
    if (isUpdatingCompetitionStatus.value) {
      return
    }
    retireCompetitionDialog.value = false
  }

  const confirmRetireCompetitionTeam = async () => {
    await executeToggleTeamCompetitionStatus()
    retireCompetitionDialog.value = false
  }

  const openRegisterTeamDialog = async () => {
    if (!canOpenRegisterTeamQuickAction.value || !currentTournamentId.value) {
      return
    }
    isOpeningTeamDialog.value = true
    try {
      await teamStore.initTeamForm()
      teamStore.$storeReset()
      teamStoreRequest.value = {
        ...teamStoreRequest.value,
        team: {
          ...(teamStoreRequest.value.team || ({} as TeamStoreRequest['team'])),
          tournament_id: Number(currentTournamentId.value),
          ...(currentTournamentCategoryId.value ? { category_id: currentTournamentCategoryId.value } : {}),
        },
      } as Partial<TeamStoreRequest>
      teamSteps.value.current = 'createTeam'
      isTeamEdition.value = false
      teamDialog.value = true
    } catch {
      toast({
        type: 'error',
        msg: 'No se pudo abrir el registro de equipos',
      })
    } finally {
      isOpeningTeamDialog.value = false
    }
  }

  const openCompetitionManagementDialog = () => {
    competitionManagementDialog.value = true
  }

  const closeCompetitionManagementDialog = () => {
    if (isUpdatingCompetitionStatus.value) {
      return
    }
    competitionManagementDialog.value = false
  }

  const handleTournamentQuickAction = (actionId: string) => {
    switch (actionId as TournamentQuickActionId) {
      case 'register_team':
        void openRegisterTeamDialog()
        return
      case 'remove_team':
        openCompetitionManagementDialog()
    }
  }

  const copyTextToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return
    }
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  const copyRegistrationLink = async () => {
    if (!tournament.value?.register_link) {
      toast({ type: 'warning', msg: 'No hay enlace de inscripción disponible' })
      return
    }
    try {
      await copyTextToClipboard(tournament.value.register_link)
      toast({ type: 'success', msg: 'Enlace de inscripción copiado' })
    } catch {
      toast({ type: 'error', msg: 'No se pudo copiar el enlace de inscripción' })
    }
  }

  const copyPublicLink = async () => {
    if (!tournamentSlug.value) {
      toast({ type: 'warning', msg: 'No se pudo generar el enlace público' })
      return
    }
    try {
      const url = new URL(publicStatusUrl.value, publicBaseUrl.value)
      if (!url.searchParams.get('source')) {
        url.searchParams.set('source', 'share')
      }
      await copyTextToClipboard(url.toString())
      toast({ type: 'success', msg: 'Enlace público copiado' })
    } catch {
      toast({ type: 'error', msg: 'No se pudo copiar el enlace público' })
    }
  }

  const openRegistrationQr = async () => {
    if (!tournament.value?.id) {
      toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
      return
    }
    start()
    share.value.hasError = false
    share.value.image = ''
    share.value.isLoading = true
    try {
      const data = await getTournamentRegistrationQRCode(tournament.value.id)
      if (data?.image) {
        share.value.image = data.image
        share.value.title = 'QR de inscripción'
        share.value.showQr = true
        ga4Event('qr_generated', {
          type: 'registration',
          tournament_id: tournament.value.id,
        })
        return
      }
      throw new Error('QR no disponible')
    } catch {
      share.value.hasError = true
      toast({ type: 'error', msg: 'No se pudo generar el QR de inscripción' })
    } finally {
      share.value.isLoading = false
      finish()
    }
  }

  const openPublicQr = async () => {
    if (!tournament.value?.id) {
      toast({ type: 'warning', msg: 'No se pudo obtener el ID del torneo' })
      return
    }
    start()
    share.value.hasError = false
    share.value.image = ''
    share.value.isLoading = true
    try {
      const data = await getTournamentScheduleQRCode(tournament.value.id, 'tournament_status')
      if (data?.image) {
        share.value.image = data.image
        share.value.title = 'QR de página pública'
        share.value.showQr = true
        ga4Event('qr_generated', {
          type: 'public_calendar',
          tournament_id: tournament.value.id,
        })
        return
      }
      throw new Error('QR no disponible')
    } catch {
      share.value.hasError = true
      toast({ type: 'error', msg: 'No se pudo generar el QR de página pública' })
    } finally {
      share.value.isLoading = false
      finish()
    }
  }

  const shareActionHandler = async (action: TournamentShareAction) => {
    switch (action) {
      case 'registration_link':
        await copyRegistrationLink()
        return
      case 'registration_qr':
        await openRegistrationQr()
        return
      case 'public_link':
        await copyPublicLink()
        return
      case 'public_qr':
        await openPublicQr()
    }
  }

  const downloadQR = () => {
    if (!share.value.image) {
      toast({ type: 'warning', msg: 'No hay una imagen QR para descargar' })
      return
    }

    try {
      start({ force: true })
      const anchor = document.createElement('a')
      anchor.href = share.value.image
      anchor.download = 'futzo_qr.png'
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    } catch {
      toast({ type: 'error', msg: 'No se pudo descargar el QR' })
    } finally {
      finish()
    }
  }

  const goToCalendar = () => {
    tab.value = 'calendario'
  }

  const goToPublic = () => {
    router.push({
      name: 'torneos-torneo-status',
      params: { torneo: route.params.torneo },
    })
  }

  onMounted(() => {
    loading.value = true
    void tournamentStore
      .getTournamentBySlug(route?.params?.torneo as string)
      .then(() => {
        if (!tournamentId.value) {
          return
        }
        return Promise.all([tournamentStore.getStandings(), loadTournamentMetrics(tournamentId.value)])
      })
      .finally(() => {
        loading.value = false
      })
  })

  watch(
    () => route.query.tab,
    (queryTab) => {
      const nextTab = resolveSectionTab(queryTab)
      if (tab.value !== nextTab) {
        tab.value = nextTab
      }
    }
  )

  watch(tab, (currentTab) => {
    const tabQuery = currentTab === 'resumen' ? undefined : currentTab
    const currentQueryTab = typeof route.query.tab === 'string' ? route.query.tab : undefined
    if (currentQueryTab === tabQuery) {
      return
    }
    const nextQuery: Record<string, unknown> = { ...route.query }
    if (tabQuery) {
      nextQuery.tab = tabQuery
    } else {
      delete nextQuery.tab
    }
    router.replace({
      query: nextQuery,
    })
  })

  watch(
    tournamentTeamOptions,
    (options) => {
      if (!options.length) {
        selectedCompetitionTeamId.value = null
        return
      }
      const stillAvailable = options.some((option) => option.value === selectedCompetitionTeamId.value)
      if (!stillAvailable) {
        selectedCompetitionTeamId.value = options[0].value
      }
    },
    { immediate: true }
  )

  return {
    standings,
    loading,
    tab,
    sections,
    share,
    mobile,
    tournamentName,
    tournamentMeta,
    statusLabel,
    shareActionHandler,
    goToPublic,
    goToCalendar,
    hasGeneratedSchedule,
    tournamentKpiItems,
    gamesProgressPercent,
    progressStart,
    progressEnd,
    tournamentQuickActions,
    handleTournamentQuickAction,
    currentTournamentId,
    competitionManagementDialog,
    retireCompetitionDialog,
    competitionConfigContext,
    selectedCompetitionTeamId,
    tournamentTeamOptions,
    isUpdatingCompetitionStatus,
    competitionStatusSummary,
    isSelectedTeamActive,
    competitionActionLabel,
    canToggleTeamCompetitionStatus,
    requestToggleTeamCompetitionStatus,
    closeCompetitionManagementDialog,
    closeRetireCompetitionDialog,
    confirmRetireCompetitionTeam,
    selectedCompetitionTeamName,
    downloadQR,
  }
}
