---
name: nuxt-tour-guide
description: Guía para entender y controlar el tour guiado del dashboard usando `nuxt-tour`.
---

# Nuxt Tour Skill

## Cuándo usar
1. Cuando el flujo guiado del dashboard (o alguno nuevo) se modifique.
2. Si una skill necesita iniciar, reiniciar o recoger pasos de `VTour`.
3. Para documentar nuevas rutas/targets que el tour debe cubrir.

## Pasos de referencia
1. Revisa `docs/nuxt-tour.md` para ver cómo el store global mantiene los pasos y la instancia del tour.
2. Usa `registerTourRef`, `startTour`, `resetTour` y `recalculateTour` desde `app/stores/useGlobalStore.ts` para controlar cualquier tour nuevo.
3. Asegúrate de que el componente que monta `VTour` expone la instancia al store (como lo hace `app/components/tours/dashboard/index.vue`).
4. Si añades un botón o un atajo que reinicie el recorrido, reutiliza las funciones del store y no manipules directamente el DOM.

## Referencias
- `docs/nuxt-tour.md` (contexto, archivos involucrados, recomendaciones para agregar nuevos tours)
