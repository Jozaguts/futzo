<script lang="ts" setup>
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  import LocationStep from '~/components/pages/ubicaciones/stepper/LocationStep.vue'
  import AvailabilityStep from '~/components/pages/ubicaciones/stepper/AvailabilityStep.vue'
  const { formSteps } = storeToRefs(useLocationStore())
</script>
<template>
  <v-card-text>
    <v-container class="pa-0">
      <v-row>
        <v-col>
          <IndicatorStep :steps="formSteps" />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <transition-slide group :offset="{ enter: ['-100%', 0], leave: ['100%', 0] }">
            <LocationStep v-if="formSteps.current === 'location'" />
            <AvailabilityStep v-else-if="formSteps.current === 'availability'" />
          </transition-slide>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
