# Página SEO — Funcionalidad: Registro de equipos y jugadores por QR

## URL objetivo
`/funcionalidades/registro-equipos-qr`

## Objetivo
Capturar búsquedas como:
- registro de equipos por QR
- registro de jugadores en línea para torneo
- inscripciones de liga de fútbol online

## Archivos del folder
- `page-copy.md` → copy completo listo para implementar
- `seo-meta.json` → title, description, keyword principal/secundarias
- `schema-webpage-snippet.json` → snippet schema recomendado
- `image-prompts.md` → prompts para generar imágenes
- `implementation-checklist.md` → checklist técnico/SEO

## Notas de producto (confirmadas)
- Registro en 2 pasos (no un solo QR):
  1) QR del torneo → registra equipo
  2) QR del equipo → registra jugadores
- Equipo: obligatorios = nombre del equipo, categoría, torneo
- Jugador: obligatorios = nombre, fecha de nacimiento
- Si hay validación de identidad activa: tipo de identificación + documento
- Equipo: normalmente queda inscrito sin aprobación previa
- Jugador: puede requerir aprobación manual (si validación activa)
- Cierre: por cupos o al entrar a eliminatoria
- No prometer cierre automático por fecha exacta (hoy no es regla principal)