<script setup lang="ts">
  import { useGameStore, useTournamentStore } from '~/store'
  import type { HeadAndSubsGamePlayer } from '~/models/Game'
  const { headlines = [], substitutes = [] } = defineProps<{
    headlines: HeadAndSubsGamePlayer[]
    substitutes: HeadAndSubsGamePlayer[]
  }>()
  const { tournament } = toRefs(useTournamentStore())
  const { substitutions } = toRefs(useGameStore())
  const addChange = () => {
    if (!disabled.value) {
      substitutions.value.push({ in: null, out: null, minute: null })
    }
  }
  const disabled = computed(() => {
    return (
      substitutions.value.length >= tournament.value.substitutions_per_team ||
      substitutions.value.some((change) => !change.in || !change.out || !change.minute)
    )
  })
</script>
<template>
  <v-container class="positon-relative" v-auto-animate>
    <v-row v-for="(change, index) in substitutions" :key="index">
      <v-col cols="12" md="4" lg="4">
        <v-autocomplete
          label="Entró"
          min-width="100%"
          placeholder="Selecciona un jugador"
          return-object
          density="compact"
          item-title="user.name"
          v-model="change.in"
          :items="substitutes"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-autocomplete
          min-width="100%"
          return-object
          label="Salió"
          placeholder="Selecciona un jugador"
          density="compact"
          item-title="user.name"
          v-model="change.out"
          :items="headlines"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <div class="d-flex align-center justify-center">
          <v-text-field
            label="Minuto"
            v-model="change.minute"
            placeholder="Minuto"
            type="number"
            step="5"
            min="1"
            density="compact"
            :max="120"
          ></v-text-field>
          <v-btn
            v-if="index === substitutions.length - 1"
            icon="mdi-plus"
            variant="text"
            :disabled="disabled"
            density="compact"
            class="ml-2"
            @click="addChange"
          ></v-btn>
          <v-btn
            v-if="index !== substitutions.length - 1"
            icon="mdi-minus"
            color="secondary"
            variant="text"
            density="compact"
            class="ml-2"
            @click="substitutions.splice(index, 1)"
          ></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
