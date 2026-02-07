import {defineNuxtPlugin, useRouter, useRuntimeConfig} from '#imports'
import {isNavigationFailure} from '#vue-router'

type PixelConfig = {
  id: string | number
  pageView?: string
  autoconfig?: boolean
}

const escapeRegExp = (input: string) => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const globToRegExp = (pattern: string) => {
  if (pattern === '**') {
    return /.*/
  }
  const escaped = escapeRegExp(pattern)
  const withDoubleStar = escaped.replace(/\\\*\\\*/g, '.*')
  const withSingleStar = withDoubleStar.replace(/\\\*/g, '[^/]*')
  return new RegExp(`^${withSingleStar}$`)
}

const matchesPage = (path: string, pattern?: string) => {
  if (!pattern || pattern === '**') {
    return true
  }
  try {
    return globToRegExp(pattern).test(path)
  } catch {
    return path === pattern
  }
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const pixels = runtimeConfig.public?.metapixel ?? {}
  const pixelList = Object.values(pixels).filter((pixel): pixel is PixelConfig => Boolean(pixel?.id))

  if (pixelList.length === 0) {
    return
  }

  const win = window as any
  if (!win.fbq) {
    ;(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = true
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s?.parentNode?.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  }

  win.fbq.disablePushState = true

  for (const pixel of pixelList) {
    win.fbq('init', pixel.id.toString(), pixel.autoconfig)
  }

  const router = useRouter()

  const trackPageView = (path: string) => {
    for (const pixel of pixelList) {
      if (matchesPage(path, pixel.pageView)) {
        win.fbq('track', 'PageView')
      }
    }
  }

  trackPageView(router.currentRoute.value.path || '/')

  router.afterEach((to, _, failure) => {
    if (isNavigationFailure(failure)) {
      return
    }
    trackPageView(to.path)
  })
})
