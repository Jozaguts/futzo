<script lang="ts" setup>
  import AppBar from '~/components/layout/AppBar.vue'
  import NoLocations from '~/components/pages/ubicaciones/NoLocations.vue'
  import DialogLocation from '~/components/pages/ubicaciones/dialog/index.vue'
  import LocationCardContainer from '~/components/pages/ubicaciones/LocationCardContainer.vue'
  import ConfirmDialog from '~/components/shared/confirm-dialog.vue'
  import { useDisplay } from 'vuetify/framework'
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
    useLocationStore().pagination.perPage = 10
    useLocationStore().pagination.currentPage = 1
    useLocationStore().getLocations(place)
  }, 600)
  const { mobile } = useDisplay()
  onMounted(async () => {
    if (!locations.value) {
      await useLocationStore().getLocations()
    }
  })
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
          <div class="d-flex d-md-none d-lg-none flex-column">
            <SearchInput
              placeholder="Busca una ubicación…"
              :min-width="'calc(100vw - 2rem)'"
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
  </PageLayout>
</template>
