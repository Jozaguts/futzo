<script lang="ts" setup>
import {useDebounceFn} from '@vueuse/core'
import SearchInput from '~/components/shared/SearchInput.vue'
import type {TournamentStatus} from '~/models/tournament'

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
  <div class="tournament-filters" data-testid="tournament-filters">
    <div class="tournament-filters__toolbar">
      <div class="tournament-filters__inputs">
        <SearchInput
          class="tournament-filters__search"
          placeholder="Buscar torneo..."
          :min-width="240"
          @searching="updateSearch"
        />
        <div class="tournament-filters__selects">
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
      </div>
      <v-btn color="primary" class="tournament-primary-btn" data-testid="tournament-create-button" @click="dialog = true">
        + Nuevo Torneo
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
  .tournament-filters {
    width: 100%;
  }

  .tournament-filters__toolbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .tournament-filters__inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .tournament-filters__selects {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .tournament-filters__search {
    min-width: 0;
  }

  .tournament-filters__select {
    min-width: 0;
  }

  .tournament-primary-btn {
    align-self: stretch;
    height: 40px;
    border-radius: 12px;
    font-weight: 600;
    text-transform: none;
    letter-spacing: normal;
  }

  @media (max-width: 359px) {
    .tournament-filters__selects {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 960px) {
    .tournament-filters__toolbar {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .tournament-filters__inputs {
      flex-direction: row;
      align-items: center;
      gap: 10px;
      flex: 1 1 auto;
    }

    .tournament-filters__search {
      flex: 1 1 280px;
      max-width: 420px;
    }

    .tournament-filters__selects {
      grid-template-columns: repeat(2, minmax(0, 220px));
    }

    .tournament-primary-btn {
      align-self: center;
      flex-shrink: 0;
    }
  }
</style>
