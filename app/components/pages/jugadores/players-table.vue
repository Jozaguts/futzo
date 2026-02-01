<script lang="ts" setup>
  import getHeaders from '~/utils/headers-table'
  import type { Player } from '~/models/Player'
  import { useDisplay } from 'vuetify'

  const playerStore = usePlayerStore()
  const { players, playerId, pagination, search, showAssignTeam, noPlayers } = storeToRefs(playerStore)
  const headers = getHeaders('players')
  const router = useRouter()
  const { mobile } = useDisplay()
  const syncPaginationPerPage = (isMobile: boolean) => {
    const nextPerPage = isMobile ? 1 : 10
    if (pagination.value.per_page === nextPerPage) {
      return false
    }
    pagination.value.per_page = nextPerPage
    pagination.value.current_page = 1
    return true
  }
  syncPaginationPerPage(mobile.value)
  watch(mobile, (isMobile) => {
    const changed = syncPaginationPerPage(isMobile)
    if (changed) {
      playerStore.getPlayers()
    }
  })
  const showPlayerHandler = (player: Player) => {
    if (!player?.id) return
    router.push({ name: 'jugadores-jugador', params: { jugador: player.id } })
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
        :paginate="playerStore.getPlayers"
        :assign-team="assignTeam"
        :enable-assign-team="areThereTeams"
        :items-per-page="mobile ? 1 : 10"
      >
        <template #actions="{ item }">
          <v-btn
            size="small"
            rounded="md"
            variant="outlined"
            class="table-action-btn"
            @click="showPlayerHandler(item as Player)"
            >Ver Jugador
          </v-btn>
        </template>
      </Table>
    </div>
  </div>
</template>
