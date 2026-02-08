import type { ToastOptions } from '~/interfaces'
import { useToast } from '~/composables/useToast'

const pickFirstError = (errors?: Record<string, string[]>) => {
  if (!errors) return undefined
  const firstKey = Object.keys(errors)[0]
  if (!firstKey) return undefined
  return errors[firstKey]?.[0]
}

export const resolveApiToast = (status: number, data?: any): ToastOptions => {
  const message = data?.message ?? 'Ocurrió un error al procesar tu solicitud.'
  const bag = data?.errors as Record<string, string[]> | undefined
  const firstError = pickFirstError(bag)

  if (status >= 500) {
    return {
      type: 'error',
      msg: 'Error del servidor',
      description: firstError ?? message,
    }
  }

  if (status === 422) {
    return {
      type: 'warning',
      msg: 'Datos inválidos',
      description: firstError ?? message,
    }
  }

  return {
    type: 'warning',
    msg: 'Error en la solicitud',
    description: firstError ?? message,
  }
}

export const notifyApiError = (status: number, data?: any) => {
  const { toast } = useToast()
  toast(resolveApiToast(status, data))
}
