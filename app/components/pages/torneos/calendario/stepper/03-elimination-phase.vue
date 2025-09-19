<script lang="ts" setup>
  import type { EliminationPhase, FormEliminationPhaseStep, Phase, TournamentRules } from '~/models/Schedule'
  import { getSchemaForFormat } from '~/utils/tournamentSchemas'
  import { buildEliminationPayload } from '~/utils/buildEliminationPayload'
  import { vuetifyConfig } from '~/utils/constants'
  const { scheduleSettings, scheduleStoreRequest, calendarSteps } = storeToRefs(useScheduleStore())
  const schema = computed(() => getSchemaForFormat(scheduleSettings.value.format.name))
  const { defineField, meta, values } = useForm<FormEliminationPhaseStep>({
    validationSchema: schema,
    initialValues: {
      teams_to_next_round: scheduleStoreRequest.value.elimination_phase.teams_to_next_round,
      elimination_round_trip: scheduleStoreRequest.value.elimination_phase.elimination_round_trip,
      phases: scheduleStoreRequest.value.elimination_phase.phases.filter((p) => p.is_active),
      group_phase: scheduleStoreRequest.value.elimination_phase.group_phase ?? {
        teams_per_group: 4,
        advance_top_n: 2,
        include_best_thirds: false,
        best_thirds_count: null,
      },
    },
    validateOnMount: true,
  })
  const [teams_to_next_round, teams_to_next_round_props] = defineField('teams_to_next_round', vuetifyConfig)
  const [elimination_round_trip, elimination_round_trip_props] = defineField('elimination_round_trip', vuetifyConfig)
  const [phases, phases_props] = defineField('phases', vuetifyConfig)
  const [group_phase, group_phase_props] = defineField('group_phase') // solo si aplica

  const itemProps = (item: EliminationPhase) => {
    return {
      ...item,
      disabled: item.name === 'Fase de grupos' || item.name === 'Tabla general',
      active: item.name === 'Fase de grupos' || item.name === 'Tabla general',
    }
  }
  const teamsToNestRoundHandler = (items: EliminationPhase[]) => {
    const selected = items.map((f) => f.name)
    if (selected.includes('Octavos de Final')) {
      teams_to_next_round.value = 16
      return
    }
    if (selected.includes('Cuartos de Final')) {
      teams_to_next_round.value = 8
      return
    }
    if (selected.includes('Semifinales')) {
      teams_to_next_round.value = 4
      return
    }
    if (selected.includes('Final')) {
      teams_to_next_round.value = 1
      return
    }
  }
  watch(
    meta,
    (value) => {
      if (value) {
        calendarSteps.value.steps[calendarSteps.value.current].disable = !meta.value.valid
        if (meta.value.valid && meta.value.touched) {
          scheduleStoreRequest.value.elimination_phase.teams_to_next_round = values.teams_to_next_round
          scheduleStoreRequest.value.elimination_phase.elimination_round_trip = values.elimination_round_trip
          scheduleStoreRequest.value.elimination_phase.phases = values.phases
          if (values.group_phase) {
            scheduleStoreRequest.value.elimination_phase.group_phase = values.group_phase
          }
        }
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-container class="container">
    <BaseInput label="Formato" disabled v-model="scheduleSettings.format.name"></BaseInput>
    <BaseInput label="Ida y Vuelta?" sublabel="En rondas de eliminación ">
      <template #input>
        <v-switch v-model="elimination_round_trip" v-bind="elimination_round_trip_props"></v-switch>
      </template>
    </BaseInput>
    <BaseInput label="Fases del torneo">
      <template #input>
        <v-select
          multiple
          active
          chips
          closable-chips
          v-model="phases"
          v-bind="phases_props"
          return-object
          :item-props="itemProps"
          item-title="name"
          :items="scheduleSettings.phases"
          @update:model-value="teamsToNestRoundHandler"
        >
        </v-select>
      </template>
    </BaseInput>
  </v-container>
</template>
