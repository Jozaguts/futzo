import {beforeEach, describe, expect, it, vi} from 'vitest'
import {mockNuxtImport} from '@nuxt/test-utils/runtime'
import hydrateSanctumAuth from '../../../app/middleware/00-hydrate-sanctum-auth.global'

const userRef = vi.hoisted(() => ({ value: null as any }))
const refreshIdentityMock = vi.hoisted(() => vi.fn(async () => undefined))

mockNuxtImport('useSanctumUser', () => () => userRef)
mockNuxtImport('useSanctumAuth', () => () => ({ refreshIdentity: refreshIdentityMock }))

describe('hydrate sanctum auth middleware', () => {
  beforeEach(() => {
    userRef.value = null
    refreshIdentityMock.mockReset()
    refreshIdentityMock.mockResolvedValue(undefined)
  })

  it('skips excluded public pages', async () => {
    await hydrateSanctumAuth({
      meta: { sanctum: { excluded: true }, middleware: ['sanctum:auth'] },
      matched: [],
    } as any)

    expect(refreshIdentityMock).not.toHaveBeenCalled()
  })

  it('skips routes without sanctum:auth middleware', async () => {
    await hydrateSanctumAuth({
      meta: { middleware: ['check-tournament'] },
      matched: [],
    } as any)

    expect(refreshIdentityMock).not.toHaveBeenCalled()
  })

  it('hydrates identity before sanctum:auth when user is empty', async () => {
    await hydrateSanctumAuth({
      meta: { middleware: ['sanctum:auth'] },
      matched: [],
    } as any)

    expect(refreshIdentityMock).toHaveBeenCalledTimes(1)
  })

  it('skips refresh when user identity already exists', async () => {
    userRef.value = { id: 1, email: 'admin@futzo.test' }

    await hydrateSanctumAuth({
      meta: { middleware: ['sanctum:auth'] },
      matched: [],
    } as any)

    expect(refreshIdentityMock).not.toHaveBeenCalled()
  })

  it('detects sanctum:auth from matched route records', async () => {
    await hydrateSanctumAuth({
      meta: {},
      matched: [{ meta: { middleware: ['sanctum:auth'] } }],
    } as any)

    expect(refreshIdentityMock).toHaveBeenCalledTimes(1)
  })
})
