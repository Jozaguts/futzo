<script lang="ts" setup>
  import HeaderCard from '~/components/pages/ubicaciones/dialog/Header.vue'
  import LocationStepper from '~/components/pages/ubicaciones/stepper/index.vue'
  import { storeToRefs } from 'pinia'
  import { useLocationStore } from '~/store'

  const { locationDialog, formSteps } = storeToRefs(useLocationStore())
  const leaveHandler = () => {
    useLocationStore().resetLocationStoreRequest()
    formSteps.value.current = 'location'
  }
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
      <HeaderCard />
      <LocationStepper
        @close="() => (locationDialog = false)"
        @location-added="() => (locationDialog = false)"
      />
    </v-card>
  </v-dialog>
</template>
