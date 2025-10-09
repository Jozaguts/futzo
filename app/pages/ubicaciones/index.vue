<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import NoLocations from '~/components/pages/ubicaciones/NoLocations.vue'
  import DialogLocation from '~/components/pages/ubicaciones/dialog/index.vue'
  import LocationCardContainer from '~/components/pages/ubicaciones/LocationCardContainer.vue'
  import ConfirmDialog from '~/components/shared/confirm-dialog.vue'
  import { useDisplay } from 'vuetify'
  import { Icon } from '#components'
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  const { isEdition, locationDialog, locationToDelete, locations } = storeToRefs(useLocationStore())
  const showStoreLocationDialog = () => {
    isEdition.value = false
    locationDialog.value = true
  }
  const isLoading = ref(false)
  const deleteLocationHandler = () => {
    isLoading.value = true
    useLocationStore()
      .deleteLocation()
      .finally(() => {
        isLoading.value = false
      })
  }

  const searchLocationHandler = useDebounceFn((place: string) => {
    useLocationStore().pagination.per_page = 10
    useLocationStore().pagination.current_page = 1
    useLocationStore().getLocations(place)
  }, 600)
  const { mobile } = useDisplay()
  onMounted(async () => {
    if (!locations.value) {
      await useLocationStore().getLocations()
    }
  })
  const open = ref(false)
</script>
<template>
  <PageLayout>
    <template #app-bar>
      <AppBar :extended="mobile">
        <template #buttons>
          <div class="d-none d-md-flex d-lg-flex">
            <SearchInput
              placeholder="Busca una ubicación…"
              :min-width="320"
              class="mr-2"
              @searching="searchLocationHandler"
            />
            <PrimaryBtn
              v-if="!mobile"
              :disabled="false"
              text="Crear ubicación"
              icon="futzo-icon:plus"
              variant="tonal"
              class="mr-8"
              @click="showStoreLocationDialog"
            ></PrimaryBtn>
          </div>
        </template>
        <template #extension>
          <div class="d-flex d-md-none d-lg-none flex-column w-100">
            <SearchInput
              placeholder="Busca una ubicación…"
              min-width="50%"
              class="mx-4 text-center"
              @searching="searchLocationHandler"
            />
          </div>
        </template>
      </AppBar>
    </template>
    <template #default>
      <NoLocations />
      <DialogLocation />
      <LocationCardContainer />
      <ConfirmDialog
        v-model:model="locationToDelete.show"
        v-model:loading="isLoading"
        title="¿Estás seguro que quieres eliminar esta ubicación?"
        @action-confirmed="deleteLocationHandler"
      />
    </template>
    <template #fab>
      <v-fab color="primary" icon @click="open = !open">
        <Icon name="futzo-icon:plus" class="mobile-fab" :class="open ? 'opened' : ''" size="32"></Icon>
        <v-speed-dial v-model="open" location="left center" transition="slide-y-reverse-transition" activator="parent">
          <v-btn key="1" color="secondary" icon @click="showStoreLocationDialog">
            <v-icon size="24">mdi-map-marker-plus</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-fab>
    </template>
  </PageLayout>
</template>
