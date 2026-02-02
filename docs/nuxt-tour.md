# Guía de Nuxt Tour

El propósito de esta guía es dejar claro cómo se registran, almacenan y controlan los tours guiados con `nuxt-tour` en Futzo, de forma que cualquier skill o cambio futuro pueda extender la experiencia sin romper nada.

## 1. Estructura general
- El módulo se habilita importando `nuxt-tour` en `nuxt.config.ts` y usando el componente `VTour` (prefijo `V`).
- Los pasos del tour viven en el store global (`app/stores/useGlobalStore.ts`) para compartirlos entre la página principal, la lectura del tutorial desde la barra lateral y cualquier skill que quiera lanzar un tour.
- La página del `dashboard` monta `<LazyToursDashboard>` (el componente de `app/components/tours/dashboard/index.vue`) que internamente renderiza `VTour` y registra la instancia en el store para que otros consumidores puedan controlarla.

## 2. Store global de tours
- Cada tour es un objeto con `{ steps, show, ref }` y se define bajo claves enumeradas (`TourKey`). Actualmente sólo existe el tour `dashboard`.
- El store expone:
  - `getTourSteps('dashboard')` para recuperar los pasos y el estado.
  - `registerTourRef` para guardar la instancia del componente (`VTour`) cuando se monta y limpiarla al desmontarla.
  - `startTour`, `resetTour`, `recalculateTour` para controlar la navegación desde fuera del componente.

## 3. Componente `LazyToursDashboard`
- Se importan `VTour`, `TourStep` y el store.
- La referencia `tourRef` se sincroniza con el store mediante `registerTourRef` y se limpia con `onBeforeUnmount`.
- El componente simplemente renderiza `VTour` y aplica los botones personalizados (`Siguiente`, `Salir`). No se expone ningún `v-model`; el control viene desde la tienda global.

## 4. Cómo inicia el tour
- En `app/pages/dashboard.vue` se recuperan los pasos con `getTourSteps('dashboard')` y se pasa la configuración a `<LazyToursDashboard name="dashboard" :steps="..." />`.
- En la barra lateral (`navigation-drawer.vue`), el botón "Tutorial" invoca:
  1. `resetTour('dashboard')` para reiniciar el recorrido.
  2. `recalculateTour('dashboard')` para asegurarse de que los tooltips se posicionan bien.
  3. `startTour('dashboard')` para ponerlo en marcha.

## 5. Agregar nuevos tours o pasos
1. Añade una nueva clave `TourKey` y su objeto con pasos en `toursSteps` dentro del store. Incluye `show: false` y `ref: null`.
2. Crea un componente similar a `LazyToursDashboard` o reutiliza el que existe, entregándole `name="tu-tour"` y la lista de pasos.
3. Si necesitas exponer el tour a terceros, usa los helpers del store para registrar la instancia y lanzar `startTour` cuando quieras.
4. Si un skill modifica pasos o agrega targets, actualiza este documento y registra el tour en el archivo de referencia para que no se pierda el contexto.

## 6. Diagnóstico rápido
- Si el tour no aparece, confirma que `registerTourRef` se llamó (usa `console.log` en el componente o inspecciona `toursSteps.dashboard.ref`).
- Asegúrate de llamar a `startTour` después de `resetTour`; resetear sólo no lanza el recorrido.
- Para targets invisibles, usa `recalculateTour` después de mostrar los elementos y antes de `startTour`.

Mantén esta guía actualizada cada vez que el onboarding o la experiencia guiada cambien. Cualquier skill que toque tours debe referirse primero a este documento y luego actualizar la clave correspondiente en el store.
