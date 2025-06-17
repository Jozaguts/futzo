<script lang="ts" setup>
import getHeaders from "~/utils/headers-table";
import {usePlayerStore, useTeamStore} from "~/store";
import type {Player, PlayerResponse} from "~/models/Player";
import type {Team} from "~/models/Team";

const {
  players,
  playerId,
  isEdition,
  pagination,
  dialog,
  playerStoreRequest,
  search,
  showAssignTeam,
} = storeToRefs(usePlayerStore());
const headers = getHeaders("players");
const showPlayerHandler = (player: PlayerResponse) => {
  console.log({player: player});
};
const assignTeam = (item: Player) => {
  console.log(item.id)
  playerId.value = item.id as number;
  showAssignTeam.value = !showAssignTeam.value
}
const {teams} = storeToRefs(useTeamStore());
const areThereTeams = computed(() => teams.value.length > 0);
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
      :assign-team="assignTeam"
      :enable-assign-team="areThereTeams"
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
