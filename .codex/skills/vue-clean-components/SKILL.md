---
name: vue-clean-components
description: Refactor y creación de componentes Vue limpios en Nuxt/Vue 3.5. Enfocado en reducir tamaño de archivos, separar responsabilidades, mover estado derivado a computed y evitar side effects ocultos. Usar siempre al crear o modificar archivos .vue.
---

# Vue Clean Components (Nuxt 4 + Vue 3.5)

## Objetivo
Escribir componentes `.vue` pequeños, legibles y testables, con responsabilidades claras:
- Container: orquesta datos y efectos.
- Presentational: renderiza UI.
- Composables: encapsulan lógica reusable.

## Uso obligatorio
- Aplica este skill en toda tarea que cree o modifique archivos `.vue`.
- No mezclar en un solo SFC lógica de dominio, layout complejo y UI de detalle si supera umbral de tamaño.

## Compatibilidad (actual)
- `vue@3.5.x`: compatible.
- `nuxt@4.x`: compatible.
- `script setup` + TypeScript: estándar.
- `defineModel`: recomendado en componentes de formulario/dialog simples.

## Reglas estrictas
1. Estado derivado en `computed`.
- Si un valor se deriva de props/state, no dupliques en `ref` + `watch`.

2. No mutar props.
- Copia antes de `sort/reverse/splice`.
- Arrays: `const copy = [...props.items]`.
- Objetos: copia superficial o `structuredClone` según necesidad.

3. Evitar `v-if` y `v-for` en el mismo nodo.
- Filtra con `computed` y luego itera.

4. Separar funciones puras de side effects.
- Puras: transforman datos y retornan.
- Side effects: mutan estado, emiten eventos, llaman API.

5. Evitar handlers inline complejos en template.
- Mover lógica a funciones nombradas.

6. Repetición 3+ bloques.
- Convertir a config array + `v-for`.

## Presupuesto de tamaño (budgets)
- Página `.vue`: ideal <= 300 líneas.
- Componente de dominio: ideal <= 220 líneas.
- Componente presentacional: ideal <= 150 líneas.
- Si excede presupuesto:
  - extraer subcomponentes de UI,
  - mover lógica de negocio a composable,
  - mover transformaciones pesadas a util/composable.

## defineModel en Vue 3.5 (cuándo usar)
Usar `defineModel` cuando:
- el componente tiene un modelo claro (`open`, `value`, `search`, etc.),
- no necesitas modo híbrido controlado/no-controlado.

Mantener `props + emit + computed get/set` cuando:
- soporte dual (externo/interno),
- sincronización condicional compleja,
- múltiples fuentes de verdad por compatibilidad.

Ejemplo simple recomendado:
```ts
<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
</script>
```

## Procedimiento de refactor
1. Detectar.
- Estado derivado duplicado.
- Watchers que solo recalculan datos.
- Template largo con condicionales/loops anidados.
- Repetición de bloques UI.

2. Reestructurar.
- Extraer `useXxxViewModel` para lógica de vista.
- Extraer subcomponentes para bloques repetidos.
- Reducir template del container.

3. Validar.
- Mantener comportamiento.
- Actualizar/crear tests Nuxt del componente tocado.

## Checklist de salida (obligatorio)
- [ ] No hay estado derivado duplicado en `ref` + `watch`.
- [ ] No hay mutación de props.
- [ ] Template sin `v-if` + `v-for` en el mismo nodo.
- [ ] Funciones puras separadas de side effects.
- [ ] Componente dentro de presupuesto de tamaño o con justificación.
- [ ] Tests del componente creados/actualizados.

## Anti‑patrones
- Un `.vue` gigante con API calls + transformación + render completo + estilos extensos.
- Watchers usados como sustituto de `computed`.
- `sort()`/`reverse()` directo sobre arrays de props.
- Emit/click handlers con expresiones largas inline.
