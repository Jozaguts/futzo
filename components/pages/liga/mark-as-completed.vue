<script lang="ts" setup>
import { useTournamentStore } from "~/store";
import { toast } from "vuetify-sonner";

const dialog = ref(false);
const { tournament } = storeToRefs(useTournamentStore());
const isCompleted = computed(() => tournament?.value?.status === "completado");

const markAsCompleted = () => {
  const tournamentId = useTournamentStore().tournamentId;
  useTournamentStore()
    .updateTournamentStatus(tournamentId, "completado")
    .then(() => {
      toast.success("Torneo marcado como terminado");
      dialog.value = false;
    });
};
</script>
<template>
  <v-btn
    variant="elevated"
    @click="dialog = !dialog"
    :disabled="isCompleted"
    class="mr-2 mr-lg-12 mr-md-12 navbar-btn-action"
  >
    <template #prepend>
      <nuxt-icon name="check-circle-broken" filled></nuxt-icon>
      <span class="button-text">Marcar como terminado</span>
    </template>
  </v-btn>
  <v-dialog v-model="dialog" max-width="500">
    <v-card width="500">
      <v-card-title>Marcar como terminado</v-card-title>
      <v-card-text>
        <p>¿Estás seguro de marcar como terminado el torneo?</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialog = !dialog">Cancelar</v-btn>
        <v-btn @click="markAsCompleted">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
