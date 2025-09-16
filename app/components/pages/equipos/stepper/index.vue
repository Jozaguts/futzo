<script lang="ts" setup>
  import createTeamStep from '~/components/pages/equipos/stepper/01-create-team.vue'
  import createDtStep from '~/components/pages/equipos/stepper/02-create-dt.vue'
  import createOwnerStep from '~/components/pages/equipos/stepper/03-create-owner.vue'
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  import { storeToRefs, useTeamStore } from '#imports'
  const { steps } = storeToRefs(useTeamStore())
</script>
<template>
  <PerfectScrollbar :options="{ suppressScrollX: true }">
    <v-card-text class="pb-2" style="overflow-x: hidden">
      <IndicatorStep :steps="steps" />
      <transition-slide
        group
        :offset="{
          enter: ['-100%', 0],
          leave: ['100%', 0],
        }"
      >
        <createTeamStep ref="stepRef" v-if="steps.current === 'createTeam'" :key="steps.current" />
        <createDtStep ref="stepRef" v-if="steps.current === 'createDt'" :key="steps.current" />
        <createOwnerStep ref="stepRef" v-if="steps.current === 'createOwner'" :key="steps.current" />
      </transition-slide>
    </v-card-text>
  </PerfectScrollbar>
</template>
