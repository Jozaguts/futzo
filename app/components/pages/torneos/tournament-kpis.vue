<script lang="ts" setup>
  import type { TournamentSummary } from '~/models/tournament'
  import { Icon } from '#components'

  const props = defineProps<{
    summary: TournamentSummary
  }>()

  const cards = computed(() => [
    {
      key: 'total',
      label: 'Total',
      value: props.summary.total,
      icon: 'mdi-trophy-outline',
      tone: 'primary',
    },
    {
      key: 'active',
      label: 'Activos',
      value: props.summary.active,
      icon: 'mdi-play-circle-outline',
      tone: 'success',
    },
    {
      key: 'finished',
      label: 'Finalizados',
      value: props.summary.finished,
      icon: 'mdi-check-circle-outline',
      tone: 'secondary',
    },
    {
      key: 'upcoming',
      label: 'Próximos',
      value: props.summary.upcoming,
      icon: 'mdi-clock-outline',
      tone: 'warning',
    },
  ])
</script>

<template>
  <v-card class="tournament-kpis futzo-rounded" >
    <v-card-text>
      <div class="tournament-kpis__row">
        <div v-for="card in cards" :key="card.key" class="tournament-kpis__item">
          <div class="tournament-kpis__icon" :class="`tournament-kpis__icon--${card.tone}`">
            <Icon :name="card.icon" size="16" />
          </div>
          <div class="tournament-kpis__content">
            <div class="tournament-kpis__value">{{ card.value }}</div>
            <div class="tournament-kpis__label">{{ card.label }}</div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
  .tournament-kpis {
    //padding: 8px 16px;
    border-radius: 14px;
  }

  .tournament-kpis__row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 120px));
    gap: 16px;
    grid-template-rows: 80px;
    //padding: 12px 24px;
  }

  .tournament-kpis__item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .tournament-kpis__icon {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: rgba(var(--v-theme-primary), 0.12);
    color: rgb(var(--v-theme-primary));
  }

  .tournament-kpis__icon--success {
    background: rgba(var(--v-theme-success), 0.12);
    color: rgb(var(--v-theme-success));
  }

  .tournament-kpis__icon--secondary {
    background: rgba(var(--v-theme-secondary), 0.12);
    color: rgb(var(--v-theme-secondary));
  }

  .tournament-kpis__icon--warning {
    background: rgba(var(--v-theme-warning), 0.12);
    color: rgb(var(--v-theme-warning));
  }

  .tournament-kpis__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .tournament-kpis__value {
    font-size: 18px;
    font-weight: 700;
  }

  .tournament-kpis__label {
    font-size: 12px;
    color: #667085;
  }

  @media (max-width: 960px) {
    .tournament-kpis__row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
  }
</style>
