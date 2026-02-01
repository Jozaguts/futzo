# Registro y bienestar

Este documento concentra el flujo que une el registro del usuario, la verificación de la liga y la pantalla `bienvenido`, de modo que cualquier skill que se instale pueda tener claro el impacto y los puntos de integración.

## 1. ¿Qué pasa al registrarse?
1. El usuario completa el formulario inicial (correo o teléfono). El backend de autenticación (Sanctum) devuelve la sesión.
2. Al navegar por primera vez, los _middlewares_ globales de la carpeta `app/middleware/` se ejecutan en serie. Cuando el usuario **no tiene liga** y está autenticado, `02-user-has-league.global.ts` lo desvía a `/bienvenido`.
3. Si el rol es `super administrador`, la validación salta y puede seguir navegando.
4. Los _middlewares_ posteriores (por ejemplo `03-onboarding.global.ts`) saltan la lógica de liga si `has_league` es falso; por eso, el único espacio con foco en la creación es la ruta de bienvenida.

## 2. La página `/bienvenido`
- Ubicada en `app/pages/bienvenido.vue`, usa un layout en blanco (`layout: 'blank'`) y el middleware `post-checkout-login` para trasladar `status` o `token` de la ruta.
- Renderiza dos componentes: `CreateLeague` (formulario) y `CreatedLeague` (mensaje de éxito).
- El componente `CreateLeague`:
  - Está en `app/components/pages/bienvenido/cards/create-league.vue`.
  - Valida en `onMounted` si `user.has_league` para evitar repeticiones y redirige a `index` si ya existe.
  - Muestra skeletons hasta tener estado hidratado.
  - Al enviar el formulario, dispara `initLeague`, que realiza un `POST /api/v1/admin/leagues` con `useSanctumClient`.
  - Al fallar, muestra un toast con mensaje del error backend.
- Cuando la respuesta es exitosa, el `eventHandler` cambia a `CreatedLeague`, solicita `refreshIdentity()` y, si el usuario sigue autenticado, navega a `dashboard`.

## 3. Middleware principales involucrados
| Middleware | Ubicación | Qué valida / redirige |
|------------|-----------|------------------------|
| `02-user-has-league.global.ts` | `app/middleware/02-user-has-league.global.ts` | Si el usuario autenticado no tiene liga y la ruta no es `/bienvenido`, redirige ahí (salta rol `super administrador`). |
| `03-onboarding.global.ts` | `app/middleware/03-onboarding.global.ts` | Si hay liga y no está todo listo, carga el onboarding en caché y evita rutas bloqueadas; no entra si `has_league` es falso. |
| `post-checkout-login` | `app/middleware/post-checkout-login.ts` | Asegura capturar parámetros `token` o `status` cuando se viene de pago y redirige a `/bienvenido` si corresponde.

## 4. ¿Dónde se queda la lógica backend?
- El backend controla la creación real de la liga (`POST /api/v1/admin/leagues`) y actualiza `user.has_league`.
- La vista de bienvenida solo coordina la experiencia (formularios, toasts, navegación).
- Para comprobar el estado actualizado del usuario, siempre se apela a `refreshIdentity()` después de crear la liga.

## 5. ¿Cómo usar este contexto para skills?
1. Cada skill nueva relacionada con onboarding o ligas debe referirse a este documento antes de modificar `app/middleware/*` o `app/pages/bienvenido.vue`.
2. Si una skill instala nuevos _middlewares_, debe actualizar la tabla anterior con la descripción y dejar un comentario breve apuntando al archivo.
3. Cuando se añadan componentes o vistas nuevas dentro de `/bienvenido`, documenta el propósito en esta guía y describe qué paso del flujo cubre.
4. Para validar cambios de skills que toquen la experiencia de bienvenida, ejecuta `yarn test:nuxt` o los tests específicos que manejen validaciones del `middleware`.

## 6. Referencias rápidas
- Router principal: `app/router.ts` (si existe) / la configuración en `nuxt.config.ts` para `pages` y middleware globales.
- Asociaciones de usuarios (modelos): revisa `app/models/User.ts` para saber qué atributos se consultan (`has_league`, `is_operational`, `roles`).
- Toasts y helpers: `useSanctumClient`, `useSanctumAuth`, `useOnboardingStore`, `useToast` están en `app/composables` y se comportan igual para el resto del sitio.

Mantén este archivo actualizado cada vez que cambie el onboarding para que cualquier skill nuevo empiece con la misma visión del flujo. ¡Listo para documentar la siguiente parte de la experiencia cuando quieras!
