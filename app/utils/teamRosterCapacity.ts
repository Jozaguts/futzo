export type TeamRosterSnapshot = {
  players_count?: number | null
  max_players_per_team?: number | null
  tournament?: {
    max_players_per_team?: number | null
  } | null
  tournament_configuration?: {
    max_players_per_team?: number | null
  } | null
}

const toFiniteNumber = (value: unknown): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const resolveMaxPlayers = (team: TeamRosterSnapshot): number => {
  return toFiniteNumber(
    team.tournament?.max_players_per_team ??
      team.tournament_configuration?.max_players_per_team ??
      team.max_players_per_team ??
      0
  )
}

export const hasAvailableTeamRosterSlots = (team: TeamRosterSnapshot | null | undefined): boolean => {
  if (!team) {
    return false
  }

  const maxPlayers = resolveMaxPlayers(team)
  if (maxPlayers <= 0) {
    return true
  }

  const playersCount = toFiniteNumber(team.players_count)
  return playersCount < maxPlayers
}
