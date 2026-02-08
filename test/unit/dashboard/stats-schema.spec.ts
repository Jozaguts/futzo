import { describe, it, expect } from 'vitest'
import { dashboardStatsSchema } from '../../../app/schemas/dashboard/stats.schema'

describe('dashboardStatsSchema', () => {
  it('accepts valid payload', () => {
    const payload = {
      activeTournaments: { total: 3, current: 1, dailyData: [], label: 'vs último mes' },
      matchesThisWeek: { total: 8, current: 2, dailyData: [], label: 'vs último mes' },
      registeredTeams: { total: 10, current: 1, dailyData: [1, 2], label: 'vs último mes' },
      activePlayers: { total: 20, current: 2, dailyData: [2, 3], label: 'vs último mes' },
      completedGames: { total: 5, current: 1, dailyData: [0, 1], label: 'vs último mes' },
    }
    expect(() => dashboardStatsSchema.parse(payload)).not.toThrow()
  })

  it('rejects invalid payload', () => {
    const payload = {
      activeTournaments: { total: 3 },
      registeredTeams: { total: 10 },
    }
    expect(() => dashboardStatsSchema.parse(payload)).toThrow()
  })
})
