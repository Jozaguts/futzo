# Página SEO — Funcionalidad: Verificación de jugadores

## URL objetivo
`/funcionalidades/verificacion-jugadores`

## Objetivo
Capturar búsquedas como:
- verificación de jugadores liga fútbol
- evitar cachirules en torneo
- control de transferencias de jugadores

## Archivos del folder
- `page-copy.md` → copy completo listo para implementar
- `seo-meta.json` → title, description, keyword principal/secundarias
- `schema-webpage-snippet.json` → snippet schema recomendado
- `image-prompts.md` → prompts para generar imágenes
- `implementation-checklist.md` → checklist técnico/SEO

## Notas de producto (confirmadas)
- Bloqueos prácticos actuales:
  - ya pertenece al mismo equipo destino,
  - equipo destino sin cupo,
  - bloqueo de transferencia activo y sin liberación,
  - validación de identidad pendiente (si torneo la exige),
  - incumplimiento de reglas de torneo (edad/cupo según regla).
- Sí existe liberación manual de jugador por admin.
- Sí existe ventana configurable de transferencias por días (7/15/30, etc.).
- Si transferencia=0 días, prácticamente no hay bloqueo por tiempo.
- En rechazo de validación: se guarda motivo, fecha, revisor, estado y documentos.
- Transparencia: no prometer regla absoluta tipo "si ya jugó nunca puede cambiar".