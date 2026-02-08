import { z } from 'zod'

const tournamentSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
})

const teamSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().nullable().optional(),
})

export const activityItemSchema = z
  .object({
    id: z.union([z.number(), z.string()]),
    type: z.string().optional(),
    event_type: z.string().optional(),
    title: z.string().optional(),
    message: z.string().optional(),
    subtitle: z.string().optional(),
    created_at: z.string().optional(),
    time: z.string().optional(),
    time_label: z.string().optional(),
    tournament: tournamentSchema.optional(),
    team: teamSchema.optional(),
  })
  .refine((item) => item.title || item.message, {
    message: 'Activity item must include title or message',
  })

export const activitySchema = z.object({
  data: z.array(activityItemSchema),
})

export type ActivityResponse = z.infer<typeof activitySchema>
