import type { ZodSchema } from 'zod'
import { useToast } from '~/composables/useToast'

type ValidateOptions = {
  context?: string
  toast?: boolean
}

export const validateResponse = <T>(
  data: unknown,
  schema: ZodSchema<T>,
  options: ValidateOptions = {}
): T | null => {
  const result = schema.safeParse(data)
  if (result.success) {
    return result.data
  }

  if (options.toast !== false) {
    const { toast } = useToast()
    toast({
      type: 'error',
      msg: 'Respuesta inválida del servidor',
      description: options.context ?? 'La respuesta no cumple con el formato esperado.',
    })
  }

  console.error('[validateResponse]', options.context ?? 'Invalid response', result.error.flatten())
  return null
}
