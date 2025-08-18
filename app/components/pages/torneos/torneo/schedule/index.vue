<script lang="ts" setup>
  import ReScheduleGame from '~/components/pages/calendario/re-schedule-game.vue'
  import GameReport from '~/components/pages/calendario/game-report/index.vue'
  import Score from './score.vue'
  import { useToast } from '~/composables/useToast'
  import type { RoundStatus } from '~/models/Schedule'

  const { tournamentId, loading, tournament } = storeToRefs(useTournamentStore())
  const { gameReportDialog, showReScheduleDialog, gameDetailsRequest } = storeToRefs(useGameStore())

  const { schedulePagination, isLoadingSchedules, schedules, scheduleRoundStatus, isExporting } =
    storeToRefs(useScheduleStore())
  const load = async ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
    if (schedulePagination.value.currentPage > schedulePagination.value.lastPage) {
      done('empty')
      return
    }

    isLoadingSchedules.value = true
    try {
      await useScheduleStore().getTournamentSchedules()
      done('ok')
    } catch (error) {
      console.error('Error cargando más jornadas:', error)
      done('error')
    } finally {
      isLoadingSchedules.value = false
    }
  }
  const updateGame = (action: 'up' | 'down', gameId: number, type: 'home' | 'away', roundId: number) => {
    schedules.value.rounds.forEach((round) => {
      if (roundId === round.round) {
        round.matches.forEach((game) => {
          if (game.id === gameId) {
            if (action === 'up') {
              game[type].goals += 1
            } else {
              if (game[type].goals > 0) {
                game[type].goals -= 1
              }
            }
          }
        })
      }
    })
  }
  const editRound = (roundId: number) => {
    const round = schedules.value.rounds.find((round) => round.round === roundId)
    if (round) {
      round.isEditable = !round.isEditable
    }
  }
  const saveHandler = (roundId: number) => {
    loading.value = true
    const round = schedules.value.rounds.find((round) => round.round === roundId)
    if (round) {
      const games = round?.matches.map((game) => {
        return {
          id: game.id,
          home: {
            id: game.home.id,
            goals: game.home.goals,
          },
          away: {
            id: game.away.id,
            goals: game.away.goals,
          },
        }
      })
      const client = useSanctumClient()
      client(`/api/v1/admin/tournaments/${tournamentId.value}/rounds/${roundId}`, {
        method: 'POST',
        body: {
          matches: games,
        },
      })
        .then(() => {
          round.isEditable = !round?.isEditable
          useToast().toast('success', 'Marcador', 'Actualizado correctamente')
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => (loading.value = false))
    }
  }
  const statusHandler = (status: RoundStatus, roundId: number) => {
    loading.value = true
    useScheduleStore()
      .updateStatusGame(roundId, status, tournamentId.value as number)
      .then(() => {
        useToast().toast('success', 'Jornada', 'Actualizada correctamente')
      })
      .finally(() => (loading.value = false))
  }
  onBeforeMount(async () => {
    schedulePagination.value.currentPage = 1
  })
  onBeforeUnmount(async () => {
    schedulePagination.value.currentPage = 1
  })
  const openModal = (type: 'GameReport' | 'ReScheduleGame', _gameId: number, fieldId: number, date: string) => {
    gameDetailsRequest.value = {
      id: gameDetailsRequest.value?.id,
      game_id: _gameId,
      field_id: fieldId,
      date,
    }
    if (type === 'GameReport') {
      gameReportDialog.value = true
    } else if (type === 'ReScheduleGame') {
      showReScheduleDialog.value = true
    }
  }
  const { mobile } = useVDisplay()
</script>
<template>
  <v-row v-if="schedules.rounds.length" :no-gutters="mobile">
    <v-col cols="12" :class="mobile ? 'mb-6' : ''">
      <div class="tournament-details">
        <div class="detail">
          <p class="text-body-1">Torneo:</p>
          <span> {{ tournament.name }}</span>
        </div>
        <div class="detail">
          <p class="text-body-1">Categoría:</p>
          <span>{{ tournament.category.name }}</span>
        </div>
        <div class="detail">
          <p class="text-body-1">Fecha de inicio:</p>
          <span>{{ tournament.start_date_to_string }}</span>
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <v-sheet class="sheet-tournament-schedule futzo-rounded fill-height pa-4">
        <v-infinite-scroll :items="schedules.rounds" @load="load" height="700">
          <template v-for="item in schedules.rounds" :key="item.id">
            <v-container fluid>
              <v-row>
                <v-col cols="12" class="pa-0">
                  <div class="title-container">
                    <p class="title">
                      Jornada: {{ item.round }}
                      <span class="title">Fecha: {{ item.date }}</span>
                    </p>
                    <div class="d-flex align-center" v-auto-animate>
                      <v-btn
                        variant="outlined"
                        v-if="item.isEditable"
                        :loading="loading"
                        @click="() => saveHandler(item.round)"
                        >Guardar cambios
                      </v-btn>
                      <v-menu location="bottom" transition="slide-x-transition" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                        </template>
                        <v-list density="compact" nav v-model:selected="item.status" v-auto-animate>
                          <v-list-subheader>Exportar</v-list-subheader>
                          <v-list-item
                            @click="() => useScheduleStore().exportTournamentRoundScheduleAs('excel', item.round)"
                          >
                            <template #prepend>
                              <Icon name="futzo-icon:file-type-excel" class="mr-2"></Icon>
                            </template>
                            <v-list-item-title>Excel </v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="() => useScheduleStore().exportTournamentRoundScheduleAs('img', item.round)"
                          >
                            <template #prepend>
                              <Icon name="futzo-icon:file-type-img-primary" class="mr-2"></Icon>
                            </template>
                            <v-list-item-title>Imagen </v-list-item-title>
                          </v-list-item>
                          <v-progress-linear indeterminate v-show="isExporting" height="2" />
                          <v-list-subheader>Actualizar</v-list-subheader>
                          <v-list-item @click="editRound(item.round)">
                            <v-list-item-title>Resultados </v-list-item-title>
                          </v-list-item>
                          <v-list-subheader>Marcar Jornada como </v-list-subheader>
                          <v-list-item
                            :active="true"
                            :value="item.status"
                            active-class="text-primary"
                            :disabled="true"
                            >{{ item.status }}</v-list-item
                          >
                          <v-list-item
                            :active="status.value == item.status"
                            v-for="(status, index) in scheduleRoundStatus.filter((s) => s.value !== item.status)"
                            :key="index"
                            :value="status.value"
                            active-class="text-primary"
                            :disabled="item.status === 'completado'"
                            @click="() => statusHandler(status.value, item.round)"
                          >
                            <v-list-item-title>{{ status.text }} </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </div>
                </v-col>
                <v-col v-for="game in item.matches" :key="game.id" cols="12" md="2" lg="4" class="game-container">
                  <div class="game">
                    <div class="team home">
                      <v-avatar :image="game.home.image" size="24" class="image" />
                      <span class="name d-inline-block text-truncate" style="max-width: 150px">
                        {{ game.home.name }}</span
                      >
                      <Score
                        :gameId="game.id"
                        :roundId="item.round"
                        :is-editable="item.isEditable"
                        @update:game="updateGame"
                        type="home"
                        :value="game.home.goals"
                      />
                    </div>
                    <div class="team away">
                      <v-avatar class="image" size="24" :image="game.away.image" />

                      <span class="name d-inline-block text-truncate" style="max-width: 150px">
                        {{ game.away.name }}</span
                      >
                      <Score
                        :gameId="game.id"
                        :value="game.away.goals"
                        :roundId="item.round"
                        :is-editable="item.isEditable"
                        @update:game="updateGame"
                        type="away"
                      />
                      <Icon class="flag" name="futzo-icon:match-polygon" />
                    </div>
                    <div class="details">
                      <p>
                        {{ game.details.date }}
                        <span>{{ game.details?.raw_time }}</span>
                      </p>
                      <p>{{ game.details?.location.name }}</p>
                      <p>{{ game.details?.field.name }}</p>
                      <div class="d-flex justify-space-between w-75 align-center">
                        <v-btn
                          icon
                          v-tooltip:bottom="'Reprogramar'"
                          variant="text"
                          density="compact"
                          size="small"
                          :ripple="true"
                          :disabled="
                            (game.status as RoundStatus) === 'en_progreso' ||
                            (game.status as RoundStatus) === 'completado' ||
                            (game.status as RoundStatus) === 'cancelado'
                          "
                          @click="openModal('ReScheduleGame', game.id, game.details.field.id, game.details.raw_date)"
                        >
                          <Icon name="ant-design:schedule-twotone" size="25"></Icon>
                        </v-btn>
                        <v-btn
                          icon
                          v-tooltip:bottom-left="'Actualizar marcador'"
                          variant="text"
                          density="compact"
                          :ripple="true"
                          @click="openModal('GameReport', game.id, game.details.field.id, game.details.raw_date)"
                        >
                          <Icon name="carbon:result-draft" size="25"></Icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-infinite-scroll>
      </v-sheet>
    </v-col>
    <ReScheduleGame v-model:show="showReScheduleDialog" />
    <GameReport />
  </v-row>
</template>
<style lang="sass">
  @use 'assets/scss/pages/schedule.sass'
</style>
