<script lang="ts" setup>
  const { showAssignTeam, playerId } = storeToRefs(usePlayerStore())
  const teamId = ref<number | null>(null)
  const { teams } = storeToRefs(useTeamStore())
  const { toast } = useToast()
  const confirmAssignment = async () => {
    const client = useSanctumClient()
    if (teamId.value) {
      try {
        await client(`/api/v1/admin/teams/${teamId.value}/players/${playerId.value}/assign`, {
          method: 'POST',
        })
        teamId.value = null
        playerId.value = null
        showAssignTeam.value = false
        await usePlayerStore().getPlayers()
      } catch (error: any) {
        toast({
          type: 'error',
          msg: 'No se pudo asignar',
          description: error?.data?.message ?? 'Inténtalo nuevamente.',
        })
      }
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
    icon-name="lucide:users"
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
        <v-btn color="primary" @click="confirmAssignment" :disabled="!teamId"> Asignar Equipo </v-btn>
        <v-btn color="secondary" @click="showAssignTeam = false"> Cancelar </v-btn>
      </div>
    </template>
  </Dialog>
</template>
