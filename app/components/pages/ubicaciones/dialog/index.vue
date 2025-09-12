<script lang="ts" setup>
  import HeaderCard from '~/components/pages/ubicaciones/dialog/Header.vue'
  import LocationStepper from '~/components/pages/ubicaciones/stepper/index.vue'

  const { locationDialog, formSteps } = storeToRefs(useLocationStore())
  const leaveHandler = () => {
    useLocationStore().resetLocationStoreRequest()
    formSteps.value.current = 'location'
  }
  const disabled = computed(() => {
    return formSteps.value.steps[formSteps.value.current].disable
  })
</script>
<template>
  <v-dialog v-model="locationDialog" max-width="690" min-height="80vh" @after-leave="leaveHandler" scrollable>
    <v-card
      class="create-tournament-card futzo-rounded"
      height="100%"
      :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }"
    >
      <HeaderCard />
      <LocationStepper @close="() => (locationDialog = false)" @location-added="() => (locationDialog = false)" />
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-btn
                variant="outlined"
                block
                color="secondary"
                class="text-capitalize"
                density="comfortable"
                size="large"
                @click="() => formSteps.steps[formSteps.current].back()"
                >Anterior
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                :disabled="disabled"
                variant="elevated"
                block
                color="primary"
                density="comfortable"
                size="large"
                @click="() => formSteps.steps[formSteps.current].next()"
                >Siguiente
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
