<script setup lang="ts">
  import type { Match, MatchAway, ScheduleRoundDetails } from '~/models/Schedule'

  type MatchEdit = {
    matchId: number
    home: MatchAway
    away: MatchAway
  }

  type SwapSource = {
    matchId: number
    position: 'home' | 'away'
    team: MatchAway
  }

  const scheduleDialog = defineModel<boolean>()
  const emit = defineEmits<{
    (event: 'save', payload: { matches: Match[]; restingTeam: MatchAway | null }): void
  }>()

  const { isFetching, data } = defineProps<{
    data: ScheduleRoundDetails
    isFetching: boolean
  }>()

  const editedMatches = ref<MatchEdit[]>([])
  const restingTeam = ref<MatchAway | null>(null)
  const swapSource = ref<SwapSource | null>(null)
  const isInitialized = ref(false)

  const matches = computed(() => (Array.isArray(data?.matches) ? data.matches : []))
  const hasMatches = computed(() => matches.value.length > 0)
  const hasByeTeam = computed(() => Boolean(data?.bye_team?.id))
  const groupedMatches = computed(() => {
    const groups = new Map<string, { key: string; label: string; matches: Match[] }>()

    matches.value.forEach((match) => {
      const rawDate = match.details?.raw_date ?? ''
      const label = match.details?.date ?? 'Sin fecha'
      const key = rawDate || label
      if (!groups.has(key)) {
        groups.set(key, { key, label, matches: [] })
      }
      groups.get(key)?.matches.push(match)
    })

    const groupList = Array.from(groups.values()).sort((a, b) => a.key.localeCompare(b.key))
    groupList.forEach((group) => {
      group.matches.sort((a, b) => {
        const timeA = a.details?.raw_time ?? ''
        const timeB = b.details?.raw_time ?? ''
        return timeA.localeCompare(timeB)
      })
    })

    return groupList
  })

  const initializeEdits = () => {
    editedMatches.value = matches.value.map((match) => ({
      matchId: match.id,
      home: match.home,
      away: match.away,
    }))
    restingTeam.value = data?.bye_team ?? null
    swapSource.value = null
    isInitialized.value = true
  }

  const resetState = () => {
    editedMatches.value = []
    restingTeam.value = null
    swapSource.value = null
    isInitialized.value = false
  }

  watch(
    () => scheduleDialog.value,
    (isOpen) => {
      if (isOpen) {
        initializeEdits()
      } else {
        resetState()
      }
    }
  )

  watch(
    () => data,
    () => {
      if (scheduleDialog.value) {
        initializeEdits()
      }
    },
    { deep: true }
  )

  const getCurrentMatch = (matchId: number) => {
    return (
      editedMatches.value.find((match) => match.matchId === matchId) || {
        matchId,
        home: matches.value.find((match) => match.id === matchId)?.home as MatchAway,
        away: matches.value.find((match) => match.id === matchId)?.away as MatchAway,
      }
    )
  }

  const hasChanges = computed(() => {
    if (!isInitialized.value) return false
    const originalMatches = matches.value.map((match) => ({
      matchId: match.id,
      homeId: match.home.id,
      awayId: match.away.id,
    }))
    const currentMatches = editedMatches.value.map((match) => ({
      matchId: match.matchId,
      homeId: match.home.id,
      awayId: match.away.id,
    }))
    const matchesChanged = JSON.stringify(originalMatches) !== JSON.stringify(currentMatches)
    const restingChanged = (restingTeam.value?.id ?? null) !== (data?.bye_team?.id ?? null)
    return matchesChanged || restingChanged
  })

  const handleSelectForSwap = (matchId: number, position: 'home' | 'away', team: MatchAway) => {
    if (!swapSource.value) {
      swapSource.value = { matchId, position, team }
      return
    }

    if (swapSource.value.matchId === matchId && swapSource.value.position === position) {
      swapSource.value = null
      return
    }

    const nextEdits = editedMatches.value.map((match) => ({ ...match }))
    const sourceIndex = nextEdits.findIndex((match) => match.matchId === swapSource.value?.matchId)
    const targetIndex = nextEdits.findIndex((match) => match.matchId === matchId)

    if (sourceIndex === -1 || targetIndex === -1) {
      swapSource.value = null
      return
    }

    const sourceTeam = swapSource.value.team
    const targetTeam = position === 'home' ? nextEdits[targetIndex].home : nextEdits[targetIndex].away

    const sourceMatch = nextEdits[sourceIndex]
    const targetMatch = nextEdits[targetIndex]

    nextEdits[sourceIndex] = {
      ...sourceMatch,
      home: swapSource.value.position === 'home' ? targetTeam : sourceMatch.home,
      away: swapSource.value.position === 'away' ? targetTeam : sourceMatch.away,
    }

    nextEdits[targetIndex] = {
      ...targetMatch,
      home: position === 'home' ? sourceTeam : targetMatch.home,
      away: position === 'away' ? sourceTeam : targetMatch.away,
    }

    editedMatches.value = nextEdits
    swapSource.value = null
  }

  const swapHomeAway = (matchId: number) => {
    editedMatches.value = editedMatches.value.map((match) =>
      match.matchId === matchId ? { ...match, home: match.away, away: match.home } : match
    )
  }

  const teamsInMatches = computed(() => {
    const teams: MatchAway[] = []
    editedMatches.value.forEach((match) => {
      if (!teams.find((team) => team.id === match.home.id)) teams.push(match.home)
      if (!teams.find((team) => team.id === match.away.id)) teams.push(match.away)
    })
    return teams
  })

  const restingOptions = computed(() => {
    const options = teamsInMatches.value.map((team) => ({ ...team }))
    return [...options]
  })

  const handleRestingTeamChange = (value: number | string | null) => {
    const teamId = value ? Number(value) : 0
    if (!teamId) {
      restingTeam.value = null
      return
    }

    if (restingTeam.value?.id === teamId) {
      return
    }

    const newRestingTeam = teamsInMatches.value.find((team) => team.id === teamId)
    if (!newRestingTeam || !restingTeam.value) {
      return
    }

    const matchWithTeam = editedMatches.value.find(
      (match) => match.home.id === newRestingTeam.id || match.away.id === newRestingTeam.id
    )

    if (!matchWithTeam) {
      return
    }

    const isHome = matchWithTeam.home.id === newRestingTeam.id
    editedMatches.value = editedMatches.value.map((match) =>
      match.matchId === matchWithTeam.matchId
        ? {
            ...match,
            home: isHome ? restingTeam.value! : match.home,
            away: isHome ? match.away : restingTeam.value!,
          }
        : match
    )

    restingTeam.value = newRestingTeam
  }

  const resetChanges = () => {
    initializeEdits()
  }

  const handleSave = () => {
    const updatedMatches = matches.value.map((match) => {
      const edit = editedMatches.value.find((current) => current.matchId === match.id)
      if (!edit) return match
      return {
        ...match,
        home: edit.home,
        away: edit.away,
      }
    })
    emit('save', { matches: updatedMatches, restingTeam: restingTeam.value })
    scheduleDialog.value = false
  }

  const leaveHandler = () => {
    resetState()
  }
</script>

<template>
  <Dialog
    minHeight="90vh"
    :title="`Editar Jornada ${data?.round ?? ''}`"
    subtitle="Modifica los enfrentamientos o el equipo que descansa en esta jornada. Selecciona dos equipos para intercambiarlos."
    :loading="isFetching"
    v-model="scheduleDialog"
    @leaving="leaveHandler"
  >
    <template #v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <Icon name="mdi-calendar-outline" size="22" class="mr-2" />
              <span class="text-body-1">Status:</span>
              <v-chip class="ml-2" size="small" variant="outlined">
                {{ data?.status ?? 'Sin estado' }}
              </v-chip>
            </div>
            <v-chip v-if="hasMatches" size="small" variant="tonal" color="primary">
              {{ matches.length }} partidos
            </v-chip>
          </v-col>
        </v-row>

        <v-row v-if="hasMatches">
          <v-col cols="12">
            <div class="scroll-area pr-1">
              <div>
                <v-sheet class="pa-4 mb-6 rounded-lg border" elevation="0">
                  <div class="d-flex align-center mb-3">
                    <Icon name="mdi-weather-night" size="18" class="mr-2 text-medium-emphasis" />
                    <span class="text-body-1 font-weight-medium">Equipo que descansa</span>
                  </div>
                  <div class="d-flex flex-wrap align-center gap-4">
                    <div v-if="restingTeam" class="d-flex align-center">
                      <v-avatar size="40" class="mr-3" v-if="restingTeam?.image">
                        <v-img :src="restingTeam.image" :alt="restingTeam.name" />
                      </v-avatar>
                      <div class="text-body-1 d-inline-block text-truncate" style="max-width: 100px">
                        {{ restingTeam.name }}
                      </div>
                    </div>
                    <div v-else class="text-medium-emphasis">Ningún equipo descansa esta jornada</div>
                    <v-select
                      class="ml-auto resting-select"
                      density="compact"
                      variant="outlined"
                      :items="restingOptions"
                      item-title="name"
                      item-value="id"
                      max-width="200"
                      :model-value="restingTeam?.id ?? 0"
                      :disabled="teamsInMatches.length === 0"
                      @update:modelValue="handleRestingTeamChange"
                      label="Cambiar equipo"
                    >
                      <template #item="{ props, item }">
                        <v-list-item v-bind="props">
                          <template #prepend>
                            <v-avatar size="24">
                              <v-img :src="item.raw.image || '/placeholder.svg'" :alt="item.raw.name" />
                            </v-avatar>
                          </template>
                          <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-select>
                  </div>
                </v-sheet>

                <v-divider class="my-4" />

                <v-alert v-if="swapSource" type="info" variant="tonal" class="mb-4">
                  <template #prepend>
                    <Icon name="mdi-shuffle-variant" size="18" />
                  </template>
                  <div>
                    Seleccionaste a <strong>{{ swapSource.team.name }}</strong
                    >. Ahora selecciona otro equipo para intercambiarlo, o haz clic de nuevo para cancelar.
                  </div>
                </v-alert>

                <div class="mb-3 d-flex align-center">
                  <span class="text-body-1 font-weight-medium">Partidos de la jornada</span>
                  <v-chip size="x-small" variant="outlined" class="ml-2">{{ editedMatches.length }} partidos</v-chip>
                </div>

                <div v-for="group in groupedMatches" :key="group.key" class="mb-6">
                  <v-chip size="x-small" variant="tonal" class="mb-3">
                    {{ group.label }}
                  </v-chip>
                  <div class="d-flex flex-column gap-4">
                    <v-sheet
                      v-for="match in group.matches"
                      :key="match.id"
                      class="pa-4 my-4 rounded-lg border"
                      elevation="1"
                    >
                      <div class="d-flex align-center justify-space-between text-caption text-medium-emphasis mb-3">
                        <span>{{ match.details?.raw_time ?? '--:--' }}</span>
                        <span>{{ match.details?.field?.name ?? 'Sin cancha' }}</span>
                      </div>
                      <div class="d-flex align-center gap-3 flex-wrap">
                        <div
                          class="team-option flex-1"
                          :class="{
                            'team-option--selected':
                              swapSource?.matchId === match.id && swapSource?.position === 'home',
                          }"
                          role="button"
                          tabindex="0"
                          @click="handleSelectForSwap(match.id, 'home', getCurrentMatch(match.id).home)"
                        >
                          <v-avatar size="40" class="mr-3">
                            <v-img
                              :src="getCurrentMatch(match.id).home.image || '/placeholder.svg'"
                              :alt="getCurrentMatch(match.id).home.name"
                            />
                          </v-avatar>
                          <div class="flex-grow-1 text-left">
                            <div class="text-body-1 font-weight-medium">{{ getCurrentMatch(match.id).home.name }}</div>
                            <v-chip size="x-small" variant="outlined">Local</v-chip>
                          </div>
                          <Icon
                            v-if="swapSource?.matchId === match.id && swapSource?.position === 'home'"
                            name="mdi-check-circle"
                            size="20"
                            class="text-primary"
                          />
                        </div>

                        <v-btn
                          icon
                          variant="text"
                          :title="'Intercambiar local/visitante'"
                          @click="swapHomeAway(match.id)"
                        >
                          <Icon name="mdi-swap-horizontal" size="20" />
                        </v-btn>

                        <div
                          class="team-option flex-1"
                          :class="{
                            'team-option--selected':
                              swapSource?.matchId === match.id && swapSource?.position === 'away',
                          }"
                          role="button"
                          tabindex="0"
                          @click="handleSelectForSwap(match.id, 'away', getCurrentMatch(match.id).away)"
                        >
                          <v-avatar size="40" class="mr-3">
                            <v-img
                              :src="getCurrentMatch(match.id).away.image || '/placeholder.svg'"
                              :alt="getCurrentMatch(match.id).away.name"
                            />
                          </v-avatar>
                          <div class="flex-grow-1 text-left">
                            <div class="text-body-1 font-weight-medium">{{ getCurrentMatch(match.id).away.name }}</div>
                            <v-chip size="x-small" variant="outlined">Visitante</v-chip>
                          </div>
                          <Icon
                            v-if="swapSource?.matchId === match.id && swapSource?.position === 'away'"
                            name="mdi-check-circle"
                            size="20"
                            class="text-primary"
                          />
                        </div>
                      </div>
                    </v-sheet>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row v-else-if="!isFetching">
          <v-col cols="12">
            <v-empty-state title="Sin partidos" text="No hay partidos para editar en esta jornada." />
          </v-col>
        </v-row>

        <v-row v-if="hasChanges">
          <v-col cols="12">
            <v-alert type="warning" variant="tonal">
              <template #prepend>
                <Icon name="mdi-alert-circle" size="18" />
              </template>
              <span class="text-body-2">Tienes cambios sin guardar en esta jornada.</span>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <v-btn variant="outlined" :disabled="!hasChanges" @click="resetChanges">
        <Icon name="mdi-undo" size="18" class="mr-2" />
        Deshacer cambios
      </v-btn>
      <v-btn color="primary" :disabled="!hasChanges" @click="handleSave">
        <Icon name="mdi-content-save" size="18" class="mr-2" />
        Guardar cambios
      </v-btn>
    </template>
  </Dialog>
</template>

<style scoped>
  .scroll-area {
    max-height: 50vh;
    overflow-y: auto;
  }

  .team-option {
    border: 2px solid transparent;
    background-color: rgba(var(--v-theme-surface-variant), 0.3);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;
    cursor: pointer;
  }

  .team-option:hover {
    border-color: rgba(var(--v-theme-primary), 0.4);
  }

  .team-option--selected {
    border-color: rgb(var(--v-theme-primary));
    background-color: rgba(var(--v-theme-primary), 0.08);
  }

  .resting-select {
    min-width: 220px;
  }
</style>
