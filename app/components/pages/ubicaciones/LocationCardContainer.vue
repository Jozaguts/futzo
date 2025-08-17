<script lang="ts" setup>
  import LocationCard from '~/components/pages/ubicaciones/LocationCard.vue'

  const { locations, pagination, noLocations } = storeToRefs(useLocationStore())
  type CallbackOptions = {
    side: 'end' | 'start' | 'both'
    done: (status: 'error' | 'loading' | 'empty' | 'ok') => void
  }
  const load = (options: CallbackOptions) => {
    pagination.value.currentPage++
    useLocationStore()
      .getLocations()
      .then(() => options.done('ok'))
      .finally(() => {
        if (pagination.value.lastPage < pagination.value.currentPage) {
          options.done('empty')
        }
      })
  }
</script>
<template>
  <v-infinite-scroll height="900" mode="intersect" @load="load" v-if="!noLocations">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3" lg="3" v-for="location in locations" align="center" :key="location.id">
          <LocationCard :location="location" />
        </v-col>
      </v-row>
    </v-container>
  </v-infinite-scroll>
</template>
