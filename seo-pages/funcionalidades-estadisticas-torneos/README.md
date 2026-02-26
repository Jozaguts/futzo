# Página SEO — Funcionalidad: Estadísticas y tabla de posiciones

## URL objetivo
`/funcionalidades/estadisticas-torneos`

## Objetivo
Capturar búsquedas como:
- tabla de posiciones fútbol
- estadísticas de torneos de fútbol
- goleadores y asistencias de liga amateur

## Archivos del folder
- `page-copy.md` → copy completo listo para implementar
- `seo-meta.json` → title, description, keyword principal/secundarias
- `schema-webpage-snippet.json` → snippet schema recomendado
- `image-prompts.md` → prompts para generar imágenes
- `implementation-checklist.md` → checklist técnico/SEO

## Notas de producto (confirmadas)
- Estadísticas de equipo: PJ, G, E, P, GF, GC, DG, PTS + tendencia por periodo (24h/semana/mes/año) y serie histórica.
- Estadísticas de jugador: PJ, torneos jugados, goles, asistencias, faltas, amarillas, rojas, autogoles.
- Minutos jugados y porterías en cero aparecen pero hoy están en 0.
- Rankings Top 5: goleadores, asistidores, más amarillas, más rojas.
- Captura de eventos/resultado: reflejo casi inmediato.
- Standings: recálculo en background (normalmente segundos).
- Desempates: puntos, DG, GF, GC, resultado entre equipos, sorteo (este último sin resolución automática robusta visible).
- Exportación admin: imagen + Excel (tabla y stats), jornada/calendario exportable.
- Compartir público: vista pública con standings, últimos resultados, próximos partidos y stats + QR.