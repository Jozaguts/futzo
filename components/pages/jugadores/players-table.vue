<script lang="ts" setup>
import getHeaders from "~/utils/headers-table";
import { usePlayerStore } from "~/store";
import type { PlayerResponse } from "~/models/Player";

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
const showPlayerHandler = (player: PlayerResponse) => {
  console.log({ player: player });
};
</script>
<template>
  <Table
    v-if="players?.length"
    :headers="headers"
    :show-index="false"
    :items="players"
    itemKey="name"
    :search.sync="search"
    v-model:pagination="pagination"
    :paginate="usePlayerStore().getPlayers"
    :custom-name="false"
  >
    <template #actions="{ item }">
      <v-btn
        size="small"
        rounded="md"
        disabled
        @click="showPlayerHandler(item as unknown as PlayerResponse)"
        >Ver Jugador
      </v-btn>
    </template>
  </Table>
</template>
