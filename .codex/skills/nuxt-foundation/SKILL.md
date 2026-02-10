---
name: nuxt-foundation
description: Define Nuxt 3 TypeScript baseline, conventions, scripts, and project structure for the migration.
---

# Objetivo
Definir el baseline de Nuxt 3 (TypeScript) con convenciones, scripts y estructura recomendada.

# Alcance
- Estructura de carpetas.
- Convenciones de nombres.
- Scripts base.
- No implementar features ni contenido.

# Inputs esperados
- Requisitos del proyecto (SSR + prerender, deploy con `.output/public`).
- Template context en `.codex/references/TEMPLATE_CONTEXT.md`.

# Pasos (checklist)
- [ ] Definir estructura recomendada de carpetas para Nuxt (Nuxt 4 / app dir).
- [ ] Configurar `srcDir: 'app'` y mover carpetas base dentro de `app/`.
- [ ] Establecer convenciones de nombres para componentes, rutas y archivos.
- [ ] Documentar scripts recomendados (dev/build/lint).
- [ ] Confirmar que el baseline compila sin contenido funcional.

# Convenciones (nombres de archivos/rutas)
- Componentes: PascalCase (`SiteHeader.vue`, `HeroSection.vue`).
- Rutas/archivos de `pages/`: kebab-case si aplica (ej. `contact.vue`).
- Secciones home06: `components/sections/home06/*Section.vue`.
- CSS principal: `assets/css/main.css`.
- Estructura Nuxt 4 (source en `app/`):
  - `app/assets/` (procesado por Vite)
  - `app/components/`
  - `app/composables/`
  - `app/layouts/`
  - `app/middleware/`
  - `app/pages/`
  - `app/plugins/`
  - `app/utils/`
  - `app/app.config.ts`, `app/app.vue`, `app/error.vue`
- Root adicional:
  - `public/` (archivos estaticos sin procesar)
  - `server/` (api, routes, middleware, plugins, utils)
  - `shared/` (codigo compartido app/server)
  - `content/` (Nuxt Content)
  - `modules/` (modulos locales)
  - `layers/` (capas reutilizables)
  - `nuxt.config.ts`, `.nuxtrc`, `.nuxtignore`

# Criterios de Done (verificables)
- Checklist de estructura y scripts definido.
- Estructura recomendada incluye `app/` con sus subcarpetas y `public/`.
- Scripts recomendados listados: `pnpm dev`, `pnpm build`, `pnpm lint` (o equivalentes).

# Errores comunes y mitigacion
- Error: mezclar convenciones de template con Nuxt sin documentar. Mitigacion: definir naming claro en este skill.
- Error: olvidar mover a `app/` o no setear `srcDir`. Mitigacion: validar con checklist antes de migrar.
