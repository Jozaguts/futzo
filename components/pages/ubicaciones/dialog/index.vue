<script lang="ts" setup>
import HeaderCard from "~/components/pages/ubicaciones/dialog/Header.vue";
import LocationStepper from "~/components/pages/ubicaciones/stepper/index.vue";
import {storeToRefs} from "pinia";
import {useLocationStore} from "~/store";
import type {LocationStoreRequest} from "~/models/Location";
import {DEFAULT_AVAILABILITY_HOURS, DEFAULT_POSITION} from "~/utils/constants";

const {locationDialog, locationStoreRequest, formSteps} = storeToRefs(useLocationStore());
const leaveHandler = () => {
  locationStoreRequest.value = {
    name: '',
    city: '',
    address: '',
    autocomplete_prediction: {},
    tags: [],
    availability: DEFAULT_AVAILABILITY_HOURS,
    fields_count: 0,
    position: DEFAULT_POSITION
  } as LocationStoreRequest
  formSteps.value.current = 'location';
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
      <LocationStepper
          @close="() => locationDialog = false"
          @location-added="() => locationDialog = false"/>
    </v-card>
  </v-dialog>
</template>
