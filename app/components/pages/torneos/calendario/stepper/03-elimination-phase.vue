<script lang="ts" setup>
  import type { EliminationPhase, FormEliminationPhaseStep, Phase, TournamentRules } from '~/models/Schedule'
  import { getSchemaForFormat } from '~/utils/tournamentSchemas'
  import { buildEliminationPayload } from '~/utils/buildEliminationPayload'
  import { DISTRIBUTION_GROUPS, vuetifyConfig } from '~/utils/constants'
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

  const { defineField, meta, values } = useForm<FormEliminationPhaseStep>({
    validationSchema: schema,
    initialValues: buildEliminationPayload(
      scheduleSettings.value.format.name,
      scheduleSettings.value.tournament_id as number,
      scheduleSettings.value.phases
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
  const tournamentTeams = computed(() => scheduleSettings.value.teams)
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
  <pre>

  {{ group_phase }}
  </pre>
  <v-container class="container">
    <BaseInput label="Formato" disabled v-model="scheduleSettings.format.name" />
    <BaseInput label="Ida y Vuelta?" sublabel="En rondas de eliminación ">
      <template #input>
        <v-switch v-model="elimination_round_trip" v-bind="elimination_round_trip_props"></v-switch>
      </template>
    </BaseInput>
    <BaseInput label="Equipos por grupo">
      <template #input>
        <v-select
          v-model="teams_per_group"
          hint="Mínimo 3 maximo 6 por grupo"
          persistent-hint
          :items="DISTRIBUTION_GROUPS[tournamentTeams]"
        ></v-select>
      </template>
    </BaseInput>
    <v-expansion-panels multiple>
      <!--      <v-expansion-panel value="group-phase" elevation="0" class="futzo-rounded mb-3">-->
      <!--        <v-expansion-panel-title>-->
      <!--          <div class="d-flex align-center justify-space-between w-100">-->
      <!--            <span class="text-subtitle-2 font-weight-medium">Fase de grupos</span>-->
      <!--            <v-chip color="primary" size="small" variant="tonal">Activa</v-chip>-->
      <!--          </div>-->
      <!--        </v-expansion-panel-title>-->
      <!--        <v-expansion-panel-text>-->
      <!--          <div class="text-body-2">-->
      <!--            La fase de grupos siempre está activa y define los equipos que avanzan a la eliminación.-->
      <!--          </div>-->
      <!--        </v-expansion-panel-text>-->
      <!--      </v-expansion-panel>-->
      <v-expansion-panel
        v-for="(phase, index) in scheduleSettings.phases"
        :key="phase.id"
        :value="phase.name"
        elevation="0"
        class="futzo-rounded mb-3"
      >
        <v-expansion-panel-title>
          <div class="d-flex align-center justify-space-between w-100">
            <span class="text-subtitle-2 font-weight-medium">{{ phase.name }}</span>
            <v-chip :color="phase.is_active ? 'primary' : 'secondary'" size="small" variant="tonal"> asdas </v-chip>

            <!--            {{ statusLabels[phase.status] }}-->
          </div>
        </v-expansion-panel-title>
        <!--        <v-expansion-panel-text>-->
        <!--          <v-row>-->
        <!--            <v-col cols="12" md="12">-->
        <!--              <div class="text-caption text-medium-emphasis">Equipos requeridos</div>-->
        <!--              &lt;!&ndash;              <div class="text-body-1 font-weight-medium">{{ PHASE_REQUIREMENTS[phase.name] ?? '-' }}</div>&ndash;&gt;-->
        <!--            </v-col>-->
        <!--            <v-col cols="12" md="12">-->
        <!--              <div class="text-caption text-medium-emphasis">Activa</div>-->
        <!--              <v-switch-->
        <!--                :disabled="phase.disabled"-->
        <!--                :model-value="phase.is_active"-->
        <!--                color="primary"-->
        <!--                density="compact"-->
        <!--                hide-details-->
        <!--              />-->
        <!--            </v-col>-->
        <!--            <v-col cols="12" md="12">-->
        <!--              <div class="text-caption text-medium-emphasis">Partidos</div>-->
        <!--              <div class="text-body-1 font-weight-medium">-->
        <!--                &lt;!&ndash;                {{ eliminationRulesForPhase(phase)?.round_trip ? 'Ida y vuelta' : 'Partido único' }}&ndash;&gt;-->
        <!--              </div>-->
        <!--            </v-col>-->
        <!--          </v-row>-->
        <!--        </v-expansion-panel-text>-->
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
