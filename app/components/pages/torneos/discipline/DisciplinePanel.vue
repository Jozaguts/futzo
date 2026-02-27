<script lang="ts" setup>
import {useDebounceFn} from '@vueuse/core'
import {useToast} from '#imports'
import KpisMetricsSection from '~/components/shared/kpis-metrics-section.vue'
import {
  applyDisciplinaryCase,
  createDisciplinaryCase,
  getDisciplinaryCase,
  getDisciplineCases,
  getDisciplineDefaults,
  getDisciplineMeta,
  getDisciplineSummary,
  getTeamAvailablePlayers,
  getTeamDisciplineMatches,
  previewDisciplinaryCase,
  revertDisciplinaryCase,
  submitDisciplinaryCase,
} from '~/http/api/discipline'
import type {TeamLineupAvailablePlayers} from '~/models/Player'
import type {
  CreateDisciplinaryCasePayload,
  DisciplineCaseDetail,
  DisciplineCaseListItem,
  DisciplineCaseStatus,
  DisciplineDefaults,
  DisciplineMeta,
  DisciplinePreviewPayload,
  DisciplinePreviewResult,
  DisciplineSummary,
  DisciplineTeamMatchOption,
} from '~/models/discipline'

const props = defineProps<{
    tournamentId?: number | null
  }>()

  const { toast } = useToast()

  type CaseTab = 'resumen' | 'sancion' | 'historial'

  const summary = ref<DisciplineSummary>({
    total: 0,
    pending: 0,
    applied: 0,
    closed: 0,
  })

  const meta = ref<DisciplineMeta>({
    rounds: [],
    teams: [],
    violations: [],
    statuses: [],
  })

  const defaults = ref<DisciplineDefaults | null>(null)
  const cases = ref<DisciplineCaseListItem[]>([])
  const teamPlayers = ref<TeamLineupAvailablePlayers[]>([])
  const teamMatches = ref<DisciplineTeamMatchOption[]>([])

  const loading = reactive({
    summary: false,
    meta: false,
    cases: false,
    players: false,
    matches: false,
  })

  const search = ref('')
  const statusFilter = ref<DisciplineCaseStatus | 'all'>('all')
  const violationFilter = ref<number | 'all'>('all')
  const teamFilter = ref<number | 'all'>('all')

  const createDialog = reactive({
    open: false,
    saving: false,
    teamId: null as number | null,
    playerId: null as number | null,
    violationTypeId: null as number | null,
    matchId: null as number | null,
    description: '',
  })

  const caseDialog = reactive({
    open: false,
    loading: false,
    caseId: null as number | null,
    data: null as DisciplineCaseDetail | null,
    tab: 'resumen' as CaseTab,
    preview: null as DisciplinePreviewResult | null,
    previewing: false,
    previewSignature: '',
    submitting: false,
    applying: false,
    reverting: false,
    showRevert: false,
    revertReason: '',
  })

  const sanctionDraft = reactive({
    sanctionType: null as string | null,
    customAdjustments: [] as Array<'points' | 'suspension'>,
    pointsDeduction: 0,
    suspensionMatches: 0,
  })

  const CUSTOM_SANCTION_TYPE = 'CUSTOM'

  const fallbackPresetItems = [
    { id: 'ADMIN_WIN_3_0', label: 'Gana por sancion 3-0' },
    { id: 'ADMIN_WIN_0_0_POINTS', label: 'Gana por sancion 0-0 con puntos' },
    { id: 'ADMIN_DRAW_0_0', label: 'Empate administrativo 0-0' },
  ]

  const defaultStatusLabelMap: Record<DisciplineCaseStatus, string> = {
    draft: 'Borrador',
    review: 'En revision',
    applied: 'Aplicada',
    closed: 'Cerrada',
  }

  const tournamentId = computed(() => {
    const raw = Number(props.tournamentId ?? 0)
    if (!Number.isFinite(raw) || raw <= 0) {
      return null
    }
    return raw
  })

  const statusItems = computed(() => [
    { title: 'Todos', value: 'all' },
    ...meta.value.statuses.map((status) => ({ title: status.label, value: status.value })),
  ])

  const violationItems = computed(() => [
    { title: 'Todas las faltas', value: 'all' },
    ...meta.value.violations.map((violation) => ({ title: violation.name, value: violation.id })),
  ])

  const teamItems = computed(() => [
    { title: 'Todos', value: 'all' },
    ...meta.value.teams.map((team) => ({ title: team.name, value: team.id })),
  ])

  const createTeamItems = computed(() => {
    return meta.value.teams.map((team) => ({ title: team.name, value: team.id }))
  })

  const createMatchItems = computed(() => {
    return teamMatches.value.map((match) => ({
      title: match.subtitle ? `${match.title} · ${match.subtitle}` : match.title,
      value: match.id,
    }))
  })

  const createCanSave = computed(() => {
    return Boolean(
      createDialog.teamId
      && createDialog.matchId
      && createDialog.violationTypeId
      && createDialog.description.trim().length
    )
  })

  const caseStatus = computed<DisciplineCaseStatus>(() => {
    return caseDialog.data?.status ?? 'draft'
  })

  const canSubmitCase = computed(() => caseStatus.value === 'draft')
  const canApplyCase = computed(() => caseStatus.value === 'review')
  const canRevertCase = computed(() => caseStatus.value === 'applied')
  const isCaseEditable = computed(() => caseStatus.value === 'draft' || caseStatus.value === 'review')

  const presetItems = computed(() => {
    const presets = defaults.value?.presets?.length ? defaults.value.presets : fallbackPresetItems
    return presets.map((preset) => ({ title: preset.label, value: preset.id }))
  })

  const sanctionTypeItems = computed(() => {
    return [
      ...presetItems.value,
      { title: 'Custom', value: CUSTOM_SANCTION_TYPE },
    ]
  })

  const customAdjustmentItems = computed(() => {
    return [
      { title: 'Deduccion de puntos', value: 'points' },
      { title: 'Suspension de partidos', value: 'suspension' },
    ]
  })

  const selectedSanctionTypeLabel = computed(() => {
    const selected = sanctionTypeItems.value.find((item) => item.value === sanctionDraft.sanctionType)
    return selected?.title || null
  })

  const sanctionedTeamName = computed(() => {
    return caseDialog.data?.team?.name || '-'
  })

  const beneficiaryTeamName = computed(() => {
    const opponent = getOpponentTeamId()
    if (!opponent) {
      return '-'
    }
    return resolveTeamName(opponent)
  })

  const configuredSanctions = computed(() => {
    const sanctions: { key: string; label: string; value: string }[] = []

    if (selectedSanctionTypeLabel.value) {
      sanctions.push({
        key: 'type',
        label: 'Tipo de sancion',
        value: selectedSanctionTypeLabel.value,
      })
    }

    if (sanctionDraft.sanctionType && sanctionDraft.sanctionType !== CUSTOM_SANCTION_TYPE && beneficiaryTeamName.value !== '-') {
      sanctions.push({
        key: 'beneficiary',
        label: 'Equipo beneficiado',
        value: beneficiaryTeamName.value,
      })
    }

    if (sanctionDraft.pointsDeduction > 0) {
      sanctions.push({
        key: 'points',
        label: 'Deduccion de puntos',
        value: `-${sanctionDraft.pointsDeduction} punto${sanctionDraft.pointsDeduction > 1 ? 's' : ''}`,
      })
    }

    if (sanctionDraft.suspensionMatches > 0) {
      sanctions.push({
        key: 'suspension',
        label: 'Suspension',
        value: `${sanctionDraft.suspensionMatches} partido${sanctionDraft.suspensionMatches > 1 ? 's' : ''}`,
      })
    }

    return sanctions
  })

  const sanctionsEmptyMessage = computed(() => {
    switch (caseStatus.value) {
      case 'review':
        return 'Caso en revision: aun no hay una sancion aplicada.'
      case 'applied':
        return 'No se encontro una sancion aplicada para este caso.'
      case 'closed':
        return 'Este caso fue cerrado sin sancion aplicada.'
      default:
        return 'Este caso aun no tiene una sancion definida.'
    }
  })

  const summaryKpiItems = computed(() => ([
    {
      title: 'Total casos',
      value: loading.summary ? '-' : summary.value.total,
      icon: 'lucide:shield',
      iconTone: 'purple',
    },
    {
      title: 'Pendientes',
      value: loading.summary ? '-' : summary.value.pending,
      icon: 'lucide:clock-3',
      iconTone: 'orange',
    },
    {
      title: 'Aplicadas',
      value: loading.summary ? '-' : summary.value.applied,
      icon: 'lucide:triangle-alert',
      iconTone: 'red',
    },
    {
      title: 'Cerradas',
      value: loading.summary ? '-' : summary.value.closed,
      icon: 'lucide:check-circle-2',
      iconTone: 'green',
    },
  ]))

  const previewHighlights = computed(() => {
    const preview = caseDialog.preview
    const highlights: { key: string; title: string; detail: string }[] = []

    if (!preview) {
      return highlights
    }

    if (preview.match_result) {
      const winnerTeam = preview.match_result.winner_team_id
        ? resolveTeamName(preview.match_result.winner_team_id)
        : null
      highlights.push({
        key: 'match-result',
        title: 'Resultado de partido',
        detail: `Marcador administrativo ${preview.match_result.home_goals}-${preview.match_result.away_goals}${winnerTeam ? `. Equipo beneficiado: ${winnerTeam}.` : '.'}`,
      })
    }

    if (preview.standings_before?.length && preview.standings_after?.length) {
      const beforeMap = new Map(preview.standings_before.map((row) => [row.team_id, row]))
      const afterMap = new Map(preview.standings_after.map((row) => [row.team_id, row]))
      const teamIds = new Set([...beforeMap.keys(), ...afterMap.keys()])

      for (const teamId of teamIds) {
        const before = beforeMap.get(teamId)
        const after = afterMap.get(teamId)
        if (!before || !after) {
          continue
        }

        const deltaPoints = after.points - before.points
        const deltaGoalsFor = after.goals_for - before.goals_for
        const deltaGoalsAgainst = after.goals_against - before.goals_against

        if (!deltaPoints && !deltaGoalsFor && !deltaGoalsAgainst) {
          continue
        }

        const pointsMessage = deltaPoints > 0
          ? `gana ${deltaPoints} punto${deltaPoints > 1 ? 's' : ''}`
          : deltaPoints < 0
            ? `pierde ${Math.abs(deltaPoints)} punto${Math.abs(deltaPoints) > 1 ? 's' : ''}`
            : 'sin cambio de puntos'

        highlights.push({
          key: `standings-${teamId}`,
          title: `Tabla de posiciones · ${resolveTeamName(teamId)}`,
          detail: `Puntos: ${before.points} -> ${after.points} (${pointsMessage}). GF: ${before.goals_for} -> ${after.goals_for}. GC: ${before.goals_against} -> ${after.goals_against}.`,
        })
      }
    }

    if (preview.suspensions?.length) {
      const matches = preview.suspensions
        .map((row) => `${row.matches} partido${row.matches > 1 ? 's' : ''}`)
        .join(', ')

      highlights.push({
        key: 'suspensions',
        title: 'Suspensiones',
        detail: `Se registraron: ${matches}.`,
      })
    }

    return highlights
  })

  const auditEntries = computed(() => {
    return (caseDialog.data?.audit_logs ?? []).map((entry, index) => {
      const label = entry.action || 'Actualizacion'
      const date = formatDate(entry.created_at || entry.date || '')
      const details = entry.details || 'Sin detalle'
      const user = entry.user?.name || entry.user_name || 'Sistema'

      return {
        id: entry.id ?? `audit-${index}`,
        action: label,
        date,
        details,
        user,
      }
    })
  })

  const createStatusText = computed(() => {
    return 'Este caso se guardara como Borrador'
  })

  const parseStatusClass = (status?: string | null) => {
    switch (status) {
      case 'applied':
        return 'discipline-status--applied'
      case 'review':
        return 'discipline-status--review'
      case 'closed':
        return 'discipline-status--closed'
      default:
        return 'discipline-status--draft'
    }
  }

  const parseStatusLabel = (item: { status?: string | null; status_label?: string | null }) => {
    const status = (item.status ?? 'draft') as DisciplineCaseStatus
    return item.status_label || defaultStatusLabelMap[status]
  }

  const parseDateOnly = (value?: string | null) => {
    if (!value) {
      return '-'
    }
    return value.split('T')[0]
  }

  const formatDate = (value?: string | null) => {
    if (!value) {
      return '-'
    }
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
      return parseDateOnly(value)
    }

    return parsed.toLocaleDateString('es-MX')
  }

  const withPayload = <T>(value: unknown): T => {
    if (value && typeof value === 'object' && 'data' in value) {
      const payload = value as { data: T }
      if (payload.data && !Array.isArray(payload.data)) {
        return payload.data
      }
    }
    return value as T
  }

  const withCollection = <T>(value: unknown): T[] => {
    if (Array.isArray(value)) {
      return value as T[]
    }

    if (value && typeof value === 'object' && 'data' in value) {
      const payload = value as { data?: unknown }
      if (Array.isArray(payload.data)) {
        return payload.data as T[]
      }

      if (payload.data && typeof payload.data === 'object' && 'data' in payload.data) {
        const nested = payload.data as { data?: unknown[] }
        if (Array.isArray(nested.data)) {
          return nested.data as T[]
        }
      }
    }

    return []
  }

  const mapError = (error: unknown) => {
    const current = error as {
      status?: number
      statusCode?: number
      data?: unknown
      response?: {
        status?: number
        data?: unknown
        _data?: unknown
      }
    }

    const status = Number(current.statusCode || current.status || current.response?.status || 0)
    const data = current.data ?? current.response?.data ?? current.response?._data

    return {
      status: status > 0 ? status : null,
      data,
    }
  }

  const notifyRequestError = (error: unknown, fallbackDescription: string) => {
    const parsed = mapError(error)
    if (parsed.status) {
      return
    }

    toast({
      type: 'error',
      msg: 'Error',
      description: fallbackDescription,
    })
  }

  const resetCreateDialog = () => {
    createDialog.teamId = null
    createDialog.playerId = null
    createDialog.violationTypeId = null
    createDialog.matchId = null
    createDialog.description = ''
    teamPlayers.value = []
    teamMatches.value = []
  }

  const resetSanctionDraft = () => {
    sanctionDraft.sanctionType = null
    sanctionDraft.customAdjustments = []
    sanctionDraft.pointsDeduction = 0
    sanctionDraft.suspensionMatches = 0
  }

  const resetCaseDialog = () => {
    caseDialog.caseId = null
    caseDialog.data = null
    caseDialog.tab = 'resumen'
    caseDialog.preview = null
    caseDialog.previewSignature = ''
    caseDialog.showRevert = false
    caseDialog.revertReason = ''
    resetSanctionDraft()
  }

  const getOpponentTeamId = () => {
    const caseTeamId = caseDialog.data?.team?.id
    if (!caseTeamId) {
      return null
    }

    const homeTeamId = caseDialog.data?.match?.home_team?.id
    const awayTeamId = caseDialog.data?.match?.away_team?.id

    if (homeTeamId && homeTeamId !== caseTeamId) {
      return homeTeamId
    }

    if (awayTeamId && awayTeamId !== caseTeamId) {
      return awayTeamId
    }

    return null
  }

  const resolveTeamName = (teamId: number) => {
    const homeTeam = caseDialog.data?.match?.home_team
    if (homeTeam?.id === teamId) {
      return homeTeam.name
    }

    const awayTeam = caseDialog.data?.match?.away_team
    if (awayTeam?.id === teamId) {
      return awayTeam.name
    }

    const catalogTeam = meta.value.teams.find((team) => team.id === teamId)
    if (catalogTeam?.name) {
      return catalogTeam.name
    }

    return `Equipo #${teamId}`
  }

  const initializeSanctionDraft = () => {
    resetSanctionDraft()

    const data = caseDialog.data
    if (!data) {
      return
    }

    const caseTeamId = data.team?.id
    const casePlayerId = data.player?.id

    const pointsValue = data.sanction?.points?.find((entry) => entry.team_id === caseTeamId)?.value
    if (pointsValue) {
      sanctionDraft.pointsDeduction = Math.abs(pointsValue)
      sanctionDraft.customAdjustments.push('points')
    }

    const suspensionValue = data.sanction?.suspensions?.find((entry) => entry.player_id === casePlayerId)?.matches
      || data.sanction?.suspensions?.[0]?.matches

    if (suspensionValue) {
      sanctionDraft.suspensionMatches = suspensionValue
      sanctionDraft.customAdjustments.push('suspension')
    }

    const admin = data.sanction?.admin_outcome
    if (admin) {
      sanctionDraft.sanctionType = admin.preset_id || CUSTOM_SANCTION_TYPE
    }

    if (!admin && (sanctionDraft.pointsDeduction > 0 || sanctionDraft.suspensionMatches > 0)) {
      sanctionDraft.sanctionType = CUSTOM_SANCTION_TYPE
    }

    if (!caseDialog.data?.player?.id && sanctionDraft.customAdjustments.includes('suspension')) {
      sanctionDraft.customAdjustments = sanctionDraft.customAdjustments.filter((item) => item !== 'suspension')
      sanctionDraft.suspensionMatches = 0
    }

    if (!sanctionDraft.sanctionType && caseStatus.value !== 'applied' && caseStatus.value !== 'closed') {
      sanctionDraft.sanctionType = null
    }
  }

  const buildCaseQuery = () => {
    const query: Record<string, string | number> = {
      per_page: 25,
    }

    if (search.value.trim()) {
      query.search = search.value.trim()
    }

    if (statusFilter.value !== 'all') {
      query.status = statusFilter.value
    }

    if (violationFilter.value !== 'all') {
      query.violation_type_id = violationFilter.value
    }

    if (teamFilter.value !== 'all') {
      query.team_id = teamFilter.value
    }

    return query
  }

  const buildPreviewPayload = (): { payload: DisciplinePreviewPayload | null; error?: string } => {
    const currentCase = caseDialog.data
    if (!currentCase?.team?.id) {
      return {
        payload: null,
        error: 'No se identifico el equipo a sancionar.',
      }
    }

    if (!sanctionDraft.sanctionType) {
      return {
        payload: null,
        error: 'Selecciona el tipo de sancion que deseas aplicar.',
      }
    }

    const opponentTeamId = getOpponentTeamId()
    if (!opponentTeamId) {
      return {
        payload: null,
        error: 'No se pudo identificar al rival del partido para calcular la sancion.',
      }
    }

    const sanction: Record<string, unknown> = {}

    if (sanctionDraft.sanctionType === CUSTOM_SANCTION_TYPE) {
      if (!sanctionDraft.customAdjustments.length) {
        return {
          payload: null,
          error: 'Selecciona al menos un ajuste para la sancion custom.',
        }
      }

      if (sanctionDraft.customAdjustments.includes('points')) {
        if (sanctionDraft.pointsDeduction <= 0) {
          return {
            payload: null,
            error: 'Indica cuantos puntos se deben deducir.',
          }
        }
        sanction.points = [
          {
            team_id: currentCase.team.id,
            value: -Math.abs(sanctionDraft.pointsDeduction),
          },
        ]
      }

      if (sanctionDraft.customAdjustments.includes('suspension')) {
        if (!currentCase.player?.id) {
          return {
            payload: null,
            error: 'No puedes aplicar suspension porque el caso no tiene jugador asociado.',
          }
        }

        if (sanctionDraft.suspensionMatches <= 0) {
          return {
            payload: null,
            error: 'Indica cuantos partidos de suspension se aplicaran.',
          }
        }

        sanction.suspensions = [
          {
            player_id: currentCase.player.id,
            matches: sanctionDraft.suspensionMatches,
          },
        ]
      }

      sanction.admin_outcome = {
        winner_team_id: opponentTeamId,
        loser_team_id: currentCase.team.id,
        goals_against: defaults.value?.alignment_default_goals_against ?? 3,
        match_lost: defaults.value?.alignment_default_match_lost ?? true,
      }
    } else {
      sanction.admin_outcome = {
        preset_id: sanctionDraft.sanctionType,
        winner_team_id: opponentTeamId,
        loser_team_id: currentCase.team.id,
      }
    }

    if (!Object.keys(sanction).length) {
      return {
        payload: null,
        error: 'Configura al menos un ajuste valido para continuar.',
      }
    }

    return {
      payload: {
        sanction,
      } as DisciplinePreviewPayload,
    }
  }

  const loadSummary = async () => {
    if (!tournamentId.value) {
      return
    }

    loading.summary = true
    try {
      const response = await getDisciplineSummary(tournamentId.value)
      const payload = withPayload<DisciplineSummary>(response)
      summary.value = {
        total: Number(payload?.total || 0),
        pending: Number(payload?.pending || 0),
        applied: Number(payload?.applied || 0),
        closed: Number(payload?.closed || 0),
      }
    } catch (error) {
      notifyRequestError(error, 'No se pudo cargar el resumen de disciplina.')
    } finally {
      loading.summary = false
    }
  }

  const loadMeta = async () => {
    if (!tournamentId.value) {
      return
    }

    loading.meta = true
    try {
      const response = await getDisciplineMeta(tournamentId.value)
      const payload = withPayload<DisciplineMeta>(response)
      meta.value = {
        rounds: payload?.rounds ?? [],
        teams: payload?.teams ?? [],
        violations: payload?.violations ?? [],
        statuses: payload?.statuses ?? [],
      }
    } catch (error) {
      notifyRequestError(error, 'No se pudo cargar catalogos de disciplina.')
    } finally {
      loading.meta = false
    }
  }

  const loadCases = async () => {
    if (!tournamentId.value) {
      return
    }

    loading.cases = true
    try {
      const response = await getDisciplineCases(tournamentId.value, buildCaseQuery())
      cases.value = withCollection<DisciplineCaseListItem>(response)
    } catch (error) {
      notifyRequestError(error, 'No se pudo cargar la lista de casos disciplinarios.')
    } finally {
      loading.cases = false
    }
  }

  const loadDefaults = async () => {
    try {
      const response = await getDisciplineDefaults()
      defaults.value = withPayload<DisciplineDefaults>(response)
    } catch (error) {
      notifyRequestError(error, 'No se pudo cargar configuracion global de disciplina.')
    }
  }

  const refreshDiscipline = async () => {
    await Promise.all([loadSummary(), loadCases()])
  }

  const loadInitialData = async () => {
    await Promise.all([loadSummary(), loadMeta(), loadCases()])
  }

  const loadCreatePlayers = async (teamId: number | null) => {
    teamPlayers.value = []

    if (!teamId) {
      return
    }

    loading.players = true
    try {
      teamPlayers.value = await getTeamAvailablePlayers(teamId)
    } catch (error) {
      notifyRequestError(error, 'No se pudieron cargar jugadores del equipo.')
    } finally {
      loading.players = false
    }
  }

  const loadCreateMatches = async (teamId: number | null) => {
    teamMatches.value = []

    if (!teamId) {
      return
    }

    loading.matches = true
    try {
      teamMatches.value = await getTeamDisciplineMatches(teamId)
    } catch (error) {
      notifyRequestError(error, 'No se pudieron cargar partidos del equipo.')
    } finally {
      loading.matches = false
    }
  }

  const extractCaseId = (payload: unknown) => {
    const raw = payload as {
      id?: number
      data?: {
        id?: number
      }
    }
    const id = Number(raw?.id || raw?.data?.id || 0)
    return Number.isFinite(id) && id > 0 ? id : null
  }

  const saveCase = async (sendForReview: boolean) => {
    if (!tournamentId.value || !createCanSave.value) {
      return
    }

    createDialog.saving = true

    try {
      const payload: CreateDisciplinaryCasePayload = {
        team_id: Number(createDialog.teamId),
        match_id: Number(createDialog.matchId),
        violation_type_id: Number(createDialog.violationTypeId),
        description: createDialog.description.trim(),
      }

      if (createDialog.playerId) {
        payload.player_id = Number(createDialog.playerId)
      }

      const response = await createDisciplinaryCase(tournamentId.value, payload)
      const caseId = extractCaseId(response)

      if (sendForReview) {
        if (caseId) {
          await submitDisciplinaryCase(tournamentId.value, caseId)
        } else {
          toast({
            type: 'warning',
            msg: 'Caso creado',
            description: 'Se creo el caso, pero no se pudo enviar automaticamente a revision.',
          })
        }
      }

      toast({
        type: 'success',
        msg: sendForReview ? 'Caso enviado a revision' : 'Caso guardado',
        description: sendForReview
          ? 'El caso disciplinario se registro y envio correctamente.'
          : 'El caso disciplinario se guardo como borrador.',
      })

      createDialog.open = false
      await refreshDiscipline()
    } catch (error) {
      notifyRequestError(error, 'No se pudo guardar el caso disciplinario.')
    } finally {
      createDialog.saving = false
    }
  }

  const loadCaseDetail = async () => {
    if (!tournamentId.value || !caseDialog.caseId) {
      return
    }

    caseDialog.loading = true

    try {
      const response = await getDisciplinaryCase(tournamentId.value, caseDialog.caseId)
      caseDialog.data = withPayload<DisciplineCaseDetail>(response)
      initializeSanctionDraft()
    } catch (error) {
      notifyRequestError(error, 'No se pudo cargar el detalle del caso disciplinario.')
    } finally {
      caseDialog.loading = false
    }
  }

  const openCaseDetail = async (caseItem: DisciplineCaseListItem) => {
    caseDialog.caseId = caseItem.id
    caseDialog.open = true
    caseDialog.tab = 'resumen'
    caseDialog.preview = null
    caseDialog.previewSignature = ''
    caseDialog.showRevert = false
    caseDialog.revertReason = ''

    if (!defaults.value) {
      await loadDefaults()
    }

    await loadCaseDetail()
  }

  const submitCurrentCase = async () => {
    if (!tournamentId.value || !caseDialog.caseId || !canSubmitCase.value) {
      return
    }

    caseDialog.submitting = true

    try {
      await submitDisciplinaryCase(tournamentId.value, caseDialog.caseId)
      toast({
        type: 'success',
        msg: 'Caso enviado',
        description: 'El caso se envio a revision.',
      })
      await Promise.all([loadCaseDetail(), refreshDiscipline()])
    } catch (error) {
      notifyRequestError(error, 'No se pudo enviar el caso a revision.')
    } finally {
      caseDialog.submitting = false
    }
  }

  const previewCaseImpact = async () => {
    if (!tournamentId.value || !caseDialog.caseId) {
      return
    }

    const { payload, error } = buildPreviewPayload()

    if (!payload) {
      toast({
        type: 'warning',
        msg: 'Sancion incompleta',
        description: error || 'Configura al menos un ajuste valido antes de generar la vista previa.',
      })
      return
    }

    caseDialog.previewing = true
    try {
      const response = await previewDisciplinaryCase(tournamentId.value, caseDialog.caseId, payload)
      const parsed = withPayload<{ preview?: DisciplinePreviewResult }>(response)
      caseDialog.preview = parsed?.preview ?? (parsed as unknown as DisciplinePreviewResult)
      caseDialog.previewSignature = JSON.stringify(payload)
    } catch (error) {
      notifyRequestError(error, 'No se pudo generar la vista previa de impacto.')
    } finally {
      caseDialog.previewing = false
    }
  }

  const applyCurrentSanction = async () => {
    if (!tournamentId.value || !caseDialog.caseId || !canApplyCase.value) {
      return
    }

    const { payload, error } = buildPreviewPayload()

    if (!payload) {
      toast({
        type: 'warning',
        msg: 'Sancion incompleta',
        description: error || 'Configura al menos un ajuste valido antes de aplicar.',
      })
      return
    }

    const currentSignature = JSON.stringify(payload)
    if (!caseDialog.preview || caseDialog.previewSignature !== currentSignature) {
      toast({
        type: 'warning',
        msg: 'Vista previa requerida',
        description: 'Debes ejecutar la vista previa mas reciente antes de aplicar.',
      })
      return
    }

    caseDialog.applying = true
    try {
      await applyDisciplinaryCase(tournamentId.value, caseDialog.caseId, payload)
      toast({
        type: 'success',
        msg: 'Sancion aplicada',
        description: 'La sancion fue aplicada correctamente.',
      })
      await Promise.all([loadCaseDetail(), refreshDiscipline()])
    } catch (error) {
      notifyRequestError(error, 'No se pudo aplicar la sancion.')
    } finally {
      caseDialog.applying = false
    }
  }

  const revertCurrentSanction = async () => {
    if (!tournamentId.value || !caseDialog.caseId || !canRevertCase.value) {
      return
    }

    if (!caseDialog.revertReason.trim()) {
      toast({
        type: 'warning',
        msg: 'Razon requerida',
        description: 'Agrega la razon para revertir la sancion.',
      })
      return
    }

    caseDialog.reverting = true

    try {
      await revertDisciplinaryCase(tournamentId.value, caseDialog.caseId, {
        reason: caseDialog.revertReason.trim(),
      })
      toast({
        type: 'success',
        msg: 'Sancion revertida',
        description: 'La sancion se revirtio correctamente.',
      })
      caseDialog.showRevert = false
      caseDialog.revertReason = ''
      await Promise.all([loadCaseDetail(), refreshDiscipline()])
    } catch (error) {
      notifyRequestError(error, 'No se pudo revertir la sancion.')
    } finally {
      caseDialog.reverting = false
    }
  }

  const debouncedCaseReload = useDebounceFn(() => {
    void loadCases()
  }, 320)

  watch(tournamentId, (current) => {
    if (!current) {
      return
    }

    void loadInitialData()
  }, { immediate: true })

  watch(search, () => {
    if (!tournamentId.value) {
      return
    }
    debouncedCaseReload()
  })

  watch([statusFilter, violationFilter, teamFilter], () => {
    if (!tournamentId.value) {
      return
    }
    void loadCases()
  })

  watch(() => createDialog.teamId, (teamId) => {
    createDialog.matchId = null
    createDialog.playerId = null
    void loadCreatePlayers(teamId)
    void loadCreateMatches(teamId)
  })

  watch(() => createDialog.open, (open) => {
    if (!open) {
      resetCreateDialog()
    }
  })

  watch(() => sanctionDraft.sanctionType, (nextType) => {
    caseDialog.preview = null
    caseDialog.previewSignature = ''

    if (nextType !== CUSTOM_SANCTION_TYPE) {
      sanctionDraft.customAdjustments = []
      sanctionDraft.pointsDeduction = 0
      sanctionDraft.suspensionMatches = 0
    }
  })

  watch(() => sanctionDraft.customAdjustments, (adjustments) => {
    caseDialog.preview = null
    caseDialog.previewSignature = ''

    if (!adjustments.includes('points')) {
      sanctionDraft.pointsDeduction = 0
    }

    if (!adjustments.includes('suspension')) {
      sanctionDraft.suspensionMatches = 0
    }

    if (!caseDialog.data?.player?.id && adjustments.includes('suspension')) {
      sanctionDraft.customAdjustments = adjustments.filter((item) => item !== 'suspension')
    }
  }, { deep: true })

  watch(() => caseDialog.open, (open) => {
    if (!open) {
      resetCaseDialog()
    }
  })
</script>

<template>
  <div class="discipline-panel" data-testid="discipline-panel">
    <KpisMetricsSection :items="summaryKpiItems" test-id-prefix="discipline-metrics" />

    <div class="discipline-toolbar-shell futzo-rounded" data-testid="discipline-toolbar-shell">
      <div class="discipline-toolbar">
        <v-text-field
          v-model="search"
          data-testid="discipline-search"
          class="discipline-toolbar__search"
          prepend-inner-icon="mdi-magnify"
          hide-details
          density="compact"
          variant="outlined"
          placeholder="Buscar caso, equipo o jugador..."
        />

        <div class="discipline-toolbar__filters">
          <v-select
            v-model="statusFilter"
            :items="statusItems"
            :disabled="loading.meta"
            item-title="title"
            item-value="value"
            density="compact"
            variant="outlined"
            hide-details
            class="discipline-filter"
          />

          <v-select
            v-model="violationFilter"
            :items="violationItems"
            :disabled="loading.meta"
            item-title="title"
            item-value="value"
            density="compact"
            variant="outlined"
            hide-details
            class="discipline-filter"
          />

          <v-select
            v-model="teamFilter"
            :items="teamItems"
            :disabled="loading.meta"
            item-title="title"
            item-value="value"
            density="compact"
            variant="outlined"
            hide-details
            class="discipline-filter"
          />

          <v-btn color="primary" class="discipline-toolbar__create" @click="createDialog.open = true">
            <Icon name="mdi-plus" size="16" class="mr-1" />
            Crear sancion
          </v-btn>
        </div>
      </div>
    </div>

    <div class="discipline-cases-shell">
      <v-card class="discipline-cases futzo-rounded">
        <v-card-title class="discipline-cases__title">Casos disciplinarios</v-card-title>
        <v-skeleton-loader v-if="loading.cases" type="table" class="ma-4" />

        <template v-else-if="cases.length">
          <div class="discipline-table-wrapper d-none d-md-block">
            <table class="discipline-table" data-testid="discipline-table">
              <thead>
                <tr>
                  <th>Caso</th>
                  <th>Detalle</th>
                  <th>Tipo de falta</th>
                  <th>Equipo / Jugador</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in cases" :key="item.id" class="discipline-table__row" @click="openCaseDetail(item)">
                  <td>
                    <div class="discipline-case-id">{{ item.case_id }}</div>
                    <small>{{ parseDateOnly(item.created_at) }}</small>
                  </td>
                  <td class="discipline-table__detail">{{ item.detail_snippet || item.description || '-' }}</td>
                  <td>{{ item.violation_type?.name || '-' }}</td>
                  <td>
                    <div class="discipline-table__team">{{ item.team?.name || '-' }}</div>
                    <small v-if="item.player?.name">- {{ item.player?.name }}</small>
                  </td>
                  <td>
                    <span class="discipline-status" :class="parseStatusClass(item.status)">
                      {{ parseStatusLabel(item) }}
                    </span>
                  </td>
                  <td class="discipline-table__action">
                    <Icon name="mdi-chevron-right" size="16" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="discipline-mobile d-md-none">
            <button
              v-for="item in cases"
              :key="`mobile-${item.id}`"
              type="button"
              class="discipline-mobile__item"
              @click="openCaseDetail(item)"
            >
              <div class="discipline-mobile__top">
                <strong>{{ item.case_id }}</strong>
                <span class="discipline-status" :class="parseStatusClass(item.status)">
                  {{ parseStatusLabel(item) }}
                </span>
              </div>

              <p>{{ item.detail_snippet || item.description || '-' }}</p>

              <div class="discipline-mobile__bottom">
                <span>{{ item.violation_type?.name || '-' }}</span>
                <span>{{ item.team?.name || '-' }}</span>
              </div>
            </button>
          </div>
        </template>

        <div v-else class="discipline-empty">
          <Icon name="lucide:shield-off" size="28" />
          <p>Sin casos disciplinarios</p>
          <span>No hay casos registrados o no hay resultados para los filtros actuales.</span>
        </div>
      </v-card>
    </div>

    <v-dialog v-model="createDialog.open" max-width="680">
      <v-card class="futzo-rounded">
        <v-card-title class="d-flex align-center justify-space-between">
          <div class="d-flex align-center gap-2">
            <Icon name="lucide:file-text" size="18" />
            Crear caso disciplinario
          </div>
          <v-btn icon variant="text" size="x-small" @click="createDialog.open = false">
            <Icon name="mdi-close" size="18" />
          </v-btn>
        </v-card-title>

        <v-card-text class="discipline-dialog__body">
          <p class="discipline-dialog__subtitle">
            Registra un incidente. No se aplicara ningun impacto hasta que el caso sea resuelto.
          </p>

          <v-autocomplete
            v-model="createDialog.teamId"
            :items="createTeamItems"
            :disabled="loading.meta"
            item-title="title"
            item-value="value"
            label="Equipo *"
            placeholder="Busca y selecciona un equipo"
            clearable
            no-data-text="No hay equipos disponibles"
            density="compact"
            variant="outlined"
            hide-details
          />

          <v-select
            v-model="createDialog.matchId"
            :items="createMatchItems"
            :loading="loading.matches"
            :disabled="!createDialog.teamId"
            item-title="title"
            item-value="value"
            label="Partido *"
            no-data-text="Selecciona un equipo con partidos disponibles"
            density="compact"
            variant="outlined"
            hide-details
          />

          <v-select
            v-model="createDialog.playerId"
            :items="teamPlayers"
            :loading="loading.players"
            :disabled="!createDialog.teamId"
            item-title="name"
            item-value="player_id"
            label="Jugador (opcional)"
            no-data-text="No hay jugadores disponibles para este equipo"
            density="compact"
            variant="outlined"
            hide-details
          />

          <v-select
            v-model="createDialog.violationTypeId"
            :items="meta.violations"
            item-title="name"
            item-value="id"
            label="Tipo de falta *"
            density="compact"
            variant="outlined"
            hide-details
          />

          <v-textarea
            v-model="createDialog.description"
            label="Descripcion del incidente *"
            placeholder="Describe lo sucedido con el mayor detalle posible..."
            rows="3"
            auto-grow
            density="compact"
            variant="outlined"
            hide-details
          />

          <div class="discipline-dialog__status">
            <span class="discipline-dialog__dot" />
            {{ createStatusText }}
          </div>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            :disabled="!createCanSave || createDialog.saving"
            :loading="createDialog.saving"
            @click="saveCase(false)"
          >
            Guardar borrador
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!createCanSave || createDialog.saving"
            :loading="createDialog.saving"
            @click="saveCase(true)"
          >
            Enviar a revision
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="caseDialog.open" max-width="860">
      <v-card class="discipline-case-dialog futzo-rounded">
        <v-card-title class="discipline-case-dialog__header">
          <div>
            <div class="discipline-case-dialog__title">{{ caseDialog.data?.case_id || '-' }}</div>
            <p class="discipline-case-dialog__subtitle">
              {{ caseDialog.data?.violation_type?.name || '-' }}
              <template v-if="caseDialog.data?.team?.name"> - {{ caseDialog.data?.team?.name }}</template>
              <template v-if="caseDialog.data?.player?.name"> - {{ caseDialog.data?.player?.name }}</template>
            </p>
          </div>

          <div class="discipline-case-dialog__header-actions">
            <span class="discipline-status" :class="parseStatusClass(caseDialog.data?.status)">
              {{ parseStatusLabel(caseDialog.data || {}) }}
            </span>
            <v-btn icon variant="text" size="x-small" @click="caseDialog.open = false">
              <Icon name="mdi-close" size="18" />
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text class="discipline-case-dialog__content">
          <v-skeleton-loader v-if="caseDialog.loading" type="article" />

          <template v-else-if="caseDialog.data">
            <div class="discipline-case-tabs" data-testid="discipline-case-tabs">
              <button
                type="button"
                class="discipline-case-tabs__item"
                :class="{ 'discipline-case-tabs__item--active': caseDialog.tab === 'resumen' }"
                @click="caseDialog.tab = 'resumen'"
              >
                Resumen
              </button>
              <button
                type="button"
                class="discipline-case-tabs__item"
                :class="{ 'discipline-case-tabs__item--active': caseDialog.tab === 'sancion' }"
                @click="caseDialog.tab = 'sancion'"
              >
                Sancion
              </button>
              <button
                type="button"
                class="discipline-case-tabs__item"
                :class="{ 'discipline-case-tabs__item--active': caseDialog.tab === 'historial' }"
                @click="caseDialog.tab = 'historial'"
              >
                Historial
              </button>
            </div>

            <div v-if="caseDialog.tab === 'resumen'" class="discipline-case-pane">
              <div class="discipline-case-grid">
                <div>
                  <label>Torneo</label>
                  <p>{{ caseDialog.data?.match?.id ? `Partido #${caseDialog.data.match.id}` : 'N/A' }}</p>
                </div>
                <div>
                  <label>Fecha</label>
                  <p>{{ formatDate(caseDialog.data?.created_at) }}</p>
                </div>
                <div v-if="caseDialog.data?.match">
                  <label>Partido</label>
                  <p>
                    {{ caseDialog.data?.match?.home_team?.name || '-' }}
                    vs
                    {{ caseDialog.data?.match?.away_team?.name || '-' }}
                  </p>
                </div>
                <div>
                  <label>Equipo</label>
                  <p>{{ caseDialog.data?.team?.name || '-' }}</p>
                </div>
                <div>
                  <label>Jugador</label>
                  <p>{{ caseDialog.data?.player?.name || 'N/A' }}</p>
                </div>
                <div>
                  <label>Tipo de falta</label>
                  <p>{{ caseDialog.data?.violation_type?.name || '-' }}</p>
                </div>
              </div>

              <div class="discipline-case-description">
                <label>Descripcion</label>
                <p>{{ caseDialog.data?.description || '-' }}</p>
              </div>

              <div class="discipline-impact-preview">
                <div class="discipline-impact-preview__title">
                  <Icon name="lucide:triangle-alert" size="14" />
                  Vista previa del impacto
                </div>

                <template v-if="previewHighlights.length">
                  <div v-for="item in previewHighlights" :key="item.key" class="discipline-impact-preview__item">
                    <p>{{ item.title }}</p>
                    <span>{{ item.detail }}</span>
                  </div>
                </template>

                <p v-else class="discipline-impact-preview__hint">
                  Configura y ejecuta una vista previa para mostrar el impacto antes de aplicar.
                </p>
              </div>
            </div>

            <div v-else-if="caseDialog.tab === 'sancion'" class="discipline-case-pane">
              <div class="discipline-sancion-header">
                <p>Sanciones</p>
              </div>

              <div v-if="configuredSanctions.length" class="discipline-sancion-list">
                <div v-for="item in configuredSanctions" :key="item.key" class="discipline-sancion-list__item">
                  <strong>{{ item.label }}</strong>
                  <span>{{ item.value }}</span>
                </div>
              </div>

              <div v-else class="discipline-sancion-empty">{{ sanctionsEmptyMessage }}</div>

              <div v-if="isCaseEditable" class="discipline-sancion-form">
                <v-select
                  v-model="sanctionDraft.sanctionType"
                  :items="sanctionTypeItems"
                  item-title="title"
                  item-value="value"
                  label="Tipo de sancion *"
                  density="compact"
                  variant="outlined"
                  hide-details
                />

                <div class="discipline-sancion-context">
                  <p>
                    <strong>Equipo a sancionar:</strong>
                    {{ sanctionedTeamName }}
                  </p>
                  <small>El equipo rival se calculara automaticamente para aplicar el resultado administrativo.</small>
                </div>

                <div v-if="sanctionDraft.sanctionType === CUSTOM_SANCTION_TYPE" class="discipline-admin-outcome">
                  <v-select
                    v-model="sanctionDraft.customAdjustments"
                    :items="customAdjustmentItems"
                    item-title="title"
                    item-value="value"
                    label="Ajustes adicionales"
                    multiple
                    chips
                    density="compact"
                    variant="outlined"
                    hide-details
                  />

                  <div
                    v-if="sanctionDraft.customAdjustments.includes('points') || sanctionDraft.customAdjustments.includes('suspension')"
                    class="discipline-sancion-form__grid"
                  >
                    <v-text-field
                      v-if="sanctionDraft.customAdjustments.includes('points')"
                      v-model.number="sanctionDraft.pointsDeduction"
                      label="Deduccion de puntos"
                      type="number"
                      min="0"
                      density="compact"
                      hide-details
                      variant="outlined"
                    />

                    <v-text-field
                      v-if="sanctionDraft.customAdjustments.includes('suspension')"
                      v-model.number="sanctionDraft.suspensionMatches"
                      label="Suspension (partidos)"
                      type="number"
                      min="0"
                      density="compact"
                      :disabled="!caseDialog.data?.player?.id"
                      hide-details
                      variant="outlined"
                    />
                  </div>

                  <p class="discipline-sancion-form__hint">
                    La modalidad custom usa los valores globales de disciplina para resultado administrativo.
                  </p>

                  <p v-if="!caseDialog.data?.player?.id" class="discipline-sancion-form__hint">
                    Este caso no tiene jugador asociado, por lo tanto no se puede aplicar suspension.
                  </p>
                </div>
              </div>

              <div class="discipline-impact-preview mt-3">
                <div class="discipline-impact-preview__title">
                  <Icon name="lucide:triangle-alert" size="14" />
                  Vista previa del impacto
                </div>

                <template v-if="previewHighlights.length">
                  <div v-for="item in previewHighlights" :key="`impact-${item.key}`" class="discipline-impact-preview__item">
                    <p>{{ item.title }}</p>
                    <span>{{ item.detail }}</span>
                  </div>
                </template>

                <p v-else class="discipline-impact-preview__hint">
                  Sin preview calculada para esta configuracion.
                </p>
              </div>

              <div class="discipline-sancion-actions">
                <v-btn
                  v-if="canSubmitCase"
                  :loading="caseDialog.submitting"
                  :disabled="caseDialog.submitting"
                  color="primary"
                  variant="tonal"
                  @click="submitCurrentCase"
                >
                  Enviar a revision
                </v-btn>

                <template v-if="canApplyCase">
                  <v-btn
                    color="warning"
                    variant="tonal"
                    :loading="caseDialog.previewing"
                    :disabled="caseDialog.previewing"
                    @click="previewCaseImpact"
                  >
                    Vista previa
                  </v-btn>

                  <v-btn
                    color="primary"
                    :loading="caseDialog.applying"
                    :disabled="caseDialog.applying"
                    @click="applyCurrentSanction"
                  >
                    Aplicar sancion
                  </v-btn>
                </template>

                <v-btn
                  v-if="canRevertCase && !caseDialog.showRevert"
                  color="error"
                  variant="outlined"
                  @click="caseDialog.showRevert = true"
                >
                  Revertir sancion
                </v-btn>
              </div>

              <div v-if="caseDialog.showRevert" class="discipline-revert-box">
                <v-textarea
                  v-model="caseDialog.revertReason"
                  label="Razon de reversion"
                  rows="2"
                  auto-grow
                  variant="outlined"
                  hide-details
                />
                <div class="discipline-revert-box__actions">
                  <v-btn variant="text" @click="caseDialog.showRevert = false">Cancelar</v-btn>
                  <v-btn
                    color="error"
                    :loading="caseDialog.reverting"
                    :disabled="caseDialog.reverting"
                    @click="revertCurrentSanction"
                  >
                    Confirmar reversion
                  </v-btn>
                </div>
              </div>
            </div>

            <div v-else class="discipline-case-pane">
              <div class="discipline-audit-header">Historial de auditoria</div>

              <div v-if="auditEntries.length" class="discipline-audit-list">
                <div v-for="entry in auditEntries" :key="entry.id" class="discipline-audit-list__item">
                  <div class="discipline-audit-list__dot" />
                  <div>
                    <p>{{ entry.action }} <small>{{ entry.date }}</small></p>
                    <span>{{ entry.details }}</span>
                    <small>{{ entry.user }}</small>
                  </div>
                </div>
              </div>

              <div v-else class="discipline-sancion-empty">Sin actividad registrada.</div>
            </div>
          </template>

          <div v-else class="discipline-sancion-empty">No se encontro informacion del caso.</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="sass" scoped>
  .discipline-panel
    display: flex
    flex-direction: column
    gap: 12px

  .discipline-toolbar-shell
    padding: 12px

  .discipline-toolbar
    display: grid
    grid-template-columns: 1fr
    gap: 8px

  .discipline-toolbar__filters
    display: grid
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: 8px

  .discipline-filter
    min-width: 0

  .discipline-toolbar__create
    grid-column: span 2

  .discipline-cases-shell
    display: flex
    min-height: 0

  .discipline-cases
    width: 100%
    overflow: hidden

  .discipline-cases__title
    font-size: 16px
    font-weight: 600
    color: var(--futzo-on-surface)
    border-bottom: 1px solid var(--futzo-border)

  .discipline-table-wrapper
    overflow-x: auto

  .discipline-table
    width: 100%
    border-collapse: collapse

  .discipline-table th,
  .discipline-table td
    border-bottom: 1px solid rgba(16, 24, 40, 0.08)
    text-align: left
    font-size: 12px
    padding: 10px 12px
    vertical-align: top

  .discipline-table th
    color: var(--futzo-on-surface-muted)
    background: #f8f9fb
    font-weight: 600

  .discipline-table__row
    cursor: pointer
    transition: background .2s ease

  .discipline-table__row:hover
    background: #f9fafb

  .discipline-table__detail
    color: var(--futzo-text-muted)
    max-width: 420px

  .discipline-case-id
    font-weight: 700
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace

  .discipline-table small
    color: #98a2b3

  .discipline-table__team
    font-weight: 600
    color: var(--futzo-on-surface)

  .discipline-table__action
    width: 32px
    text-align: center
    color: #98a2b3

  .discipline-status
    display: inline-flex
    align-items: center
    justify-content: center
    border-radius: 999px
    padding: 2px 10px
    font-size: 11px
    font-weight: 600

  .discipline-status--draft
    background: #f2f4f7
    color: var(--futzo-text-muted)

  .discipline-status--review
    background: #fff4e5
    color: #b54708

  .discipline-status--applied
    background: #ffeaea
    color: #d92d20

  .discipline-status--closed
    background: #e7f8ef
    color: #067647

  .discipline-mobile
    display: grid

  .discipline-mobile__item
    border: 0
    border-bottom: 1px solid rgba(16, 24, 40, 0.08)
    background: transparent
    text-align: left
    padding: 12px

  .discipline-mobile__top
    display: flex
    justify-content: space-between
    align-items: center
    gap: 8px

  .discipline-mobile__item p
    margin: 8px 0 6px
    font-size: 12px
    color: var(--futzo-text-muted)

  .discipline-mobile__bottom
    display: flex
    justify-content: space-between
    font-size: 11px
    color: var(--futzo-on-surface-muted)

  .discipline-empty
    min-height: 260px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 8px
    color: var(--futzo-on-surface-muted)

  .discipline-empty p
    margin: 0
    font-weight: 600
    color: var(--futzo-on-surface)

  .discipline-empty span
    font-size: 12px

  .discipline-dialog__body
    display: flex
    flex-direction: column
    gap: 12px

  .discipline-dialog__subtitle
    margin: 0
    color: var(--futzo-on-surface-muted)
    font-size: 13px

  .discipline-dialog__status
    display: flex
    align-items: center
    gap: 6px
    font-size: 12px
    color: var(--futzo-on-surface-muted)

  .discipline-dialog__dot
    width: 8px
    height: 8px
    border-radius: 999px
    background: #98a2b3

  .discipline-case-dialog__header
    border-bottom: 1px solid rgba(16, 24, 40, 0.08)
    display: flex
    justify-content: space-between
    align-items: flex-start
    gap: 12px

  .discipline-case-dialog__title
    font-size: 17px
    font-weight: 700

  .discipline-case-dialog__subtitle
    margin: 4px 0 0
    font-size: 12px
    color: var(--futzo-on-surface-muted)

  .discipline-case-dialog__header-actions
    display: flex
    align-items: center
    gap: 8px

  .discipline-case-dialog__content
    display: flex
    flex-direction: column
    gap: 12px

  .discipline-case-tabs
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 8px
    padding: 4px
    border-radius: 10px
    background: #f2f4f7

  .discipline-case-tabs__item
    appearance: none
    border: 0
    background: transparent
    border-radius: 8px
    font-size: 12px
    font-weight: 600
    color: var(--futzo-on-surface-muted)
    padding: 8px 10px
    cursor: pointer
    transition: .18s ease

  .discipline-case-tabs__item--active
    background: var(--futzo-surface)
    color: var(--futzo-on-surface)
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08)

  .discipline-case-pane
    display: flex
    flex-direction: column
    gap: 12px

  .discipline-case-grid
    display: grid
    grid-template-columns: repeat(1, minmax(0, 1fr))
    gap: 10px

  .discipline-case-grid label,
  .discipline-case-description label
    font-size: 11px
    color: #98a2b3
    display: block

  .discipline-case-grid p,
  .discipline-case-description p
    margin: 2px 0 0
    font-size: 13px
    color: var(--futzo-on-surface)

  .discipline-case-description
    border: 1px solid rgba(16, 24, 40, 0.08)
    border-radius: 10px
    padding: 12px

  .discipline-sancion-header
    font-size: 13px
    font-weight: 700
    color: var(--futzo-on-surface)

  .discipline-sancion-header p
    margin: 0

  .discipline-sancion-list
    display: grid
    gap: 8px

  .discipline-sancion-list__item
    border: 1px solid rgba(16, 24, 40, 0.08)
    border-radius: 10px
    padding: 10px 12px

  .discipline-sancion-list__item strong
    display: block
    font-size: 12px

  .discipline-sancion-list__item span
    font-size: 12px
    color: var(--futzo-on-surface-muted)

  .discipline-sancion-empty
    border: 1px dashed rgba(16, 24, 40, 0.16)
    border-radius: 10px
    padding: 14px
    text-align: center
    color: var(--futzo-on-surface-muted)
    font-size: 12px

  .discipline-sancion-form
    border: 1px solid rgba(16, 24, 40, 0.08)
    border-radius: 12px
    padding: 12px
    display: flex
    flex-direction: column
    gap: 10px

  .discipline-sancion-form__grid
    display: grid
    grid-template-columns: repeat(1, minmax(0, 1fr))
    gap: 10px

  .discipline-admin-outcome
    display: flex
    flex-direction: column
    gap: 10px
    border-top: 1px dashed rgba(16, 24, 40, 0.16)
    padding-top: 10px

  .discipline-sancion-context
    border: 1px solid rgba(16, 24, 40, 0.08)
    border-radius: 10px
    padding: 10px 12px
    background: #f8f9fb

  .discipline-sancion-context p
    margin: 0
    font-size: 12px
    color: var(--futzo-on-surface)

  .discipline-sancion-context small
    display: block
    margin-top: 4px
    color: var(--futzo-on-surface-muted)
    font-size: 11px

  .discipline-sancion-form__hint
    margin: 0
    font-size: 11px
    color: var(--futzo-on-surface-muted)

  .discipline-impact-preview
    border: 1px solid rgba(247, 144, 9, 0.35)
    background: #fffaf0
    border-radius: 10px
    padding: 10px 12px
    display: flex
    flex-direction: column
    gap: 8px

  .discipline-impact-preview__title
    display: flex
    align-items: center
    gap: 6px
    color: #b54708
    font-size: 12px
    font-weight: 700

  .discipline-impact-preview__item p
    margin: 0
    font-size: 12px
    font-weight: 600
    color: var(--futzo-on-surface)

  .discipline-impact-preview__item span
    font-size: 11px
    color: var(--futzo-on-surface-muted)

  .discipline-impact-preview__hint
    margin: 0
    font-size: 12px
    color: var(--futzo-on-surface-muted)

  .discipline-sancion-actions
    display: flex
    flex-wrap: wrap
    gap: 8px

  .discipline-revert-box
    border: 1px solid rgba(240, 68, 56, 0.34)
    background: #fff2f1
    border-radius: 10px
    padding: 10px
    display: flex
    flex-direction: column
    gap: 8px

  .discipline-revert-box__actions
    display: flex
    justify-content: flex-end
    gap: 8px

  .discipline-audit-header
    font-size: 13px
    font-weight: 700
    color: var(--futzo-on-surface)

  .discipline-audit-list
    display: grid
    gap: 10px

  .discipline-audit-list__item
    position: relative
    display: flex
    gap: 8px
    padding-left: 2px

  .discipline-audit-list__dot
    width: 10px
    height: 10px
    border-radius: 999px
    margin-top: 5px
    background: rgb(var(--v-theme-primary))

  .discipline-audit-list__item p
    margin: 0
    font-size: 12px
    font-weight: 600
    color: var(--futzo-on-surface)

  .discipline-audit-list__item p small
    margin-left: 6px
    color: #98a2b3
    font-weight: 500

  .discipline-audit-list__item span
    display: block
    font-size: 11px
    color: var(--futzo-on-surface-muted)

  .discipline-audit-list__item small
    display: block
    margin-top: 4px
    color: #98a2b3
    font-size: 11px

  @media (min-width: 920px)
    .discipline-toolbar
      grid-template-columns: 1fr auto
      align-items: center

    .discipline-toolbar__filters
      grid-template-columns: repeat(4, minmax(130px, auto))

    .discipline-toolbar__create
      grid-column: auto

    .discipline-case-grid
      grid-template-columns: repeat(2, minmax(0, 1fr))

    .discipline-sancion-form__grid
      grid-template-columns: repeat(2, minmax(0, 1fr))
</style>
