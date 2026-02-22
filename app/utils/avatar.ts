const UI_AVATAR_HOST_PATTERN = /(^|\.)ui-avatars\.com$/i

const APP_PRIMARY_COLOR = 'rgb(var(--v-theme-primary))'

const normalizeString = (value?: string | null) => String(value ?? '').trim()

const resolveUrlHostname = (value: string) => {
  try {
    return new URL(value).hostname
  } catch {
    return ''
  }
}

export const isUiAvatarUrl = (value?: string | null) => {
  const normalized = normalizeString(value)
  if (!normalized) {
    return false
  }
  const hostname = resolveUrlHostname(normalized)
  if (!hostname) {
    return normalized.includes('ui-avatars.com/api/')
  }
  return UI_AVATAR_HOST_PATTERN.test(hostname)
}

export const sanitizeAvatarImage = (value?: string | null) => {
  const normalized = normalizeString(value)
  if (!normalized || isUiAvatarUrl(normalized)) {
    return ''
  }
  return normalized
}

export const getAvatarInitials = (name?: string | null, maxInitials: number = 2) => {
  const normalized = normalizeString(name)
  if (!normalized) {
    return 'NA'
  }

  const words = normalized
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean)

  if (!words.length) {
    return 'NA'
  }

  const initials = words
    .slice(0, Math.max(1, maxInitials))
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()

  return initials || normalized.slice(0, Math.max(1, maxInitials)).toUpperCase()
}

const sanitizeColor = (value?: string | null) => normalizeString(value).toLowerCase()

const isWhiteColor = (value?: string | null) => {
  const normalized = sanitizeColor(value)
  if (!normalized) {
    return false
  }

  if (normalized === 'white' || normalized === 'transparent') {
    return true
  }

  if (['#fff', '#ffffff', '#ffffffff', '#ffff', 'rgb(255,255,255)', 'rgba(255,255,255,1)'].includes(normalized)) {
    return true
  }

  return false
}

export const resolveAvatarFallbackColor = (teamColor?: string | null) => {
  const normalized = normalizeString(teamColor)
  if (!normalized || isWhiteColor(normalized)) {
    return APP_PRIMARY_COLOR
  }
  return normalized
}
