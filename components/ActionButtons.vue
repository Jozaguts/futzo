<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTeamStore, useTournamentStore } from "~/store";
import EditarTorneo from "~/components/pages/liga/editar-torneo.vue";
import CancelarTorneo from "~/components/pages/liga/cancelar-torneo.vue";
import type { TournamentForm } from "~/models/tournament";

const currentRouteName = computed(() => useRoute().name);
const buttonActions = computed<{ icon: string; title: string } | boolean>(
  () => {
    switch (currentRouteName.value) {
      case "index":
        return false;
      case "liga":
        return {
          title: "Crear torneo",
          icon: "plus",
        };
      case "liga-torneo":
        return {
          title: "Marcar como terminado",
          icon: "check-circle-broken",
        };
      case "equipos":
        return {
          title: "Crear equipo",
          icon: "plus",
        };
      default:
        return {
          title: "Crear",
          icon: "plus",
        };
    }
  },
);
const handleActions = () => {
  switch (currentRouteName.value) {
    case "liga":
      const { dialog, isEdition, tournamentToEdit, tournamentId } =
        storeToRefs(useTournamentStore());
      isEdition.value = false;
      tournamentId.value = null;
      tournamentToEdit.value = {} as TournamentForm;
      dialog.value = true;
      break;
    case "equipos":
      const teamStore = useTeamStore();
      teamStore.dialog = true;
      break;
    case "theme":
      break;
  }
};
</script>
<template>
  <div class="d-flex justify-center align-center">
    <template v-if="currentRouteName === 'liga-torneo'">
      <EditarTorneo />
      <CancelarTorneo />
    </template>
    <v-btn
      variant="elevated"
      @click="handleActions"
      class="mr-2 mr-lg-12 mr-md-12 navbar-btn-action"
      v-if="buttonActions"
    >
      <template #prepend>
        <nuxt-icon :name="buttonActions.icon" filled></nuxt-icon>
        <span class="button-text">{{ buttonActions?.title }}</span>
      </template>
    </v-btn>
  </div>
</template>
<style lang="sass">
.button-text
  font-size: 16px
  font-style: normal
  font-weight: 600
  line-height: 24px
  text-transform: none
  margin-left: .5rem
.navbar-btn-action
  border-radius: var(--radius-md, 8px)
  border: 1px solid var(--Component-colors-Components-Buttons-Secondary-button-secondary-border, #D0D5DD)
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05)
  font-size: 16px
  font-style: normal
  color: var(--Component-colors-Components-Buttons-Secondary-button-secondary-fg, #344054)
  font-weight: 600
  line-height: 24px
  margin-left: 1.5rem
.navbar-btn-action.secondary
  color: var(--Component-colors-Components-Buttons-Secondary-button-secondary-fg, #344054) !important
</style>
