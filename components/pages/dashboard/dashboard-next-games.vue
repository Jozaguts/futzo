<script lang="ts" setup>
const desserts = [
  {
    name: "Frozen Yogurt",
    calories: 159,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
  },
  {
    name: "Eclair",
    calories: 262,
  },
  {
    name: "Cupcake",
    calories: 305,
  },
];
</script>
<template>
  <div class="dashboard-game-container">
    <div class="dashboard-teams">
      <div class="dashboard-team-local">
        <img
          src="https://placehold.co/50x50"
          alt="team logo"
          class="dashboard-logo"
        />
        <span class="dashboard-team_name">Equipo 1</span>
      </div>
      <div class="dashboard-vs-container">
        <div class="dashboard-vs">vs</div>
      </div>
      <div class="dashboard-team-away">
        <img
          src="https://placehold.co/50x50"
          alt="team logo"
          class="dashboard-logo"
        />
        <span class="dashboard-team_name">Equipo 1</span>
      </div>
    </div>
    <div class="dashboard-data">
      <span class="dashboard-date">24/06/2024</span>
      <span class="dashboard-hour">10:00</span>
      <span class="dashboard-field">Campo 1</span>
    </div>
    <div class="dashboard-btn-container">
      <v-btn variant="text" :ripple="false" to="/torneos">
        <span class="dashboard-btn-text"> Ver detalles</span>
        <template #append>
          <nuxt-icon name="arrow-right" filled />
        </template>
      </v-btn>
    </div>
  </div>
</template>
