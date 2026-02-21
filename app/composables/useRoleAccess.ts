import type { User } from '~/models/User'

type UserLike = User & Record<string, any>

const normalizeRole = (value: unknown) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const pickFirstString = (values: unknown[]) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return null
}

const parseListPayload = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === 'object' && 'data' in value) {
    const data = (value as { data?: unknown }).data
    if (Array.isArray(data)) return data as T[]
  }
  return []
}

const flattenPermissionCandidates = (value: unknown): string[] => {
  if (!value) return []

  if (typeof value === 'string') {
    const normalized = normalizeRole(value)
    return normalized ? [normalized] : []
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenPermissionCandidates(item))
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>

    const direct = [
      record.name,
      record.title,
      record.key,
      record.slug,
      record.permission,
      record.ability,
    ]
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .map((item) => normalizeRole(item))

    const nested = [record.permissions, record.data, record.items, record.children].flatMap((entry) =>
      flattenPermissionCandidates(entry)
    )

    return [...direct, ...nested]
  }

  return []
}

export const useRoleAccess = () => {
  const user = useSanctumUser<UserLike>()
  const teamHomePath = useState<string | null>('role-access-team-home-path', () => null)
  const playerHomePath = useState<string | null>('role-access-player-home-path', () => null)

  const normalizedRoles = computed(() =>
    (user.value?.roles ?? []).map((role) =>
      normalizeRole(
        typeof role === 'string'
          ? role
          : (role as { name?: string; title?: string })?.name ?? (role as { title?: string })?.title
      )
    )
  )

  const normalizedPermissions = computed(() => {
    const current = user.value
    const rawCandidates = [
      current?.permissions,
      current?.abilities,
      current?.role_permissions,
      current?.permission_names,
      current?.role?.permissions,
      current?.roles,
    ]

    const unique = new Set<string>()

    for (const entry of rawCandidates) {
      for (const token of flattenPermissionCandidates(entry)) {
        if (token) unique.add(token)
      }
    }

    return [...unique]
  })

  const hasRoleToken = (tokens: string[]) =>
    normalizedRoles.value.some((role) => tokens.some((token) => role.includes(normalizeRole(token))))

  const hasPermissionToken = (tokens: string[]) =>
    normalizedPermissions.value.some((permission) =>
      tokens.some((token) => permission.includes(normalizeRole(token)))
    )

  const isTeamOwnerRole = computed(() => hasRoleToken(['dueno de equipo', 'dueno', 'presidente', 'president']))
  const isCoachRole = computed(() => hasRoleToken(['entrenador', 'tecnico', 'coach']))
  const isPlayerRole = computed(() => hasRoleToken(['jugador']))
  const isRefereeRole = computed(() => hasRoleToken(['arbitro', 'arbitraje', 'referee']))
  const isLeagueStaffRole = computed(() => hasRoleToken(['personal administrativo de liga']))
  const isAdminRole = computed(() => hasRoleToken(['administrador']))
  const isSuperAdminRole = computed(() => hasRoleToken(['super administrador']))

  const isTeamScopedRole = computed(() => isTeamOwnerRole.value || isCoachRole.value)
  const isRestrictedRole = computed(() => isTeamScopedRole.value || isPlayerRole.value)

  const canCreateTeam = computed(() => !isRestrictedRole.value)
  const canImportTeams = computed(() => !isRestrictedRole.value)
  const canCreatePlayer = computed(() => !isPlayerRole.value)
  const canImportPlayers = computed(() => !isRestrictedRole.value)
  const canManageSensitivePlayerActions = computed(() => !isPlayerRole.value)

  const canManageCredentials = computed(() => {
    if (
      hasPermissionToken([
        'canmanagecredentials',
        'credentials.manage',
        'credentials:manage',
        'manage credentials',
      ])
    ) {
      return true
    }

    return isSuperAdminRole.value || isAdminRole.value || isLeagueStaffRole.value
  })

  const canValidateCredentials = computed(() => {
    if (
      hasPermissionToken([
        'canvalidatecredentials',
        'credentials.validate',
        'credentials:validate',
        'validate credentials',
      ])
    ) {
      return true
    }

    return isSuperAdminRole.value || isAdminRole.value || isLeagueStaffRole.value || isRefereeRole.value
  })

  const canConfigureCredentials = computed(() => {
    if (
      hasPermissionToken([
        'canconfigurecredentials',
        'credentials.configure',
        'credentials:configure',
        'configure credentials',
      ])
    ) {
      return true
    }

    return isSuperAdminRole.value || isAdminRole.value
  })

  const readTeamPathFromUser = () => {
    const current = user.value
    return pickFirstString([
      current?.team?.slug,
      current?.owned_team?.slug,
      current?.coach_team?.slug,
      current?.president_team?.slug,
      current?.team_slug,
      current?.teams?.[0]?.slug,
    ])
  }

  const readPlayerPathFromUser = () => {
    const current = user.value
    return pickFirstString([
      current?.player?.slug,
      current?.player_slug,
      current?.players?.[0]?.slug,
      current?.player?.id?.toString?.(),
      current?.players?.[0]?.id?.toString?.(),
    ])
  }

  const resolveTeamHomePath = async () => {
    if (teamHomePath.value) return teamHomePath.value

    const ownTeamSlug = readTeamPathFromUser()
    if (ownTeamSlug) {
      teamHomePath.value = `/equipos/${encodeURIComponent(ownTeamSlug)}`
      return teamHomePath.value
    }

    try {
      const client = useSanctumClient()
      const response = await client<{ data?: Array<{ slug?: string }> }>('/api/v1/admin/teams', {
        query: { per_page: 1, page: 1, sort: 'asc' },
        meta: { toast: false },
      } as any)
      const firstTeam = parseListPayload<{ slug?: string }>(response)[0]
      if (firstTeam?.slug) {
        teamHomePath.value = `/equipos/${encodeURIComponent(firstTeam.slug)}`
      }
    } catch {
      teamHomePath.value = null
    }

    return teamHomePath.value ?? '/equipos'
  }

  const resolvePlayerHomePath = async () => {
    if (playerHomePath.value) return playerHomePath.value

    const ownPlayer = readPlayerPathFromUser()
    if (ownPlayer) {
      playerHomePath.value = `/jugadores/${encodeURIComponent(ownPlayer)}`
      return playerHomePath.value
    }

    try {
      const client = useSanctumClient()
      const response = await client<{ data?: Array<{ id?: number; slug?: string }> }>('/api/v1/admin/players', {
        query: { per_page: 1, page: 1, sort: 'asc' },
        meta: { toast: false },
      } as any)
      const firstPlayer = parseListPayload<{ id?: number; slug?: string }>(response)[0]
      const identifier = firstPlayer?.slug || firstPlayer?.id?.toString()
      if (identifier) {
        playerHomePath.value = `/jugadores/${encodeURIComponent(identifier)}`
      }
    } catch {
      playerHomePath.value = null
    }

    return playerHomePath.value ?? '/jugadores'
  }

  const resolveRestrictedHomePath = async () => {
    if (isPlayerRole.value) {
      return resolvePlayerHomePath()
    }
    if (isTeamScopedRole.value) {
      return resolveTeamHomePath()
    }
    return '/dashboard'
  }

  return {
    isTeamOwnerRole,
    isCoachRole,
    isPlayerRole,
    isTeamScopedRole,
    isRestrictedRole,
    canCreateTeam,
    canImportTeams,
    canCreatePlayer,
    canImportPlayers,
    canManageSensitivePlayerActions,
    canManageCredentials,
    canValidateCredentials,
    canConfigureCredentials,
    resolveTeamHomePath,
    resolvePlayerHomePath,
    resolveRestrictedHomePath,
  }
}
