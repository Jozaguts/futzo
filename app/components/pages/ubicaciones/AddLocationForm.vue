<script lang="ts" setup>
  import IndicatorStep from '~/components/shared/IndicatorStep.vue'
  import LocationStep from '~/components/pages/ubicaciones/stepper/LocationStep.vue'

  const { locationStoreRequest, isEdition, formSteps } = storeToRefs(useLocationStore())
  const emits = defineEmits(['next', 'back', 'close'])

  const cancelBtnHandler = () => {
    if (formSteps.value.current === 'location') {
      emits('close')
    } else {
      formSteps.value.current = 'location'
    }
  }
  const textButton = computed(() => {
    if (formSteps.value.current === 'location') {
      return 'Siguiente'
    } else {
      return isEdition.value ? 'Guardar Cambios' : 'Crear ubicación'
    }
  })
</script>

<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col>
          <IndicatorStep :form-steps="formSteps" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <transition-slide group :offset="{ enter: ['-100%', 0], leave: ['100%', 0] }">
            <LocationStep v-if="formSteps.current === 'location'" />
          </transition-slide>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12 d-flex justify-space-between">
          <SecondaryBtn class="bg-white w-btn" text="Cancelar" @click="() => emits('back')" />
          <PrimaryBtn class="w-btn" :text="textButton" variant="elevated" @click="() => emits('next')" />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
<style scoped>
  .w-btn {
    min-width: 49%;
    max-height: 42px;
  }
</style>
