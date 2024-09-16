<script setup lang="ts">
import { useTournamentStore } from "~/store";
import { onMounted } from "#imports";
import PageLayout from "~/components/shared/page-layout/index.vue";
import AppBar from "~/components/layout/app-bar.vue";
import TournamentAppBarButtons from "~/components/pages/torneos/tournament-app-bar-buttons.vue";
import CreateTournamentDialog from "~/components/pages/torneos/Dialog.vue";
import TournamentTable from "~/components/pages/torneos/tournament-table.vue";
import NoTournaments from "~/components/pages/torneos/no-tournament.vue";

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
      <CreateTournamentDialog />
    </template>
  </PageLayout>
</template>
