<script lang="ts" setup>
  import type { EliminationPhase, FormEliminationPhaseStep, Phase, TournamentRules } from '~/models/Schedule'
  import { object, boolean, array, string, number } from 'yup'
  import { vuetifyConfig } from '~/utils/constants'
  const { scheduleSettings, scheduleStoreRequest } = storeToRefs(useScheduleStore())

  const { defineField, meta, values, validate } = useForm<FormEliminationPhaseStep>({
    validationSchema: toTypedSchema(
      object({
        teams_to_next_round: number().required(),
        elimination_round_trip: boolean().required().default(true),
        phases: array()
          .of(
            object({
              id: number().required(),
              name: string().required(),
              is_active: boolean(),
              is_completed: boolean(),
              min_teams_for: number().nullable(),
            }).required()
          )
          .min(1, 'Selecciona al menos una fase para el torneo')
          .required()
          .test('fase-grupos-needs-another', 'En "Fase de grupos", debes elegir al menos una fase  mas', (value) => {
            if (!value) return false
            const hasGroupPhase = value.some((f) => f.name === 'Fase de grupos')
            if (hasGroupPhase) {
              return value.length >= 2
            }
            return true
          })
          .test('fase-chain-validation', 'Las fases seleccionadas no cumplen con la secuencia obligatoria', (value) => {
            if (!value) return false

            const selected = value.map((f) => f.name)

            // Si eligió Octavos → también deben estar Cuartos, Semifinal, Final
            if (selected.includes('Octavos de Final')) {
              return ['Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'].every((f) => selected.includes(f))
            }

            // Si eligió Cuartos → también deben estar Semifinal y Final
            if (selected.includes('Cuartos de Final')) {
              return ['Semifinales', 'Final'].every((f) => selected.includes(f))
            }

            // Si eligió Semifinal → también debe estar Final
            if (selected.includes('Semifinales')) {
              return ['Final'].every((f) => selected.includes(f))
            }

            // Si eligió solo Final → válido
            return true
          }),
      })
    ),
    initialValues: {
      teams_to_next_round: scheduleStoreRequest.value.elimination_phase.teams_to_next_round,
      elimination_round_trip: scheduleStoreRequest.value.elimination_phase.elimination_round_trip,
      phases: scheduleStoreRequest.value.elimination_phase.phases.filter((phase) => phase.is_active),
    },
    validateOnMount: true,
  })
  const [teams_to_next_round, teams_to_next_round_props] = defineField('teams_to_next_round', vuetifyConfig)
  const [elimination_round_trip, elimination_round_trip_props] = defineField('elimination_round_trip', vuetifyConfig)
  const [phases, phases_props] = defineField('phases', vuetifyConfig)
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
