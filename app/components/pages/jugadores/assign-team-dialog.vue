<script lang="ts" setup>
const playerStore = usePlayerStore()
const teamStore = useTeamStore()
const { showAssignTeam, playerId, players, player, tournamentRulesByTeam, isTournamentRulesLoading } = storeToRefs(playerStore)
const { teams } = storeToRefs(teamStore)
const teamId = ref<number | null>(null)
const tournamentRuleId = ref<number | null>(null)

const quantityRules = computed(() => {
  const rules = Array.isArray(tournamentRulesByTeam.value?.rules) ? tournamentRulesByTeam.value.rules : []
  return rules.filter((rule: any) => rule?.type === 'cantidad' || rule?.type === 'boolean')
})

const selectedPlayer = computed(() => {
  const currentPlayerId = Number(playerId.value ?? 0)
  if (!Number.isFinite(currentPlayerId) || currentPlayerId <= 0) return null
  return players.value.find((item: any) => Number(item?.id ?? 0) === currentPlayerId) ?? null
})

const selectedPlayerBirthdate = computed(() => {
  return selectedPlayer.value?.birthdate ?? player.value?.birthdate ?? null
})

const resetDialogState = () => {
  teamId.value = null
  tournamentRuleId.value = null
}

const loadRulesByTeam = async (nextTeamId: number | null | undefined) => {
  try {
    await playerStore.fetchTournamentRulesValidationByTeam(nextTeamId)
  } catch {
    // La validación final se ejecuta al confirmar asignación.
  }
}

const toggleTournamentRule = (ruleId: number, enabled: boolean | null) => {
  tournamentRuleId.value = enabled ? ruleId : null
}

const resolvePlayerBirthdateForValidation = async () => {
  if (selectedPlayerBirthdate.value) return selectedPlayerBirthdate.value
  if (!playerId.value) return null

  await playerStore.getPlayer(String(playerId.value))
  return player.value?.birthdate ?? null
}

const confirmAssignment = async () => {
  if (!teamId.value || !playerId.value) return

  const birthdate = await resolvePlayerBirthdateForValidation()
  const assigned = await playerStore.assignPlayerToTeam({
    teamId: teamId.value,
    playerId: Number(playerId.value),
    birthdate,
    tournamentRuleId: tournamentRuleId.value ?? null,
  })

  if (!assigned) return

  resetDialogState()
  playerId.value = null
  showAssignTeam.value = false
}

onMounted(async () => {
  await teamStore.list()
})

watch(
  showAssignTeam,
  (open) => {
    if (!open) {
      resetDialogState()
    }
  }
)

watch(
  teamId,
  (value, previous) => {
    if (value !== previous) {
      tournamentRuleId.value = null
    }
    loadRulesByTeam(value)
  },
  { immediate: true }
)

watch(
  quantityRules,
  (rules) => {
    if (!Array.isArray(rules) || rules.length === 0) {
      tournamentRuleId.value = null
      return
    }
    const selectedRuleId = Number(tournamentRuleId.value ?? 0)
    if (!Number.isFinite(selectedRuleId) || selectedRuleId <= 0) return
    const selectedRuleStillExists = rules.some((rule: any) => Number(rule?.id ?? 0) === selectedRuleId)
    if (!selectedRuleStillExists) {
      tournamentRuleId.value = null
    }
  },
  { immediate: true }
)
</script>
<template>
  <Dialog
    title="Asignar Equipo"
    subtitle="Selecciona un equipo para asignar al jugador"
    :loading="false"
    v-model="showAssignTeam"
    icon-name="lucide:users"
  >
    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              data-testid="assign-team-select"
              v-model="teamId"
              :items="teams"
              item-title="name"
              item-value="id"
              label="Selecciona un equipo"
              outlined
              dense
            />
          </v-col>
        </v-row>
        <v-row v-if="quantityRules.length > 0">
          <v-col cols="12">
            <div class="d-flex flex-column ga-2">
              <p class="text-body-2">Asignar como:</p>
              <v-switch
                v-for="rule in quantityRules"
                :key="rule.id"
                :data-testid="`assign-team-rule-${rule.id}`"
                :model-value="Number(tournamentRuleId ?? 0) === Number(rule.id)"
                :label="rule.name"
                :disabled="isTournamentRulesLoading"
                density="comfortable"
                color="primary"
                hide-details
                inset
                @update:model-value="toggleTournamentRule(Number(rule.id), $event)"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <div class="d-flex flex-row-reverse w-100 px-2">
        <v-btn data-testid="assign-team-confirm" color="primary" @click="confirmAssignment" :disabled="!teamId">
          Asignar Equipo
        </v-btn>
        <v-btn data-testid="assign-team-cancel" color="secondary" @click="showAssignTeam = false"> Cancelar </v-btn>
      </div>
    </template>
  </Dialog>
</template>
