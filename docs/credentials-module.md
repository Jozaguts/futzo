Epic/Ticket: FEAT — Credenciales (módulo /credenciales + settings en /configuracion/credenciales)
Scope: UI/UX + integración API + guards + tests
No-go: No crear /credenciales/configuracion (removido). No crear sidebar nuevo. No errores silenciosos.

Subtarea 1 — Routing + navegación (sidebar + subnav interna)

Trabajo

Agregar item único en sidebar global: Credenciales → /credenciales.

Crear páginas:

/credenciales (Resumen)

/credenciales/generar

/credenciales/disenos

/credenciales/validacion

/credenciales/historial

Agregar pantalla settings: /configuracion/credenciales.

Implementar “shell” de módulo Credenciales con subnav interna (tabs):

Resumen / Generar / Diseños / Validación / Historial

Responsive:

≥600px tabs

<600px dropdown (patrón existente)

DoD

Sidebar muestra “Credenciales” y navega correctamente.

Subnav interna activa según ruta; en móvil cambia a dropdown sin romper layout.

No existe navegación/tab a “Configuración” dentro de /credenciales.

Subtarea 2 — Guards de permisos + visibilidad de tabs

Trabajo

Implementar guard por ruta:

canManageCredentials: resumen/generar/diseños/historial

canValidateCredentials: validación

canConfigureCredentials: /configuracion/credenciales

Ocultar tabs no permitidos (no solo bloquear navegación).

Pantalla 403 friendly + toast (sin silencios).

DoD

Usuario sin permiso no ve tab y no puede acceder via URL (403 UX).

Validación accesible por árbitro; configuración solo admin/superadmin.

Subtarea 3 — Capa API + tipos TS (contrato)

Trabajo

Crear types/credentials.ts con enums:

format/output_mode/status/batch_status/watermark_mode/side_mode/size_key

Crear composables/credentials/* (o service layer equivalente):

dashboard: GET /dashboard

generator catalogs: GET /generator/catalogs

batches: POST /batches, GET /batches/{id}, GET /batches/{id}/artifact

designs: GET/POST/PATCH/duplicate/restore/logo

settings: GET/PUT, tournament override GET/PUT

validation: POST /validation

history: GET, detail GET /history/{id}, reprint, invalidate

Manejo de errores global:

401 → login/flow + toast

402 → paywall/modal con checkout_url

422 → inline + toast

4xx/5xx → toast siempre

DoD

No se asume wrapping {data} (manejar por endpoint).

402 muestra CTA funcional a checkout.

Todas las llamadas fallidas disparan toast (excepto inline 422 que además muestra campos).

Subtarea 4 — Página /credenciales (Resumen)

Trabajo

UI:

Header: “Credenciales” + description

CTA Primary: “Generar credenciales” → /credenciales/generar

CTA Secondary: “Configuración” → /configuracion/credenciales

Métricas (4 cards) desde API.

Accesos rápidos (4 cards).

Tabla “Últimas generadas” (6 filas):

Jugador/Equipo/Torneo/Formato/Fecha/Acciones (Ver/Reimprimir)

Estados: loading/empty/error.

DoD

Data viene de GET /dashboard.

Empty state muestra CTA a generar.

Botón Configuración redirige a /configuracion/credenciales.

Subtarea 5 — Página /credenciales/generar (Generador)

Trabajo

Layout 3 columnas (apilable móvil).

Izquierda:

Filtros: torneo/equipo/estado/search/include_unverified/include_suspended/limpiar

Lista paginada de jugadores con checkbox, badges y bulk actions.

Centro:

Selector formato (4 cards) respetando locked_by_plan + CTA.

Tamaño: size_key + width/height si custom (5..30).

Side mode (front/back/both) usando opciones del API y respetando restricciones.

Derecha:

Preview (1 jugador ejemplo)

Personalización rápida (colores, toggles, watermark lock)

Salida: PDF/PNG/Digital (digital solo si enabled)

Flujo:

GET /generator/catalogs (debounce search 300–500ms)

POST /batches con payload

Progreso con polling fallback GET /batches/{id}

Descargas con GET /batches/{id}/artifact?variant=... (blob para capturar errores)

DoD

Preview solo 1 jugador (no render masivo).

Locks por plan: formato bloqueado disabled + reason + CTA visible.

Digital disabled cuando settings/catálogo lo marque.

Crear batch muestra panel de progreso con counters + percent.

Descargas funcionan (PDF/PNG/Digital) y reportan errores vía toast.

Subtarea 6 — Batch progress: realtime opcional + polling obligatorio

Trabajo

UI componente BatchProgressPanel reutilizable (Generar + Reimprimir).

Intentar socket si existe Echo:

subscribe channel privado del batch

escuchar .credentials.batch.progress

Polling fallback siempre:

cada 2–3s hasta status final.

Manejar estados: queued/processing/completed/failed/partial.

DoD

Con websockets apagado, el flujo sigue funcionando completo por polling.

UI refleja “partial” y “failed” con mensaje claro.

Subtarea 7 — Página /credenciales/disenos (Templates)

Trabajo

GET /designs y render:

Sección Oficiales (grid)

Sección Seasonal FIFA (grid temporadas), con badge si locked.

Acciones por template:

Editar (drawer/modal) → PATCH

Duplicar → POST duplicate

Restablecer → POST restore

Upload logo → POST multipart /logo

Editor:

visible_fields checklist

colores + tipografía limitada

reverso toggle

DoD

Todas las acciones actualizan la UI sin recargar (refetch o cache update).

Seasonal muestra lock por plan y bloquea acciones si corresponde.

Upload logo valida tipo/tamaño, muestra progreso, errores via toast.

Subtarea 8 — Página /credenciales/validacion (QR/manual)

Trabajo

Input manual + botón “Validar”.

Panel escaneo (mock/placeholder si no hay cámara real).

Resultado grande con:

status + color + message + reason_message + timestamp

POST /validation con normalización UX (trim/uppercase).

Manejo de rate limit (cooldown simple si error repetido).

DoD

Estados active/suspended/expired/invalidated/not_found se renderizan correctamente.

Errores 4xx/5xx muestran toast; UX no se rompe.

Subtarea 9 — Página /credenciales/historial

Trabajo

Filtros: torneo/equipo/formato/estado/rango fechas/per_page.

Tabla con columnas + acciones:

Ver (drawer detalle) → GET /history/{id}

Reimprimir → POST /history/{id}/reprint → abre BatchProgressPanel

Invalidar → modal con reason (max 160) → POST /history/{id}/invalidate

Respetar actions.can_view/can_reprint/can_invalidate.

DoD

Acciones deshabilitadas si actions.can_* es false.

Reimprimir de invalidada maneja 422 con mensaje y no rompe flujo.

Filtros aplican en query y se reflejan en UI.

Subtarea 10 — Settings /configuracion/credenciales (Global + override)

Trabajo

Pantalla dentro del módulo existente /configuracion.

Bloque Global:

switches completos + watermark_mode con lock by plan

save → PUT /settings (todos requeridos)

Bloque Override:

select torneo

load → GET /settings/tournaments/{tournament}

switches + badge “Sobrescribe global”

save → PUT /settings/tournaments/{tournament}

Al guardar, refrescar estado efectivo.

Asegurar que Generador consuma efectos:

digital enabled/disabled

watermark lock

DoD

Guard canConfigureCredentials aplicado.

Global y Override guardan sin inconsistencias.

UI refleja watermark locked_by_plan correctamente.

Subtarea 11 — Estados UI/UX obligatorios (todas las vistas)

Trabajo

Loading skeletons coherentes.

Empty states con CTA.

Error states con retry.

Locked-by-plan states coherentes (lock + reason + CTA).

Dark mode listo (sin hardcode de colores fuera de tokens existentes).

DoD

No hay pantallas “vacías” sin explicación/CTA.

Todo error produce feedback visible (toast + inline si 422).

Subtarea 12 — Tests (unit/UI + e2e si aplica)

Trabajo (mínimo)

Sidebar incluye Credenciales.

Subnav responsive (tabs→dropdown <600px).

Guards:

rol sin permisos no ve tabs/no entra rutas

árbitro solo validación

Generador:

locked format

digital disabled por settings

batch progress polling

Settings:

save global + override

watermark locked UI

Historial:

acciones según actions.can_*

Validación:

render por status

DoD

Todos los tests pasan en CI.

Se actualizan snapshots/selectores si se tocó navegación global.

DoD global del ticket (condiciones para “Done”)

✅ Rutas activas: /credenciales/* (sin configuracion) + /configuracion/credenciales.

✅ Sidebar global actualizado sin duplicar layouts.

✅ Subnav interna responsive y consistente con el dashboard.

✅ Integración API completa con manejo de 401/402/403/404/422 y toasts en 4xx/5xx.

✅ Locks por plan respetados en Generar y Diseños; watermark lock reflejado.

✅ Batch progress funcional con polling (websocket opcional).

✅ Descargas por variantes funcionan con manejo de error (blob).

✅ Tests agregados/actualizados y passing.

Riesgos/Notas para el frontend (corto)

No intentar previsualizar masivo (performance): preview 1 jugador.

Descargas deben usar blob para capturar 402/401/422.

No asumir {data} en responses: manejar por endpoint.

# Credenciales API Contract (Frontend)

Este documento describe el contrato backend actual del módulo `Credenciales` para integrar frontend.

## Base y middleware global

- Base path: `/api/v1/admin/credentials`
- Los endpoints viven dentro de:
- `auth:sanctum` (autenticación requerida)
- `billing.operational` (si no está operativo por facturación devuelve `402`)
- JSON resources sin wrapping global (`JsonResource::withoutWrapping()`), por eso algunos endpoints regresan objeto directo y no `{ "data": ... }`.

## Códigos y errores globales

- `401`: no autenticado (middleware auth)
- `402`: bloqueo por facturación
- `403`: rol sin permiso (FormRequest `authorize`)
- `404`: entidad no encontrada o fuera de la liga del usuario
- `422`: validación de request o reglas de negocio

Respuesta típica `402`:

```json
{
  "error": "payment_required",
  "message": "Tu suscripción no está activa. Completa el pago para continuar.",
  "checkout_url": "http://.../api/v1/checkout",
  "status": "..."
}
```

## Roles y permisos

Roles en backend:

- Gestión de credenciales (`canManageCredentials`):
- `super administrador`
- `administrador`
- `personal administrativo de liga`

- Configuración (`canConfigureCredentials`):
- `super administrador`
- `administrador`

- Validación QR (`canValidateCredentials`):
- `super administrador`
- `administrador`
- `personal administrativo de liga`
- `arbitro`

## Enum/valores que frontend debe usar

- `format`:
- `official_vertical`
- `official_horizontal`
- `fifa_style`
- `letter_sheet`

- `output_mode`:
- `print`
- `digital`

- `credential status`:
- `active`
- `suspended`
- `expired`
- `invalidated`

- `batch status`:
- `queued`
- `processing`
- `completed`
- `failed`
- `partial`

- `watermark_mode`:
- `forced`
- `optional`
- `disabled`

- `side_mode`:
- `front`
- `back`
- `both`

- `size_key`:
- `credential_standard`
- `letter`
- `half_letter`
- `custom`

## Rate limits

Configurados en `RouteServiceProvider`:

- `credentials-validation`: `120` req/min por usuario/ip
- `credentials-writes`: `30` req/min por usuario/ip

Endpoints con throttle:

- `POST /credentials/batches`
- `POST /credentials/validation`
- `POST /credentials/history/{credential}/reprint`
- `POST /credentials/history/{credential}/invalidate`
- `POST /credentials/designs`
- `PATCH /credentials/designs/{design}`
- `POST /credentials/designs/{design}/duplicate`
- `POST /credentials/designs/{design}/restore`
- `POST /credentials/designs/{design}/logo`
- `PUT /credentials/settings`
- `PUT /credentials/settings/tournaments/{tournament}`

## Endpoints

### 1) Dashboard del módulo

`GET /dashboard`

Permiso: gestión.

Respuesta `200`:

```json
{
  "title": "Credenciales",
  "description": "Genera, personaliza e imprime credenciales de jugadores por torneo.",
  "metrics": {
    "active": 0,
    "suspended": 0,
    "expired": 0,
    "generated_this_season": 0
  },
  "quick_actions": [
    { "key": "generate_by_tournament", "label": "Generar por torneo", "path": "/credenciales/generar" },
    { "key": "generate_by_team", "label": "Generar por equipo", "path": "/credenciales/generar" },
    { "key": "edit_designs", "label": "Editar diseños", "path": "/credenciales/disenos" },
    { "key": "validate_qr", "label": "Validar QR", "path": "/credenciales/validacion" }
  ],
  "latest_generated": [
    {
      "id": 1,
      "player_name": "Nombre Apellido",
      "team_name": "Equipo",
      "tournament_name": "Torneo",
      "format": "official_vertical",
      "status": "active",
      "issued_at": "2026-02-21T00:00:00.000000Z"
    }
  ]
}
```

### 2) Catálogos para generador

`GET /generator/catalogs`

Permiso: gestión.

Query params:

- `tournament_id` (int, optional)
- `team_id` (int, optional)
- `status` (`all|active|suspended|expired|invalidated`, default `all`)
- `search` (string, max 120)
- `include_unverified` (boolean, default `true`)
- `include_suspended` (boolean, default `true`)
- `per_page` (int, 1-100, default `25`)

Respuesta `200` (estructura):

- `filters.status_options`
- `filters.applied`
- `plan.slug`
- `plan.can_use_seasonal`
- `plan.watermark_locked_by_plan`
- `generation.output_modes`
- `generation.size_options`
- `generation.defaults`
- `generation.side_mode_options`
- `formats[]` (`locked_by_plan`, `lock_reason`, `upgrade_cta`, `supports_reverse_side`)
- `tournaments[]`
- `teams[]`
- `players.data[]`
- `players.meta`

`players.data[]` incluye:

- `id`
- `name`
- `image`
- `number`
- `team { id, name }`
- `verification_status`
- `is_suspended`
- `current_credential_status`

### 3) Crear lote de generación

`POST /batches`

Permiso: gestión.

Body:

```json
{
  "tournament_id": 1,
  "team_id": 10,
  "design_id": 5,
  "format": "official_vertical",
  "output_mode": "print",
  "player_ids": [100, 101],
  "filters": {
    "status": "all",
    "search": "juan",
    "include_unverified": true,
    "include_suspended": true
  },
  "customization": {
    "primary_color": "#123456",
    "secondary_color": "#ABCDEF",
    "show_qr": true,
    "show_expiry": true,
    "watermark_mode": "optional",
    "side_mode": "front",
    "size_key": "custom",
    "width_cm": 8.8,
    "height_cm": 5.4
  }
}
```

Notas de validación/regla:

- `customization.size_key=custom` requiere `width_cm` y `height_cm` (`5..30`)
- `side_mode=back|both` solo permitido para `official_vertical`
- `fifa_style` bloqueado para planes fuera de `pro_play|elite_league`
- `output_mode=digital` se bloquea si settings deshabilitan digital
- si no hay jugadores seleccionables: `422`

Respuesta `202`:

```json
{
  "message": "Lote de credenciales encolado.",
  "data": {
    "id": 99,
    "tournament_id": 1,
    "status": "queued",
    "format": "official_vertical",
    "output_mode": "print",
    "selection_count": 2,
    "processed_count": 0,
    "success_count": 0,
    "failed_count": 0,
    "artifact_disk": null,
    "artifact_path": null,
    "artifacts": {},
    "available_artifact_variants": [],
    "started_at": null,
    "finished_at": null
  }
}
```

#### 3.1 Generar una sola credencial

Sí, se puede. No existe endpoint separado de "single"; se usa el mismo `POST /batches` con un solo jugador.

Ejemplo mínimo:

```json
{
  "tournament_id": 1,
  "format": "official_vertical",
  "output_mode": "print",
  "player_ids": [100]
}
```

Notas:

- `selection_count` será `1` si el jugador cumple filtros/reglas.
- Si el jugador no cumple reglas de emisión o no pertenece al contexto válido, puede devolver `422`.
- Para reimpresión individual desde historial también existe:
- `POST /history/{credential}/reprint` (encola batch con un solo jugador).

### 4) Detalle de lote

`GET /batches/{batch}`

Permiso: gestión.

Respuesta `200` (objeto directo del recurso):

- `id`
- `tournament_id`
- `status`
- `format`
- `output_mode`
- `selection_count`
- `processed_count`
- `success_count`
- `failed_count`
- `artifact_disk` (legacy)
- `artifact_path` (legacy)
- `artifacts` (nuevo mapa por variante)
- `available_artifact_variants` (ej: `["pdf", "png", "digital"]`)
- `started_at`
- `finished_at`

Contrato de `artifacts`:

- claves posibles: `pdf`, `png`, `digital`
- cada una: `{ "disk": "local", "path": "credentials/batches/{id}/..." }`
- alias: `png` y `digital` se reflejan entre sí cuando existe solo una
- fallback legacy: si no hay `artifacts.pdf` pero hay `artifact_disk/path`, frontend recibe `artifacts.pdf`

### 5) Descargar artefacto de lote

`GET /batches/{batch}/artifact`

Permiso: gestión.

Query opcional:

- `variant`: `pdf|png|digital` (case-insensitive; backend normaliza)

Comportamiento:

- sin `variant`: descarga archivo legacy (`artifact_disk/path`)
- con `variant`: busca en cache de variantes del batch y, si no existe, lo genera on-demand y lo persiste
- respuesta exitosa: stream de archivo (download)

Errores comunes:

- `422` si `variant` inválido (`El formato de artefacto solicitado no es valido.`)
- `404` si no existe/genera artefacto

### 6) Diseños

#### 6.1 `GET /designs`

Permiso: gestión.

Respuesta `200`:

```json
{
  "plan": {
    "slug": "elite_league",
    "can_use_seasonal": true
  },
  "official": [/* CredentialDesignResource[] */],
  "seasonal": [/* CredentialDesignResource[] */]
}
```

`CredentialDesignResource`:

- `id`, `name`, `slug`, `type`
- `is_official`, `is_default`, `locked_by_plan`
- `season_label`, `theme_pack`
- `style_config` (objeto libre validado por backend)
- `logo { disk, path, url }`

#### 6.2 `POST /designs`

Permiso: gestión.

Body:

- `name` required
- `type` required (`CredentialFormat`)
- `is_default` optional bool
- `season_label` required si `type=fifa_style`
- `theme_pack` optional
- `style_config` optional:
- `primary_color`, `secondary_color` (`#RRGGBB`)
- `font` (`poppins|montserrat|rubik`)
- `show_qr`, `show_expiry`, `reverse_enabled`, `glow` (bool)
- `background_pattern`, `overlay`
- `visible_fields[]` (`name|number|team|category|expiry|signature|qr`)

Respuesta `201`: `CredentialDesignResource`.

#### 6.3 `PATCH /designs/{design}`

Permiso: gestión. Campos `sometimes`.

Respuesta `200`: `CredentialDesignResource`.

#### 6.4 `POST /designs/{design}/duplicate`

Permiso: gestión.

Respuesta `201`: `CredentialDesignResource` (copia).

#### 6.5 `POST /designs/{design}/restore`

Permiso: gestión.

Respuesta `200`: `CredentialDesignResource` restaurado a default por tipo.

#### 6.6 `POST /designs/{design}/logo`

Permiso: gestión.

`multipart/form-data`:

- `logo` requerido (`jpg|jpeg|png|webp`, max 3072KB)

Respuesta `200`: `CredentialDesignResource` con `logo.*` actualizado.

### 7) Configuración

#### 7.1 `GET /settings`

Permiso: configuración (solo admin/super admin).

Respuesta `200`:

- keys de settings:
- `requires_registered_player`
- `allow_unverified_players`
- `allow_suspended_players`
- `block_if_team_sanctioned`
- `expiry_by_tournament`
- `show_warnings_on_card`
- `qr_enabled_by_default`
- `allow_digital_credential`
- `watermark_mode`
- metadata:
- `is_configured`
- `source` (`defaults|custom`)
- `watermark_locked_by_plan`

#### 7.2 `PUT /settings`

Permiso: configuración.

Body: todos los campos de settings son requeridos.

Respuesta `200`: misma estructura que `GET /settings`.

#### 7.3 `GET /settings/tournaments/{tournament}`

Permiso: configuración.

Respuesta `200`:

- settings efectivos (override o global)
- `tournament_id`
- `is_override`
- `source` (`global|override`)
- `watermark_locked_by_plan`

#### 7.4 `PUT /settings/tournaments/{tournament}`

Permiso: configuración.

Body: mismos campos requeridos que `PUT /settings`.

Respuesta `200`: misma estructura que `GET /settings/tournaments/{tournament}`.

### 8) Validación QR/manual

`POST /validation`

Permiso: validación (incluye árbitro).

Body:

```json
{ "input_code": "CRDXXXX" }
```

Backend normaliza a uppercase/trim.

Respuesta `200`:

```json
{
  "status": "active|suspended|expired|invalidated|not_found",
  "status_color": "green|red|yellow|gray",
  "message": "Credencial activa.",
  "reason_code": "player_suspended|credential_expired|credential_invalidated|player_not_verified|team_sanctioned|credential_not_found|null",
  "reason_message": "Jugador suspendido.",
  "validated_at": "2026-02-21T00:00:00.000000Z",
  "credential": {
    "id": 1,
    "credential_code": "CRD...",
    "status": "active",
    "player": { "id": 1, "name": "Nombre", "image": "..." },
    "team": { "id": 1, "name": "Equipo" },
    "tournament": { "id": 1, "name": "Torneo" },
    "issued_at": "...",
    "expires_at": "...",
    "invalidated_at": null
  }
}
```

### 9) Historial

#### 9.1 `GET /history`

Permiso: gestión.

Query params:

- `tournament_id`, `team_id`
- `format` (`CredentialFormat`)
- `status` (`CredentialStatus`)
- `date_from`, `date_to` (`date_to >= date_from`)
- `per_page` (1..100, default 25)

Respuesta `200`:

```json
{
  "data": [
    {
      "id": 1,
      "player_id": 1,
      "player_name": "Nombre Apellido",
      "team_id": 1,
      "team_name": "Equipo",
      "tournament_id": 1,
      "tournament_name": "Apertura 2026",
      "format": "official_vertical",
      "status": "active",
      "credential_code": "CRD...",
      "issued_at": "...",
      "issued_by": 5,
      "issued_by_name": "Admin Liga",
      "expires_at": "...",
      "invalidated_at": null,
      "actions": {
        "can_view": true,
        "can_reprint": true,
        "can_invalidate": true
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 25,
    "total": 1
  },
  "filters": {
    "applied": {
      "tournament_id": null,
      "team_id": null,
      "format": null,
      "status": null,
      "date_from": null,
      "date_to": null
    }
  }
}
```

#### 9.2 `GET /history/{credential}`

Permiso: gestión.

Respuesta `200`:

```json
{
  "data": {
    "...history_item_payload": "...",
    "output_mode": "print|digital",
    "design_id": 1,
    "batch_id": 10,
    "payload_snapshot": {},
    "invalidated_by_name": "Nombre Apellido"
  }
}
```

#### 9.3 `POST /history/{credential}/reprint`

Permiso: gestión.

Body: vacío.

Respuesta `202`:

```json
{
  "message": "Reimpresión encolada.",
  "data": { /* CredentialBatchResource */ }
}
```

Regla de negocio:

- si la credencial está invalidada -> `422` (`No se puede reimprimir una credencial invalidada.`)

#### 9.4 `POST /history/{credential}/invalidate`

Permiso: gestión.

Body:

```json
{ "reason": "Texto opcional (max 160)" }
```

Respuesta `200`:

```json
{
  "message": "Credencial invalidada.",
  "data": { /* IssuedCredentialResource */ }
}
```

## Reglas de plan importantes para frontend

- `fifa_style`:
- solo `pro_play` y `elite_league`
- en catálogos/diseños llega marcado como bloqueado

- Watermark:
- planes `free` y `kickoff` fuerzan `watermark_mode=forced`
- frontend debe tratarlo como lock de plan (aunque envíe otro valor)

- Digital:
- puede quedar deshabilitado por settings (`allow_digital_credential=false`)
- se expone en catálogos con `generation.output_modes[].enabled=false`

## Tiempo real (Socket / Broadcast)

### Evento de progreso de batch

- Event class: `CredentialBatchProgressUpdated`
- Broadcast channel: `private-league.{leagueId}.credentials.batches.{batchId}`
- Event name: `.credentials.batch.progress` (por `broadcastAs`)

Payload:

```json
{
  "batch_id": 99,
  "stage": "processing|rendering|artifact_failed|finished|failed",
  "status": "queued|processing|completed|failed|partial",
  "selection_count": 100,
  "processed_count": 45,
  "success_count": 42,
  "failed_count": 3,
  "artifact_disk": "local",
  "artifact_path": "credentials/batches/99/....pdf",
  "progress_percent": 45,
  "started_at": "2026-02-21T00:00:00.000000Z",
  "finished_at": null,
  "message": null
}
```

Autorización de canal:

- `routes/channels.php` permite escuchar solo si `user.league_id == leagueId`.

### Configuración backend de broadcast

- `Broadcast::routes()` está habilitado (auth endpoint `/broadcasting/auth`).
- `config/broadcasting.php` por defecto usa `BROADCAST_DRIVER=null`.
- Para tiempo real real, backend debe correr con driver activo (`pusher`, `ably`, `redis`, etc.).

### Recomendación frontend

- Suscribirse al canal privado al crear/reimprimir batch.
- Escuchar `.credentials.batch.progress`.
- Fallback siempre con polling a `GET /batches/{id}` por si:
- `BROADCAST_DRIVER` está en `null`
- falla auth de canal
- conexión websocket intermitente

## Flujo recomendado frontend (generación)

1. Cargar catálogos: `GET /generator/catalogs`.
2. Crear lote: `POST /batches`.
3. Abrir canal privado del batch para progreso.
4. Polling fallback de `GET /batches/{id}`.
5. Al finalizar, habilitar descargas:
6. `GET /batches/{id}/artifact?variant=pdf`
7. `GET /batches/{id}/artifact?variant=png`
8. `GET /batches/{id}/artifact?variant=digital`

## Notas de implementación frontend

- En respuestas de recursos, no asumir wrapping `{ data: ... }`.
- `GET /history/{id}` sí regresa `{ data: ... }`; `GET /batches/{id}` no.
- Para logo upload usar `multipart/form-data` y header `Accept: application/json`.
- Para `variant` se puede enviar en cualquier casing (`PNG`, `Pdf`), backend normaliza.
- Siempre respetar campos `locked_by_plan`, `upgrade_cta`, `watermark_locked_by_plan`.
