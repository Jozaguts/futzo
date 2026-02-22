<script setup lang="ts">
import type {Game} from '~/models/Game'

const props = defineProps<{ game?: Game }>()

  const badgePalette = ['#ef4444', '#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
  const statusMap: Record<string, { label: string; tone: 'success' | 'warning' | 'neutral' | 'error' }> = {
    completado: { label: 'Completado', tone: 'success' },
    en_progreso: { label: 'En progreso', tone: 'warning' },
    programado: { label: 'Programado', tone: 'neutral' },
    aplazado: { label: 'Aplazado', tone: 'error' },
    cancelado: { label: 'Cancelado', tone: 'error' },
  }

  const resolveTeamShort = (teamName?: string) => {
    if (!teamName) {
      return '---'
    }
    const words = teamName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
    if (!words.length) {
      return '---'
    }
    if (words.length === 1) {
      return words[0].slice(0, 3).toUpperCase()
    }
    return `${words[0][0]}${words[1][0]}${words[words.length - 1][0]}`.toUpperCase()
  }

  const resolveBadgeColor = (teamId?: number) => {
    if (!teamId || Number.isNaN(teamId)) {
      return badgePalette[0]
    }
    return badgePalette[Math.abs(teamId) % badgePalette.length]
  }

  const status = computed(() => statusMap[props.game?.status ?? 'programado'] ?? statusMap.programado)
  const homeShort = computed(() => resolveTeamShort(props.game?.home?.name))
  const awayShort = computed(() => resolveTeamShort(props.game?.away?.name))
  const homeColor = computed(() => resolveBadgeColor(props.game?.home?.id))
  const awayColor = computed(() => resolveBadgeColor(props.game?.away?.id))
  const matchMeta = computed(() => {
    const chunks = [
      props.game?.details?.date,
      props.game?.details?.raw_time,
      props.game?.details?.location?.name,
      props.game?.details?.field?.name,
    ].filter((value) => Boolean(value))
    return chunks.join(' · ')
  })
</script>

<template>
  <section class="game-summary futzo-rounded" data-testid="game-report-summary">
    <header class="game-summary__header">
      <p class="game-summary__round">Jornada {{ game?.round ?? '-' }}</p>
      <v-chip size="small" variant="tonal" class="game-summary__status" :class="`game-summary__status--${status.tone}`">
        {{ status.label }}
      </v-chip>
    </header>

    <div class="game-summary__score">
      <div class="game-summary__team">
        <div class="game-summary__team-badge" :style="{ backgroundColor: homeColor }">{{ homeShort }}</div>
        <p class="game-summary__team-name">{{ game?.home?.name ?? 'Equipo local' }}</p>
      </div>

      <div class="game-summary__value">
        <span>{{ game?.home?.goals ?? 0 }}</span>
        <small>-</small>
        <span>{{ game?.away?.goals ?? 0 }}</span>
      </div>

      <div class="game-summary__team">
        <div class="game-summary__team-badge" :style="{ backgroundColor: awayColor }">{{ awayShort }}</div>
        <p class="game-summary__team-name">{{ game?.away?.name ?? 'Equipo visitante' }}</p>
      </div>
    </div>

    <footer class="game-summary__meta">
      {{ matchMeta || 'Fecha, horario y sede por confirmar.' }}
    </footer>
  </section>
</template>

<style scoped lang="sass">
  .game-summary
    border: 1px solid var(--futzo-border)
    background: var(--futzo-surface)
    padding: 14px
    display: flex
    flex-direction: column
    gap: 12px

  .game-summary__header
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px

  .game-summary__round
    margin: 0
    font-size: 13px
    color: var(--futzo-on-surface-muted)
    font-weight: 600

  .game-summary__status
    font-size: 11px
    font-weight: 600

  .game-summary__status--success
    color: #067647
    background: #ecfdf3

  .game-summary__status--warning
    color: #b54708
    background: #fffaeb

  .game-summary__status--neutral
    color: var(--futzo-text-muted)
    background: #f2f4f7

  .game-summary__status--error
    color: #b42318
    background: #fef3f2

  .game-summary__score
    display: grid
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr)
    align-items: center
    gap: 12px

  .game-summary__team
    min-width: 0
    text-align: center

  .game-summary__team-badge
    width: 56px
    height: 56px
    border-radius: 14px
    color: var(--futzo-on-surface)
    font-size: 18px
    font-weight: 700
    display: inline-flex
    align-items: center
    justify-content: center

  .game-summary__team-name
    margin: 8px 0 0
    font-size: 14px
    font-weight: 600
    color: var(--futzo-on-surface)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .game-summary__value
    display: flex
    align-items: center
    gap: 8px
    color: #1d2939

  .game-summary__value span
    font-size: 48px
    font-weight: 700
    line-height: 1

  .game-summary__value small
    font-size: 28px
    line-height: 1
    color: #98a2b3

  .game-summary__meta
    margin: 0
    font-size: 13px
    text-align: center
    color: var(--futzo-on-surface-muted)
    border-top: 1px solid var(--futzo-border-strong)
    padding-top: 10px

  @media (max-width: 600px)
    .game-summary__team-badge
      width: 52px
      height: 52px
      border-radius: 12px
      font-size: 16px

    .game-summary__team-name
      font-size: 12px

    .game-summary__value span
      font-size: 40px
</style>
