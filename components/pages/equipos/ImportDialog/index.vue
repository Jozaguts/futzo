<script setup lang="ts">
import HeaderCard from "~/components/pages/jugadores/import-dialog/header.vue";
import Form from "@/components/pages/jugadores/import-dialog/form.vue";
import Drops from "@/components/pages/jugadores/import-dialog/drops.vue";
import {storeToRefs} from "pinia";
import {useTeamStore, useTournamentStore} from "~/store";
import type {Tournament} from "~/models/tournament";

const {importModal, loading} = storeToRefs(useTeamStore());
const {tournamentsInCreatedState} = storeToRefs(useTournamentStore());
const {downloadTemplate, importTeamsHandler} = useTeamStore();
const file = ref<File>();
const isImporting = ref(false);
const tournamentId = ref<number | null>(null);
const showTournamentInput = computed(() => !!file.value)

const importHandler = () => {
  isImporting.value = true
  importTeamsHandler(file.value as File, tournamentId.value as number)
      .finally(() => {
        isImporting.value = false;
      });
};
const leaveHandler = () => {
  loading.value = false;
  file.value = undefined;
  tournamentId.value = null;
  isImporting.value = false;
};

function itemProps(item: Tournament) {
  return {
    title: item.name,
    subtitle: 'Espacios disponibles: ' + item.available_places,
  }
}
</script>

<template>
  <v-dialog
      v-model="importModal"
      max-width="690"
      @after-leave="leaveHandler"
      scrollable
  >
    <v-card
        class="create-tournament-card futzo-rounded"
        :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <HeaderCard @close="importModal = false"/>
      <Form v-model:file="file"/>
      <v-container class="py-0">
        <v-row no-gutters>
          <v-col cols="6" class="d-flex justify-start" v-if="showTournamentInput">
            <v-select
                class="ml-2"
                density="compact"
                variant="outlined"
                label="Torneo"
                :item-props="itemProps"
                item-value="id"
                v-model="tournamentId"
                :items="tournamentsInCreatedState"
                hint="Solo puedes agregar equipos a torneos en estado 'Creado'"
                persistent-hint
            >
            </v-select>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
                color="secondary"
                variant="outlined"
                class="app-bar-secondary-btn mr-2"
                @click="downloadTemplate"
                :loading="loading"
                :disabled="loading"
                size="small"
            >
              <template #prepend>
                <Icon name="futzo-icon:file-type-excel" size="24"></Icon>
              </template>
              Descargar Plantilla
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <Drops
          v-model:file="file"
          @import-teams="importHandler"
          :disabled="!tournamentId"
          :loading="isImporting"
      />
    </v-card>
  </v-dialog>
</template>

<style lang="sass">
@use "assets/scss/pages/create-team.sass"
</style>
