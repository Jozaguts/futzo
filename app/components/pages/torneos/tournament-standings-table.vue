<script setup lang="ts">
import {Icon} from '#components'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import type {PublicStandingRow} from '~/models/PublicTournament'
import {last5Handler} from '~/utils/headers-table'
import {publicTournamentStandingsHeaders} from '~/utils/publicTournamentStandingsHeaders'
import 'vue3-easy-data-table/dist/style.css'

const props = withDefaults(
  defineProps<{
    standings?: PublicStandingRow[]
    loading?: boolean
    title?: string
    wrapperTestId?: string
    rowsPerPage?: number
    emptyTitle?: string
    emptyText?: string
    navigateToTeamOnRowClick?: boolean
  }>(),
  {
    standings: () => [],
    loading: false,
    title: 'Tabla de posiciones',
    wrapperTestId: '',
    rowsPerPage: 0,
    emptyTitle: 'Tabla de posiciones no disponible',
    emptyText: 'Se mostrará cuando se registren los primeros resultados.',
    navigateToTeamOnRowClick: false,
  }
)

type ClickRowArgument = PublicStandingRow & {
  isSelected?: boolean
  indexInCurrentPage?: number
}

const router = useRouter()
const hasStandings = computed(() => props.standings.length > 0)
const resolvedRowsPerPage = computed(() => {
  if (props.rowsPerPage && props.rowsPerPage > 0) {
    return props.rowsPerPage
  }
  return props.standings.length || 20
})

const resolveTeamRouteParam = (row: ClickRowArgument): string | null => {
  const team = (row as any)?.team ?? {}
  const slug = typeof team?.slug === 'string' ? team.slug.trim() : ''
  if (slug) {
    return slug
  }

  const fallbackId = Number(team?.id ?? (row as any)?.team_id)
  if (Number.isFinite(fallbackId) && fallbackId > 0) {
    return String(fallbackId)
  }

  return null
}

const handleStandingRowClick = (row: ClickRowArgument) => {
  if (!props.navigateToTeamOnRowClick) {
    return
  }

  const teamRouteParam = resolveTeamRouteParam(row)
  if (!teamRouteParam) {
    return
  }

  router.push({ name: 'equipos-equipo', params: { equipo: teamRouteParam } })
}
</script>

<template>
  <v-card class="futzo-rounded standings-card" height="100%">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text class="standings-card__content">
      <div class="standings-table" :data-testid="wrapperTestId || undefined">
        <client-only>
          <Vue3EasyDataTable
            v-if="hasStandings"
            header-text-direction="center"
            :class="[
              'futzo-rounded standings-table__grid',
              { 'standings-table__grid--clickable': navigateToTeamOnRowClick },
            ]"
            body-text-direction="center"
            :headers="publicTournamentStandingsHeaders"
            :items="standings"
            hide-footer
            fixed-header
            :table-min-height="0"
            :rows-per-page="resolvedRowsPerPage"
            alternating
            @click-row="handleStandingRowClick"
          >
            <template #item-team.name="values">
              <div class="d-flex">
                <span class="mr-2">{{ values.rank }}</span>
                <span class="d-inline-block text-truncate" style="max-width: 100px">
                  {{ values.team.name }}
                </span>
              </div>
            </template>
            <template #item-last_5="item">
              <span
                v-for="(color, index) in last5Handler(item.last_5)"
                :key="`${item.id || item.rank || index}-${index}`"
                class="text-lowercase"
              >
                <v-tooltip :text="color?.label" location="bottom">
                  <template #activator="{ props: tooltipProps }">
                    <Icon
                      v-bind="tooltipProps"
                      :name="color?.icon"
                      :class="`text-${color?.color}`"
                      :size="16"
                      class="cursor-pointer"
                    />
                  </template>
                </v-tooltip>
              </span>
            </template>
          </Vue3EasyDataTable>
          <v-skeleton-loader v-else-if="loading" type="table" class="mb-6" />
          <v-empty-state v-else :title="emptyTitle" :text="emptyText" image="/junior-soccer.svg" />
        </client-only>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.standings-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.standings-card__content {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  padding: 0 12px 12px;
}

.standings-table {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  overflow-x: auto;
  justify-content: center;
  -webkit-overflow-scrolling: touch;
}

.standings-table :deep(.vue3-easy-data-table) {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.standings-table :deep(.vue3-easy-data-table__main) {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  overflow-x: auto !important;
  overflow-y: auto !important;
}

.standings-table :deep(.easy-data-table__table) {
  table-layout: auto;
  width: max-content;
}

.standings-table__grid--clickable :deep(.easy-data-table__table tbody tr) {
  cursor: pointer;
}

@media (max-width: 600px) {
  .standings-table :deep(.easy-data-table__table) {
    min-width: 980px;
  }
}
</style>
