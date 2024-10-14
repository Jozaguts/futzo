<script setup lang="ts">
import { useTournamentStore } from "~/store";
import { onMounted } from "#imports";
import PageLayout from "~/components/shared/page-layout/index.vue";
import AppBar from "~/components/layout/app-bar.vue";
import TournamentAppBarButtons from "~/components/pages/torneos/tournament-app-bar-buttons.vue";
import TournamentTable from "~/components/pages/torneos/tournament-table.vue";
import NoTournaments from "~/components/pages/torneos/no-tournament.vue";
import TournamentDialog from "~/components/pages/torneos/dialog/index.vue";

onMounted(() => {
  useTournamentStore().loadTournaments();
});
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <TournamentAppBarButtons />
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoTournaments />
      <TournamentTable />
      <TournamentDialog />
    </template>
  </PageLayout>
</template>
