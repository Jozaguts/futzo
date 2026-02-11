import type { TeamLineupAvailablePlayers } from '~/models/Player'
import type {
  CreateDisciplinaryCasePayload,
  DisciplineCaseDetail,
  DisciplineCaseListItem,
  DisciplineCasesQuery,
  DisciplineCollectionResponse,
  DisciplineDefaults,
  DisciplineMeta,
  DisciplinePreviewPayload,
  DisciplinePreviewResponse,
  DisciplineRevertPayload,
  DisciplineSummary,
  DisciplineTeamMatchOption,
} from '~/models/discipline'

const path = (tournamentId: number, suffix: string) =>
  `/api/v1/admin/tournaments/${tournamentId}/discipline${suffix}`

export const getDisciplineCases = async (tournamentId: number, query: DisciplineCasesQuery = {}) => {
  const client = useSanctumClient()
  return await client<DisciplineCollectionResponse<DisciplineCaseListItem>>(path(tournamentId, '/cases'), {
    query,
  })
}

export const getDisciplineSummary = async (tournamentId: number) => {
  const client = useSanctumClient()
  return await client<DisciplineSummary>(path(tournamentId, '/summary'))
}

export const getDisciplineMeta = async (tournamentId: number) => {
  const client = useSanctumClient()
  return await client<DisciplineMeta>(path(tournamentId, '/meta'))
}

export const createDisciplinaryCase = async (tournamentId: number, payload: CreateDisciplinaryCasePayload) => {
  const client = useSanctumClient()
  return await client<DisciplineCaseDetail>(path(tournamentId, '/cases'), {
    method: 'POST',
    body: payload,
  })
}

export const getDisciplinaryCase = async (tournamentId: number, caseId: number) => {
  const client = useSanctumClient()
  return await client<DisciplineCaseDetail>(path(tournamentId, `/cases/${caseId}`))
}

export const updateDisciplinaryCase = async (
  tournamentId: number,
  caseId: number,
  payload: CreateDisciplinaryCasePayload
) => {
  const client = useSanctumClient()
  return await client<DisciplineCaseDetail>(path(tournamentId, `/cases/${caseId}`), {
    method: 'PATCH',
    body: payload,
  })
}

export const submitDisciplinaryCase = async (tournamentId: number, caseId: number) => {
  const client = useSanctumClient()
  return await client<DisciplineCaseDetail>(path(tournamentId, `/cases/${caseId}/submit`), {
    method: 'POST',
  })
}

export const previewDisciplinaryCase = async (tournamentId: number, caseId: number, payload: DisciplinePreviewPayload) => {
  const client = useSanctumClient()
  return await client<DisciplinePreviewResponse>(path(tournamentId, `/cases/${caseId}/preview`), {
    method: 'POST',
    body: payload,
  })
}

export const applyDisciplinaryCase = async (tournamentId: number, caseId: number, payload: DisciplinePreviewPayload) => {
  const client = useSanctumClient()
  return await client<DisciplineCaseDetail>(path(tournamentId, `/cases/${caseId}/apply`), {
    method: 'POST',
    body: payload,
  })
}

export const revertDisciplinaryCase = async (tournamentId: number, caseId: number, payload: DisciplineRevertPayload) => {
  const client = useSanctumClient()
  return await client<DisciplineCaseDetail>(path(tournamentId, `/cases/${caseId}/revert`), {
    method: 'POST',
    body: payload,
  })
}

export const getDisciplineDefaults = async () => {
  const client = useSanctumClient()
  return await client<DisciplineDefaults>('/api/v1/admin/settings/discipline/defaults')
}

export const getTeamAvailablePlayers = async (teamId: number) => {
  const client = useSanctumClient()
  return await client<TeamLineupAvailablePlayers[]>(`/api/v1/admin/teams/${teamId}/available-players`)
}

type TeamUpcomingGame = {
  id: number
  match_date?: string
  match_time?: string
  round?: number
  home_team?: { id: number; name: string; image?: string | null } | null
  away_team?: { id: number; name: string; image?: string | null } | null
}

type TeamPlayedGame = {
  id: number
  date?: string
  time?: string
  round?: number
  homeTeam?: { id: number; name: string; image?: string | null } | null
  awayTeam?: { id: number; name: string; image?: string | null } | null
}

const mapUpcomingMatch = (game: TeamUpcomingGame): DisciplineTeamMatchOption => {
  const date = game.match_date || null
  const time = game.match_time || ''
  const homeName = game.home_team?.name || 'Local'
  const awayName = game.away_team?.name || 'Visitante'
  const round = typeof game.round === 'number' ? game.round : null

  return {
    id: game.id,
    title: `${homeName} vs ${awayName}`,
    subtitle: `Proximo${round ? ` · J${round}` : ''}${date ? ` · ${date}${time ? ` ${time}` : ''}` : ''}`,
    match_date: date,
    round,
    home_team: game.home_team || null,
    away_team: game.away_team || null,
    phase: 'upcoming',
  }
}

const mapPlayedMatch = (game: TeamPlayedGame): DisciplineTeamMatchOption => {
  const date = game.date || null
  const time = game.time || ''
  const homeName = game.homeTeam?.name || 'Local'
  const awayName = game.awayTeam?.name || 'Visitante'
  const round = typeof game.round === 'number' ? game.round : null

  return {
    id: game.id,
    title: `${homeName} vs ${awayName}`,
    subtitle: `Jugado${round ? ` · J${round}` : ''}${date ? ` · ${date}${time ? ` ${time}` : ''}` : ''}`,
    match_date: date,
    round,
    home_team: game.homeTeam || null,
    away_team: game.awayTeam || null,
    phase: 'played',
  }
}

export const getTeamDisciplineMatches = async (teamId: number, limit = 500) => {
  const client = useSanctumClient()

  const [upcomingResponse, playedResponse] = await Promise.all([
    client<{ data?: TeamUpcomingGame[] }>(`/api/v1/admin/teams/${teamId}/next-games`, {
      query: { limit, order: 'asc' },
    }),
    client<TeamPlayedGame[]>(`/api/v1/admin/teams/${teamId}/last-games`, {
      query: { limit, order: 'desc' },
    }),
  ])

  const upcomingRaw = Array.isArray(upcomingResponse?.data)
    ? upcomingResponse.data
    : Array.isArray(upcomingResponse)
      ? (upcomingResponse as unknown as TeamUpcomingGame[])
      : []
  const playedRaw = Array.isArray(playedResponse)
    ? playedResponse
    : Array.isArray((playedResponse as { data?: TeamPlayedGame[] })?.data)
      ? ((playedResponse as { data?: TeamPlayedGame[] }).data || [])
      : []

  const mergedMap = new Map<number, DisciplineTeamMatchOption>()

  upcomingRaw.map(mapUpcomingMatch).forEach((item) => {
    mergedMap.set(item.id, item)
  })

  playedRaw.map(mapPlayedMatch).forEach((item) => {
    if (!mergedMap.has(item.id)) {
      mergedMap.set(item.id, item)
    }
  })

  const all = Array.from(mergedMap.values())
  all.sort((a, b) => {
    const aTime = a.match_date ? new Date(a.match_date).getTime() : 0
    const bTime = b.match_date ? new Date(b.match_date).getTime() : 0
    return bTime - aTime
  })

  return all
}
