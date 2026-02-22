<script lang="ts" setup>
import {Icon} from '#components'
import InitialsAvatar from '~/components/shared/InitialsAvatar.vue'

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
        <InitialsAvatar
          :image="game.home_team.image"
          :name="game.home_team.name"
          :fallback-color="game.home_team?.colors?.home?.primary"
          class="next-game-card__logo"
        />
        <span class="next-game-card__team-name">{{ game.home_team.name }}</span>
      </div>
      <span class="next-game-card__vs">vs</span>
      <div class="next-game-card__team">
        <InitialsAvatar
          :image="game.away_team.image"
          :name="game.away_team.name"
          :fallback-color="game.away_team?.colors?.home?.primary"
          class="next-game-card__logo"
        />
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
