<script lang="ts" setup>
  import { useTournamentStore } from '~/store'
  import getHeaders from '~/utils/headers-table'
  import type { Tournament } from '~/models/tournament'
  import { useRouter } from '#app'

  const {
    noTournaments,
    tournaments,
    tournamentId,
    tournament,
    pagination,
    search,
  } = storeToRefs(useTournamentStore())
  const headers = getHeaders('tournaments')
  const setChipColor = (status: string) => {
    switch (status) {
      case 'creado':
        return 'warning'
      case 'en curso':
        return 'success'
      case 'completado':
        return 'primary'
      case 'cancelado':
        return 'error'
      default:
        return 'warning'
    }
  }
  const handleShowTournament = (_tournament: Tournament) => {
    tournamentId.value = _tournament.id as number
    tournament.value = _tournament
    useRouter().push({
      name: 'torneos-torneo',
      params: { torneo: _tournament.slug },
    })
  }
  onMounted(() => (pagination.value.currentPage = 1))
  const scheduleHandler = (model: Tournament) => {
    tournamentId.value = model.id as number
    tournament.value = model
    useRouter().push({
      name: 'torneos-torneo-calendario',
      params: { torneo: model.slug },
    })
  }
</script>
<template>
  <Table
    v-if="!noTournaments"
    :headers="headers"
    :items="tournaments"
    itemKey="name"
    :search.sync="search"
    v-model:pagination="pagination"
    :status-handler="setChipColor"
    :paginate="useTournamentStore().loadTournaments"
    :show-link="true"
  >
    <template #actions="{ item }">
     <div class="d-flex flex-column my-2">
       <v-btn
           size="small"
           rounded="md"
           class="my-1 show-calendar-btn"
           variant="outlined"
           @click="() => scheduleHandler(item as Tournament)"
       >
         <template #prepend>
           <Icon name="futzo-icon:calendar" size="large"></Icon>
         </template>
         Ver calendario
       </v-btn>
       <v-btn
           size="small"
           rounded="md"
           variant="outlined"
           class="my-1 show-calendar-btn"
           @click="() => handleShowTournament(item as Tournament)"
       >Ver Torneo
       </v-btn>
     </div>
    </template>
  </Table>
</template>
<style scoped>
  .show-calendar-btn {
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  }
</style>
