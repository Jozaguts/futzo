<script lang="ts" setup>
  import type { TournamentStatus, TournamentStatusItem } from '~/models/tournament'
  import { useToast } from '~/composables/useToast'

  const { tournament } = storeToRefs(useTournamentStore())
  const items: TournamentStatusItem[] = [
    { value: 'creado', text: 'Creado', disabled: true },
    { value: 'en curso', text: 'En curso', disabled: false },
    { value: 'completado', text: 'Completado', disabled: false },
    { value: 'cancelado', text: 'Cancelado', disabled: false },
  ]
  const updateTournamentStatusHandler = (value: TournamentStatus) => {
    useTournamentStore()
      .updateTournamentStatus(value)
      .then(() => {
        useToast().toast('success', 'Torneo', 'Estado del torneo actualizado correctamente')
      })
  }
</script>
<template>
  <v-select
    class="app-bar-secondary-btn mr-4"
    width="170"
    item-title="text"
    density="compact"
    item-value="value"
    label="Marcar como"
    variant="outlined"
    v-model="tournament.status"
    :items="items"
    :item-props="true"
    @update:model-value="updateTournamentStatusHandler"
  >
    <template #selection="{ item }"
      ><span class="app-bar-secondary-btn__input_text">{{ item.title }}</span></template
    >
  </v-select>
</template>
<style></style>
