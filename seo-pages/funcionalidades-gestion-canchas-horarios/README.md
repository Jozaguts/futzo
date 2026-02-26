# Página SEO — Funcionalidad: Gestión de canchas y horarios

## URL objetivo
`/funcionalidades/gestion-canchas-horarios`

## Objetivo
Capturar búsquedas como:
- gestión de canchas deportivas
- calendario de canchas de fútbol
- asignación de partidos por cancha y horario

## Archivos del folder
- `page-copy.md` → copy completo listo para implementar
- `seo-meta.json` → title, description, keyword principal/secundarias
- `schema-webpage-snippet.json` → snippet schema recomendado
- `image-prompts.md` → prompts para generar imágenes
- `implementation-checklist.md` → checklist técnico/SEO

## Notas de producto (confirmadas)
- Configurable por cancha: nombre, sede/ubicación, tipo (fútbol 5/7/11), dimensiones, días y franjas horarias.
- No nativo hoy: capacidad/aforo y costo por cancha.
- Evita doble asignación de cancha/horario al programar y reprogramar.
- Bloqueo puntual por fecha exacta: no es flujo estándar (el bloqueo es más recurrente por día+franja).
- Sí se pueden definir horarios distintos por día.
- Sí existe vista de disponibilidad por cancha para operar programación/reprogramación.
- No prometer agenda mensual dedicada como módulo separado.
- Sí se puede mover un partido a otra cancha y horario sin rehacer todo.