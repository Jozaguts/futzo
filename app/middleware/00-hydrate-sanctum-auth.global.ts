const collectRouteMiddlewares = (to: {
  meta?: { middleware?: unknown }
  matched?: Array<{ meta?: { middleware?: unknown } }>
}): string[] => {
  const middlewares: string[] = []
  const addMiddleware = (value: unknown) => {
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (typeof entry === 'string') {
          middlewares.push(entry)
        }
      }
      return
    }
    if (typeof value === 'string') {
      middlewares.push(value)
    }
  }

  addMiddleware(to.meta?.middleware)

  for (const record of to.matched || []) {
    addMiddleware(record.meta?.middleware)
  }

  return middlewares
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.meta?.sanctum?.excluded) return

  const routeMiddlewares = collectRouteMiddlewares(to)
  const requiresSanctumAuth = routeMiddlewares.includes('sanctum:auth')

  if (!requiresSanctumAuth) return

  const user = useSanctumUser()
  if (user.value) return

  try {
    await useSanctumAuth().refreshIdentity()
  } catch {
    // Let `sanctum:auth` middleware decide redirect for unauthenticated users.
  }
})
