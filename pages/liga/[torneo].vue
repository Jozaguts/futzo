<script lang="ts" setup>

import PositionsTable from "~/components/pages/equipos/positions-table.vue";
import liveGames from "~/components/pages/equipos/live-games.vue";
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
      </v-col>
    </v-row>
  </v-container>

  </div>
</template>
<style lang="scss">
@mixin generate-grid($columns, $rows) {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  grid-template-rows: repeat($rows, 1fr);
  grid-auto-columns: 1fr;
  row-gap: 1em;
  column-gap: 2rem;
  grid-auto-flow: row;
  height: 100%;
  padding: 2rem
}

@mixin grid-area($name) {
  grid-area: $name;
}
.container {
  @include generate-grid(12, 12);
  grid-template-areas:
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container live-games live-games live-games"
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container live-games live-games live-games"
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container live-games live-games live-games"
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container live-games live-games live-games"
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container live-games live-games live-games"
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container next-games-today next-games-today next-games-today"
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container next-games-today next-games-today next-games-today"
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container next-games-today next-games-today next-games-today"
    "table-container table-container table-container table-container table-container table-container table-container table-container table-container next-games-today next-games-today next-games-today"
    "next-games next-games next-games next-games next-games next-games next-games next-games next-games next-games-today next-games-today next-games-today"
    "next-games next-games next-games next-games next-games next-games next-games next-games next-games . . ."
    "next-games next-games next-games next-games next-games next-games next-games next-games next-games . . .";
}

.live-games {
  @include grid-area(live-games);
}

.next-games-today {
  @include grid-area(next-games-today);
  background: #0d1116;
}

.next-games {
  @include grid-area(next-games);
  background: #2a2a92;
}
.table-container {
  @include grid-area(table-container);
  padding: 1rem;
  border-radius: var(--radius-2xl, 16px);
  background: var(--Colors-Base-White, #FFF);
}
</style>

