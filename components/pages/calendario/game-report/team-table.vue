<script lang="ts" setup>
import {useGameStore} from "~/store";
import type {Header} from "~/interfaces";

type Props = {
  teamType: 'home' | 'away'
}
const headers: Header[] = [
  {title: '#', value: '#'},
  {title: 'Jugador', value: 'Jugador',},
  {title: 'Goles', value: 'goles',},
  {title: 'Tarjetas', value: 'tarjetas'}
]
const {teamType} = withDefaults(defineProps<Props>(), {
  teamType: 'home'
})
const {gamePlayers} = storeToRefs(useGameStore())
type PlayerForm = {
  '#': number
  Jugador: string
  goles: number
  tarjetas: string[]
}

const teamPlayersDetails = {
  tarjetas: [],
  sustituciones: [],
}
const minWidth = computed(() => {
  return useDisplay().mobile ? '230' : '130'
})
const updateHandler = (type: 'goals' | 'cards', item: PlayerForm, value: number | string) => {
  console.log(`Updating ${type} for player ${item.Jugador} with value:`, value);
}
const players = computed(() => {
  if (gamePlayers.value[teamType] === undefined) {
    return []
  }
  
  return gamePlayers.value[teamType]?.players.map((player, index) => ({
    '#': index + 1,
    Jugador: player.name,
    goles: player.goals || 0,
    tarjetas: teamPlayersDetails.tarjetas.filter(card => card.playerId === player.id).map(card => card.type)
  }))
})
</script>
<template>
  <v-data-table
      :mobile="$vuetify.display.mobile"
      hide-default-footer
      height="320px"
      fixed-header
      :headers="headers"
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
          @update:model-value="(value) => updateHandler('goals', item, value)"
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
  </v-data-table>
</template>