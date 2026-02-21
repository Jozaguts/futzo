export type CredentialFormat = 'official_vertical' | 'official_horizontal' | 'fifa_style' | 'letter_sheet'

export type CredentialOutputMode = 'print' | 'digital'

export type CredentialStatus = 'active' | 'suspended' | 'expired' | 'invalidated'

export type CredentialValidationStatus = CredentialStatus | 'not_found'

export type CredentialBatchStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'partial'

export type CredentialWatermarkMode = 'forced' | 'optional' | 'disabled'

export type CredentialSideMode = 'front' | 'back' | 'both'

export type CredentialSizeKey = 'credential_standard' | 'letter' | 'half_letter' | 'custom'

export type CredentialArtifactVariant = 'pdf' | 'png' | 'digital'

export type CredentialPermission = 'canManageCredentials' | 'canValidateCredentials' | 'canConfigureCredentials'

export type CredentialsDashboardMetric = {
  active: number
  suspended: number
  expired: number
  generated_this_season: number
}

export type CredentialsQuickAction = {
  key: string
  label: string
  path: string
}

export type CredentialsLatestGeneratedItem = {
  id: number
  player_name: string
  team_name: string
  tournament_name: string
  format: CredentialFormat
  status: CredentialStatus
  issued_at: string
}

export type CredentialsDashboardResponse = {
  title: string
  description: string
  metrics: CredentialsDashboardMetric
  quick_actions: CredentialsQuickAction[]
  latest_generated: CredentialsLatestGeneratedItem[]
}

export type CredentialsCatalogStatusOption = {
  value: 'all' | CredentialStatus | 'invalidated'
  label: string
}

export type CredentialsCatalogFilters = {
  status_options: CredentialsCatalogStatusOption[]
  applied: {
    tournament_id: number | null
    team_id: number | null
    status: string
    search: string
    include_unverified: boolean
    include_suspended: boolean
    per_page: number
  }
}

export type CredentialsCatalogPlan = {
  slug: string
  can_use_seasonal: boolean
  watermark_locked_by_plan: boolean
}

export type CredentialsCatalogOutputMode = {
  key: CredentialOutputMode
  label: string
  enabled: boolean
  reason?: string | null
}

export type CredentialsCatalogSizeOption = {
  key: CredentialSizeKey
  label: string
}

export type CredentialsCatalogSideModeOption = {
  key: CredentialSideMode
  label: string
}

export type CredentialsCatalogFormatItem = {
  id?: number
  key: CredentialFormat
  label: string
  locked_by_plan: boolean
  lock_reason?: string | null
  upgrade_cta?: string | null
  supports_reverse_side?: boolean
}

export type CredentialsCatalogTournament = {
  id: number
  name: string
}

export type CredentialsCatalogTeam = {
  id: number
  name: string
  tournament_id?: number
}

export type CredentialsCatalogPlayer = {
  id: number
  name: string
  image?: string | null
  number?: number | string | null
  team?: { id: number; name: string } | null
  verification_status?: string | null
  is_suspended?: boolean
  current_credential_status?: CredentialStatus | null
}

export type CredentialsCatalogPlayersCollection = {
  data: CredentialsCatalogPlayer[]
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export type CredentialsGeneratorCatalogsResponse = {
  filters: CredentialsCatalogFilters
  plan: CredentialsCatalogPlan
  generation: {
    output_modes: CredentialsCatalogOutputMode[]
    size_options: CredentialsCatalogSizeOption[]
    defaults: {
      format: CredentialFormat
      output_mode: CredentialOutputMode
      side_mode: CredentialSideMode
      size_key: CredentialSizeKey
      show_qr: boolean
      show_expiry: boolean
      watermark_mode: CredentialWatermarkMode
      primary_color?: string
      secondary_color?: string
    }
    side_mode_options: CredentialsCatalogSideModeOption[]
  }
  formats: CredentialsCatalogFormatItem[]
  tournaments: CredentialsCatalogTournament[]
  teams: CredentialsCatalogTeam[]
  players: CredentialsCatalogPlayersCollection
}

export type CredentialsBatchArtifact = {
  disk: string
  path: string
}

export type CredentialsBatch = {
  id: number
  tournament_id: number
  status: CredentialBatchStatus
  format: CredentialFormat
  output_mode: CredentialOutputMode
  selection_count: number
  processed_count: number
  success_count: number
  failed_count: number
  artifact_disk?: string | null
  artifact_path?: string | null
  artifacts?: Partial<Record<CredentialArtifactVariant, CredentialsBatchArtifact>>
  available_artifact_variants?: CredentialArtifactVariant[]
  started_at?: string | null
  finished_at?: string | null
  progress_percent?: number
  message?: string | null
}

export type CredentialsBatchCreatePayload = {
  tournament_id?: number | null
  team_id?: number | null
  design_id?: number | null
  format: CredentialFormat
  output_mode: CredentialOutputMode
  player_ids: number[]
  filters?: {
    status?: string
    search?: string
    include_unverified?: boolean
    include_suspended?: boolean
  }
  customization?: {
    primary_color?: string
    secondary_color?: string
    show_qr?: boolean
    show_expiry?: boolean
    watermark_mode?: CredentialWatermarkMode
    side_mode?: CredentialSideMode
    size_key?: CredentialSizeKey
    width_cm?: number | null
    height_cm?: number | null
  }
}

export type CredentialsBatchCreateResponse = {
  message: string
  data: CredentialsBatch
}

export type CredentialDesignStyleConfig = {
  primary_color?: string
  secondary_color?: string
  font?: 'poppins' | 'montserrat' | 'rubik'
  show_qr?: boolean
  show_expiry?: boolean
  reverse_enabled?: boolean
  glow?: boolean
  background_pattern?: string | null
  overlay?: string | null
  visible_fields?: Array<'name' | 'number' | 'team' | 'category' | 'expiry' | 'signature' | 'qr'>
}

export type CredentialDesign = {
  id: number
  name: string
  slug: string
  type: CredentialFormat
  is_official: boolean
  is_default: boolean
  locked_by_plan: boolean
  season_label?: string | null
  theme_pack?: string | null
  style_config?: CredentialDesignStyleConfig
  logo?: {
    disk?: string
    path?: string
    url?: string
  } | null
}

export type CredentialsDesignsResponse = {
  plan: {
    slug: string
    can_use_seasonal: boolean
  }
  official: CredentialDesign[]
  seasonal: CredentialDesign[]
}

export type CredentialSettings = {
  requires_registered_player: boolean
  allow_unverified_players: boolean
  allow_suspended_players: boolean
  block_if_team_sanctioned: boolean
  expiry_by_tournament: boolean
  show_warnings_on_card: boolean
  qr_enabled_by_default: boolean
  allow_digital_credential: boolean
  watermark_mode: CredentialWatermarkMode
}

export type CredentialSettingsResource = CredentialSettings & {
  is_configured?: boolean
  source?: 'defaults' | 'custom' | 'global' | 'override'
  tournament_id?: number
  is_override?: boolean
  watermark_locked_by_plan?: boolean
}

export type CredentialValidationResponse = {
  status: CredentialValidationStatus
  status_color: 'green' | 'red' | 'yellow' | 'gray'
  message: string
  reason_code:
    | 'player_suspended'
    | 'credential_expired'
    | 'credential_invalidated'
    | 'player_not_verified'
    | 'team_sanctioned'
    | 'credential_not_found'
    | null
  reason_message: string | null
  validated_at: string
  credential?: {
    id: number
    credential_code: string
    status: CredentialStatus
    player?: { id: number; name: string; image?: string | null } | null
    team?: { id: number; name: string } | null
    tournament?: { id: number; name: string } | null
    issued_at?: string | null
    expires_at?: string | null
    invalidated_at?: string | null
  } | null
}

export type CredentialHistoryItem = {
  id: number
  player_id: number
  player_name: string
  team_id: number
  team_name: string
  tournament_id: number
  tournament_name: string
  format: CredentialFormat
  status: CredentialStatus
  credential_code: string
  issued_at: string
  issued_by: number
  issued_by_name: string
  expires_at?: string | null
  invalidated_at?: string | null
  actions: {
    can_view: boolean
    can_reprint: boolean
    can_invalidate: boolean
  }
}

export type CredentialHistoryCollection = {
  data: CredentialHistoryItem[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  filters?: {
    applied?: Record<string, unknown>
  }
}

export type CredentialHistoryDetail = CredentialHistoryItem & {
  output_mode?: CredentialOutputMode
  design_id?: number | null
  batch_id?: number | null
  payload_snapshot?: Record<string, unknown>
  invalidated_by_name?: string | null
}

export type CredentialsHistoryQuery = {
  tournament_id?: number | null
  team_id?: number | null
  format?: CredentialFormat | null
  status?: CredentialStatus | null
  date_from?: string | null
  date_to?: string | null
  per_page?: number
  page?: number
}
