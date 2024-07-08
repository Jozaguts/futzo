<script setup lang="ts">
import {useTournamentStore} from "~/store";
import {storeToRefs} from "pinia";
import type {TournamentResponse} from "~/models/tournament";

const clickHandler = async () => {
 const {dialog, isEdition ,tournamentId,tournamentToEdit} = storeToRefs(useTournamentStore())
  if (tournamentId.value) { // tournamentId filled handleShowTournament /liga
    isEdition.value = true
    const client = useSanctumClient()
    const response = await client<TournamentResponse>(`/api/v1/admin/tournaments/${tournamentId.value}`)

    tournamentToEdit.value.name = response.name
    tournamentToEdit.value.description = response.description
    tournamentToEdit.value.start_date = response.start_date
    tournamentToEdit.value.end_date = response.end_date
    tournamentToEdit.value.description = response.description
    tournamentToEdit.value.city = response.location.city
    tournamentToEdit.value.address = response.location.address
    tournamentToEdit.value.location = response.location.autocomplete_prediction
    tournamentToEdit.value.tournament_format_id = response.tournament_format_id
    tournamentToEdit.value.category_id = response.category_id
    tournamentToEdit.value.prize = response.prize
    tournamentToEdit.value.status = response.status
    tournamentToEdit.value.winner = response.winner
    tournamentToEdit.value.image = response.image
    dialog.value = true
  }
}
</script>
<template>
  <v-btn class="navbar-btn-action secondary" @click="clickHandler" >Editar torneo</v-btn>
</template>