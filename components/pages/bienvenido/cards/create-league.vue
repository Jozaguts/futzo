<script setup lang="ts">
const leagueName = ref('')
</script>
<template>
  <v-card class="welcome-card">
    <v-card-item class="d-flex align-center justify-center pt-0">
      <v-card-title class="d-flex  justify-center">
        <div class="icon-container">
          <nuxt-icon  name="trophy-01" filled></nuxt-icon>
<!--          <nuxt-icon else name="league-created" filled></nuxt-icon>-->
        </div>
      </v-card-title>
      <v-card-title class="welcome-card__subtitle">
        <span> Vamos a crear tu primer liga</span>
<!--        <p class="welcome-card__subtitle__">Ya puedes empezar a planificar tu liga.</p>-->
      </v-card-title>
    </v-card-item>
    <v-card-text class="w-100 d-flex flex-column align-center">
      <v-form class="w-100" @submit.prevent="$emit('event', {action: 'create-league',params: {leagueName}})" fast-fail>
        <label for="league" >
          Nombra tu liga
        </label>
        <v-text-field
            :rules="[
                   value => {
                     if (value.length > 5) return true
                     return 'El nombre debe tener al menos 6 caracteres.'
                 },
               ]"
            v-model="leagueName"
            variant="outlined"
            placeholder="P. ej. Liga Vallarta"
            width="100%"
            class="create-league-input"
            density="compact"
        >
        </v-text-field>
        <v-btn
            class="ml-auto mb-5  create-league-btn"
            color="primary"
            variant="elevated"
            size="x-large"
            density="compact"
            block
            type="submit"
            :disabled="leagueName.length < 5"
        >
         Crear liga
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>