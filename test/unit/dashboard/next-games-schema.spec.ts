import {describe, expect, it} from 'vitest'
import {nextGamesSchema} from '../../../app/schemas/dashboard/next-games.schema'

describe('nextGamesSchema', () => {
  it('accepts payload with nullable location, field and match_time', () => {
    const payload = {
      data: [
        {
          id: 1743,
          match_date: '2026-03-01',
          match_time: null,
          home_team: {
            id: 198,
            name: 'Imperio',
            image: null,
          },
          away_team: {
            id: 211,
            name: 'Fray Pedro',
            image: null,
          },
          location: {
            id: null,
            name: null,
          },
          field: {
            id: null,
            name: null,
          },
          tournament: {
            id: 26,
            name: 'test 3ª Convivencia Cat. 2012',
            slug: 'test-3a-convivencia-cat-2012',
            image: null,
            thumbnail: null,
            end_date: null,
          },
        },
      ],
    }

    expect(() => nextGamesSchema.parse(payload)).not.toThrow()
  })

  it('rejects payload without required team name', () => {
    const payload = {
      data: [
        {
          id: 1,
          match_date: '2026-03-01',
          match_time: null,
          home_team: {
            id: 1,
            image: null,
          },
          away_team: {
            id: 2,
            name: 'Away',
            image: null,
          },
        },
      ],
    }

    expect(() => nextGamesSchema.parse(payload)).toThrow()
  })
})
