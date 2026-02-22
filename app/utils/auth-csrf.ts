const CSRF_TOKEN_MISMATCH_STATUS = 419

type ErrorWithStatus = {
  response?: {
    status?: number
  }
  statusCode?: number
}

export const getHttpStatusFromError = (error: unknown): number | null => {
  if (!error || typeof error !== 'object') {
    return null
  }

  const maybeError = error as ErrorWithStatus
  const responseStatus = maybeError.response?.status
  if (typeof responseStatus === 'number') {
    return responseStatus
  }

  const statusCode = maybeError.statusCode
  if (typeof statusCode === 'number') {
    return statusCode
  }

  return null
}

export const isCsrfTokenMismatchError = (error: unknown): boolean => {
  return getHttpStatusFromError(error) === CSRF_TOKEN_MISMATCH_STATUS
}

