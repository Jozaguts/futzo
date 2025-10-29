<script lang="ts" setup>
  import SearchInput from '~/components/pages/torneos/app-bar-search-input.vue'
  import CatBtn from '~/components/pages/torneos/app-bar-cat-btn.vue'
  import type { TournamentStatus } from '~/models/tournament'

  const tournamentStore = useTournamentStore()
  const { statusFilters } = storeToRefs(tournamentStore)

  const STATUS_VALUES: TournamentStatus[] = ['creado', 'en curso', 'completado', 'cancelado']
  const statusLabels: Record<TournamentStatus, string> = {
    creado: 'Creado',
    'en curso': 'En curso',
    completado: 'Completado',
    cancelado: 'Cancelado',
  }
  const statusItems = STATUS_VALUES.map((status) => ({
    title: statusLabels[status],
    value: status,
  }))

  const statusModel = computed<TournamentStatus | null>({
    get() {
      return statusFilters.value[0] ?? null
    },
    set(value) {
      if (value === null) {
        if (!statusFilters.value.length) {
          return
        }
        void tournamentStore.applyStatusFilter()
        return
      }
      if (statusFilters.value[0] === value) {
        return
      }
      void tournamentStore.applyStatusFilter([value])
    },
  })
</script>
<template>
  <div class="d-none d-md-flex d-lg-flex">
    <SearchInput />
    <v-select
      v-model="statusModel"
      :items="statusItems"
      item-title="title"
      item-value="value"
      chips
      hide-details
      clearable
      label="Estado"
      density="compact"
      variant="outlined"
      class="app-bar-secondary-btn mr-4"
      min-width="220"
      max-width="220"
    >
      <template v-slot:item="{ props: itemProps }">
        <v-list-item v-bind="itemProps" />
      </template>
      <template #selection="{ item, index }">
        <span class="app-bar-secondary-btn__input_text">
          <v-chip>
            {{ item.title }}
          </v-chip>
        </span>
      </template>
    </v-select>
    <CatBtn />
  </div>
</template>
