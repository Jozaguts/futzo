<script lang="ts" setup>
  import General from '~/components/pages/torneos/calendario/stepper/01-general.vue'
  import Rules from '~/components/pages/torneos/calendario/stepper/02-rules-phase.vue'
  import Elimination from '~/components/pages/torneos/calendario/stepper/03-elimination-phase.vue'
  import Fields from '~/components/pages/torneos/calendario/stepper/04-fields-phase.vue'
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  const { calendarSteps } = storeToRefs(useScheduleStore())
</script>
<template>
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <IndicatorStep :steps="calendarSteps" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <transition-slide
          group
          :offset="{
            enter: ['-100%', 0],
            leave: ['100%', 0],
          }"
        >
          <General v-if="calendarSteps.current === 'general'" :key="calendarSteps.current" />
          <Rules v-if="calendarSteps.current === 'rules'" :key="calendarSteps.current" />
          <Elimination v-if="calendarSteps.current === 'elimination'" :key="calendarSteps.current" />
          <Fields r v-if="calendarSteps.current === 'fields'" :key="calendarSteps.current" />
        </transition-slide>
      </v-col>
    </v-row>
  </v-container>
</template>
