<script lang="ts" setup>
  import type { EliminationPhase, FormEliminationPhaseStep, Phase, TournamentRules } from '~/models/Schedule'
  import { getSchemaForFormat } from '~/utils/tournamentSchemas'
  import { buildEliminationPayload } from '~/utils/buildEliminationPayload'
  import { vuetifyConfig } from '~/utils/constants'
  const { scheduleSettings, scheduleStoreRequest, calendarSteps } = storeToRefs(useScheduleStore())
  let initialValues: FormEliminationPhaseStep = {
    teams_to_next_round: scheduleStoreRequest.value.elimination_phase.teams_to_next_round,
    elimination_round_trip: scheduleStoreRequest.value.elimination_phase.elimination_round_trip,
    phases: scheduleStoreRequest.value.elimination_phase.phases.filter((p) => p.is_active),
  }
  if (scheduleSettings.value.format.name === 'Grupos y Eliminatoria') {
    initialValues = {
      ...initialValues,
      group_phase: {
        teams_per_group: 4,
        advance_top_n: 2,
        include_best_thirds: false,
        best_thirds_count: null,
      },
    }
  }
  const schema = computed(() => getSchemaForFormat(scheduleSettings.value.format.name, scheduleSettings.value.teams))

  const { defineField, meta, values, errors } = useForm<FormEliminationPhaseStep>({
    validationSchema: schema,
    initialValues: buildEliminationPayload(
      scheduleSettings.value.format.name,
      scheduleSettings.value.tournament_id as number,
      scheduleSettings.value.phases.filter((p) => p.is_active)
    ),
    // validateOnMount: true,
  })
  const [teams_to_next_round, teams_to_next_round_props] = defineField('teams_to_next_round', vuetifyConfig)
  const [elimination_round_trip, elimination_round_trip_props] = defineField('elimination_round_trip', vuetifyConfig)
  const [phases, phases_props] = defineField('phases', vuetifyConfig)
  const [group_phase, group_phase_props] = defineField('group_phase', vuetifyConfig) // solo si aplica
  const [advance_top_n, advance_top_n_props] = defineField('group_phase.advance_top_n', vuetifyConfig)
  const [teams_per_group, teams_per_group_props] = defineField('group_phase.teams_per_group', vuetifyConfig)
  const [include_best_thirds, include_best_thirds_props] = defineField('group_phase.include_best_thirds', vuetifyConfig)
  const [best_thirds_count, best_thirds_count_props] = defineField('group_phase.best_thirds_count', vuetifyConfig)
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
      teams_to_next_round.value = 2
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
  watch(advance_top_n, () => {
    if (advance_top_n.value !== 2) {
      include_best_thirds.value = false
      best_thirds_count.value = null
    }
  })
</script>
<template>
  <v-container class="container">
    <BaseInput label="Formato" disabled v-model="scheduleSettings.format.name" />
    <BaseInput label="Ida y Vuelta?" sublabel="En rondas de eliminación ">
      <template #input>
        <v-switch v-model="elimination_round_trip" v-bind="elimination_round_trip_props"></v-switch>
      </template>
    </BaseInput>
    <BaseInput
      label="Equipos por grupo"
      v-model="teams_per_group"
      type="number"
      :props="{ ...teams_per_group_props, min: 0 }"
    ></BaseInput>
    <BaseInput
      label="Avanzan por grupo"
      v-model="advance_top_n"
      type="number"
      :props="{ ...advance_top_n_props, min: 0 }"
    ></BaseInput>
    <BaseInput label="Incluir los mejores terceros">
      <template #input>
        <v-switch
          v-model="include_best_thirds"
          v-bind="include_best_thirds_props"
          :disabled="advance_top_n < 2 || advance_top_n > 2"
        ></v-switch>
      </template>
    </BaseInput>
    <BaseInput
      label="Cantidad de mejores terceros"
      v-model="best_thirds_count"
      type="number"
      :disabled="advance_top_n < 2 || advance_top_n > 2 || !include_best_thirds"
      :props="{ ...best_thirds_count_props, min: 0 }"
    ></BaseInput>
    <BaseInput label="Fases de eliminatoria">
      <template #input>
        <v-select
          multiple
          active
          chips
          class="futzo-rounded"
          closable-chips
          v-model="phases"
          v-bind="phases_props"
          return-object
          :item-props="itemProps"
          item-title="name"
          :items="scheduleSettings.phases"
          flat
          density="compact"
          @update:model-value="teamsToNestRoundHandler"
        >
        </v-select>
      </template>
    </BaseInput>
    <div v-if="scheduleSettings.format.name === 'Grupos y Eliminatoria'" class="my-2">
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="6"
          v-for="(phase, index) in phases.filter((p) => !['Tabla General', 'Fase de grupos'].includes(p.name))"
          :key="index"
        >
          <v-card density="compact" class="futzo-rounded">
            <v-card-title>{{ phase.name }}</v-card-title>
            <v-card-text>
              <v-select
                v-model="phase.rules.advance_if_tie"
                variant="outlined"
                item-value="value"
                item-title="text"
                :items="[
                  { value: 'better_seed', text: 'Mejor en la tabla' },
                  { value: 'none', text: 'Ninguno' },
                ]"
                label="Avanza si hay empate"
                class="mt-2"
                density="compact"
              />
              <v-switch v-model="phase.rules.round_trip" label="Ida y vuelta" />
              <v-switch v-model="phase.rules.extra_time" label="Tiempo extra" />
              <v-switch
                density="compact"
                v-model="phase.rules.away_goals"
                label="Gol de visitante"
                :disabled="phase.rules.advance_if_tie === 'better_seed'"
              />
              <v-switch
                v-model="phase.rules.penalties"
                label="Penales"
                :disabled="phase.rules.advance_if_tie === 'better_seed'"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <BaseInput label="Equipos que avanzan a la siguiente fase" disabled v-model="teams_to_next_round"></BaseInput>
  </v-container>
</template>
