import {z} from 'zod'

const teamSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  image: z.string().nullable().optional(),
})

const locationSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().nullable().optional(),
})

const fieldSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().nullable().optional(),
})

const tournamentSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  slug: z.string().optional(),
  image: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
})

export const nextGameItemSchema = z.object({
  id: z.number(),
  match_date: z.string(),
  match_time: z.string().nullable(),
  home_team: teamSchema,
  away_team: teamSchema,
  location: locationSchema.nullable().optional(),
  field: fieldSchema.nullable().optional(),
  tournament: tournamentSchema.nullable().optional(),
})

export const nextGamesSchema = z.object({
  data: z.array(nextGameItemSchema),
})

export type NextGamesResponse = z.infer<typeof nextGamesSchema>
