<script lang="ts" setup>
  import { useDebounceFn } from '@vueuse/core'
  import SearchInput from '~/components/shared/SearchInput.vue'
  import type { TournamentStatus } from '~/models/tournament'

  type StatusFilterKey = 'all' | 'active' | 'upcoming' | 'finished'
  type FormatFilterKey = 'all' | 'liga' | 'eliminatoria' | 'liga_y_eliminatoria'

  const tournamentStore = useTournamentStore()
  const { search, statusFilters, formatFilter, dialog, pagination } = storeToRefs(tournamentStore)

  const statusMap: Record<Exclude<StatusFilterKey, 'all'>, TournamentStatus[]> = {
    active: ['en curso'],
    upcoming: ['creado'],
    finished: ['completado', 'cancelado'],
  }

  const statusOptions = [
    { title: 'Todos', value: 'all' },
    { title: 'Activos', value: 'active' },
    { title: 'Próximos', value: 'upcoming' },
    { title: 'Finalizados', value: 'finished' },
  ]

  const formatOptions = [
    { title: 'Todos', value: 'all' },
    { title: 'Liga', value: 'liga' },
    { title: 'Eliminatoria', value: 'eliminatoria' },
    { title: 'Liga y Eliminatoria', value: 'liga_y_eliminatoria' },
  ]

  const isSameFilter = (a: TournamentStatus[], b: TournamentStatus[]) => {
    if (a.length !== b.length) {
      return false
    }
    return a.every((value) => b.includes(value))
  }

  const statusModel = computed<StatusFilterKey>({
    get() {
      if (!statusFilters.value.length) {
        return 'all'
      }
      if (isSameFilter(statusFilters.value, statusMap.active)) {
        return 'active'
      }
      if (isSameFilter(statusFilters.value, statusMap.upcoming)) {
        return 'upcoming'
      }
      if (isSameFilter(statusFilters.value, statusMap.finished)) {
        return 'finished'
      }
      return 'all'
    },
    set(value) {
      if (value === 'all') {
        void tournamentStore.applyStatusFilter()
        return
      }
      void tournamentStore.applyStatusFilter(statusMap[value])
    },
  })

  const formatModel = computed<FormatFilterKey>({
    get() {
      if (!formatFilter.value) {
        return 'all'
      }
      return formatFilter.value as FormatFilterKey
    },
    set(value) {
      if (value === 'all') {
        void tournamentStore.applyFormatFilter(null)
        return
      }
      void tournamentStore.applyFormatFilter(value)
    },
  })

  const updateSearch = useDebounceFn((value: string) => {
    search.value = value
    pagination.value.current_page = 1
    void tournamentStore.loadTournaments()
  }, 300)
</script>

<template>
  <div class="tournament-filters">
    <div class="tournament-filters__inputs">
      <SearchInput placeholder="Buscar torneo..." :min-width="240" @searching="updateSearch" />
      <v-select
        v-model="statusModel"
        :items="statusOptions"
        item-title="title"
        item-value="value"
        hide-details
        density="compact"
        variant="outlined"
        class="tournament-filters__select"
        label="Estado"
      />
      <v-select
        v-model="formatModel"
        :items="formatOptions"
        item-title="title"
        item-value="value"
        hide-details
        density="compact"
        variant="outlined"
        class="tournament-filters__select"
        label="Formato"
      />
    </div>
    <v-btn color="primary" class="tournament-primary-btn" @click="dialog = true">
      + Nuevo Torneo
    </v-btn>
  </div>
</template>

<style scoped>

  .tournament-filters {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .tournament-filters__inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .tournament-filters__select {
    min-width: 200px;
  }

  @media (min-width: 960px) {
    .tournament-filters {
      flex-direction: row;
      align-items: center;
    }

    .tournament-filters__inputs {
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
    }
  }
</style>
