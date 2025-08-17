<script lang="ts" setup>
  import type { Header } from '~/interfaces'
  import type { GameTeamPlayer, TeamType } from '~/models/Game'

  type Props = {
    teamType: TeamType
  }
  const headers: Header[] = [
    { title: '#', value: '#' },
    { title: 'Posicion', value: 'position' },
    { title: 'Jugador', value: 'name' },
    { title: 'Tarjetas', value: 'tarjetas' },
  ]
  const props = withDefaults(defineProps<Props>(), {
    teamType: 'home',
  })
  const { gamePlayers, game } = storeToRefs(useGameStore())
  const minWidth = computed(() => {
    return useDisplay().mobile ? '230' : '130'
  })
  const updateHandler = (type: 'goals' | 'cards', item: GameTeamPlayer, value: number | string) => {
    game.value[props.teamType].goals = gamePlayers.value[props.teamType].players.reduce(
      (acc, player) => acc + player.goals,
      0
    ) as number
  }
  const cardTypes = [
    { value: 'yellow-card', text: 'Amarilla' },
    { value: 'doble-card', text: 'Roja por doble Amarilla' },
    { value: 'red-card', text: 'Roja directa' },
  ]
</script>
<template>
  <v-data-table
    :mobile="$vuetify.display.mobile"
    hide-default-footer
    height="320px"
    fixed-header
    :headers="headers"
    density="compact"
    :items="gamePlayers[props.teamType].players"
  >
    <template #item.goles="{ item }">
      <v-number-input
        min-width="100"
        :min="0"
        v-model="item.goals"
        control-variant="stacked"
        density="compact"
        @update:model-value="updateHandler('goals', item, $event)"
      />
    </template>

    <template #item.tarjetas="{ item }">
      <v-select
        :items="cardTypes"
        variant="outlined"
        density="compact"
        :max-width="minWidth"
        :min-width="minWidth"
        item-value="value"
        item-title="text"
        clearable
        single-line
        v-model="item.cards"
      >
        <template v-slot:item="{ props: itemProps, item }">
          <v-list-item v-bind="itemProps">
            <template #title="{ title }">
              <div v-if="title === 'Amarilla'">
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
        <template #selection="{ item }">
          <div v-if="item.value === 'yellow-card'">
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
          </div>
          <div v-else-if="item.value === 'doble-card'">
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
            <Icon name="mdi:cards" class="bg-yellow-lighten-1" size="16"></Icon>
          </div>
          <div v-else-if="item.value === 'red-card'">
            <Icon name="mdi:cards" class="bg-red-lighten-1" size="16"></Icon>
          </div>
        </template>
      </v-select>
    </template>
  </v-data-table>
</template>
