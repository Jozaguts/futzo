<script setup lang="ts">
import HeaderCard from "~/components/pages/jugadores/import-dialog/header.vue";
import Form from "@/components/pages/jugadores/import-dialog/form.vue";
import Drops from "@/components/pages/jugadores/import-dialog/drops.vue";
import {storeToRefs} from "pinia";
import {usePlayerStore} from "~/store";

const {importModal} = storeToRefs(usePlayerStore());
const {importPlayersHandler, downloadTemplate} = usePlayerStore();
const leaveHandler = () => {
};

const file = ref<File>();
const eventHandler = () => {
  importPlayersHandler(file.value as File);
};
const showTeamsInput = ref(false);
const teamId = ref();
const teams = ref([])

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
          <v-col cols="6" class="d-flex justify-start" v-if="showTeamsInput">
            <v-select
                class="ml-2"
                density="compact"
                variant="outlined"
                label="Torneo"
                item-value="id"
                v-model="teamId"
                :items="teams"
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
      <Drops v-model:file="file" @import-players="eventHandler"/>
    </v-card>
  </v-dialog>
</template>
<style lang="sass">
@use "assets/scss/pages/create-team.sass"
</style>
