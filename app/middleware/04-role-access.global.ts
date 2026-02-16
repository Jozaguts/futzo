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
  if (import.meta.server) return
  if (to.meta?.sanctum?.excluded) return

  const routeMiddlewares = collectRouteMiddlewares(to)
  const requiresSanctumAuth = routeMiddlewares.includes('sanctum:auth')
  if (!requiresSanctumAuth) return

  const user = useSanctumUser()
  if (!user.value) return

  const { isRestrictedRole, isPlayerRole, isTeamScopedRole, resolveRestrictedHomePath, resolveTeamHomePath } = useRoleAccess()
  if (!isRestrictedRole.value) return

  to.meta.layout = 'restricted'

  const restrictedHome = await resolveRestrictedHomePath()

  if (isPlayerRole.value) {
    const isOwnPlayerRoute = to.path === restrictedHome || to.path.startsWith(`${restrictedHome}/`)
    if (!isOwnPlayerRoute) {
      return navigateTo(restrictedHome)
    }
    return
  }

  if (isTeamScopedRole.value) {
    const teamHome = await resolveTeamHomePath()
    const isOwnTeamRoute = to.path === teamHome || to.path.startsWith(`${teamHome}/`)
    const isPlayersRoute = to.path === '/jugadores' || to.path.startsWith('/jugadores/')

    if (!isOwnTeamRoute && !isPlayersRoute) {
      return navigateTo(teamHome)
    }
  }
})
