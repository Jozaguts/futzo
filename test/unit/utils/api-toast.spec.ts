import { describe, it, expect, vi } from 'vitest'

vi.mock('~/composables/useToast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}))

import { resolveApiToast } from '../../../app/utils/apiToast'

describe('resolveApiToast', () => {
  it('maps 500 to error', () => {
    const toast = resolveApiToast(500, { message: 'Error interno' })
    expect(toast.type).toBe('error')
    expect(toast.msg).toBe('Error del servidor')
  })

  it('maps 422 to warning with validation', () => {
    const toast = resolveApiToast(422, { errors: { field: ['Requerido'] } })
    expect(toast.type).toBe('warning')
    expect(toast.msg).toBe('Datos inválidos')
    expect(toast.description).toBe('Requerido')
  })

  it('maps 400 to warning', () => {
    const toast = resolveApiToast(400, { message: 'Solicitud inválida' })
    expect(toast.type).toBe('warning')
    expect(toast.msg).toBe('Error en la solicitud')
  })
})
