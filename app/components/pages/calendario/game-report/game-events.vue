<script setup lang="ts">
import type {GameEvents} from '~/models/Game'
import {getGameEvents} from '~/http/api/game'
import {useToast} from '~/composables/useToast'

const { game } = storeToRefs(useGameStore())
  const { toast } = useToast()
  const loading = ref(false)
  const events = ref<GameEvents[]>([])

  const noGameEvents = computed(() => events.value.length === 0)
  const sortedEvents = computed(() => [...events.value].sort((a, b) => a.minute - b.minute))

  const resolveEventStyle = (type: string) => {
    switch (type) {
      case 'goal':
      case 'penalty_kick':
      case 'own_goal':
        return { icon: 'lucide:circle-dot', tone: 'goal' }
      case 'yellow_card':
        return { icon: 'lucide:square', tone: 'yellow' }
      case 'red_card':
        return { icon: 'lucide:square', tone: 'red' }
      case 'substitution':
        return { icon: 'lucide:refresh-cw', tone: 'change' }
      default:
        return { icon: 'lucide:circle', tone: 'default' }
    }
  }

  const teamShort = (teamName?: string) => {
    if (!teamName) {
      return '---'
    }
    return teamName
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 3)
      .toUpperCase()
  }

  const loadEvents = async (gameId?: number) => {
    if (!gameId) {
      events.value = []
      return
    }
    loading.value = true
    try {
      events.value = await getGameEvents(gameId)
    } catch {
      events.value = []
      toast({
        type: 'error',
        msg: 'Eventos del partido',
        description: 'No se pudieron cargar los eventos del partido.',
      })
    } finally {
      loading.value = false
    }
  }

  watch(
    () => game.value?.id,
    async (gameId) => {
      await loadEvents(gameId)
    },
    { immediate: true }
  )
</script>

<template>
  <section class="game-events" data-testid="game-events">
    <div v-if="loading" class="game-events__state">
      <v-progress-circular indeterminate size="22" width="2" />
      <span>Cargando cronología...</span>
    </div>

    <div v-else-if="noGameEvents" class="game-events__state game-events__state--empty">
      <Icon name="lucide:target" size="24" />
      <p>No hay eventos registrados</p>
      <small>Registra goles, tarjetas y sustituciones para este partido.</small>
    </div>

    <div v-else class="game-events__list">
      <article
        v-for="event in sortedEvents"
        :key="event.id"
        class="game-events__item"
        :class="`game-events__item--${event.team_id === game?.home?.id ? 'home' : 'away'}`"
      >
        <span class="game-events__minute">{{ event.minute }}'</span>
        <Icon
          :name="resolveEventStyle(event.type).icon"
          size="16"
          class="game-events__icon"
          :class="`game-events__icon--${resolveEventStyle(event.type).tone}`"
        />
        <span class="game-events__player">{{ event.player?.user?.name }} {{ event.player?.user?.last_name ?? '' }}</span>
        <span class="game-events__team">{{ teamShort(event.team?.name) }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped lang="sass">
  .game-events
    display: flex
    flex-direction: column
    gap: 10px

  .game-events__state
    min-height: 128px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 6px
    text-align: center
    color: var(--futzo-on-surface-muted)

  .game-events__state p
    margin: 0
    color: #344054
    font-size: 14px
    font-weight: 600

  .game-events__state small
    font-size: 12px
    color: var(--futzo-on-surface-muted)

  .game-events__list
    display: flex
    flex-direction: column
    gap: 8px

  .game-events__item
    display: grid
    grid-template-columns: 40px 20px minmax(0, 1fr) 40px
    align-items: center
    gap: 10px
    border-radius: 10px
    padding: 10px 12px

  .game-events__item--home
    background: #f9fafb

  .game-events__item--away
    background: #f9f5ff

  .game-events__minute
    font-size: 13px
    font-weight: 500
    color: var(--futzo-on-surface-muted)
    text-align: right

  .game-events__icon
    color: var(--futzo-on-surface-muted)

  .game-events__icon--goal
    color: var(--futzo-on-surface)

  .game-events__icon--yellow
    color: #ca8504

  .game-events__icon--red
    color: #b42318

  .game-events__icon--change
    color: #6941c6

  .game-events__player
    font-size: 14px
    color: var(--futzo-on-surface)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .game-events__team
    font-size: 12px
    font-weight: 600
    color: var(--futzo-on-surface-muted)
    text-align: right
</style>
