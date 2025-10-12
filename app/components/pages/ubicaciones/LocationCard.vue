<script lang="ts" setup>
  import type { LocationCard } from '~/models/Location'
  import CardMenu from '~/components/pages/ubicaciones/CardMenu.vue'

  const { isEdition, locationDialog, locationToDelete, locationStoreRequest, locationCard, formSteps } =
    storeToRefs(useLocationStore())
  const { location } = defineProps<{ location: LocationCard }>()
  const clickHandler = (action: 'Eliminar' | 'Editar') => {
    if (action === 'Editar') {
      locationStoreRequest.value = {
        id: location.id,
        name: location.name,
        address: location.address,
        place_id: location.place_id,
        position: location.position,
        tags: location.tags,
        fields: location.fields,
        fields_count: location.fields.length ?? 0,
        steps: {
          location: {
            completed: true,
          },
          fields: {
            completed: false,
          },
        },
      }
      isEdition.value = true
      locationDialog.value = true
      locationCard.value.id = location.id
    } else if (action === 'Eliminar') {
      locationToDelete.value.id = location.id as number
      locationToDelete.value.show = true
    }
  }
</script>
<template>
  <v-card class="futzo-rounded pa-2" max-width="330" min-height="550" flat>
    <CardMenu @click="clickHandler" />
    <v-img :src="`/locations/${location.image}.png`" max-width="330" max-height="250" min-height="250" cover />
    <v-card-item>
      <v-card-title class="card-title">
        <span class="d-inline-block text-truncate" style="max-width: 300px">{{ location.name }}</span>
      </v-card-title>
      <v-card-subtitle class="card-subtitle">
        <span class="d-inline-block text-truncate" style="max-width: 300px">
          {{ location.address }}
        </span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="pt-2">
      <p class="card-content-title">Horarios de Campos</p>
      <v-expansion-panels :ripple="true" color="grey-100" :elevation="1" variant="accordion">
        <v-expansion-panel v-for="info in location.fields" :key="info?.id" :title="info.name">
          <v-expansion-panel-text eager class="pa-0">
            <v-container fluid class="pa-0">
              <v-row no-gutters>
                <v-col cols="6" v-for="(value, idx) in info.windows" :key="idx" class="font-weight-bold my-1">
                  <div>
                    <p class="text-left">{{ value[0]?.label?.toString().substring(0, 3) }}</p>
                    <span class="text-medium-emphasis mr-1">{{ value[0]?.start }}</span
                    >-<span class="text-medium-emphasis ml-1">{{ value[0]?.end }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <div class="pa-3">
        <span class="text-caption font-weight-bold text-medium-emphasis">Etiquetas</span>
      </div>
      <v-chip-group variant="elevated" v-if="location.tags.length">
        <v-chip
          v-for="tag in location.tags"
          :key="tag"
          class="ma-1 tags-rounded"
          base-color="primary"
          :ripple="false"
          :elevation="0"
          >{{ tag }}</v-chip
        >
      </v-chip-group>
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
