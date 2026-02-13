<script lang="ts" setup>
import type {LocationCard as LocationCardModel} from '~/models/Location'
import LocationCard from '~/components/pages/ubicaciones/LocationCard.vue'
import LocationDetailDialog from '~/components/pages/ubicaciones/LocationDetailDialog.vue'

const locationStore = useLocationStore()
const { locations, pagination, noLocations } = storeToRefs(locationStore)

const detailDialog = ref(false)
const selectedLocation = ref<LocationCardModel | null>(null)

const openDetailDialog = (location: LocationCardModel) => {
  selectedLocation.value = location
  detailDialog.value = true
}

const handlePageChange = async (page: number) => {
  pagination.value.current_page = page
  await locationStore.getLocations()
}
</script>

<template>
  <div v-if="!noLocations" class="locations-list" data-testid="locations-list">
    <div class="locations-list__scroll">
      <LocationCard
        v-for="location in locations"
        :key="location.id"
        :location="location"
        @open-detail="openDetailDialog"
      />
    </div>

    <div v-if="pagination.last_page > 1" class="locations-list__footer">
      <v-divider />
      <v-pagination
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="$vuetify.display.mobile ? 3 : 8"
        @update:model-value="handlePageChange"
      />
    </div>

    <LocationDetailDialog v-model:model-value="detailDialog" :location="selectedLocation" />
  </div>
</template>

<style scoped>
.locations-list {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid #eaecf0;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
}

.locations-list__scroll {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  padding: 12px;
}

.locations-list__footer {
  background: #fff;
}
</style>
