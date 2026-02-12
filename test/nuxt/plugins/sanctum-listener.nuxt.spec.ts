import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import sanctumListenerPlugin from '~/plugins/sanctum-listener'

const logoutMock = vi.hoisted(() => vi.fn(async () => undefined))
const navigateToMock = vi.hoisted(() => vi.fn())
const userRef = vi.hoisted(() => ({ value: { id: 10, email: 'admin@futzo.test' } as any }))
const routeRef = vi.hoisted(() => ({ value: { path: '/dashboard', meta: {} } as any }))

mockNuxtImport('useSanctumAuth', () => () => ({ logout: logoutMock }))
mockNuxtImport('useSanctumUser', () => () => userRef)
mockNuxtImport('navigateTo', () => navigateToMock)
mockNuxtImport('useRoute', () => () => routeRef.value)
mockNuxtImport('useCookie', () => () => ref<string | null>(null))

describe('sanctum-listener plugin', () => {
  beforeEach(() => {
    logoutMock.mockReset()
    logoutMock.mockResolvedValue(undefined)
    navigateToMock.mockReset()
    userRef.value = { id: 10, email: 'admin@futzo.test' }
    routeRef.value = { path: '/dashboard', meta: {} }
  })

  it('does not logout on auth endpoint 401 during login flow', async () => {
    routeRef.value = { path: '/login', meta: {} }

    const hooks: Record<string, any> = {}
    sanctumListenerPlugin({
      hook: (name: string, cb: any) => {
        hooks[name] = cb
      },
    } as any)

    await hooks['sanctum:error:response']({
      request: '/auth/login',
      response: { status: 401 },
    })

    expect(logoutMock).not.toHaveBeenCalled()
    expect(navigateToMock).not.toHaveBeenCalled()
    expect(userRef.value).toEqual({ id: 10, email: 'admin@futzo.test' })
  })

  it('logs out and redirects on protected endpoint 401', async () => {
    const hooks: Record<string, any> = {}
    sanctumListenerPlugin({
      hook: (name: string, cb: any) => {
        hooks[name] = cb
      },
    } as any)

    await hooks['sanctum:error:response']({
      request: '/api/v1/admin/teams',
      response: { status: 401 },
    })

    expect(logoutMock).toHaveBeenCalledTimes(1)
    expect(userRef.value).toBeNull()
    expect(navigateToMock).toHaveBeenCalledWith('/login')
  })
})
