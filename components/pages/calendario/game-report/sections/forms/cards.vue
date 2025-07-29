<script setup lang="ts">
  import type { GameEvent, GameTeamPlayer } from '~/models/Game'
  import { useGameStore } from '~/store'
  const { players = [] } = defineProps<{
    players: GameTeamPlayer[]
  }>()
  const events = defineModel<GameEvent[]>('events', {
    default: () => [{ player_id: null, event_id: null, minute: null }],
  })
  const { gameActionFormRequest } = storeToRefs(useGameStore())
  const removeEvent = (index: number) => {
    const event = events.value[index]
    if (event?.id) {
      console.log('Removing event:', event)
      useGameStore()
        .removeCardEvent(event.id)
        .then(() => {
          events.value.splice(index, 1)
        })
    }
  }
  const addEvent = () => {
    events.value.push({ player_id: null, minute: null, type: null })
  }
  const eventTypes = [
    { value: 'yellow_card', name: 'Tarjeta Amarilla' },
    { value: 'red_card', name: 'Tarjeta Roja' },
    { value: 'second_yellow_card', name: 'Segunda Tarjeta Amarilla' },
  ]
  const disabled = computed(() => {
    return events.value.some((event) => !event.player_id || !event.type || !event.minute)
  })
  watch(disabled, () => {
    if (gameActionFormRequest.value.action === 'cards') {
      gameActionFormRequest.value.disabled = events.value.some(
        (event) => !event.player_id || !event.type || !event.minute
      )
    }
  })

  onUnmounted(() => {
    events.value = [{ player_id: null, minute: null, type: null }]
    gameActionFormRequest.value.disabled = true
    gameActionFormRequest.value.loading = false
  })
</script>
<template>
  <v-container class="positon-relative" v-auto-animate>
    <v-row v-for="(event, index) in events" :key="index">
      <v-col cols="12" md="4" lg="4">
        <v-autocomplete
          label="Jugador"
          min-width="100%"
          placeholder="Selecciona un jugador"
          item-value="id"
          density="compact"
          clearable
          hide-selected
          item-title="name"
          v-model="event.player_id"
          :items="players"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-autocomplete
          label="Tarjeta"
          min-width="100%"
          item-value="value"
          density="compact"
          clearable
          hide-selected
          item-title="name"
          v-model="event.type"
          :items="eventTypes"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <div class="d-flex align-center justify-center">
          <v-text-field
            label="Minuto"
            v-model="event.minute"
            placeholder="Minuto"
            type="number"
            min="1"
            density="compact"
            :max="120"
          ></v-text-field>
          <v-btn
            v-if="index === events.length - 1"
            icon="mdi-plus"
            variant="text"
            density="compact"
            class="ml-2"
            @click="addEvent"
          ></v-btn>
          <v-btn
            icon="mdi-minus"
            color="secondary"
            variant="text"
            density="compact"
            class="ml-2"
            @click="() => removeEvent(index)"
          ></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
