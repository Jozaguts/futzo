<script lang="ts" setup>
import AppBar from '~/components/layout/AppBar.vue'
import NoLocations from '~/components/pages/ubicaciones/NoLocations.vue'
import DialogLocation from '~/components/pages/ubicaciones/dialog/index.vue'
import LocationCardContainer from '~/components/pages/ubicaciones/LocationCardContainer.vue'
import LocationKpis from '~/components/pages/ubicaciones/location-kpis.vue'
import ConfirmDialog from '~/components/shared/confirm-dialog.vue'
import SearchInput from '~/components/shared/SearchInput.vue'
import ModuleTopShell from '~/components/shared/page/module-top-shell.vue'
import QuickActionsPanel from '~/components/shared/quick-actions-panel.vue'
import {useLocationsIndexPage} from '~/composables/locations/useLocationsIndexPage'

definePageMeta({
  middleware: ['sanctum:auth'],
})

const {
  locationToDelete,
  locations,
  pagination,
  tourSteps,
  isLoading,
  quickActions,
  registerTourRef,
  handleQuickAction,
  deleteLocationHandler,
  searchLocationHandler,
  initializePage,
  disposePage,
} = useLocationsIndexPage()

onMounted(initializePage)
onBeforeUnmount(disposePage)
</script>

<template>
  <PageLayout styles="main ubicaciones-page">
    <template #app-bar>
      <AppBar :extended="false" />
    </template>

    <template #default>
      <ModuleTopShell
        title="Ubicaciones"
        subtitle="Administra sedes, campos y disponibilidad desde un mismo lugar."
        top-shell-test-id="ubicaciones-page-top-shell"
        intro-test-id="ubicaciones-page-intro"
        controls-test-id="ubicaciones-filters-panel"
      >
        <template #controls>
          <SearchInput
            placeholder="Buscar ubicación..."
            min-width="100%"
            class="ubicaciones-page__search"
            @searching="searchLocationHandler"
          />
        </template>
      </ModuleTopShell>

      <section class="module-overview ubicaciones-page__overview" data-testid="ubicaciones-page-overview">
        <div class="module-overview__kpis ubicaciones-page__kpis">
          <LocationKpis :locations="locations || []" :total-locations="pagination.total" />
        </div>
        <QuickActionsPanel
          class="module-overview__actions ubicaciones-page__actions-panel"
          title="Acciones Rápidas"
          test-id="ubicaciones-page-actions"
          :actions="quickActions"
          primary-action-id="new_location"
          @action="handleQuickAction"
        />
      </section>

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

<style lang="scss">
@use '~/assets/scss/pages/locations-index.scss';
</style>
