<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import NoLocations from '~/components/pages/ubicaciones/NoLocations.vue'
import DialogLocation from '~/components/pages/ubicaciones/dialog/index.vue'
import LocationCardContainer from '~/components/pages/ubicaciones/LocationCardContainer.vue'
import LocationKpis from '~/components/pages/ubicaciones/location-kpis.vue'
import ConfirmDialog from '~/components/shared/confirm-dialog.vue'
import SearchInput from '~/components/shared/SearchInput.vue'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const locationStore = useLocationStore()
const { isEdition, locationDialog, locationToDelete, locations, tourSteps, pagination } = storeToRefs(locationStore)
const { registerTourRef, startTour, resetTour, recalculateTour } = locationStore
const { setActiveController, clearActiveController } = useTourHub()
const tourController = { registerTourRef, startTour, resetTour, recalculateTour }
const isLoading = ref(false)

const showStoreLocationDialog = () => {
  isEdition.value = false
  locationDialog.value = true
}

const deleteLocationHandler = () => {
  isLoading.value = true
  locationStore.deleteLocation().finally(() => {
    isLoading.value = false
  })
}

const searchLocationHandler = useDebounceFn((value: string) => {
  pagination.value.current_page = 1
  locationStore.getLocations(value)
}, 500)

onMounted(async () => {
  if (!locations.value?.length) {
    await locationStore.getLocations()
  }
  setActiveController(tourController)
})

onBeforeUnmount(() => {
  clearActiveController(tourController)
})
</script>

<template>
  <PageLayout styles="main ubicaciones-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>

    <template #default>
      <section class="ubicaciones-page__top-shell futzo-rounded" data-testid="ubicaciones-page-top-shell">
        <header class="ubicaciones-page__intro" data-testid="ubicaciones-page-intro">
          <div class="ubicaciones-page__header">
            <div class="ubicaciones-page__title-wrapper">
              <p class="ubicaciones-page__eyebrow">Gestión de torneos</p>
              <h1 class="ubicaciones-page__title">Ubicaciones</h1>
              <p class="ubicaciones-page__subtitle">Administra sedes, campos y disponibilidad desde un mismo lugar.</p>
            </div>

            <div class="ubicaciones-page__actions" data-testid="ubicaciones-page-actions">
              <PrimaryBtn
                text="Nueva ubicación"
                icon="lucide:map-pin-plus"
                class="ubicaciones-page__quick-btn locations-primary-btn"
                @click="showStoreLocationDialog"
              />
            </div>
          </div>
        </header>

        <div class="ubicaciones-page__top-divider" aria-hidden="true"></div>

        <section class="ubicaciones-page__controls" data-testid="ubicaciones-filters-panel">
          <SearchInput
            placeholder="Buscar ubicación..."
            min-width="100%"
            class="ubicaciones-page__search"
            @searching="searchLocationHandler"
          />
        </section>
      </section>

      <LocationKpis :locations="locations || []" :total-locations="pagination.total" />

      <NoLocations />
      <LocationCardContainer />
      <DialogLocation />

      <ConfirmDialog
        v-model:model="locationToDelete.show"
        v-model:loading="isLoading"
        title="¿Estás seguro que quieres eliminar esta ubicación?"
        @action-confirmed="deleteLocationHandler"
      />
    </template>

    <template #tour>
      <LazyTour name="ubicaciones" :steps="tourSteps" @register="registerTourRef" />
    </template>
  </PageLayout>
</template>

<style scoped>
.ubicaciones-page__top-shell {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
}

.ubicaciones-page__intro {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ubicaciones-page__header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ubicaciones-page__title-wrapper {
  min-width: 0;
}

.ubicaciones-page__eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #667085;
  text-transform: uppercase;
}

.ubicaciones-page__title {
  margin: 2px 0 0;
  color: #101828;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
}

.ubicaciones-page__subtitle {
  margin: 4px 0 0;
  color: #667085;
  font-size: 13px;
  line-height: 1.4;
}

.ubicaciones-page__actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  width: 100%;
}

.ubicaciones-page__quick-btn {
  width: 100%;
}

.ubicaciones-page__top-divider {
  width: 100%;
  height: 1px;
  background: #eaecf0;
}

.ubicaciones-page__controls {
  width: 100%;
}

.ubicaciones-page__search {
  width: 100%;
}

@media (min-width: 960px) {
  .ubicaciones-page__intro {
    gap: 4px;
  }

  .ubicaciones-page__header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
  }

  .ubicaciones-page__title-wrapper {
    max-width: 680px;
  }

  .ubicaciones-page__title {
    font-size: 28px;
  }

  .ubicaciones-page__subtitle {
    font-size: 14px;
  }

  .ubicaciones-page__actions {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .ubicaciones-page__quick-btn {
    width: auto;
  }
}
</style>
