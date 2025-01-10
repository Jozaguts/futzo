<script lang="ts" setup>
import HeaderCard from "~/components/pages/ubicaciones/dialog/Header.vue";
import AddLocationForm from "~/components/pages/ubicaciones/AddLocationForm.vue";
import {storeToRefs} from "pinia";
import {useLocationStore} from "~/store";

const {locationDialog} = storeToRefs(useLocationStore());
const leaveHandler = () => {
  // useLocationStore()?.$reset();
};

</script>
<template>
  <v-dialog
      v-model="locationDialog"
      max-width="690"
      @after-leave="leaveHandler"
      scrollable
  >
    <v-card
        class="create-tournament-card futzo-rounded"
        height="100%"
        :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <HeaderCard/>
      <AddLocationForm @location-added="() => locationDialog = false"/>
    </v-card>
  </v-dialog>
</template>
