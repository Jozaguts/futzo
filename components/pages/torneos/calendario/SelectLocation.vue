<script lang="ts" setup>
import {useLocationStore} from "~/store";

const props = defineProps(
    {
      multiple: {
        type: Boolean,
        default: true,
      },
      chips: {
        type: Boolean,
        default: true,
      },
      closableChips: {
        type: Boolean,
        default: true,
      },
    }
)
const search = ref('')
const {locations} = storeToRefs(useLocationStore())

const searchHandler = useDebounceFn((place: string) => {
  useLocationStore().getLocations(place)
}, 500)
watchEffect(() => {
  if (search.value.length > 2) {
    searchHandler(search.value)
  }
})
const items = computed(() => locations.value ?? [])
const itemProps = {
  class: 'd-inline-block text-truncate',
  style: 'max-width: 200px',
}
</script>
<template>
  <v-select max-width="400px" :items="items" :multiple="props.multiple" :chips="props.chips" :closable-chips="props.closableChips" item-title="name" item-value="id"
            :item-props="itemProps">
    <template #prepend-item>
      <div>
        <div class="select-search">
          <v-text-field
              prepend-inner-icon="mdi-magnify"
              variant="plain"
              class="search-input"
              v-model="search"
              placeholder="Buscar ubicación"
          >
          </v-text-field>
        </div>
        <div class="create-location">
          <Icon name="futzo-icon:black-plus" size="24"></Icon>
          <span class="create-location__text">Crear nueva ubicación</span>
        </div>
      </div>

    </template>
  </v-select>
</template>
<style lang="sass">
.create-location
  display: flex
  align-items: center
  justify-content: flex-start
  padding: 1rem 20px
  color: rgba(24, 29, 39, 1)
  font-size: 1rem
  cursor: pointer

  &__text
    margin-left: .5rem

.select-search
  display: flex
  align-items: center
  justify-content: space-between
  padding: .5rem 0
  border-bottom: 1px solid var(--Colors-Base-Gray-300, #e0e0e0)
  //border-radius: var(--radius-md, 8px)

  .search-icon
    color: var(--Colors-Base-Gray-500, #9e9e9e)
    font-size: 1.5rem

  .search-input
    border: none
    outline: none
    width: 100%
    height: 100%
    padding: 0 1rem
    font-size: 1rem
    color: var(--Colors-Base-Gray-800, #333)

    &::placeholder
      color: var(--Colors-Base-Gray-500, #9e9e9e)
</style>
