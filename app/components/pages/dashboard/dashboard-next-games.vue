<script lang="ts" setup>
import {Icon} from '#components'

defineProps({
    game: {
      type: Object,
      required: true,
    },
  })
</script>
<template>
  <div class="next-game-card">
    <div class="next-game-card__time">
      <span class="next-game-card__date">{{ game.match_date }}</span>
      <span class="next-game-card__hour">{{ game.match_time }}</span>
    </div>
    <div class="next-game-card__teams">
      <div class="next-game-card__team">
        <img :src="game.home_team.image" alt="team logo" class="next-game-card__logo" />
        <span class="next-game-card__team-name">{{ game.home_team.name }}</span>
      </div>
      <span class="next-game-card__vs">vs</span>
      <div class="next-game-card__team">
        <img :src="game.away_team.image" alt="team logo" class="next-game-card__logo" />
        <span class="next-game-card__team-name">{{ game.away_team.name }}</span>
      </div>
    </div>
    <div class="next-game-card__meta">
      <div class="next-game-card__field">
        <Icon name="lucide:map-pin" size="14" />
        <span>{{ game.location?.name ?? 'Sin sede' }}</span>
      </div>
      <v-chip class="next-game-card__chip" size="small" variant="tonal" color="primary">
        {{ game.tournament?.name ?? 'Torneo' }}
      </v-chip>
    </div>
  </div>
</template>
