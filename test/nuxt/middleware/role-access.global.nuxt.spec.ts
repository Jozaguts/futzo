import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import roleAccessMiddleware from '../../../app/middleware/04-role-access.global'

const userRef = vi.hoisted(() => ({ value: null as any }))
const navigateToMock = vi.hoisted(() => vi.fn())

const isRestrictedRoleRef = vi.hoisted(() => ({ value: false }))
const isPlayerRoleRef = vi.hoisted(() => ({ value: false }))
const isTeamScopedRoleRef = vi.hoisted(() => ({ value: false }))
const resolveRestrictedHomePathMock = vi.hoisted(() => vi.fn(async () => '/dashboard'))
const resolveTeamHomePathMock = vi.hoisted(() => vi.fn(async () => '/equipos/aguilas'))

mockNuxtImport('useSanctumUser', () => () => userRef)
mockNuxtImport('navigateTo', () => navigateToMock)
mockNuxtImport('useRoleAccess', () => () => ({
  isRestrictedRole: isRestrictedRoleRef,
  isPlayerRole: isPlayerRoleRef,
  isTeamScopedRole: isTeamScopedRoleRef,
  resolveRestrictedHomePath: resolveRestrictedHomePathMock,
  resolveTeamHomePath: resolveTeamHomePathMock,
}))

describe('role access middleware', () => {
  beforeEach(() => {
    userRef.value = { id: 1, roles: ['administrador'] }
    navigateToMock.mockReset()
    resolveRestrictedHomePathMock.mockReset()
    resolveTeamHomePathMock.mockReset()
    resolveRestrictedHomePathMock.mockResolvedValue('/dashboard')
    resolveTeamHomePathMock.mockResolvedValue('/equipos/aguilas')
    isRestrictedRoleRef.value = false
    isPlayerRoleRef.value = false
    isTeamScopedRoleRef.value = false
  })

  it('skips routes without sanctum auth middleware', async () => {
    const to = { path: '/dashboard', meta: { middleware: ['check-tournament'] }, matched: [] } as any

    await roleAccessMiddleware(to)

    expect(navigateToMock).not.toHaveBeenCalled()
    expect(to.meta.layout).toBeUndefined()
  })

  it('applies restricted layout and redirects player role to own profile', async () => {
    isRestrictedRoleRef.value = true
    isPlayerRoleRef.value = true
    resolveRestrictedHomePathMock.mockResolvedValue('/jugadores/99')

    const to = { path: '/dashboard', meta: { middleware: ['sanctum:auth'] }, matched: [] } as any

    await roleAccessMiddleware(to)

    expect(to.meta.layout).toBe('restricted')
    expect(navigateToMock).toHaveBeenCalledWith('/jugadores/99')
  })

  it('allows team-scoped roles to stay in jugadores module', async () => {
    isRestrictedRoleRef.value = true
    isTeamScopedRoleRef.value = true
    resolveRestrictedHomePathMock.mockResolvedValue('/equipos/aguilas')
    resolveTeamHomePathMock.mockResolvedValue('/equipos/aguilas')

    const to = { path: '/jugadores', meta: { middleware: ['sanctum:auth'] }, matched: [] } as any

    await roleAccessMiddleware(to)

    expect(to.meta.layout).toBe('restricted')
    expect(navigateToMock).not.toHaveBeenCalled()
  })

  it('redirects team-scoped roles when route is outside own team and jugadores module', async () => {
    isRestrictedRoleRef.value = true
    isTeamScopedRoleRef.value = true
    resolveRestrictedHomePathMock.mockResolvedValue('/equipos/aguilas')
    resolveTeamHomePathMock.mockResolvedValue('/equipos/aguilas')

    const to = { path: '/torneos', meta: { middleware: ['sanctum:auth'] }, matched: [] } as any

    await roleAccessMiddleware(to)

    expect(navigateToMock).toHaveBeenCalledWith('/equipos/aguilas')
  })
})
