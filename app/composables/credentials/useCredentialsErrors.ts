import type { ToastOptions } from '~/interfaces'

export type CredentialsApiError = {
  status: number
  message: string
  checkoutUrl: string | null
  errors: Record<string, string[]> | null
}

const pickErrorMessage = (errors?: Record<string, string[]>) => {
  if (!errors) return null
  const firstKey = Object.keys(errors)[0]
  if (!firstKey) return null
  const value = errors[firstKey]?.[0]
  return typeof value === 'string' ? value : null
}

export const useCredentialsErrors = () => {
  const { toast } = useToast()

  const parseError = (error: any): CredentialsApiError => {
    const status = Number(error?.response?.status ?? error?.statusCode ?? 500)
    const data = error?.response?._data ?? error?.data ?? {}
    const errors = data?.errors && typeof data.errors === 'object' ? (data.errors as Record<string, string[]>) : null
    const validationMessage = pickErrorMessage(errors)
    const message =
      validationMessage
      || String(data?.message || (status === 403 ? 'No tienes permisos para esta acción.' : 'Ocurrió un error inesperado.'))

    return {
      status,
      message,
      checkoutUrl: typeof data?.checkout_url === 'string' ? data.checkout_url : null,
      errors,
    }
  }

  const notifyForbidden = () => {
    toast({
      type: 'error',
      msg: 'Acceso denegado',
      description: 'No tienes permisos para acceder a esta sección.',
    } satisfies ToastOptions)
  }

  return {
    parseError,
    notifyForbidden,
  }
}
