<script setup lang="ts">
import {useTeamStore} from "~/store";
import type {TeamResponse} from "~/models/Team";
import getHeaders from "~/utils/headers-table";

const {
  teams,
  pagination,
  search,
} = storeToRefs(useTeamStore());

const headers = getHeaders("teams");
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
      :show-link="true"
  >
    <template #actions="{ item }">
      <v-btn
          size="small"
          rounded="md"
          variant="outlined"
          class="table-action-btn"
          :to="`/equipos/${item.slug}`"
      >Ver Equipo
      </v-btn>
    </template>
  </Table>
</template>
