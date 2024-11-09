<script lang="ts" setup>
import getHeaders from "~/utils/headers-table";
import { usePlayerStore } from "~/store";
import type { PlayerResponse } from "~/models/Player";
import CustomTable from "~/components/shared/Table.vue";

const {
  players,
  playerId,
  isEdition,
  pagination,
  dialog,
  playerStoreRequest,
  search,
} = storeToRefs(usePlayerStore());
const headers = getHeaders("players");
const showPlayerHandler = (_player: PlayerResponse) => {
  const { president, coach, ...player } = _player;
  playerId.value = _player.id;
  isEdition.value = true;
  playerStoreRequest.value = {
    basic: {},
    details: {},
    contact: {},
  };
  dialog.value = true;
};
const paginationHandler = (page: number) => {
  pagination.value.to = page;
  usePlayerStore().getPlayers();
};
</script>
<template>
  <CustomTable
    v-if="players?.length"
    :headers="headers"
    :show-index="false"
    :items="players"
    itemKey="name"
    :search.sync="search"
    :pagination.sync="pagination"
    @update:pagination="paginationHandler"
    :custom-name="false"
  >
    <template #actions="{ item }">
      <v-btn size="small" rounded="md" @click="showPlayerHandler(item)"
        >Ver Equipo
      </v-btn>
    </template>
  </CustomTable>
</template>
