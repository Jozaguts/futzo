<script lang="ts" setup>
import type {LocationCard} from "~/models/Location";
import CardMenu from "~/components/pages/ubicaciones/CardMenu.vue";
import {useLocationStore} from "~/store";

const {isEdition, locationDialog, locationToDelete, locationStoreRequest, locationCard} = storeToRefs(useLocationStore())

const {location} = defineProps<{ location: LocationCard }>()
const clickHandler = (action: 'Eliminar' | 'Editar') => {
  if (action === 'Editar') {
    locationStoreRequest.value = {
      name: location.name,
      city: location.city,
      address: location.address,
      autocomplete_prediction: {...location.autocomplete_prediction},
      tags: location.tags,
      fields_count: location.fields_count,
      position: location.position,
      availability: location.availability,
      completed: true,
      id: location.id,
    }
    locationCard.value.id = location.id as number
    isEdition.value = true
    locationDialog.value = true

  } else if (action === 'Eliminar') {
    locationToDelete.value.id = location.id as number
    locationToDelete.value.show = true
  }
}
</script>
<template>
  <v-card class="futzo-rounded" max-width="330" flat>
    <CardMenu @click="clickHandler"/>
    <v-img :src="`/locations/${location.image}.png`"
           max-width="330"
           max-height="250"
           min-height="250"
           cover
    />
    <v-card-item>
      <v-card-title class="card-title ">
        <span class="d-inline-block text-truncate" style="max-width: 300px">{{ location.name }}</span>
      </v-card-title>
      <v-card-subtitle class="card-subtitle">
              <span class="d-inline-block text-truncate" style="max-width: 300px">
               {{ location.address }}, {{ location.city }}
              </span>
      </v-card-subtitle>
      <v-divider/>
    </v-card-item>
    <v-card-text class="pt-2">
      <p class="card-content-title">Horarios</p>
      <div class="card-content-text">
        Lunes - viernes 9am - 5pm
      </div>
      <v-divider/>
    </v-card-text>
    <v-card-actions>
      <v-chip-group variant="outlined" v-if="location.tags.length">
        <v-chip v-for="tag in location.tags" :key="tag" class="ma-1 tags-rounded" color="primary" label>{{ tag }}</v-chip>
      </v-chip-group>
      <div v-else class="pa-3">
        <span class="text-caption font-weight-thin">Sin etiquetas</span>
      </div>
    </v-card-actions>
  </v-card>
</template>
<style scoped lang="sass">
.card
  &-title
    color: #181D27
    font-size: 20px
    font-weight: 600
    line-height: 30px

  &-subtitle
    color: #414651
    font-size: 14px
    font-weight: 400
    line-height: 20px

  &-content
    &-title
      color: #414651
      line-height: 24px
      font-size: 16px
      font-weight: 600

    &-text
      color: #181D27
      line-height: 20px
      font-size: 14px
      font-weight: 400

.tags-rounded
  border: 1px solid #D5D7DA
  border-radius: 6px
</style>
