<script setup lang="ts">
import HeaderCard from "~/components/pages/jugadores/import-dialog/header.vue";
import Form from "@/components/pages/jugadores/import-dialog/form.vue";
import Drops from "@/components/pages/jugadores/import-dialog/drops.vue";
import {storeToRefs} from "pinia";
import {useTeamStore} from "~/store";

const {importModal} = storeToRefs(useTeamStore());
const {downloadTemplate} = useTeamStore();
const {importTeamsHandler} = useTeamStore();
const leaveHandler = () => {
};

const file = ref<File>();
const eventHandler = () => {
  importTeamsHandler(file.value as File);
};
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
      <Drops v-model:file="file" @import-teams="eventHandler"/>
      <template #actions>
        <v-container>
          <v-row>
            <v-col>
              <v-btn
                  color="secondary"
                  variant="outlined"
                  @click="downloadTemplate"
              >
                Descargar Plantilla
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="sass">
@use "assets/scss/pages/create-team.sass"
</style>
