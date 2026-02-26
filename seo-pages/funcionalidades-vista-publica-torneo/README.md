# Página SEO — Funcionalidad: Vista pública del torneo

## URL objetivo
`/funcionalidades/vista-publica-torneo`

## Objetivo
Capturar búsquedas como:
- página pública de torneo de fútbol
- compartir resultados de liga por link
- tabla de posiciones en línea

## Archivos del folder
- `page-copy.md` → copy completo listo para implementar
- `seo-meta.json` → title, description, keyword principal/secundarias
- `schema-webpage-snippet.json` → snippet schema recomendado
- `image-prompts.md` → prompts para generar imágenes
- `implementation-checklist.md` → checklist técnico/SEO

## Notas de producto (confirmadas)
- Vista pública muestra estado del torneo con: resumen, tabla, últimos resultados, próximos partidos, estadísticas destacadas y calendario/jornadas.
- Consulta pública por link o QR sin login.
- Login solo para administración interna.
- En público no se muestran datos sensibles (contacto/documentos personales).
- Actualización casi en tiempo real (segundos; posiciones puede tardar un poco más por recálculo).
- Compartible por QR y URL directa.
- Página pública principal es por torneo (no ficha pública individual por partido).