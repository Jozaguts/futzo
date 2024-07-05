<script lang="ts" setup>

import PositionsTable from "~/components/pages/equipos/positions-table";
import LiveGames from "~/components/pages/equipos/live-games";
import NextGamesToday from "~/components/pages/equipos/next-games-today";
import NextGames from "~/components/pages/equipos/next-games.vue";
</script>
<template>
  <div class="container">
    <div class="table-container ">
      <PositionsTable />
    </div>
    <div class="live-games">
      <LiveGames />
    </div>
    <div class="next-games-today">
      <NextGamesToday />
    </div>
    <div class="next-games">
      <NextGames />
    </div>
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
    "next-games next-games next-games next-games next-games next-games next-games next-games next-games next-games-today next-games-today next-games-today"
    "next-games next-games next-games next-games next-games next-games next-games next-games next-games next-games-today next-games-today next-games-today"
    "next-games next-games next-games next-games next-games next-games next-games next-games next-games . . ."
    "next-games next-games next-games next-games next-games next-games next-games next-games next-games . . .";
}
.live-games {
  @include grid-area(live-games);
  display: flex;
  width: 100%;
  padding: 0  1rem 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xl, 16px);
}
.next-games-today {
  @include grid-area(next-games-today);
  display: flex;
  width: 100%;
  padding: 0  1rem 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xl, 16px);
}
.table-container {
  @include grid-area(table-container);
  padding: 1rem;
  border-radius: var(--radius-2xl, 16px);
  background: var(--Colors-Base-White, #FFF);
}
.next-games {
  @include grid-area(next-games);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-md, 8px);
  align-self: stretch;
  width: 100%;
}
</style>

