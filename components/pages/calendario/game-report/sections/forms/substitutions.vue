<script setup lang="ts">
  import { useGameStore, useTournamentStore } from '~/store'
  import type { HeadAndSubsGamePlayer, Substitution } from '~/models/Game'
  const { headlines = [], substitutes = [] } = defineProps<{
    headlines: HeadAndSubsGamePlayer[]
    substitutes: HeadAndSubsGamePlayer[]
  }>()
  const substitutions = defineModel<Substitution[]>('substitutions', {
    default: () => [{ player_in_id: null, player_out_id: null, minute: null }],
  })
  const { tournament } = toRefs(useTournamentStore())
  const { gameActionFormRequest } = toRefs(useGameStore())
  const addChange = () => {
    if (!disabled.value) {
      substitutions.value.push({ player_in_id: null, player_out_id: null, minute: null })
    }
  }
  const disabled = computed(() => {
    return (
      substitutions.value.length > tournament.value.substitutions_per_team ||
      substitutions.value.some((change) => !change.player_in_id || !change.player_out_id || !change.minute)
    )
  })
  watch(disabled, () => {
    if (gameActionFormRequest.value.action === 'substitutions') {
      gameActionFormRequest.value.disabled = substitutions.value.some(
        (change) => !change.player_in_id || !change.player_out_id || !change.minute
      )
    }
  })
  onUnmounted(() => {
    substitutions.value = [{ player_in_id: null, player_out_id: null, minute: null }]
    gameActionFormRequest.value.disabled = true
    gameActionFormRequest.value.loading = false
  })
  const removeChange = (index: number) => {
    const change = substitutions.value[index]
    try {
      if (change?.id) {
        useGameStore()
          .removeSubstitution(change.id)
          .then(async () => {
            await useGameStore().getGameDetails()
          })
      }
    } catch (error) {
      console.error('Error removing change:', error)
    } finally {
      if (index === 0) {
        substitutions.value = [{ player_in_id: null, player_out_id: null, minute: null }]
      } else {
        substitutions.value.splice(index, 1)
      }
    }
  }
</script>
<template>
  <v-container class="positon-relative" v-auto-animate>
    <v-row v-for="(change, index) in substitutions" :key="index">
      <v-col cols="12" md="4" lg="4">
        <v-autocomplete
          label="Entró"
          min-width="100%"
          placeholder="Selecciona un jugador"
          item-value="id"
          density="compact"
          clearable
          hide-selected
          item-title="user.name"
          v-model="change.player_in_id"
          :rules="[
            (v) => !!v || 'Jugador requerido',
            (v) => v !== change.player_out_id || !!v || 'No puede ser el mismo jugador',
            (v) => substitutions.every((c, i) => i === index || c.player_in_id !== v) || 'Jugador ya seleccionado',
            (v) => substitutions.every((c, i) => i === index || c.player_out_id !== v) || 'Jugador ya seleccionado',
          ]"
          :items="substitutes"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-autocomplete
          min-width="100%"
          item-value="id"
          label="Salió"
          hide-selected
          :rules="[
            (v) => !!v || 'Jugador requerido',
            (v) => v !== change.player_out_id || !!v || 'No puede ser el mismo jugador',
            (v) => substitutions.every((c, i) => i === index || c.player_in_id !== v) || 'Jugador ya seleccionado',
            (v) => substitutions.every((c, i) => i === index || c.player_out_id !== v) || 'Jugador ya seleccionado',
          ]"
          placeholder="Selecciona un jugador"
          density="compact"
          item-title="user.name"
          clearable
          v-model="change.player_out_id"
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
            min="1"
            density="compact"
            :max="120"
          ></v-text-field>
          <v-btn
            v-if="index === substitutions.length - 1"
            icon="mdi-plus"
            variant="text"
            :disabled="tournament.substitutions_per_team <= substitutions.length"
            density="compact"
            class="ml-2"
            @click="addChange"
          ></v-btn>
          <v-btn
            icon="mdi-minus"
            color="secondary"
            variant="text"
            density="compact"
            class="ml-2"
            @click="() => removeChange(index)"
          ></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
