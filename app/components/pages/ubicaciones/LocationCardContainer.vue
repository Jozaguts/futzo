<script lang="ts" setup>
  import LocationCard from '~/components/pages/ubicaciones/LocationCard.vue'

  const { locations, pagination, noLocations } = storeToRefs(useLocationStore())
  type CallbackOptions = {
    side: 'end' | 'start' | 'both'
    done: (status: 'error' | 'loading' | 'empty' | 'ok') => void
  }
  const load = (options: CallbackOptions) => {
    pagination.value.current_page++
    useLocationStore()
      .getLocations()
      .then(() => options.done('ok'))
      .finally(() => {
        if (pagination.value.last_page < pagination.value.current_page) {
          options.done('empty')
        }
      })
  }
</script>
<template>
  <v-infinite-scroll
    height="100%"
    mode="intersect"
    @load="load"
    v-if="!noLocations"
    empty-text="No hay más ubicaciones"
    loader-text="Cargando más ubicaciones..."
  >
    <v-container fluid class="pa-lg-0 pa-md-0">
      <v-row no-gutters>
        <v-col cols="12" md="3" lg="3" class="pa-0 my-4" v-for="location in locations" :key="location.id">
          <LocationCard :location="location" />
        </v-col>
      </v-row>
    </v-container>
  </v-infinite-scroll>
</template>
