<script lang="ts" setup>
  import BasicInfo from '~/components/pages/torneos/stepper/01-basicInfo.vue'
  import DetailsInfo from '~/components/pages/torneos/stepper/02-detailsInfo.vue'
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  const { steps } = storeToRefs(useTournamentStore())
  const stepRef = ref<{ validate: Function; handleSubmit: Function }>({
    validate: Function,
    handleSubmit: Function,
  })
</script>
<template>
  <v-card-text>
    <v-container class="pa-0">
      <v-row>
        <v-col>
          <IndicatorStep :steps="steps" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0">
          <transition-slide
            group
            :offset="{
              enter: ['-100%', 0],
              leave: ['100%', 0],
            }"
          >
            <BasicInfo ref="stepRef" v-if="steps.current === 'basicInfo'" :key="steps.current" />
            <DetailsInfo ref="stepRef" v-if="steps.current === 'detailsInfo'" :key="steps.current" />
          </transition-slide>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
