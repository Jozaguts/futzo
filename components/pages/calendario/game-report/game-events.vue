<script setup lang="ts">
  import type { GameEvents } from '~/models/Game'
  import StartGame from '~/components/pages/calendario/game-report/events/start-game.vue'
  import CardEvent from '~/components/pages/calendario/game-report/events/card-event.vue'
  import GoalEvent from '~/components/pages/calendario/game-report/events/goal-event.vue'
  import SubstitutionEvent from '~/components/pages/calendario/game-report/events/substitution-event.vue'
  import { getGameEvents } from '~/http/api/game'
  import { useGameStore } from '~/store'
  const { game } = storeToRefs(useGameStore())
  const events = ref<GameEvents[]>([])
  const noGameEvents = computed(() => {
    return events.value.length === 0
  })
  onMounted(async () => {
    events.value = await getGameEvents(game.value.id)
  })
</script>
<template>
  <v-row class="mt-4" v-if="noGameEvents">
    <v-col cols="12" class="text-center">
      <h3 class="text-h5">No hay eventos registrados</h3>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12" v-for="(event, index) in events" :key="index">
      <CardEvent :event="event" v-if="event.type === 'yellow_card' || event.type == 'red_card'" />
      <SubstitutionEvent :event="event" v-if="event.type === 'substitution'" />
      <GoalEvent
        :event="event"
        v-if="event.type === 'goal' || event.type === 'penalty_kick' || event.type === 'own_goal'"
      ></GoalEvent>
    </v-col>
    <v-col cols="12">
      <StartGame :time="game.details.raw_time" />
    </v-col>
  </v-row>
</template>
