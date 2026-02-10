<script lang="ts" setup>
import BasicInfoStep from '~/components/pages/jugadores/stepper/01-basic-info.vue'
import DetailsInfoStep from '~/components/pages/jugadores/stepper/02-details-info.vue'
import ContactInfoStep from '~/components/pages/jugadores/stepper/03-contact-info.vue'
import IndicatorStep from '~/components/shared/IndicatorStep.vue'

const { steps } = storeToRefs(usePlayerStore())
  const stepRef = ref<{ validate: Function; handleSubmit: Function }>({
    validate: Function,
    handleSubmit: Function,
  })
</script>
<template>
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <IndicatorStep :steps="steps" />
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
          <BasicInfoStep ref="stepRef" v-if="steps.current === 'basic-info'" :key="steps.current" />
          <DetailsInfoStep ref="stepRef" v-if="steps.current === 'details-info'" :key="steps.current" />
          <ContactInfoStep ref="stepRef" v-if="steps.current === 'contact-info'" :key="steps.current" />
        </transition-slide>
      </v-col>
    </v-row>
  </v-container>
</template>
