# Futzo

Futzo es la plataforma para operar ligas y torneos de futbol de forma simple, ordenada y profesional.

## Que es

Una solucion integral para organizadores de ligas: desde el registro de equipos y jugadores hasta la calendarizacion, el seguimiento de resultados y la comunicacion con los participantes.

## Para quien

- Ligas amateur y organizadores de torneos locales.
- Academias, escuelas y comunidades deportivas.
- Clubes y coordinadores que buscan operar con procesos claros.

## Que resolvemos

- El caos operativo de hojas de calculo, chats dispersos y procesos manuales.
- La falta de visibilidad sobre partidos, horarios y resultados.
- La necesidad de profesionalizar la experiencia para equipos y jugadores.

## Como lo hacemos

- Automatizamos la calendarización y evitamos conflictos de horarios.
- Centralizamos equipos, jugadores, resultados y estadísticas.
- Facilitamos inscripciones, comunicación y soporte.
- Habilitamos modelos de cobro por suscripcion para ligas.

## Características clave

- Gestion de ligas, torneos y fases.
- Calendarización automática y reprogramaciones.
- Registro y administración de equipos y jugadores.
- Estadísticas y tablas de posiciones.
- Verificación de jugadores y control de transferencias.
- QR para registro y consulta de resultados.
- Pagos y suscripciones integradas.
- Soporte a usuarios con sistema de tickets.

## Contacto

Agenda una demo o solicita informacion en `hola@futzo.io`.
## Tecnologías

- Nuxt 4 (SSR) y Vue 3
- Vuetify 3 (UI)
- Pinia + pinia-plugin-persistedstate
- Autenticación con `nuxt-auth-sanctum`
- i18n (`@nuxtjs/i18n`)
- Google Maps (`vue3-google-map`)
- Formularios y validación: `@vee-validate/nuxt`, `yup`
- Utilidades: `@vueuse/nuxt`, `@nuxt/image`, `@nuxt/icon`, `nuxt-svgo`, `vue-sonner`

## Requisitos

- Node.js 18+
- Yarn 1.x o npm
- Opcional: PM2 (para producción), Docker

## Configuración inicial

1) Instalar dependencias

```bash
yarn install
# o
npm install
```

2) Variables de entorno

Copia `.env.example` a `.env` y completa los valores necesarios:

```env
NUXT_PUBLIC_URL_BACKEND=           # URL del backend (Laravel)
NUXT_PUBLIC_BACKEND_PREFIX=api/v1  # Prefijo API del backend
NUXT_PUBLIC_APP_NAME=Futzo         # Nombre de la app (meta)
NUXT_GOOGLE_MAPS_API_KEY=          # API key de Google Maps
NUXT_GOOGLE_MAP_ID=                # Map ID (opcional)
NUXT_HOST=0.0.0.0                  # Host de arranque
```

Para compilaciones de producción, usa `.env.prod` (ver sección de build).

## Desarrollo

Levanta el servidor en `http://localhost:3000`:

```bash
yarn dev
# o
npm run dev
```

## Scripts disponibles

- `dev`: inicia el entorno de desarrollo
- `build`: compila la app para producción usando `.env.prod`
- `build:test`: compila usando `.env`
- `preview`: previsualiza la build localmente
- `generate`: genera salida estática (si aplica)
- `test`: corre Vitest (unit + nuxt UI)
- `test:nuxt`: corre sólo los tests de UI con @nuxt/test-utils (mocks)
- `test:e2e`: corre E2E headless (peticiones reales) con RUN_E2E=1
- `pw:install`: instala navegadores de Playwright
- `test:pw`: corre E2E de navegador (Playwright) contra backend real
- `test:pw:headed`: igual que arriba pero con navegador visible

## Build y producción (SSR)

1) Compilar

```bash
# usa .env.prod automáticamente
yarn build
# o
npm run build
```

2) Previsualizar la build

```bash
yarn preview
# o
npm run preview
```

3) Ejecutar en producción

- Sin PM2:

```bash
node .output/server/index.mjs
```

- Con PM2 (recomendado):

```bash
pm2 start ecosystem.config.cjs
pm2 status
```

El archivo `ecosystem.config.cjs` lanza `.output/server/index.mjs` en el puerto `3000`.

## Despliegue con script

El script `deploy.sh` realiza el build, copia `ecosystem.config.cjs` a `.output/` y hace push forzado del contenido de `.output/` al branch `web` del repositorio. Requiere `GITHUB_TOKEN` configurado y un archivo `.env.prod` válido.

```bash
export GITHUB_TOKEN=xxxx
./deploy.sh
```

Nota: Este flujo asume una infraestructura que consuma el branch `web`. Ajusta según tu proveedor.

## Docker (desarrollo)

El `Dockerfile` actual ejecuta el modo desarrollo:

```bash
docker build -t futzo .
docker run --env-file .env -p 3000:3000 futzo
```

Para producción, considera una build multi-stage que ejecute `.output/server/index.mjs`.

## Notas y consejos

- Google Fonts: la integración `@nuxtjs/google-fonts` necesita red durante el build. En ambientes sin acceso, desactiva el módulo o provee las fuentes localmente.
- Íconos personalizados: ver `app/assets/icons` y la configuración de `@nuxt/icon` en `nuxt.config.ts`.

## Tests

### Unit/NUXT (Vitest)

- Mocks de endpoints con `registerEndpoint` para validar wiring UI→API sin salir al backend.
- Config: `vitest.config.ts` (proyecto `nuxt`).

### E2E headless (peticiones reales)

- Proyecto `nuxt-e2e` apunta al backend definido por `NUXT_PUBLIC_URL_BACKEND`.
- Ejecutar:

```bash
RUN_E2E=1 NUXT_PUBLIC_URL_BACKEND=http://app.futzo.test yarn test:e2e
```

### E2E navegador (Playwright)

1) Configurar `.env` (ver `.env.example`):

```env
NUXT_PUBLIC_URL_BACKEND=http://app.futzo.test
NUXT_PUBLIC_BACKEND_PREFIX=api/v1
PW_E2E_EMAIL=tu-usuario@example.com
PW_E2E_PASSWORD=tu-password
# Opcional si usas host local custom
# PW_BASE_URL=http://futzo.test:3000
```

2) Instalar navegadores de Playwright:

```bash
yarn pw:install
```

3) Correr tests:

```bash
yarn test:pw           # headless
yarn test:pw:headed   # con navegador visible
```

Requisitos para entorno local:
- El dominio `app.futzo.test` debe resolver a tu backend local (edita `/etc/hosts` si aplica).
- Backend con Sanctum/CORS configurado para permitir origen del front (`127.0.0.1:3000` o `futzo.test:3000`).

## Estructura breve

- `app/` Componentes, layouts y assets de la app
- `server/` (si aplica) endpoints y middleware
- `public/` assets públicos
- `.output/` resultado de la build (se genera tras compilar)

## Contribución

1) Crea una rama desde `main`
2) Haz cambios y valida localmente
3) Abre un Pull Request con contexto y capturas si aplica

## Licencia

UNLICENSED
