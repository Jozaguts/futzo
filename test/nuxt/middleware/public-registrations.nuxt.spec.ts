import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import verifyTournamentCanRegisterTeam from '../../../app/middleware/verify-tournament-can-register-team'
import verifyTeamCanRegisterPlayer from '../../../app/middleware/verify-team-can-register-player'

const navigateTo = vi.hoisted(() => vi.fn())
const client = vi.hoisted(() => vi.fn())

mockNuxtImport('navigateTo', () => navigateTo)
mockNuxtImport('useSanctumClient', () => () => client)

describe('public registration middlewares', () => {
  beforeEach(() => {
    navigateTo.mockClear()
    client.mockReset()
  })

  it('allows tournament team registration when canRegister is true', async () => {
    client.mockResolvedValue({ canRegister: true })

    await verifyTournamentCanRegisterTeam({
      name: 'torneos-torneo-equipos-inscripcion',
      params: { torneo: 'liga-1' },
    } as any)

    expect(navigateTo).not.toHaveBeenCalled()
  })

  it('redirects tournament team registration when canRegister is false', async () => {
    client.mockResolvedValue({ canRegister: false })

    await verifyTournamentCanRegisterTeam({
      name: 'torneos-torneo-equipos-inscripcion',
      params: { torneo: 'liga-1' },
    } as any)

    expect(navigateTo).toHaveBeenCalledWith('/torneos/liga-1/inscripcion-cerrada')
  })

  it('allows team player registration when canRegister is true', async () => {
    client.mockResolvedValue({ canRegister: true })

    await verifyTeamCanRegisterPlayer({
      name: 'equipos-equipo-jugadores-inscripcion',
      params: { equipo: 'equipo-1' },
    } as any)

    expect(navigateTo).not.toHaveBeenCalled()
  })

  it('redirects team player registration when canRegister is false', async () => {
    client.mockResolvedValue({ canRegister: false })

    await verifyTeamCanRegisterPlayer({
      name: 'equipos-equipo-jugadores-inscripcion',
      params: { equipo: 'equipo-1' },
    } as any)

    expect(navigateTo).toHaveBeenCalledWith('/equipos/equipo-1/inscripcion-cerrada')
  })
})
