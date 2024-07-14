<script setup lang="ts">
import { storeToRefs } from "pinia";
import TournamentForm from "~/components/pages/torneos/tournament-form.vue";
import { useTournamentStore } from "~/store";

const { dialog, isEdition, tournamentId } = storeToRefs(useTournamentStore());

const title = computed(() => {
  return isEdition.value ? "Editar torneo" : "Crear un torneo";
});
const subtitle = computed(() => {
  return isEdition.value
    ? "Modifica los detalles del torneo."
    : "Completa los detalles del torneo para agregarlo a tu liga";
});
</script>
<template>
  <v-dialog v-model="dialog" max-width="688">
    <v-card
      class="create-tournament-card"
      :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <v-card-item>
        <template #prepend>
          <v-sheet
            border="primary thin"
            class="mx-auto d-flex justify-center align-center mr-2 rounded-lg"
            height="45"
            width="45"
          >
            <nuxt-icon name="football" filled></nuxt-icon>
          </v-sheet>
        </template>
        <template #title
          ><span class="">{{ title }}</span></template
        >
        <template #subtitle>{{ subtitle }}</template>
        <template #append>
          <nuxt-icon name="x-dialog" filled @click="dialog = false" />
        </template>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text>
        <TournamentForm />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<style>
.create-tournament-card > .v-card-item > .v-card-item__append {
  cursor: pointer;
  align-self: flex-start !important;
  justify-self: center !important;
  padding-inline-start: 0 !important;
  margin-top: 0.4rem;
}
.nuxt-icon.image-plus svg,
.nuxt-icon.file-type-img svg,
.nuxt-icon.trash-error svg {
  width: 2rem;
  height: 2rem;
}
.nuxt-icon.trash svg {
  width: 1rem;
  height: 1rem;
}
</style>
