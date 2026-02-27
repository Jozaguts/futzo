import { z } from 'zod'

export const dashboardStatsValuesSchema = z.object({
  total: z.number(),
  current: z.number(),
  label: z.string(),
})

export const dashboardStatsSchema = z.object({
  activeTournaments: dashboardStatsValuesSchema,
  matchesThisWeek: dashboardStatsValuesSchema,
  registeredTeams: dashboardStatsValuesSchema,
  players: dashboardStatsValuesSchema,
})

export type DashboardStatsResponse = z.infer<typeof dashboardStatsSchema>
