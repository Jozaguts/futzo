<script lang="ts" setup>
import {useTeamStore} from "~/store/useTeamStore";
import AppBar from "~/components/layout/AppBar.vue";
import AppBarButtons from "~/components/pages/equipos/team-navbar-buttons.vue";
import NoTeams from "~/components/pages/equipos/NoTeams.vue";
import CreateTeamDialog from "~/components/pages/equipos/CreateTeamDialog/index.vue";
import TeamsTable from "~/components/pages/equipos/teams-table.vue";
import ImportDialog from "~/components/pages/equipos/import-dialog/index.vue";

const teamStore = useTeamStore();
onMounted(() => {
  teamStore.getTeams();
});
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar>
        <template #buttons>
          <AppBarButtons/>
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoTeams/>
      <TeamsTable/>
      <CreateTeamDialog/>
      <ImportDialog/>
    </template>
  </PageLayout>
</template>
