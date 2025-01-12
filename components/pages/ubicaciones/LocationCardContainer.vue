<script lang="ts" setup>
import {useLocationStore} from '~/store'
import LocationCard from '~/components/pages/ubicaciones/LocationCard.vue'

const {locations, pagination} = storeToRefs(useLocationStore())
type CallbackOptions = {
  side: 'end' | 'start' | 'both';
  done: (status: 'error' | 'loading' | 'empty' | 'ok') => void;
};
const load = (options: CallbackOptions) => {
  pagination.value.currentPage++
  useLocationStore().getLocations()
      .then(() => options.done('ok'))
      .finally(() => {
        if (pagination.value.lastPage < pagination.value.currentPage) {
          options.done('empty')
        }
      })
}
console.log({length: locations.value?.length})
</script>

<template>
  <v-infinite-scroll height="1000" mode="intersect" @load="load" empty-text="No hay mas ubicaciones">
    <v-container>
      <v-row>
        <v-col cols="12" md="3" lg="3" v-for="location in locations">
          <LocationCard :location="location"/>
        </v-col>
      </v-row>
    </v-container>
  </v-infinite-scroll>
</template>
