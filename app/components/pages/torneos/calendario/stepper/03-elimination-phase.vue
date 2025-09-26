<script lang="ts" setup>
  import type { FormEliminationPhaseStep } from '~/models/Schedule'
  import { getSchemaForFormat } from '~/utils/tournamentSchemas'
  import { buildEliminationPayload } from '~/utils/buildEliminationPayload'
  const { scheduleSettings, scheduleStoreRequest, calendarSteps } = storeToRefs(useScheduleStore())
  const schema = computed(() => getSchemaForFormat(scheduleSettings.value.format.name, scheduleSettings.value.teams))
  const { defineField, meta, values, errors } = useForm<FormEliminationPhaseStep>({
    validationSchema: schema,
    initialValues: buildEliminationPayload(
      scheduleSettings.value.format.name,
      scheduleSettings.value.tournament_id as number,
      scheduleSettings.value.phases,
      {
        group_phase: {
          option_id: scheduleSettings.value.group_phase_option_id,
        },
      }
    ),
    validateOnMount: true,
  })
  const [teams_to_next_round, teams_to_next_round_props] = defineField('teams_to_next_round', vuetifyConfig)
  const [elimination_round_trip, elimination_round_trip_props] = defineField('elimination_round_trip', vuetifyConfig)
  const [phases, phases_props] = defineField('phases', vuetifyConfig)
  const [option_id, option_id_props] = defineField('group_phase.option_id', vuetifyConfig)
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

  const hasPhases = computed(() => {
    return (
      scheduleSettings.value.format.name === 'Grupos y Eliminatoria' ||
      scheduleSettings.value.format.name === 'Liga y Eliminatoria'
    )
  })
  const hasGroupPhase = computed(() => scheduleSettings.value.format.name === 'Grupos y Eliminatoria')
  const teamsPerGroup = computed(() =>
    scheduleSettings.value.group_configuration_options.map((option) => ({
      title: option.group_phase.teams_per_group,
      value: option.id,
    }))
  )
  const groupConfigurationOptionsSelected = computed(() =>
    scheduleSettings.value.group_configuration_options.find((option) => option.id === option_id.value)
  )
  watch(
    phases,
    (value) => {
      if (value.length) {
        const greater = value.filter((p) => p.is_active).sort((a, b) => b?.min_teams_for - a?.min_teams_for)
        if (greater.length) {
          teams_to_next_round.value = greater[0]?.min_teams_for as number
        }
      }
    },
    { deep: true }
  )
</script>
<template>
  <v-container class="container">
    <BaseInput label="Formato" disabled v-model="scheduleSettings.format.name" />
    <BaseInput v-if="hasPhases" label="Ida y Vuelta?" sublabel="En rondas de eliminación">
      <template #input>
        <v-switch v-model="elimination_round_trip" v-bind="elimination_round_trip_props"></v-switch>
      </template>
    </BaseInput>
    <v-row v-if="hasPhases">
      <v-divider class="my-2"></v-divider>
      <v-col cols="12">
        <small class="text-error">{{ errors['phases'] }}</small>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels model-value="group-phase">
          <v-expansion-panel value="group-phase" elevation="0" class="futzo-rounded mb-3" v-if="hasGroupPhase">
            <v-expansion-panel-title>
              <div class="d-flex align-center justify-space-between w-100">
                <span class="text-subtitle-2 font-weight-medium">Fase de grupos</span>
                <v-chip color="primary" size="small" variant="tonal">Activa</v-chip>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <BaseInput label="Equipos por grupo">
                <template #input>
                  <v-select
                    v-model="option_id"
                    persistent-hint
                    :items="teamsPerGroup"
                    item-value="value"
                    item-title="title"
                    v-bind="option_id_props"
                    placeholder="Selecciona la cantidad de equipos"
                  ></v-select>
                </template>
              </BaseInput>
              <v-divider class="my-4" />
              <v-container fluid class="pa-0" v-if="!!groupConfigurationOptionsSelected">
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">Grupos</th>
                      <th class="text-left">Siguiente fase</th>
                      <th class="text-left">Clasifican</th>
                      <th class="text-left">Por grupo</th>
                      <th class="text-left">Tercer lugares</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">
                        <span>{{ groupConfigurationOptionsSelected.group_sizes.join('-') }}</span>
                      </td>
                      <td class="text-center">
                        <span> {{ groupConfigurationOptionsSelected.elimination.phase_name }}</span>
                      </td>
                      <td class="text-center">
                        <span>{{ groupConfigurationOptionsSelected.elimination.teams }}</span>
                      </td>
                      <td class="text-center">
                        <span> {{ groupConfigurationOptionsSelected.group_phase.advance_top_n }}</span>
                      </td>
                      <td class="text-center">
                        <span>
                          {{ groupConfigurationOptionsSelected.group_phase.include_best_thirds ? 'Si' : 'No' }}</span
                        >
                        <span v-if="groupConfigurationOptionsSelected.group_phase.include_best_thirds">
                          ({{ groupConfigurationOptionsSelected.group_phase.best_thirds_count }})</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <v-row>
                  <v-col>
                    <small class="text-error text-caption float-right">
                      {{ errors['teams_to_next_round'] }}
                    </small>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            v-for="phase in phases.filter((p) => p.name !== 'Fase de grupos').filter((p) => p.name !== 'Tabla general')"
            :value="phase.name"
            elevation="0"
            class="futzo-rounded mb-3"
          >
            <v-expansion-panel-title>
              <div class="d-flex align-center justify-space-between w-100">
                <span class="text-subtitle-2 font-weight-medium">{{ phase.name }}</span>
                <v-chip :color="phase.is_active ? 'primary' : 'secondary'" size="small" variant="tonal">{{
                  phase.is_active ? 'Activa' : 'Desactivada'
                }}</v-chip>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col>
                    <div class="d-flex align-center justify-space-between w-100">
                      <v-chip :color="phase.is_active ? 'primary' : 'secondary'" size="small" variant="tonal"
                        >{{ phase.is_active ? 'Activa' : 'Desactivada' }}
                      </v-chip>
                      <v-switch
                        v-model="phase.is_active"
                        color="primary"
                        density="compact"
                        hide-details
                        @update:model-value="
                          (value) => {
                            if (!value) {
                              if (phase.rules) {
                                phase.rules.away_goals = false
                                phase.rules.round_trip = false
                                phase.rules.extra_time = false
                                phase.rules.penalties = false
                              }
                            }
                          }
                        "
                      />
                    </div>
                  </v-col>
                </v-row>
                <BaseInput label="Regla de desempate" sublabel="Avanza">
                  <template #input>
                    <v-select
                      :disabled="!phase.is_active"
                      v-model="phase.rules.advance_if_tie"
                      :items="[
                        { value: 'better_seed', title: 'Mejor en la tabla' },
                        { value: 'none', title: 'Se define en el campo' },
                      ]"
                      @update:model-value="
                        (value) => {
                          if (value === 'better_seed') {
                            phase.rules.extra_time = false
                            phase.rules.penalties = false
                            phase.rules.away_goals = false
                          }
                        }
                      "
                    ></v-select>
                  </template>
                </BaseInput>
                <v-divider class="my-4" />
                <v-row>
                  <v-col cols="12" md="4">
                    <div class="text-caption text-medium-emphasis">Ida y Vuelta</div>
                    <v-switch v-model="phase.rules.round_trip" color="primary" density="compact" hide-details />
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="text-caption text-medium-emphasis">Tiempo Extra</div>
                    <v-switch
                      :disabled="phase?.rules?.advance_if_tie === 'better_seed'"
                      v-model="phase.rules.extra_time"
                      color="primary"
                      density="compact"
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="text-caption text-medium-emphasis">Penales</div>
                    <v-switch
                      :disabled="phase?.rules?.advance_if_tie === 'better_seed'"
                      v-model="phase.rules.penalties"
                      color="primary"
                      density="compact"
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="text-caption text-medium-emphasis">Gol en contra</div>
                    <v-switch
                      :disabled="phase?.rules?.advance_if_tie === 'better_seed' || !phase?.rules?.round_trip"
                      v-model="phase.rules.away_goals"
                      color="primary"
                      density="compact"
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
