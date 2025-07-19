<script setup lang="ts">
  import '@vuepic/vue-datepicker/dist/main.css'
  import type { Field } from '~/models/Schedule'
  import { useGameStore, useTournamentStore } from '~/store'
  import dayjs from 'dayjs'

  const gameStore = useGameStore()
  const { tournamentId } = storeToRefs(useTournamentStore())
  const { showReScheduleDialog, game, gameDetailsRequest } =
    storeToRefs(gameStore)
  const { reScheduleGame } = gameStore
  const loading = ref(true)
  const fields = ref<Field[]>([] as Field[])
  const onLeaving = () => {
    showReScheduleDialog.value = false
  }
  const fetchMatch = async () => {
    if (
      gameDetailsRequest.value.game_id &&
      gameDetailsRequest.value.field_id &&
      gameDetailsRequest.value.date
    ) {
      loading.value = true
      await useGameStore()
        .getGameDetails()
        .finally(() => {
          loading.value = false
        })
    }
  }
  const fetchFields = async () => {
    fields.value = await useTournamentStore().tournamentFields(
      tournamentId.value as number
    )
  }
  watch(
    () => showReScheduleDialog.value,
    async (isOpen) => {
      if (isOpen) {
        await fetchFields()
        await fetchMatch()
      }
    }
  )
  const fetchFieldAvailabilities = async (
    by: string,
    value: string | number | Date
  ) => {
    if (value) {
      if (by === 'by-date') {
        if (dayjs(value).isValid()) {
          gameDetailsRequest.value.date = value as string
        }
      }
      if (by === 'by-field_id') {
        gameDetailsRequest.value.field_id = value as number
      }
      await fetchMatch()
    }
  }
  const availableIntervalHours = computed(() => {
    if (game.value?.options?.length) {
      return game.value.options[0].available_intervals.hours
    }
    return []
  })
</script>
<template>
  <Dialog
    :loading="loading"
    title="Reprogramar partido"
    subtitle="Modificá la fecha, hora o campo de juego para este partido. <br />
    Los cambios se aplicarán manteniendo la jornada original."
    :model-value="showReScheduleDialog"
    @leaving="onLeaving"
    icon-name="uil:schedule"
    min-height="910"
    max-height="910"
  >
    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <label class="text-subtitle-2">Programado:</label>
            <p class="font-weight-bold">
              {{ game?.details?.date }}
              {{ game?.details?.raw_time }}
            </p>
          </v-col>
          <v-col cols="12">
            <div class="d-flex align-center">
              <v-card
                class="flex-grow-1"
                variant="text"
                border="lg"
                rounded="lg"
                width="50%"
              >
                <v-card-text>
                  <div
                    class="team flex-grow-1 team_local d-flex flex-column align-center"
                  >
                    <v-avatar
                      :image="game?.home?.image"
                      size="24"
                      class="image"
                    />
                    <span class="team team_home mx-2">{{
                      game?.home?.name
                    }}</span>
                  </div>
                </v-card-text>
              </v-card>
              <div class="d-flex flex-column align-center justify-center">
                <p>vs</p>
              </div>
              <v-card
                class="flex-grow-1 futzo-rounded"
                variant="text"
                border="lg"
                rounded="lg"
                width="50%"
              >
                <v-card-text>
                  <div class="team team_away d-flex flex-column align-center">
                    <v-avatar
                      :image="game?.away?.image"
                      size="24"
                      class="image"
                    />
                    <span class="team team_home mx-2">
                      {{ game?.away?.name }}
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <label class="text-subtitle-2">Fecha</label>
            <BaseCalendarInput
              v-model:start_date="gameDetailsRequest.date"
              :multiCalendar="false"
              :min-date="false"
              @update:start_date="
                (value) => fetchFieldAvailabilities('by-date', value as Date)
              "
            />
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <label class="text-subtitle-2">Campo</label>
            <v-select
              v-model="gameDetailsRequest.field_id"
              :items="fields"
              item-title="name"
              item-value="id"
              label="Selecciona un campo"
              clearable
              @update:model-value="
                (value) =>
                  fetchFieldAvailabilities('by-field_id', value as number)
              "
            />
          </v-col>
          <v-col cols="12" md="8" lg="8" v-if="availableIntervalHours?.length">
            <label class="text-subtitle-2">Horas disponibles</label>
            <v-chip-group v-model="gameDetailsRequest.selected_time" column>
              <v-chip
                base-color="primary"
                filter
                v-for="hour in availableIntervalHours"
                :value="hour"
                :key="hour.start"
              >
                {{ hour.start }} - {{ hour.end }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cosl="12" v-else>
            <v-empty-state
              size="120"
              headline="No hay horas disponibles"
              title="No hay horas disponibles para la fecha seleccionada"
              text="Por favor, selecciona otra fecha o campo."
              image="/futzo/logos/circular/logo-22.png"
            ></v-empty-state>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <v-btn class="ml-auto mr-4" variant="elevated" @click="reScheduleGame">
        Reprogramar
      </v-btn>
    </template>
  </Dialog>
</template>

<style scoped>
  label {
    display: block;
    margin-bottom: 4px;
  }
</style>
