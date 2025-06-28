<script lang="ts" setup>
type Props = {
  nombre?: string
  label?: string
}
defineProps<Props>()
type PlayerForm = {
  '#': number
  Jugador: string
  goles: number
  tarjetas: string[]
}
const players = ref<PlayerForm[]>([
  {'#': 19, Jugador: 'Juan Pérez', goles: 0, tarjetas: []},
  {'#': 10, Jugador: 'Carlos Gómez', goles: 0, tarjetas: []},
  {'#': 1, Jugador: 'Luis Fernández', goles: 0, tarjetas: []},
  {'#': 8, Jugador: 'Miguel Torres', goles: 0, tarjetas: []},
  {'#': 9, Jugador: 'Andrés Martínez', goles: 0, tarjetas: []},
  {'#': 3, Jugador: 'José Rodríguez', goles: 0, tarjetas: []},
  {'#': 12, Jugador: 'David Sánchez', goles: 0, tarjetas: []},
  {'#': 33, Jugador: 'Javier López', goles: 0, tarjetas: []}])
const teamPlayersDetails = {
  tarjetas: [],
  sustituciones: [],
}

const minWidth = computed(() => {
  return useDisplay().mobile ? '230' : '130'
})
const alert = (message: string) => {
  console.log(message)
}
const emits = defineEmits(['update:goals'])
const updatePlayerGoals = (player: PlayerForm, value: number) => {
  player.goles = value
  emits('update:goals', player)
}
</script>
<template>
  <v-data-table
      :mobile="$vuetify.display.mobile"
      hide-default-footer
      height="320px"
      fixed-header
      density="compact"
      :items="players"
  >
    <template #item.goles="{item}">
      <v-number-input
          min-width="100"
          :min="0"
          :model-value="item.goles"
          control-variant="stacked"
          density="compact"
          @update:model-value="(value) => updatePlayerGoals(item, value)"
      />
    </template>
    <template #item.tarjetas>
      <v-select :items="[{text: 'Amarilla', value: 'yellow'}, {text: 'Roja por doble Amarilla', value: 'doble-card'}, {text: 'Roja directa', value: 'red'}]"
                variant="outlined"
                density="compact"
                :max-width="minWidth"
                :min-width="minWidth"
                item-value="value"
                item-title="text"
                clearable
                single-line

      >
        <template v-slot:item="{ props: itemProps, item }">
          <v-list-item v-bind="itemProps">
            <template #title="{title}">
              <div v-if="title ==='Amarilla'">
                <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
              </div>
              <div v-else-if="title === 'Roja por doble Amarilla'">
                <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
                <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
              </div>
              <div v-else-if="title === 'Roja directa'">
                <Icon name="mdi:cards" class="bg-red-lighten-1" size="16"></Icon>
              </div>
            </template>
            <template #subtitle>
              {{ itemProps.title }}
            </template>
          </v-list-item>
        </template>
        <template #selection="{item}">
          <div v-if="item.value ==='yellow'">
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
          </div>
          <div v-else-if="item.value === 'doble-card'">
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
          </div>
          <div v-else-if="item.value === 'red'">
            <Icon name="mdi:cards" class="bg-red-lighten-1" size="16"></Icon>
          </div>
        </template>
      </v-select>
    </template>
    <template #item.sustitucion="{item}">
      <v-select
          placeholder="seleccione a un jugador"
          variant="outlined"
          density="compact"
          single-line
          :max-width="minWidth"
          :min-width="minWidth"
          :items="players"
          item-value="Jugador"
          item-title="Jugador"
          @update:modelValue="() => alert('test')"
      >
      </v-select>
    </template>
  </v-data-table>
</template>