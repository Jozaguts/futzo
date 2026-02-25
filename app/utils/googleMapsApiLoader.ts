let googleMapsLoaderPromise: Promise<boolean> | null = null

const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-js-api'

const getGoogleMapsApiKey = () => {
  const runtimeConfig = useRuntimeConfig()
  return runtimeConfig.public.googleMapsAPIKey
}

const hasGoogleMapsReady = () => {
  if (!import.meta.client) return false
  return Boolean(window.google?.maps?.places || window.google?.maps?.importLibrary)
}

export const ensureGoogleMapsApiLoaded = async () => {
  if (!import.meta.client) return false
  if (hasGoogleMapsReady()) return true
  if (googleMapsLoaderPromise) return googleMapsLoaderPromise

  const apiKey = getGoogleMapsApiKey()
  if (!apiKey) {
    console.error('Google Maps API key is missing.')
    return false
  }

  googleMapsLoaderPromise = new Promise((resolve) => {
    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        resolve(hasGoogleMapsReady())
        return
      }
      if (existingScript.dataset.failed === 'true') {
        resolve(false)
        return
      }

      existingScript.addEventListener(
        'load',
        () => resolve(hasGoogleMapsReady()),
        { once: true }
      )
      existingScript.addEventListener(
        'error',
        () => resolve(false),
        { once: true }
      )
      return
    }

    const script = document.createElement('script')
    script.id = GOOGLE_MAPS_SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&loading=async`
    script.async = true
    script.defer = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve(hasGoogleMapsReady())
    }
    script.onerror = () => {
      script.dataset.failed = 'true'
      resolve(false)
    }
    document.head.appendChild(script)
  })

  return googleMapsLoaderPromise
}
