<script lang="ts" setup>
  import type { LastGames } from '~/models/Game'

  const { lastGames } = defineProps({
    lastGames: Array as PropType<LastGames[]>,
  })
</script>
<template>
  <table>
    <tbody>
      <tr class="next-games-today-table__cell" v-for="game in lastGames" :key="game?.id">
        <td class="team">
          <img :src="game?.homeTeam?.image" alt="team logo" class="logo" />
          <span class="team_name d-inline-block text-truncate" style="max-width: 120px">
            {{ game?.homeTeam?.name }}</span
          >
        </td>
        <td class="data">
          <div
            class="result"
            :class="{
              'bg-green': game?.homeTeam?.id === game.winner_team_id,
              'bg-red': game?.awayTeam?.id === game.winner_team_id,
              'bg-black': !game?.winner_team_id,
            }"
          >
            <div class="text">{{ game.home_goals }} : {{ game.away_goals }}</div>
          </div>
        </td>
        <td class="team">
          <img :src="game.awayTeam.image" alt="team logo" class="logo" />
          <span class="team_name d-inline-block text-truncate" style="max-width: 120px">{{ game?.awayTeam.name }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss" scoped>
  @use 'assets/scss/components/last-game-table';
</style>
