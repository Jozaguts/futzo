# Verificación de jugadores y transferencias sin cachirules

Cuando no hay control de jugadores, el torneo se te llena de dudas, reclamos y decisiones a mano.

Con Futzo puedes operar validación de identidad, bloqueos de transferencia y reglas de torneo desde un solo flujo.

**CTA principal:** Prueba Futzo gratis

---

## ¿Qué controla esta funcionalidad?

- Estado de validación del jugador
- Reglas para permitir o bloquear movimientos
- Cupos del equipo destino
- Evidencia de revisión (motivo, fecha, quién revisó)

---

## Reglas que hoy pueden bloquear un movimiento

En términos prácticos, el sistema puede bloquear si:

1. El jugador ya pertenece al equipo al que lo quieren mover.
2. El equipo destino ya no tiene cupo disponible.
3. Tiene bloqueo de transferencia activo y aún no vence.
4. El torneo exige validación de identidad y está pendiente.
5. No cumple reglas del torneo (por ejemplo edad/cupo según regla).

> Nota de transparencia: hoy no se aplica una regla absoluta de “si ya jugó con otro equipo en este torneo, nunca puede cambiar”. Ese control depende de bloqueo de transferencias y reglas operativas configuradas.

---

## Ventana de transferencias configurable

Puedes definir cuántos días dura el bloqueo de transferencias (ejemplo: 7, 15, 30).

- Si pones **0 días**, prácticamente no hay bloqueo por tiempo.
- Si defines un valor mayor, el sistema respeta esa ventana antes de permitir cambios.

---

## Liberación manual por admin

Si hay un caso excepcional, el administrador puede liberar manualmente al jugador para habilitar el cambio.

Esto te da control: ni bloqueo rígido sin salida, ni desorden total.

---

## Validación de identidad (cuando la liga la activa)

Si el torneo exige validación, el jugador debe cargar identificación. En revisión, el admin puede aprobar o rechazar.

Cuando rechaza, el sistema guarda:
- motivo de rechazo,
- fecha,
- quién hizo la revisión,
- estado actual,
- documentos cargados.

---

## ¿Por qué es mejor que resolverlo por chat?

- Decisiones consistentes, no “a criterio del momento”.
- Menos discusiones por falta de evidencia.
- Reglas visibles para todos.
- Trazabilidad mínima operativa para auditoría interna.

---

## Preguntas frecuentes

### ¿Puedo liberar un jugador manualmente?
Sí. El admin puede liberarlo para permitir el cambio.

### ¿Se puede configurar la ventana de transferencias?
Sí, por días. Si es 0, no hay bloqueo por tiempo.

### ¿Siempre se exige validación de identidad?
No. Solo cuando el torneo/liga la activa.

### ¿Qué información queda cuando rechazo una validación?
Motivo, fecha, revisor, estado y documentos.

---

## CTA final

Si quieres cortar reclamos y operar con reglas claras, esta funcionalidad te da control real.

**Empieza tu prueba gratis en Futzo.**