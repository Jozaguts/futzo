import {z} from 'zod'

const teamSchema = z.object({
  name: z.string(),
  image: z.string().nullable().optional(),
})

const locationSchema = z.object({
  name: z.string(),
})

const tournamentSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  slug: z.string().optional(),
})

export const nextGameItemSchema = z.object({
  id: z.number(),
  match_date: z.string(),
  match_time: z.string().nullable(),
  home_team: teamSchema,
  away_team: teamSchema,
  location: locationSchema.nullable().optional(),
  tournament: tournamentSchema.nullable().optional(),
})

export const nextGamesSchema = z.object({
  data: z.array(nextGameItemSchema),
})

export type NextGamesResponse = z.infer<typeof nextGamesSchema>
