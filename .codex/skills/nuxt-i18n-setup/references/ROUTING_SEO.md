# Rutas y SEO

## Estrategias de rutas
- `no_prefix`: sin prefijos. No soporta custom paths salvo diferentes dominios.
- `prefix_except_default`: prefijo para idiomas no default.
- `prefix`: prefijo para todos.
- `prefix_and_default`: ambos prefijado y sin prefijo para default.

## SEO con useLocaleHead
- Requiere `language` en cada locale.
- Requiere `baseUrl` en `nuxt.config.ts` para hreflang canonico.

```ts
export default defineNuxtConfig({
  i18n: {
    baseUrl: 'https://example.com',
    locales: [
      { code: 'es', language: 'es-ES' },
      { code: 'en', language: 'en-US' }
    ]
  }
})
```

## Activar en layout o app

```ts
const i18nHead = useLocaleHead({ seo: true })
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
}))
```

## Custom paths (opcional)
- Configurar `customRoutes: 'config'` y `pages` en `nuxt.config.ts`.
- Si se usa `definePageMeta({ name: '...' })`, habilitar `experimental.scanPageMeta`.
