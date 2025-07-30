<script setup lang="ts">
  import type { GameEvent, GameTeamPlayer } from '~/models/Game'
  import { useGameStore } from '~/store'
  const { players = [] } = defineProps<{
    players: GameTeamPlayer[]
  }>()
  const events = defineModel<GameEvent[]>('events', {
    default: () => [{ player_id: null, type: 'goal', minute: null, related_player_id: null }],
  })
  const { gameActionFormRequest, game } = storeToRefs(useGameStore())
  const removeEvent = (index: number) => {
    const event = events.value[index]
    try {
      if (event?.id) {
        useGameStore()
          .removeGoalEvent(event.id)
          .then(async () => {
            await useGameStore().getGameDetails()
          })
      }
    } catch (error) {
      console.error('Error removing event:', error)
    } finally {
      if (index === 0) {
        events.value = [{ player_id: null, minute: null, type: null, related_player_id: null }]
      } else {
        events.value.splice(index, 1)
      }
    }
  }
  const addEvent = () => {
    events.value.push({ player_id: null, minute: null, type: null, related_player_id: null })
  }
  const eventTypes = [
    { value: 'goal', name: 'Gol' },
    { value: 'own_goal', name: 'Gol en contra' },
    { value: 'penalty_kick', name: 'Penal' },
  ]
  const disabled = computed(() => {
    return events.value.some((event) => !event.player_id || !event.type || !event.minute)
  })
  watch(disabled, () => {
    if (gameActionFormRequest.value.action === 'goals') {
      gameActionFormRequest.value.disabled = events.value.some(
        (event) => !event.player_id || !event.type || !event.minute
      )
    }
  })

  onUnmounted(() => {
    events.value = [{ player_id: null, minute: null, type: 'goal', related_player_id: null }]
    gameActionFormRequest.value.disabled = true
    gameActionFormRequest.value.loading = false
  })
</script>
<template>
  <v-container class="positon-relative" v-auto-animate>
    <v-row v-for="(event, index) in events" :key="index">
      <v-col cols="12" md="3" lg="3">
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
          :rules="[
            (v) => !!v || 'Jugador es requerido',
            (v) => v !== event.related_player_id || 'No puede ser el mismo jugador',
            (v) => v !== null || 'Jugador no puede ser nulo',
            (v) => v !== undefined || 'Jugador no puede ser indefinido',
            (v) => v !== '' || 'Jugador no puede ser vacío',
          ]"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-autocomplete
          label="Asistencia opcional"
          min-width="100%"
          placeholder="Selecciona un jugador"
          item-value="id"
          density="compact"
          clearable
          hide-selected
          item-title="name"
          v-model="event.related_player_id"
          :rules="[(v) => !v || v !== event.player_id || 'No puede ser el mismo jugador']"
          :items="players"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="3" lg="3">
        <v-select
          :items="eventTypes"
          v-model="event.type"
          density="compact"
          hide-selected
          item-value="value"
          item-title="name"
          label="Tipo de gol"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3" lg="3">
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
