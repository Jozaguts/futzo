import {describe, expect, it, vi} from 'vitest'

vi.stubGlobal('defineNuxtConfig', (config: unknown) => config)

const { default: nuxtConfig } = await import('../../../nuxt.config')

type RouteRule = {
  ssr?: boolean
  headers?: Record<string, string>
}

describe('Nuxt SEO config', () => {
  it('applies noindex + ssr false on protected route rules', () => {
    const routeRules = (nuxtConfig as any).routeRules as Record<string, RouteRule>
    const protectedRoutes = [
      '/dashboard',
      '/dashboard/**',
      '/equipos',
      '/equipos/**',
      '/jugadores',
      '/jugadores/**',
      '/ubicaciones',
      '/ubicaciones/**',
      '/login',
      '/login/**',
      '/torneos',
      '/torneos/**',
      '/bienvenido',
      '/bienvenido/**',
      '/authorize',
      '/authorize/**',
      '/configuracion',
      '/configuracion/**',
      '/suscripcion',
      '/suscripcion/**',
      '/verificar',
      '/verificar/**',
    ]

    for (const route of protectedRoutes) {
      expect(routeRules[route]).toBeTruthy()
      expect(routeRules[route]?.ssr).toBe(false)
      expect(routeRules[route]?.headers?.['x-robots-tag']).toBe('noindex, nofollow')
    }
  })

  it('keeps robots.txt aligned with protected paths and public landing', () => {
    const robots = (nuxtConfig as any).robots as { disallow: string[]; sitemap: string }

    expect(robots.sitemap).toBe('https://futzo.io/sitemap.xml')
    expect(robots.disallow).not.toContain('/')
    expect(robots.disallow.every((path) => path.startsWith('/'))).toBe(true)
  })

  it('uses explicit sitemap URLs only and disables sitemap index mode', () => {
    const sitemap = (nuxtConfig as any).sitemap as {
      urls: string[]
      exclude: string[]
      excludeAppSources: boolean
      sitemaps: boolean
    }

    expect(sitemap.urls).toEqual(
      expect.arrayContaining([
        '/',
        '/politica-de-privacidad',
        '/terminos-de-servicio',
        '/blog',
        '/blog/como-organizar-liga-futbol-amateur',
        '/blog/mejores-apps-para-administrar-torneos-futbol-2026',
        '/blog/como-hacer-rol-de-juegos-liga-futbol',
        '/blog/reglamento-liga-futbol-amateur-plantilla',
        '/blog/como-calcular-tabla-de-posiciones-futbol',
      ])
    )
    expect(sitemap.exclude).toEqual(expect.arrayContaining(['/torneos/**', '/dashboard/**', '/login/**']))
    expect(sitemap.excludeAppSources).toBe(true)
    expect(sitemap.sitemaps).toBe(false)
  })

  it('enables GA4 only in production', () => {
    const gtag = (nuxtConfig as any).gtag as { enabled: boolean; id: string }

    expect(gtag.id).toBe('G-6B315LGN56')
    expect(gtag.enabled).toBe(process.env.NODE_ENV === 'production')
  })

  it('disables Sanctum initial user fetch for public routes', () => {
    const sanctum = (nuxtConfig as any).sanctum as { client: { initialRequest: boolean } }

    expect(sanctum.client.initialRequest).toBe(false)
  })

  it('does not inject Google Maps script globally in app head', () => {
    const appHead = (nuxtConfig as any).app?.head as { script?: Array<{ src?: string }> } | undefined
    const hasGoogleMapsScript = Boolean(appHead?.script?.some((script) => script.src?.includes('maps.googleapis.com/maps/api/js')))

    expect(hasGoogleMapsScript).toBe(false)
  })

  it('avoids transpiling v-phone-input globally', () => {
    const transpile = ((nuxtConfig as any).build?.transpile ?? []) as string[]

    expect(transpile).not.toContain('v-phone-input')
  })
})
