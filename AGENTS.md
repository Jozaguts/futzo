# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Nuxt application source (components, pages, composables, stores, utils, assets).
- `server/`: Server routes, middleware, and plugins for SSR/runtime logic.
- `public/`: Static assets served as-is.
- `i18n/`: Locale messages and i18n configuration data.
- `test/`: Vitest suites (`test/nuxt` for UI/unit, `test/e2e` for headless API E2E).
- `playwright/`: Browser E2E specs and fixtures; config in `playwright.config.ts`.
- Config/root: `nuxt.config.ts`, `vitest.config.ts`, `tsconfig.json`, `ecosystem.config.cjs`.

## Build, Test, and Development Commands
- `yarn dev`: Run the Nuxt dev server (clears `/tmp/nitro` first).
- `yarn build`: Production build using `.env.prod`.
- `yarn build:test`: Build using `.env` for staging-like checks.
- `yarn preview`: Serve the production build locally.
- `yarn test`: Run all Vitest projects.
- `yarn test:nuxt` / `yarn test:unit`: Run UI/nuxt or unit-only suites.
- `yarn test:e2e`: Headless E2E against a real backend (`RUN_E2E=1`).
- `yarn pw:install`: Install Playwright browsers; then use `yarn test:pw`.

## Coding Style & Naming Conventions
- Formatting uses Prettier (`.prettierrc.json`): 2 spaces, single quotes, semicolons, `printWidth` 120.
- Vue SFCs use no semicolons; keep `<script>` and `<style>` indented (`vueIndentScriptAndStyle`).
- TypeScript is preferred for app logic; keep filenames descriptive and kebab-case for Vue files.
- Any style need to be performance with mobile first method

## Testing Guidelines
- Frameworks: Vitest for unit/nuxt tests, Playwright for browser E2E.
- Naming: `*.nuxt.spec.ts` for Nuxt/UI tests, `*.e2e.ts` for headless E2E.
- Run targeted suites with `yarn test:nuxt`, `yarn test:unit`, or `yarn test:e2e`.
- Al tocar un componente existente sin tests, se deben crear tests. Todo componente nuevo debe incluir tests desde el inicio.

## Quality & Error Handling (Obligatorio)
- Cada vez que se **modifique** un componente crítico, se debe **crear o actualizar** su(s) test(s).
- Cada **componente nuevo** debe incluir su test desde el inicio.
- No se permiten fallas silenciosas: cualquier error HTTP **4xx/5xx** debe mostrar un **toast** al usuario.
- Preferir **422** para validaciones; los **400/500** deben informar claramente al usuario.

## Commit & Pull Request Guidelines
- Commits follow a conventional style like `feat(scope): summary` or `fix(scope): summary`.
- Keep messages short, present tense, and scoped (e.g., `fix(auth): handle redirect`).
- PRs should include: a clear description, test results, and screenshots for UI changes.
- Link related issues and note any environment changes (`.env`, `NUXT_*`).

## Configuration & Deployment Notes
- Start from `.env.example`; do not commit secrets. Use `.env.prod` for builds.
- `deploy.sh` requires `GITHUB_TOKEN` and pushes `.output/` to the `web` branch.

## Testing & UX Notes (Contexto Reutilizable)
- Playwright usa `NUXT_PUBLIC_URL_BACKEND` y carga envs en este orden: `.env`, `.env.local`, `.env.test`, `.env.testing`. Para testing, define `NUXT_PUBLIC_URL_BACKEND` en `.env.testing`. `.env.testing` está ignorado en git.
- Si Playwright apunta al backend equivocado, asegúrate de cerrar cualquier `nuxt dev` previo porque Playwright reutiliza el server existente.
- El endpoint de actividad de dashboard puede fallar validación si `team.slug` llega `null`. Definir si el backend debe siempre enviar slug o si el schema debe aceptar `null`.
- Flujo actual (para UX): crear torneo → registrar equipos → abrir calendario → si no hay calendario, stepper 4 pasos (general, reglas, eliminatoria, campos) → generar calendario. Marcadores se actualizan rápido por jornada o completo en “Acta de partido” (goles, tarjetas, sustituciones, penales). Tablas de goles/tarjetas requieren jugadores registrados y eventos capturados.

## Domain Context (Futzo SaaS)
Futzo administra ligas de fútbol. Los módulos principales en la app son `torneos`, `jugadores`, `equipos`, `ubicaciones` y `configuracion`. Cada cambio en reglas puede afectar la creación, validación y programación entre módulos. Este bloque es el mapa base para evitar efectos colaterales.

## Cross-Module Dependencies (Impact Map)
- Verificación de jugadores: la regla global de liga se configura en Configuración → Jugadores, pero **la regla del torneo anula la global**. Si `TournamentConfiguration.requires_player_verification` está activa, todos los jugadores del torneo deben verificarse aunque la liga no lo exija. Si el torneo la desactiva, no se exige aunque la liga la pida. Fuentes: `app/components/pages/configuration/players-settings-card.vue`, `app/components/pages/configuration/tournaments-settings-card.vue`, `app/models/settings.ts`.
- Equipos dependen de Torneos: cada equipo pertenece a un torneo. Cambios en reglas de torneo (mínimos/máximos, formato) afectan validaciones y flujos de equipos. Fuentes: `app/stores/useTeamStore.ts`, `app/stores/useTournamentStore.ts`, `app/models/Team.ts`, `app/models/tournament.ts`.
- Jugadores dependen de Equipos y Torneos: un jugador se registra dentro de un equipo, que a su vez pertenece a un torneo. La validación y los bloqueos de jugador impactan alineaciones, estadísticas y transferencias. Fuentes: `app/stores/usePlayerStore.ts`, `app/pages/jugadores/[jugador]/index.vue`.
- Ubicaciones y campos afectan programación: torneos y equipos pueden usar sedes y disponibilidad para generar calendarios y evitar conflictos. Cambios en disponibilidad o campos impactan la programación del torneo. Fuentes: `app/stores/useLocationStore.ts`, `app/stores/useTournamentStore.ts`.
- Pre‑registro público: hay flujos públicos para inscripción de equipos y jugadores. Cambios en reglas de torneo/equipo pueden romper onboarding público. Fuentes: `app/pages/torneos/[torneo]/equipos/inscripcion.vue`, `app/pages/equipos/[equipo]/jugadores/inscripcion.vue`, `app/middleware/verify-tournament-can-register-team.ts`, `app/middleware/verify-team-can-register-player.ts`.

## Change Impact Checklist
- Si cambias reglas de verificación, revisa Configuración global y Configuración por torneo, además del UI de jugador (verificación, bloqueo y estados).
- Si cambias reglas de torneo, revisa validaciones de equipos, límites de jugadores y calendarios.
- Si cambias equipos, revisa pre‑registro público, asignación de jugadores y preferencias de sede.
- Si cambias ubicaciones, revisa programación de torneos y preferencias de equipo.
- Si tocas rutas públicas, revisa middleware de pre‑registro y páginas `inscripcion-cerrada`.

## Dependency Diagram (Simplified)
```text
Configuración (global)
  └─ Regla de verificación global (liga)
       └─ Override por torneo (config. torneo)  --->  Jugadores (verificación)

Torneos
  ├─ Equipos (pertenecen a torneo)
  │    └─ Jugadores (pertenecen a equipo)
  └─ Ubicaciones/Campos (programación y calendario)
```

## Roles (Referencia)
Roles reales declarados por negocio: `super administrador`, `administrador`, `dueño de equipo`, `entrenador`, `jugador`, `arbitro`, `personal administrativo de liga`, `aficionado`, `predeterminado`.
Referencia técnica actual: el rol activo se toma de `user.roles[0]` y `isSuperAdmin` se evalúa en `app/stores/useAuthStore.ts`. No hay un mapa de permisos centralizado en frontend, por lo que los accesos deben validarse por ruta/componente.

## Module: Torneos
Objetivo: definir la estructura competitiva y reglas del torneo, generar calendarios, asignar ubicaciones y estados.
Entrypoints UI: `app/pages/torneos/index.vue`, `app/components/pages/torneos/*`, `app/components/pages/torneos/dialog/*`.
Estado y lógica: `app/stores/useTournamentStore.ts`.
APIs: `app/http/api/tournament.ts`.
Flujos clave:
- Crear/editar torneo (stepper `basicInfo` → `detailsInfo`).
- Configurar ubicaciones del torneo y reglas de desempate.
- Gestión de calendario y estados de torneo.
- Pre‑registro público de equipos: `app/pages/torneos/[torneo]/equipos/inscripcion.vue` con middleware de validación.
Endpoints relevantes (admin):
- `GET /api/v1/admin/tournaments`
- `GET /api/v1/admin/tournaments/:id` (por slug o id)
- `GET /api/v1/admin/tournaments/:id/standings`
- `GET /api/v1/admin/tournaments/:id/stats`
- `POST /api/v1/admin/tournaments/:id/regenerate-calendar`
- `POST /api/v1/admin/tournaments/:id/confirm-regeneration`
- `POST /api/v1/admin/tournaments/:id/phases/advance`
- `GET /api/v1/admin/tournaments/:id/registration/qr-code/generate`
Endpoints relevantes (public):
- `GET /api/v1/public/tournaments/:slug/details`
- `GET /api/v1/public/tournaments/:slug/schedule`
- `GET /api/v1/public/tournaments/:slug/registrations/catalogs`
Dependencias críticas:
- Reglas globales/per‑torneo en Configuración impactan validaciones y constraints.
- Usa ubicaciones/campos para programación (`tournamentFields`, `tournamentLocations`).
- Equipos y jugadores cuelgan del torneo para estadísticas y calendario.

## Module: Jugadores
Objetivo: registrar, validar y administrar jugadores, además de su relación con equipos y estadísticas.
Entrypoints UI: `app/pages/jugadores/index.vue`, `app/pages/jugadores/[jugador]/index.vue`.
Estado y lógica: `app/stores/usePlayerStore.ts`.
APIs: `app/http/api/players.ts`.
Flujos clave:
- Alta y edición por stepper (básico → detalles → contacto).
- Importación masiva y asignación de equipo.
- Verificación de jugadores: carga de documentos, aprobación/rechazo, liberación de bloqueo.
- Pre‑registro público por equipo: `app/pages/equipos/[equipo]/jugadores/inscripcion.vue`.
UI de verificación y bloqueo: `app/pages/jugadores/[jugador]/index.vue`.
Endpoints relevantes (admin):
- `GET /api/v1/admin/players` (lista/búsqueda)
- `POST /api/v1/admin/players`
- `PUT /api/v1/admin/players/:id`
- `POST /api/v1/admin/players/:id/verification`
- `POST /api/v1/admin/players/:id/verification/approve`
- `POST /api/v1/admin/players/:id/verification/reject`
- `POST /api/v1/admin/players/:id/release`
- `POST /api/v1/admin/players/import`
- `GET /api/v1/admin/players/template`
Dependencias críticas:
- Verificación depende de reglas globales y override por torneo.
- Jugador se asocia a equipo y torneo, afectando alineaciones y estadísticas.

## Module: Equipos
Objetivo: administrar equipos por torneo, su staff (DT/presidente) y preferencias locales.
Entrypoints UI: `app/pages/equipos/index.vue`, `app/components/pages/equipos/*`.
Estado y lógica: `app/stores/useTeamStore.ts`.
APIs: `app/http/api/team.ts`.
Flujos clave:
- Crear/editar equipo (stepper crear equipo → DT → dueño).
- Importación de equipos.
- Preferencias de sede/día/horario para programación.
- Pre‑registro público de equipos por torneo.
Endpoints relevantes (admin):
- `GET /api/v1/admin/teams`
- `GET /api/v1/admin/teams/search`
- `GET /api/v1/admin/teams/:id`
- `PUT /api/v1/admin/teams/:id`
- `POST /api/v1/admin/teams`
- `PUT /api/v1/admin/teams/:id/home-preferences`
- `GET /api/v1/admin/teams/:id/available-players`
- `GET /api/v1/admin/teams/:id/registration/qr-code/generate`
Endpoints relevantes (public):
- `GET /api/v1/public/teams/:slug/registrations/catalogs`
Dependencias críticas:
- Requiere torneo para crear equipo.
- Preferencias de sede dependen de Ubicaciones.
- Los jugadores se registran dentro de equipos.

## Module: Ubicaciones
Objetivo: administrar sedes y campos con disponibilidad horaria.
Entrypoints UI: `app/pages/ubicaciones/index.vue`, `app/components/pages/ubicaciones/*`.
Estado y lógica: `app/stores/useLocationStore.ts`.
APIs: llamadas directas desde `app/stores/useLocationStore.ts` (no hay wrapper dedicado).
Flujos clave:
- Crear/editar ubicación y campos.
- Disponibilidad por día con sanitización de ventanas horarias (`sanitizeWindows`).
Endpoints relevantes (admin):
- `GET /api/v1/admin/locations`
- `POST /api/v1/admin/locations`
- `PUT /api/v1/admin/locations/:id`
- `DELETE /api/v1/admin/locations/:id`
Dependencias críticas:
- Torneos usan ubicaciones/campos para calendarizar.
- Equipos pueden usar sede preferida como dato operativo.

## Module: Configuración
Objetivo: centralizar ajustes de usuario, suscripción y reglas globales/per‑torneo.
Entrypoint UI: `app/pages/configuracion.vue`.
Sub‑módulos:
- Jugadores (global): `app/components/pages/configuration/players-settings-card.vue`.
- Torneos (por torneo): `app/components/pages/configuration/tournaments-settings-card.vue`.
- Equipos y Locaciones: actualmente placeholders (`Próximamente`), ver `teams-settings-card.vue` y `locations-settings-card.vue`.
APIs: `app/http/api/settings.ts`.
Reglas críticas:
- `requires_player_verification` y `player_verification_method` globales se sobrescriben por la configuración del torneo.
- Al desactivar verificación, el método se fuerza a `null` en UI.
Endpoints relevantes (admin):
- `GET /api/v1/admin/settings/players/verification`
- `PUT /api/v1/admin/settings/players/verification`
- `GET /api/v1/admin/settings/tournaments/:id/configuration`
- `PUT /api/v1/admin/settings/tournaments/:id/configuration`
- `GET /api/v1/admin/settings/players/transfer-locks`
- `PUT /api/v1/admin/settings/players/transfer-locks/:id`
