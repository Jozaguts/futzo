<script lang="ts" setup>
import { useTeamStore } from "~/store";
import getHeaders from "~/utils/headers-table";

const headers = getHeaders("teams");
await useTeamStore().getTeams();
const { teams, search, pagination } = storeToRefs(useTeamStore());
</script>
<template>
  <Table
    v-if="teams?.length"
    :headers="headers"
    :show-index="true"
    :items="teams"
    itemKey="name"
    :search.sync="search"
    v-model:pagination="pagination"
    :paginate="useTeamStore().getTeams"
    :custom-name="true"
    :show-footer="false"
  ></Table>
</template>
