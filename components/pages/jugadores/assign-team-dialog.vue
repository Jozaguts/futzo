<script lang="ts" setup>
import {usePlayerStore, useTeamStore} from "~/store";

const {showAssignTeam, playerId} = storeToRefs(usePlayerStore())
const teamId = ref<number | null>(null);
const {teams} = storeToRefs(useTeamStore());
const confirmAssignment = async () => {
  const client = useSanctumClient()
  if (teamId.value) {
    await client(`/api/v1/admin/teams/${teamId.value}/players/${playerId.value}/assign`, {
      method: 'POST',
    })
    teamId.value = null;
    playerId.value = null;
    showAssignTeam.value = false;
    await usePlayerStore().getPlayers()
  }
}
onMounted(async () => {
  await useTeamStore().list()
})
</script>
<template>
  <Dialog
      title="Asignar Equipo"
      subtitle="Selecciona un equipo para asignar al jugador"
      :loading="false"
      v-model="showAssignTeam"
      icon-name="game-icons:babyfoot-players"
  >
    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
                v-model="teamId"
                :items="teams"
                item-title="name"
                item-value="id"
                label="Selecciona un equipo"
                outlined
                dense
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <div class="d-flex flex-row-reverse w-100 px-2">
        <v-btn
            color="primary"
            @click="confirmAssignment"
            :disabled="!teamId"
        >
          Asignar Equipo
        </v-btn>
        <v-btn
            color="secondary"
            @click="showAssignTeam = false"
        >
          Cancelar
        </v-btn>
      </div>
    </template>
  </Dialog>
</template>
