<script lang="ts" setup>
import { definePageMeta } from "#imports";
import PositionsTable from "~/components/pages/equipos/positions-table";
import LiveGames from "~/components/pages/equipos/live-games";
import NextGamesToday from "~/components/pages/equipos/next-games-today";
import NextGames from "~/components/pages/equipos/next-games.vue";
import CreateTournamentDialog from "~/components/pages/torneos/Dialog.vue";
import { useTournamentStore } from "~/store";

definePageMeta({
  middleware: () => {
    if (!useTournamentStore().tournamentId) {
      useRouter().push({ name: "liga" });
    }
  },
});
</script>
<template>
  <div class="tournament-details-container">
    <div class="table-container">
      <PositionsTable />
    </div>
    <div class="games-container">
      <div class="live-games">
        <LiveGames />
      </div>
      <div class="next-games-today">
        <NextGamesToday />
      </div>
    </div>
    <div class="next-games">
      <NextGames />
    </div>
    <CreateTournamentDialog />
  </div>
</template>
<style lang="scss">
.tournament-details-container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: calc(80% - 20px) calc(20% + 20px);
  grid-template-rows: calc(70% - 20px) calc(30% + 20px);
  gap: 1em 1em;
  grid-template-areas:
    "table-container games-container"
    "next-games games-container";
  padding: 40px;
}
.table-container {
  grid-area: table-container;
  padding: 1rem;
  border-radius: var(--radius-2xl, 16px);
  background: var(--Colors-Base-White, #fff);
}
.games-container {
  grid-area: games-container;
}
.games-container > :first-child {
  margin-bottom: 2rem;
}

.live-games {
  display: flex;
  width: 100%;
  padding: 0 1rem 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xl, 16px);
}
.next-games-today {
  display: flex;
  width: 100%;
  padding: 0 1rem 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xl, 16px);
}

.next-games {
  grid-area: next-games;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-md, 8px);
  align-self: stretch;
  width: 100%;
}
</style>
