<script lang="ts" setup></script>
<template>
  <v-card class="welcome-card" width="490">
    <v-card-item class="d-flex align-center justify-center pt-0">
      <v-card-title class="d-flex justify-center">
        <Icon
          class="check-verified-green"
          name="futzo-icon:check-verified-green"
        ></Icon>
      </v-card-title>
      <v-card-title class="welcome-card__subtitle">
        <span>Tu liga ha sido creada</span>
        <p class="welcome-card__subtitle__">
          Ya puedes empezar a planificar tu liga.
        </p>
      </v-card-title>
    </v-card-item>
    <v-card-text class="w-100 d-flex flex-column align-center">
      <v-form
        class="w-100"
        @submit.prevent="$emit('event', { action: 'league-created' })"
        fast-fail
      >
        <v-btn
          class="ml-auto create-league-btn"
          color="primary"
          variant="elevated"
          size="x-large"
          density="compact"
          block
          type="submit"
        >
          Empezar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<style>
.nuxt-icon.check-verified-green svg {
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  margin-bottom: 40px;
}
</style>
