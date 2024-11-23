<script lang="ts" setup>
import PageLayout from "~/components/shared/page-layout/index.vue";
import AppBar from "~/components/layout/app-bar.vue";
import PlayersNavbarButtons from "~/components/pages/jugadores/players-navbar-buttons.vue";
import { usePlayerStore } from "~/store";
import NoPlayers from "~/components/pages/jugadores/no-players.vue";
import PlayersDialog from "~/components/pages/jugadores/dialog/index.vue";
import PlayersTable from "~/components/pages/jugadores/players-table.vue";
import ImportDialog from "@/components/pages/jugadores/import-dialog/index.vue";

onMounted(() => {
  usePlayerStore().getPlayers();
});
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <PlayersNavbarButtons />
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoPlayers />
      <PlayersTable />
      <PlayersDialog />
      <ImportDialog />
    </template>
  </PageLayout>
</template>
