# Calendario automático para liga de fútbol sin Excel

Armar jornadas a mano en Excel funciona… hasta que cambias una cancha, un horario o se mueve un partido. Ahí empieza el caos.

Con Futzo puedes **generar el calendario automáticamente**, validando disponibilidad de canchas y evitando choques básicos de programación desde el inicio.

**CTA principal:** Prueba Futzo gratis

---

## ¿Qué resuelve el calendario automático de Futzo?

- Te evita construir jornadas manualmente una por una.
- Reduce errores de operación (solapes, inconsistencias de jornada).
- Te deja ajustar sin tirar todo el trabajo previo.
- Se conecta directo con tabla de posiciones, fases y llaves.

---

## Formatos que sí puedes operar hoy

### 1) Liga (round robin)
- Solo ida
- Ida y vuelta

### 2) Liga + eliminatoria
- Fase regular + etapa final en el mismo flujo

### 3) Grupos + eliminatoria
- Clasificación por grupo
- Soporte para mejores terceros (cuando aplica)

> Nota de transparencia: el formato suizo no está habilitado actualmente.

---

## Cómo funciona en la práctica

### Generación automática
Al generar calendario, Futzo toma la disponibilidad de canchas por día/hora y evita que un equipo juegue dos veces en la misma jornada.

### Reprogramación individual
Si se te cae un horario, puedes mover **un solo partido** sin rehacer todo el torneo.

### Regeneración parcial
Puedes fijar una jornada y regenerar desde ese punto, manteniendo lo que ya se jugó.

### Validaciones automáticas
Antes de guardar cambios, Futzo valida solapes reales:
- que el horario quepa en la ventana,
- que no choque con otro partido en el mismo campo/fecha,
- que la programación siga consistente.

---

## ¿Qué lo hace diferente a Excel?

### No pierdes avance por un cambio
En Excel, un ajuste tarde o temprano rompe la hoja. En Futzo puedes hacer ajustes parciales sin destruir lo que ya estaba correcto.

### Menos doble captura
El calendario no vive aislado: se integra con standings, fases y llaves.

### Trazabilidad operativa
Puedes auditar regeneraciones y operar también vía API/exportes.

---

## Casos donde más se nota la diferencia

- Ligas semanales con cambios frecuentes de cancha/horario
- Torneos con fase de grupos + final
- Organizaciones que manejan más de un torneo al mismo tiempo

---

## Preguntas frecuentes

### ¿Puedo mover un partido ya programado sin rehacer todo?
Sí. Puedes reprogramar partidos de forma individual.

### ¿Qué pasa si hay choque de horario en cancha?
Futzo valida el conflicto antes de confirmar el cambio.

### ¿Sirve para torneos con grupos y eliminatoria?
Sí, ese flujo está soportado.

### ¿Soporta formato suizo?
No actualmente.

---

## CTA final

Tu calendario no tiene por qué depender de una hoja frágil.

**Prueba Futzo gratis y arma tu próxima jornada en minutos.**