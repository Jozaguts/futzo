<script lang="ts" setup>
import PageLayout from "~/components/shared/page-layout/index.vue";
import AppBar from "~/components/layout/app-bar.vue";
import PlayersNavbarButtons from "~/components/pages/jugadores/players-navbar-buttons.vue";
import NoPlayers from "~/components/pages/jugadores/no-players.vue";
import PlayersDialog from "~/components/pages/jugadores/dialog/index.vue";
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
      <!--      &lt;!&ndash;      <PlayersTable />&ndash;&gt;-->
      <PlayersDialog />
    </template>
  </PageLayout>
</template>
