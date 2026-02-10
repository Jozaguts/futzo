---
name: nuxt-i18n-setup
description: Setup and configure @nuxtjs/i18n in Nuxt 3 apps with locale files, routing strategy, SEO metadata, and language switchers. Use when enabling i18n, adding locales, or wiring the language dropdown/navigation to i18n.
---

# Objetivo
Definir un flujo claro para instalar y configurar i18n en Nuxt 3 sin romper SSR ni rutas existentes.

# Alcance
- Instalacion del modulo @nuxtjs/i18n.
- Configuracion de locales, defaultLocale y estrategia de rutas.
- Estructura de archivos de traduccion.
- Switcher de idioma (menu/header).
- SEO basico con useLocaleHead.

# Inputs esperados
- Lista de locales (code, name, language, archivo).
- defaultLocale.
- strategy (prefix_except_default, prefix, no_prefix, prefix_and_default).
- baseUrl para SEO.
- Confirmacion si se requiere lazy-load.

# Pasos (checklist)
- [ ] Instalar @nuxtjs/i18n (ver referencias/CONFIG.md).
- [ ] Agregar el modulo en `nuxt.config.ts`.
- [ ] Configurar `i18n` con `locales`, `defaultLocale`, `strategy`.
- [ ] Crear archivos de idioma en `i18n/locales/`.
- [ ] Ajustar el switcher de idioma para usar `useI18n` y `useSwitchLocalePath` o `setLocale`.
- [ ] Habilitar SEO con `useLocaleHead` (ver referencias/ROUTING_SEO.md).
- [ ] Verificar rutas locales y el cambio de idioma en UI.

# Convenciones (nombres de archivos/rutas)
- Carpeta i18n: `i18n/` en la raiz del repo (junto a `nuxt.config.ts`).
- Traducciones: `i18n/locales/<code>.json`.
- Switcher: `app/components/site/SiteHeader.vue` (dropdown de idioma).

# Criterios de Done (verificables)
- El proyecto arranca con `nuxt dev` y no hay errores de i18n.
- Cambiar idioma actualiza el contenido y la URL segun la estrategia.
- `html[lang]`, `hreflang` y `canonical` se generan (si SEO esta habilitado).

# Errores comunes y mitigacion
- Error: cambiar `locale.value` directo. Mitigacion: usar `setLocale()` o `useSwitchLocalePath()`.
- Error: falta `language` en locales para SEO. Mitigacion: definir `language` en cada locale.
- Error: rutas custom con `no_prefix`. Mitigacion: evitar custom routes o cambiar strategy.
- Error: rutas de locales incorrectas. Mitigacion: mantener `i18n/locales/` en raiz o ajustar `langDir`.

# Referencias
- Ver `references/CONFIG.md` para configuracion recomendada.
- Ver `references/ROUTING_SEO.md` para rutas y SEO.
- Ver `references/SWITCHER.md` para el switcher de idioma.
