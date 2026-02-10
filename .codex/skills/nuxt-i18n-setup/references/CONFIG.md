# Nuxt i18n config basica

Objetivo: instalar el modulo y definir locales en `nuxt.config.ts`.

## Instalacion
- Comando recomendado:
  - `npx nuxi@latest module add @nuxtjs/i18n`

## Ejemplo minimo de configuracion

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'es', name: 'Espanol', language: 'es-ES', file: 'es.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' }
    ]
  }
})
```

## Archivos de traduccion
- Ubicacion por defecto: `i18n/locales/`.
- Ejemplo:
  - `i18n/locales/es.json`
  - `i18n/locales/en.json`

## Lazy-load (opcional)
- Usar archivos por locale con `file` o `files`.
- Mantener los archivos en `i18n/locales/` para que el modulo los encuentre.

## Deteccion de idioma (opcional)

```ts
export default defineNuxtConfig({
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
```
