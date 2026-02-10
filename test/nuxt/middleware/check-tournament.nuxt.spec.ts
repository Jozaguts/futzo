import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import checkTournament from '../../../app/middleware/check-tournament'

const navigateTo = vi.hoisted(() => vi.fn())
const tournamentId = vi.hoisted(() => ({ value: null as number | null }))
const sanctumUser = vi.hoisted(() => ({ value: null as any }))

mockNuxtImport('navigateTo', () => navigateTo)
mockNuxtImport('useTournamentStore', () => () => ({ tournamentId }))
mockNuxtImport('useSanctumUser', () => () => sanctumUser)
mockNuxtImport('storeToRefs', () => (store: any) => store)

describe('check-tournament middleware', () => {
  beforeEach(() => {
    navigateTo.mockClear()
    tournamentId.value = null
    sanctumUser.value = null
  })

  it('allows guests to access calendario', () => {
    sanctumUser.value = null

    const result = checkTournament({ name: 'torneos-torneo-calendario', params: { torneo: 'liga-1' } } as any)

    expect(navigateTo).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('redirects authenticated users without tournamentId', () => {
    sanctumUser.value = { email: 'admin@futzo.test' }

    checkTournament({ name: 'torneos-torneo-calendario', params: { torneo: 'liga-1' } } as any)

    expect(navigateTo).toHaveBeenCalledWith({ name: 'torneos' })
  })

  it('allows authenticated users with tournamentId', () => {
    sanctumUser.value = { email: 'admin@futzo.test' }
    tournamentId.value = 10

    const result = checkTournament({ name: 'torneos-torneo-calendario', params: { torneo: 'liga-1' } } as any)

    expect(navigateTo).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})
