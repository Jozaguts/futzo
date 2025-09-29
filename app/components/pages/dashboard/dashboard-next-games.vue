<script lang="ts" setup>
  defineProps({
    game: {
      type: Object,
      required: true,
    },
  })
</script>
<template>
  <div class="dashboard-game-container">
    <div class="dashboard-teams">
      <div class="dashboard-team-local">
        <img :src="game.home_team.image" alt="team logo" class="dashboard-logo" />
        <span class="dashboard-team_name">{{ game.home_team.name }}</span>
      </div>
      <div class="dashboard-vs-container">
        <div class="dashboard-vs">vs</div>
      </div>
      <div class="dashboard-team-away">
        <img :src="game.away_team.image" alt="team logo" class="dashboard-logo" />
        <span class="dashboard-team_name">{{ game.away_team.name }}</span>
      </div>
    </div>
    <div class="dashboard-data">
      <span class="dashboard-date">{{ game.match_date }}</span>
      <span class="dashboard-hour">{{ game.match_time }}</span>
      <span class="dashboard-field">{{ game.location.name }}</span>
    </div>
    <div class="dashboard-btn-container">
      <v-btn variant="text" :ripple="false" to="/torneos">
        <span class="dashboard-btn-text"> Ver detalles</span>
        <template #append>
          <Icon name="futzo-icon:arrow-right" />
        </template>
      </v-btn>
    </div>
  </div>
</template>
