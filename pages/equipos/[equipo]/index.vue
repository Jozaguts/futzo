<script lang="ts" setup>
import PositionsTable from "~/components/pages/equipos/positions-table.vue";
import LiveGames from "~/components/pages/equipos/live-games.vue";
import NextGamesToday from "~/components/pages/equipos/next-games-today.vue";
import NextGames from "~/components/pages/equipos/next-games.vue";
import PageLayout from "~/components/shared/PageLayout.vue";
import AppBar from "~/components/layout/AppBar.vue";
import AppBarBtn from "~/components/pages/equipos/equipo/app-bar-btn.vue";
import CreateTeamDialog from "~/components/pages/equipos/CreateTeamDialog/index.vue";
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <AppBarBtn/>
        </template>
      </AppBar>
    </template>
    <template #default>
      <div class="tournament-details-container">
        <div class="table-container">
          <PositionsTable/>
        </div>
        <div class="games-container">
          <div class="live-games">
            <LiveGames/>
          </div>
          <div class="next-games-today">
            <NextGamesToday/>
          </div>
        </div>
        <div class="next-games">
          <NextGames/>
        </div>
        <CreateTeamDialog/>
      </div>
    </template>
  </PageLayout>
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
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xl, 16px);
}

.next-games-today {
  display: flex;
  width: 100%;
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
