import { describe, it, expect } from 'vitest'
import { activitySchema } from '../../../app/schemas/dashboard/activity.schema'

describe('activitySchema', () => {
  it('accepts item with title', () => {
    const payload = {
      data: [
        {
          id: 1,
          type: 'game_result',
          title: 'Tigres FC ganó 3-1',
          created_at: '2026-02-08T10:00:00Z',
        },
      ],
    }
    expect(() => activitySchema.parse(payload)).not.toThrow()
  })

  it('accepts item with message fallback', () => {
    const payload = {
      data: [
        {
          id: 'evt-1',
          message: 'Evento sin título',
        },
      ],
    }
    expect(() => activitySchema.parse(payload)).not.toThrow()
  })

  it('rejects item without title or message', () => {
    const payload = {
      data: [
        {
          id: 1,
          type: 'game_result',
        },
      ],
    }
    expect(() => activitySchema.parse(payload)).toThrow()
  })
})
