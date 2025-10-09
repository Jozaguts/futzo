<script setup lang="ts">
  import HeaderCard from '~/components/pages/equipos/CreateTeamDialog/Header.vue'
  import { storeToRefs } from 'pinia'
  import StepperContainer from '~/components/pages/equipos/stepper/index.vue'
  import type { CurrentStep, Team } from '~/models/Team'
  import { useTeamStore } from '#imports'

  const { steps, isEdition, dialog, teamId, team } = storeToRefs(useTeamStore())
  const loading = ref(false)
  const leaveHandler = () => {
    useTeamStore().$storeReset()
  }
  onMounted(async () => {
    await useTeamStore().initTeamForm()
  })
  const disabled = computed(() => {
    return steps.value.steps[steps.value.current].disable
  })
  const next = () => {
    if (steps.value.steps[steps.value.current].next_step === 'save') {
      loading.value = true
      if (isEdition.value) {
        useTeamStore()
          .updateTeam(teamId.value)
          .then(async () => {
            team.value = (await useTeamStore().getTeam(teamId.value)) as Team
            useRouter().push({ name: 'equipos-equipo', params: { equipo: team.value?.slug } })
          })
          .finally(() => (loading.value = false))
      } else {
        useTeamStore()
          .createTeam()
          .finally(() => (loading.value = false))
      }
    } else {
      steps.value.current = steps.value.steps[steps.value.current].next_step as CurrentStep
    }
  }
  const back = () => {
    if (steps.value.steps[steps.value.current].back_step === 'close') {
      dialog.value = false
    } else {
      steps.value.current = steps.value.steps[steps.value.current].back_step as CurrentStep
    }
  }
</script>
<template>
  <v-dialog v-model="dialog" max-width="690" @after-leave="leaveHandler" scrollable>
    <v-card class="create-tournament-card futzo-rounded" :style="{ overflow: $vuetify.display.mobile ? '' : 'hidden' }">
      <HeaderCard />
      <StepperContainer :step="steps.current" />
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-btn
                variant="outlined"
                block
                color="secondary"
                class="text-capitalize"
                density="comfortable"
                size="large"
                @click="back"
              >
                {{ steps.steps[steps.current].back_label }}
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                :disabled="disabled || loading"
                variant="elevated"
                block
                color="primary"
                density="comfortable"
                size="large"
                @click="next"
                :loading="loading"
                >{{ steps.steps[steps.current].next_label }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="sass">
  @use "~/assets/scss/pages/create-team.sass"
</style>
