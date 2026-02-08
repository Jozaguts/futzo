import { describe, it, expect, vi, beforeEach } from 'vitest'
import { z } from 'zod'

const toastSpy = vi.fn()

vi.mock('~/composables/useToast', () => ({
  useToast: () => ({ toast: toastSpy }),
}))

import { validateResponse } from '../../../app/utils/validateResponse'

describe('validateResponse', () => {
  beforeEach(() => {
    toastSpy.mockClear()
  })

  it('returns parsed data when valid', () => {
    const schema = z.object({ ok: z.boolean() })
    const result = validateResponse({ ok: true }, schema, { context: 'unit' })
    expect(result).toEqual({ ok: true })
    expect(toastSpy).not.toHaveBeenCalled()
  })

  it('returns null and toasts when invalid', () => {
    const schema = z.object({ ok: z.boolean() })
    const result = validateResponse({ ok: 'nope' }, schema, { context: 'unit' })
    expect(result).toBeNull()
    expect(toastSpy).toHaveBeenCalled()
  })
})
