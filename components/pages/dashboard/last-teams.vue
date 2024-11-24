<script lang="ts" setup>
import { useTeamStore } from "~/store";
import getHeaders from "~/utils/headers-table";
import CustomTable from "~/components/shared/Table.vue";

const headers = getHeaders("teams");
await useTeamStore().getTeams();
const { teams, search, pagination } = storeToRefs(useTeamStore());
</script>
<template>
  <CustomTable
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
  ></CustomTable>
</template>
