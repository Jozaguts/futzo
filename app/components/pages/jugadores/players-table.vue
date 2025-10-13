<script lang="ts" setup>
  import getHeaders from '~/utils/headers-table'
  import type { Player, PlayerResponse } from '~/models/Player'
  import type { Team } from '~/models/Team'

  const { players, playerId, pagination, search, showAssignTeam, noPlayers } = storeToRefs(usePlayerStore())
  const headers = getHeaders('players')
  const showPlayerHandler = (player: PlayerResponse) => {
    console.log({ player: player })
  }
  const assignTeam = (item: Player) => {
    playerId.value = item.id
    showAssignTeam.value = !showAssignTeam.value
  }
  const { teams } = storeToRefs(useTeamStore())
  const areThereTeams = computed(() => teams.value?.length > 0)
</script>
<template>
  <div v-if="!noPlayers" class="table" style="height: calc(100% - 50px)">
    <div class="table-wrapper">
      <Table
        v-if="players?.length"
        :headers="headers"
        :items="players"
        itemKey="name"
        :search.sync="search"
        v-model:pagination="pagination"
        :paginate="usePlayerStore().getPlayers"
        :assign-team="assignTeam"
        :enable-assign-team="areThereTeams"
      >
        <template #actions="{ item }">
          <v-btn
            size="small"
            rounded="md"
            variant="outlined"
            class="table-action-btn"
            disabled
            @click="showPlayerHandler(item as unknown as PlayerResponse)"
            >Ver Jugador
          </v-btn>
        </template>
      </Table>
    </div>
  </div>
</template>
