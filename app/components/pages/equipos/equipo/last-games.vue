<script lang="ts" setup>
  import type { LastGames } from '~/models/Game'

  const props = defineProps({
    lastGames: {
      type: Array as PropType<LastGames[]>,
      default: () => [],
    },
    highlightedMatchId: {
      type: Number,
      default: null,
    },
  })
  const isHighlighted = (gameId: number) => props.highlightedMatchId === gameId
</script>
<template>
  <table>
    <tbody>
      <tr
        class="next-games-today-table__cell"
        v-for="game in props.lastGames"
        :key="game?.id"
        :class="{ 'next-games-today-table__cell--highlight': isHighlighted(game?.id ?? 0) }"
      >
        <td class="team">
          <img :src="game?.homeTeam?.image" alt="team logo" class="logo" />
          <span class="team_name d-inline-block text-truncate" style="max-width: 100px">
            {{ game?.homeTeam?.name }}</span
          >
        </td>

        <td class="data">
          <div>
            <small class="team_name d-inline-block text-truncate" style="max-width: 100px">{{ game.date }}</small>
          </div>
          <div
            class="result"
            :class="{
              'result--highlight': isHighlighted(game?.id ?? 0),
              'bg-green': game?.homeTeam?.id === game.winner_team_id,
              'bg-red': game?.awayTeam?.id === game.winner_team_id,
              'bg-black': !game?.winner_team_id,
            }"
          >
            <div class="text">{{ game.home_goals }} : {{ game.away_goals }}</div>
          </div>
          <small>Jornada: {{ game?.round }}</small>
        </td>
        <td class="team">
          <img :src="game.awayTeam.image" alt="team logo" class="logo" />
          <span class="team_name d-inline-block text-truncate" style="max-width: 100px">{{ game?.awayTeam.name }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss" scoped>
  @use '~/assets/scss/components/last-game-table';

  .next-games-today-table__cell--highlight {
    border: 2px solid var(--Colors-Primary-primary-600, #53389e);
    box-shadow: 0 0 0 2px rgba(83, 56, 158, 0.15);
  }

  .result--highlight {
    border: 2px solid var(--Colors-Primary-primary-600, #53389e);
  }
</style>
