<script setup lang="ts">
  import { storeToRefs } from '#imports'
  import { useToast } from '~/composables/useToast'
  import type { ConfirmBracketMatch } from '~/models/Bracket'

  const props = defineProps<{
    modelValue: boolean
  }>()
  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
  }>()

  const scheduleStore = useScheduleStore()
  const {
    bracketPreview,
    bracketPreviewPhase,
    isLoadingBracketPreview,
    isConfirmingBracket,
    bracketMatchesDraft,
    tournamentFields,
    isLoadingTournamentFields,
    activeEliminationPhase,
  } = storeToRefs(scheduleStore)
  const roundTrip = ref(false)
  const minRestMinutes = ref(120)
  const toast = useToast()

  const closeDialog = () => {
    emit('update:modelValue', false)
    scheduleStore.resetBracketPreview()
  }

  const rebuildMatches = (enableRoundTrip: boolean) => {
    const pairs = bracketPreview.value?.pairs ?? []
    const existing = [...bracketMatchesDraft.value]
    const firstField = tournamentFields.value[0]?.id ?? null
    const nextMatches: ConfirmBracketMatch[] = []

    pairs.forEach((pair) => {
      const legOne = existing.find(
        (match) =>
          (match.leg ?? 1) === 1 && match.home_team_id === pair.home.team_id && match.away_team_id === pair.away.team_id
      )
      nextMatches.push({
        home_team_id: pair.home.team_id,
        away_team_id: pair.away.team_id,
        field_id: legOne?.field_id ?? firstField,
        match_date: legOne?.match_date ?? '',
        match_time: legOne?.match_time ?? '',
        leg: 1,
      })

      if (enableRoundTrip) {
        const legTwo = existing.find(
          (match) =>
            (match.leg ?? 2) === 2 &&
            match.home_team_id === pair.away.team_id &&
            match.away_team_id === pair.home.team_id
        )
        nextMatches.push({
          home_team_id: pair.away.team_id,
          away_team_id: pair.home.team_id,
          field_id: legTwo?.field_id ?? firstField,
          match_date: legTwo?.match_date ?? '',
          match_time: legTwo?.match_time ?? '',
          leg: 2,
        })
      }
    })

    bracketMatchesDraft.value = nextMatches
  }

  const ensurePreview = async () => {
    try {
      await scheduleStore.loadTournamentFields()
      await scheduleStore.loadEliminationBracketPreview(activeEliminationPhase.value?.name)
      roundTrip.value = Boolean(bracketPreview.value?.rules?.round_trip)
      rebuildMatches(roundTrip.value)
    } catch (error) {
      closeDialog()
    }
  }

  watch(
    () => props.modelValue,
    async (value) => {
      if (value) {
        await ensurePreview()
      } else {
        scheduleStore.resetBracketPreview()
      }
    }
  )

  watch(roundTrip, (value, oldValue) => {
    if (value !== oldValue) {
      rebuildMatches(value)
    }
  })

  onBeforeUnmount(() => {
    scheduleStore.resetBracketPreview()
  })

  const matchViewModels = computed(() => {
    if (!bracketPreview.value) {
      return []
    }
    const pairs = bracketPreview.value.pairs
    const models: Array<{
      key: string
      pairLabel: string
      home: {
        seed: number
        name: string | null
        image: string | null
      }
      away: {
        seed: number
        name: string | null
        image: string | null
      }
      match: ConfirmBracketMatch
      legLabel: string
    }> = []

    pairs.forEach((pair, pairIndex) => {
      const legs = roundTrip.value ? 2 : 1
      for (let leg = 1; leg <= legs; leg++) {
        const matchIndex = roundTrip.value ? pairIndex * 2 + (leg - 1) : pairIndex
        const match = bracketMatchesDraft.value[matchIndex]
        if (!match) {
          continue
        }
        const isSecondLeg = roundTrip.value && leg === 2
        models.push({
          key: `${pairIndex}-${leg}`,
          pairLabel: `Llave ${pairIndex + 1}`,
          home: isSecondLeg
            ? { seed: pair.away_seed, name: pair.away.team_name, image: pair.away.team_image }
            : { seed: pair.home_seed, name: pair.home.team_name, image: pair.home.team_image },
          away: isSecondLeg
            ? { seed: pair.home_seed, name: pair.home.team_name, image: pair.home.team_image }
            : { seed: pair.away_seed, name: pair.away.team_name, image: pair.away.team_image },
          match,
          legLabel: legs > 1 ? `Partido ${leg}` : 'Partido único',
        })
      }
    })

    return models
  })

  const fieldItems = computed(() =>
    (tournamentFields.value ?? []).map((field) => ({
      title: field.name,
      value: field.id,
    }))
  )

  const isReadyToConfirm = computed(
    () =>
      bracketMatchesDraft.value.length > 0 &&
      bracketMatchesDraft.value.every(
        (match) => Boolean(match.field_id) && Boolean(match.match_date) && Boolean(match.match_time)
      )
  )

  const updateMatch = <K extends keyof ConfirmBracketMatch>(index: number, key: K, value: ConfirmBracketMatch[K]) => {
    const current = bracketMatchesDraft.value[index]
    if (!current) return
    bracketMatchesDraft.value[index] = {
      ...current,
      [key]: value,
    }
  }

  const submitBracket = async () => {
    if (!bracketPreview.value?.phase) {
      return
    }
    if (!isReadyToConfirm.value) {
      toast.toast({
        type: 'error',
        msg: 'Llaves de eliminación',
        description: 'Completa campo, fecha y hora para cada partido.',
      })
      return
    }
    const matches = bracketMatchesDraft.value.map((match) => ({
      ...match,
      field_id: match.field_id as number,
      match_date: match.match_date,
      match_time: match.match_time,
    }))
    await scheduleStore.confirmEliminationBracket({
      phase: bracketPreviewPhase.value ?? bracketPreview.value.phase,
      matches,
      round_trip: roundTrip.value,
      min_rest_minutes: minRestMinutes.value,
    })
    closeDialog()
  }
</script>
<template>
  <v-dialog :model-value="modelValue" max-width="960" @update:model-value="emit('update:modelValue', $event)">
    <v-card class="futzo-rounded">
      <v-card-title class="d-flex justify-space-between align-center">
        <div>
          <span class="text-subtitle-1 font-weight-medium"> Configurar eliminatoria </span>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Define fechas, horarios y campos para los cruces de la fase {{ bracketPreviewPhase }}
          </p>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-skeleton-loader
          v-if="isLoadingBracketPreview || isLoadingTournamentFields"
          type="heading, paragraph, actions"
        />
        <template v-else>
          <v-alert v-if="!bracketPreview" type="warning" variant="tonal" border="start">
            No fue posible generar la vista previa de la eliminatoria. Verifica que todas las jornadas estén finalizadas
            y que la fase correspondiente esté marcada como activa.
          </v-alert>
          <template v-else>
            <v-alert type="info" variant="tonal" border="start" class="mb-4">
              <div class="text-body-2">
                Avanzan <strong>{{ bracketPreview.target_teams }}</strong> equipos desde
                <strong>
                  {{
                    bracketPreview.source === 'group_standings'
                      ? 'la fase de grupos'
                      : bracketPreview.source === 'table_standings'
                        ? 'la tabla general'
                        : 'la fase anterior'
                  }} </strong
                >.
              </div>
            </v-alert>
            <v-divider class="mb-4" />
            <div v-if="matchViewModels.length" class="bracket-grid">
              <v-sheet
                v-for="(item, index) in matchViewModels"
                :key="item.key"
                class="futzo-rounded pa-4 match-card"
                border
              >
                <div class="d-flex justify-space-between align-center mb-3">
                  <span class="text-subtitle-2 font-weight-medium">{{ item.pairLabel }}</span>
                  <!--                  <v-chip size="small" color="secondary" variant="outlined">{{ item.legLabel }}</v-chip>-->
                </div>
                <div class="d-flex align-center justify-space-between mb-4 matchup">
                  <div class="team">
                    <v-avatar :image="item.home.image" size="36" class="mr-2" />
                    <div>
                      <p class="mb-0 text-body-2 font-weight-medium">
                        {{ item.home.name }}
                      </p>
                      <small class="text-medium-emphasis">Seed #{{ item.home.seed }}</small>
                    </div>
                  </div>
                  <span class="text-h6 text-medium-emphasis">vs</span>
                  <div class="team text-right">
                    <div>
                      <p class="mb-0 text-body-2 font-weight-medium">
                        {{ item.away.name }}
                      </p>
                      <small class="text-medium-emphasis">Seed #{{ item.away.seed }}</small>
                    </div>
                    <v-avatar :image="item.away.image" size="36" class="ml-2" />
                  </div>
                </div>
                <v-row dense>
                  <v-col cols="12">
                    <v-select
                      :items="fieldItems"
                      label="Campo"
                      variant="outlined"
                      density="comfortable"
                      :model-value="item.match.field_id"
                      @update:model-value="(value) => updateMatch(index, 'field_id', value as number | null)"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-date-input
                      :model-value="item.match.match_date"
                      label="Date input"
                      variant="outlined"
                      density="comfortable"
                      prepend-icon=""
                      prepend-inner-icon="$calendar"
                      @update:model-value="(value) => updateMatch(index, 'match_date', value)"
                    ></v-date-input>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :model-value="item.match.match_time"
                      type="time"
                      label="Hora"
                      variant="outlined"
                      density="comfortable"
                      @update:model-value="(value) => updateMatch(index, 'match_time', value)"
                    />
                  </v-col>
                </v-row>
              </v-sheet>
            </div>
          </template>
        </template>
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-end">
        <v-btn variant="text" @click="closeDialog">Cancelar</v-btn>
        <v-btn
          color="primary"
          :loading="isConfirmingBracket"
          :disabled="!isReadyToConfirm || isConfirmingBracket || !bracketPreview"
          @click="submitBracket"
        >
          Confirmar partidos
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped lang="sass">
  .bracket-grid
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))
    gap: 16px

  .match-card
    background: rgba(42, 60, 113, 0.06)

  .matchup
    .team
      display: flex
      align-items: center
</style>
