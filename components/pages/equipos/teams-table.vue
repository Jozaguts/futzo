<script setup lang="ts">
import { useTeamStore } from "~/store";
import type { TeamResponse } from "~/models/Team";
import CustomTable from "~/components/shared/Table.vue";
import getHeaders from "~/utils/headers-table";

const {
  teams,
  teamId,
  isEdition,
  pagination,
  dialog,
  teamStoreRequest,
  search,
} = storeToRefs(useTeamStore());

const headers = getHeaders("teams");
const showTeamHandler = (_team: TeamResponse) => {
  const { president, coach, ...team } = _team;
  teamId.value = _team.id;
  isEdition.value = true;

  teamStoreRequest.value = {
    team: {
      id: team.id,
      name: team.name,
      tournament_id: team.tournament.id,
      category_id: team.category.id,
      address: team?.address,
      colors: team?.colors,
      description: team?.description,
      email: team?.email,
      image: team?.image,
      phone: team?.phone,
    },
    president: { ...president, image: president?.image },
    coach: { ...coach, image: coach?.image },
  };
  dialog.value = true;
};
const paginationHandler = (_pagination) => {
  pagination.value.to = _pagination.to + 1;
  useTeamStore().getTeams();
};
</script>
<template>
  <CustomTable
    v-if="teams?.length"
    :headers="headers"
    :show-index="true"
    :items="teams"
    itemKey="name"
    :search.sync="search"
    :pagination.sync="pagination"
    @update:pagination="paginationHandler"
    :custom-name="true"
  >
    <template #actions="{ item }">
      <v-btn size="small" rounded="md" @click="showTeamHandler(item)"
        >Ver Equipo
      </v-btn>
    </template>
  </CustomTable>
</template>
