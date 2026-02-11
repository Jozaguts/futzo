export type DisciplineCaseStatus = 'draft' | 'review' | 'applied' | 'closed'

export type DisciplineStatusOption = {
  value: DisciplineCaseStatus
  label: string
}

export type DisciplineTeamRef = {
  id: number
  name: string
  image?: string | null
}

export type DisciplinePlayerRef = {
  id: number
  name: string
}

export type DisciplineViolationRef = {
  id: number
  name: string
}

export type DisciplineMatchRef = {
  id: number
  round?: number | null
  match_date?: string | null
  home_team?: DisciplineTeamRef | null
  away_team?: DisciplineTeamRef | null
}

export type DisciplineCaseListItem = {
  id: number
  case_id: string
  created_at: string
  detail_snippet?: string | null
  description?: string | null
  violation_type?: DisciplineViolationRef | null
  team?: DisciplineTeamRef | null
  player?: DisciplinePlayerRef | null
  match?: DisciplineMatchRef | null
  status: DisciplineCaseStatus
  status_label?: string | null
}

export type DisciplineSummary = {
  total: number
  pending: number
  applied: number
  closed: number
}

export type DisciplineMeta = {
  rounds: number[]
  teams: DisciplineTeamRef[]
  violations: DisciplineViolationRef[]
  statuses: DisciplineStatusOption[]
}

export type DisciplineTeamMatchOption = {
  id: number
  title: string
  subtitle?: string
  match_date?: string | null
  round?: number | null
  home_team?: DisciplineTeamRef | null
  away_team?: DisciplineTeamRef | null
  phase?: 'upcoming' | 'played'
}

export type DisciplineCasesQuery = {
  round?: number
  team_id?: number
  violation_type_id?: number
  status?: DisciplineCaseStatus
  match_id?: number
  date_from?: string
  date_to?: string
  search?: string
  per_page?: number
  page?: number
}

export type CreateDisciplinaryCasePayload = {
  match_id?: number
  team_id: number
  player_id?: number
  violation_type_id: number
  description: string
}

export type DisciplinePointsAdjustment = {
  team_id: number
  value: number
}

export type DisciplineGoalsAdjustment = {
  team_id: number
  value: number
}

export type DisciplineSuspensionInput = {
  player_id: number
  matches: number
}

export type DisciplineAdminOutcomePreset = {
  preset_id: string
  winner_team_id: number
  loser_team_id: number
}

export type DisciplineAdminOutcomeCustom = {
  goals_against: number
  match_lost: boolean
  winner_team_id: number
  loser_team_id: number
}

export type DisciplineSanctionPayload = {
  points?: DisciplinePointsAdjustment[]
  goals_for?: DisciplineGoalsAdjustment[]
  goals_against?: DisciplineGoalsAdjustment[]
  suspensions?: DisciplineSuspensionInput[]
  admin_outcome?: DisciplineAdminOutcomePreset | DisciplineAdminOutcomeCustom
}

export type DisciplinePreviewPayload = {
  sanction: DisciplineSanctionPayload
}

export type DisciplinePreviewStandings = {
  team_id: number
  points: number
  goals_for: number
  goals_against: number
}

export type DisciplinePreviewSuspension = {
  player_id: number
  matches: number
  starts_after_game_id?: number
  starts_after_round?: number
}

export type DisciplinePreviewResult = {
  match_result?: {
    game_id: number
    home_goals: number
    away_goals: number
    winner_team_id: number
  } | null
  standings_before?: DisciplinePreviewStandings[]
  standings_after?: DisciplinePreviewStandings[]
  suspensions?: DisciplinePreviewSuspension[]
}

export type DisciplinePreviewResponse = {
  preview: DisciplinePreviewResult
}

export type DisciplineRevertPayload = {
  reason: string
}

export type DisciplineAuditEntry = {
  id?: number | string
  action?: string
  details?: string
  date?: string
  created_at?: string
  user?: {
    id?: number
    name?: string
  } | null
  user_name?: string | null
}

export type DisciplineSanctionDetail = {
  points?: DisciplinePointsAdjustment[]
  goals_for?: DisciplineGoalsAdjustment[]
  goals_against?: DisciplineGoalsAdjustment[]
  suspensions?: DisciplineSuspensionInput[]
  admin_outcome?: Partial<DisciplineAdminOutcomePreset & DisciplineAdminOutcomeCustom>
}

export type DisciplineCaseDetail = {
  id: number
  case_id: string
  created_at: string
  description?: string | null
  status: DisciplineCaseStatus
  status_label?: string | null
  violation_type?: DisciplineViolationRef | null
  team?: DisciplineTeamRef | null
  player?: DisciplinePlayerRef | null
  match?: DisciplineMatchRef | null
  sanction?: DisciplineSanctionDetail | null
  adjustments?: {
    points?: DisciplinePointsAdjustment[]
    goals_for?: DisciplineGoalsAdjustment[]
    goals_against?: DisciplineGoalsAdjustment[]
  } | null
  suspensions?: DisciplinePreviewSuspension[]
  audit_logs?: DisciplineAuditEntry[]
}

export type DisciplineCollectionResponse<T> = {
  data: T[]
  meta?: {
    current_page?: number
    last_page?: number
    per_page?: number
    total?: number
  }
}

export type DisciplineDefaultPreset = {
  id: string
  label: string
}

export type DisciplineDefaults = {
  alignment_default_goals_against?: number
  alignment_default_match_lost?: boolean
  alignment_default_preset_id?: string | null
  enable_appeals?: boolean
  enable_recidivism_escalation?: boolean
  presets?: DisciplineDefaultPreset[]
}
