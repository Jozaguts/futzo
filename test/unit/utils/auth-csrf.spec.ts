import {describe, expect, it} from 'vitest'
import {getHttpStatusFromError, isCsrfTokenMismatchError} from '../../../app/utils/auth-csrf'

describe('auth-csrf utils', () => {
  it('extracts status from response.status', () => {
    expect(getHttpStatusFromError({ response: { status: 419 } })).toBe(419)
    expect(getHttpStatusFromError({ response: { status: 401 } })).toBe(401)
  })

  it('extracts status from statusCode fallback', () => {
    expect(getHttpStatusFromError({ statusCode: 500 })).toBe(500)
  })

  it('returns null when status is unavailable', () => {
    expect(getHttpStatusFromError({})).toBeNull()
    expect(getHttpStatusFromError(null)).toBeNull()
    expect(getHttpStatusFromError('error')).toBeNull()
  })

  it('detects csrf token mismatch status 419', () => {
    expect(isCsrfTokenMismatchError({ response: { status: 419 } })).toBe(true)
    expect(isCsrfTokenMismatchError({ response: { status: 422 } })).toBe(false)
  })
})

