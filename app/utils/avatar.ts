const APP_PRIMARY_COLOR = 'rgb(var(--v-theme-primary))'

const normalizeString = (value?: string | null) => String(value ?? '').trim()

const normalizeImageUrl = (value?: string | null) => normalizeString(value).replace(/\\\//g, '/')

export const sanitizeAvatarImage = (value?: string | null) => {
  const normalized = normalizeImageUrl(value)
  if (!normalized) {
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
