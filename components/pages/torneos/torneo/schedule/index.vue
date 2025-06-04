<script lang="ts" setup>
import {useScheduleStore, useTournamentStore} from '~/store'
import ReScheduleGame from '~/components/pages/calendario/re-schedule-game.vue'
import Score from './score.vue'
import {useToast} from '~/composables/useToast'
import type {Field, Match, RoundStatus} from '~/models/Schedule'

const {tournamentId, loading} = storeToRefs(useTournamentStore())
const showReScheduleDialog = ref(false)
type MatchProps = {
  id: number,
  field_id: number,
  date: string
}
const matchProps = ref<MatchProps>()
const {
  schedulePagination,
  isLoadingSchedules,
  schedules,
  scheduleRoundStatus,
} = storeToRefs(useScheduleStore())
const load = async ({done}: {
  done: (status: 'ok' | 'empty' | 'error') => void
}) => {
  if (
      schedulePagination.value.currentPage > schedulePagination.value.lastPage
  ) {
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
const updateMatch = (
    action: 'up' | 'down',
    matchId: number,
    type: 'home' | 'away',
    roundId: number
) => {
  schedules.value.rounds.forEach((round) => {
    if (roundId === round.round) {
      round.matches.forEach((match) => {
        if (match.id === matchId) {
          console.log(match)
          if (action === 'up') {
            match[type].goals += 1
          } else {
            if (match[type].goals > 0) {
              match[type].goals -= 1
            }
          }
        }
      })
    }
  })
}
const editRound = (roundId: number) => {
  const round = schedules.value.rounds.find(
      (round) => round.round === roundId
  )
  if (round) {
    round.isEditable = !round.isEditable
  }
}
const saveHandler = (roundId: number) => {
  loading.value = true
  const round = schedules.value.rounds.find(
      (round) => round.round === roundId
  )
  if (round) {
    const matches = round?.matches.map((match) => {
      return {
        id: match.id,
        home: {
          id: match.home.id,
          goals: match.home.goals,
        },
        away: {
          id: match.away.id,
          goals: match.away.goals,
        },
      }
    })
    const client = useSanctumClient()
    client(
        `/api/v1/admin/tournaments/${tournamentId.value}/rounds/${roundId}`,
        {
          method: 'POST',
          body: {
            matches,
          },
        }
    )
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
const showMatchDetails = (matchId: number, fieldId: number, date: string) => {
  matchProps.value = {
    id: matchId,
    field_id: fieldId,
    date
  }
  showReScheduleDialog.value = true
}
</script>
<template>
  <v-row v-if="schedules.rounds.length">
    <v-col cols="12">
      <div class="tournament-details">
        <div class="detail">
          <p class="text-body-1">
            Torneo: <span> {{ schedules.tournament.name }}</span>
          </p>
        </div>
        <div class="detail">
          <p class="text-body-1">
            Categoría: <span>{{ schedules.tournament.category.name }}</span>
          </p>
        </div>
        <div class="detail">
          <p class="text-body-1">
            Fecha de inicio:
            <span>{{ schedules.tournament.start_date_to_string }}</span>
          </p>
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <v-sheet class="futzo-rounded fill-height pa-4">
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

                      <v-menu location="bottom" transition="slide-x-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                              icon="mdi-dots-vertical"
                              variant="text"
                              v-bind="props"
                          ></v-btn>
                        </template>
                        <v-list nav>
                          <v-list-subheader>Actualizar</v-list-subheader>
                          <v-list-item
                              variant="flat"
                              @click="editRound(item.round)"
                          >
                            <v-list-item-title class="px-3"
                            >Resultados
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>

                        <v-list
                            density="compact"
                            nav
                            v-model:selected="item.status"
                        >
                          <v-list-subheader
                          >Marcar Jornada como:
                          </v-list-subheader>
                          <v-list-item
                              :active="status.value == item.status"
                              v-for="(status, index) in scheduleRoundStatus"
                              :key="index"
                              :value="status.value"
                              active-class="text-primary"
                              @click="
                              () => statusHandler(status.value, item.round)
                            "
                              v-text="status.text"
                          />
                        </v-list>
                      </v-menu>
                    </div>
                  </div>
                </v-col>
                <v-col
                    v-for="match in item.matches"
                    :key="match.id"
                    cols="12"
                    md="2"
                    lg="4"
                    class="match-container"
                >
                  <div class="match">
                    <div class="team home">
                      <v-avatar
                          :image="match.home.image"
                          size="24"
                          class="image"
                      />
                      <span
                          class="name d-inline-block text-truncate"
                          style="max-width: 150px"
                      >
                        {{ match.home.name }}</span
                      >
                      <Score
                          :matchId="match.id"
                          :roundId="item.round"
                          :is-editable="item.isEditable"
                          @update:match="updateMatch"
                          type="home"
                          :value="match.home.goals"
                      />
                    </div>
                    <div class="team away">
                      <v-avatar
                          class="image"
                          size="24"
                          :image="match.away.image"
                      />

                      <span
                          class="name d-inline-block text-truncate"
                          style="max-width: 150px"
                      >
                        {{ match.away.name }}</span
                      >
                      <Score
                          :matchId="match.id"
                          :value="match.away.goals"
                          :roundId="item.round"
                          :is-editable="item.isEditable"
                          @update:match="updateMatch"
                          type="away"
                      />
                      <Icon class="flag" name="futzo-icon:match-polygon"/>
                    </div>
                    <div class="details">
                      <p>
                        {{ match.details.date }}
                        <span>{{ match.details.raw_time }}</span>
                      </p>
                      <p>{{ match.details?.location.name }}</p>
                      <p>{{ match.details?.field.name }}</p>
                      <v-btn
                          variant="text"
                          density="compact"
                          size="small"
                          :ripple="true"
                          :disabled="
                          (match.status as RoundStatus) === 'en_progreso' ||
                          (match.status as RoundStatus) === 'completado' ||
                          (match.status as RoundStatus) === 'cancelado'
                        "
                          @click="showMatchDetails(match.id, match.details.field.id, match.details.raw_date)"
                      >
                        Reprogramar
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-infinite-scroll>
      </v-sheet>
    </v-col>
    <ReScheduleGame
        v-model:show="showReScheduleDialog"
        :field-id="matchProps?.field_id as number"
        :match-id="matchProps?.id as number"
        :date="matchProps?.date as string"
    />
  </v-row>

</template>
<style lang="sass">
@use '~/assets/scss/pages/schedule.sass'
</style>
