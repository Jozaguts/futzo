<script setup lang="ts">
import {useGlobalStore, useTournamentStore} from "~/store";
import {storeToRefs} from "pinia";
const dialog = ref(false)
const {tournamentId, tournament} = storeToRefs(useTournamentStore())
const tournamentStatus = computed(() => tournament.value?.status)
const handleCancelTournament = () => {
  useTournamentStore()
      .updateTournamentStatus( tournamentId.value, {status: 'cancelado'})
      .then(() => {
        dialog.value = false
        useRouter().push({name: "liga"})
        useGlobalStore().showSuccessNotification({message: 'Torneo actualizado correctamente'})
      })

};
</script>
<template>
  <v-btn class="navbar-btn-action secondary" :disabled="tournamentStatus === 'cancelado'">
    <template #prepend>
      <nuxt-icon name="x-close" filled></nuxt-icon>
      <span class="button-text" @click="dialog = !dialog" > Cancelar torneo</span>
    </template>
   </v-btn>
  <v-dialog v-model="dialog" max-width="500">
    <v-card  width="500">
      <v-card-title>Cancelar torneo</v-card-title>
      <v-card-text>
        <p>¿Estás seguro de cancelar el torneo?</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialog = !dialog">Cancelar</v-btn>
        <v-btn @click="handleCancelTournament" >Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>