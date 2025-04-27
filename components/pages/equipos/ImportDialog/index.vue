<script setup lang="ts">
import HeaderCard from "~/components/pages/jugadores/import-dialog/header.vue";
import Form from "@/components/pages/jugadores/import-dialog/form.vue";
import Drops from "@/components/pages/jugadores/import-dialog/drops.vue";
import {storeToRefs} from "pinia";
import {useTeamStore} from "~/store";

const {importModal, loading} = storeToRefs(useTeamStore());
const {downloadTemplate, importTeamsHandler} = useTeamStore();
const leaveHandler = () => {
};

const file = ref<File>();
const eventHandler = () => {
  loading.value = true
  importTeamsHandler(file.value as File)
      .finally(() => {
        loading.value = false;
      });
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
      <v-container class="py-0">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-end">
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
      <Drops v-model:file="file" @import-teams="eventHandler"/>
    </v-card>
  </v-dialog>
</template>

<style lang="sass">
@use "assets/scss/pages/create-team.sass"
</style>
