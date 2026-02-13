# Team Metrics Contract (`/api/v1/admin/teams/:id/metrics`)

## Endpoint
- Method: `GET`
- URL: `/api/v1/admin/teams/:id/metrics`
- Query params:
  - `range`: `lastMonth`

## Response shape

```json
{
  "data": {
    "range": "lastMonth",
    "kpis": {
      "matchesPlayed": { "total": 8, "current": 12.5, "dailyData": [0, 1, 0], "label": "vs último mes" },
      "wins": { "total": 5, "current": 25, "dailyData": [0, 1, 0], "label": "vs último mes" },
      "draws": { "total": 2, "current": 0, "dailyData": [0, 0, 0], "label": "vs último mes" },
      "losses": { "total": 1, "current": -50, "dailyData": [0, 0, 0], "label": "vs último mes" },
      "goalsFor": { "total": 18, "current": 20, "dailyData": [1, 0, 2], "label": "vs último mes" },
      "goalsAgainst": { "total": 8, "current": -11.1, "dailyData": [0, 1, 0], "label": "vs último mes" },
      "goalDifference": { "total": 10, "current": 42.8, "dailyData": [1, 0, 2], "label": "vs último mes" },
      "points": { "total": 17, "current": 13.3, "dailyData": [0, 3, 0], "label": "vs último mes" }
    }
  }
}
```

## KPI semantics
- `total`: acumulado del rango seleccionado.
- `current`: variación respecto al periodo anterior equivalente (porcentaje con signo).
- `dailyData`: serie para sparkline del mismo rango.
- `label`: texto de tendencia a renderizar en card.

## Default values (required when no data)
- Every KPI object must always exist.
- Use:
  - `total: 0`
  - `current: 0`
  - `dailyData: []`
  - `label: "vs último mes"`

## Team list requirements (`GET /api/v1/admin/teams`)
- Keep these fields per row for `equipos/index` table:
  - `id`, `name`, `slug`, `short_name`, `players_count`, `register_link`
  - `matches_played`, `wins`, `draws`, `losses`, `points`, `goals_for`, `goals_against`, `goal_difference`
  - `tournament { id, name, status }`
  - `tournaments[]` (optional badges)
  - `home_preferences { location_id, location { id, name }, day_of_week, day_label, start_time }`
  - `colors.home.primary`

## Team players list with stats (`GET /api/v1/admin/teams/:id/available-players`)
- Recommended extension: `?include=stats`
- Row shape:
  - `player_id`, `team_id`, `name`, `number`, `position`
  - `stats { matches_played, goals, assists, yellow_cards, red_cards }` (optional)
