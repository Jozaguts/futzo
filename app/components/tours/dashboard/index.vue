<script lang="ts" setup>
import {onBeforeUnmount, ref, watch} from 'vue';
import type {TourStep} from '#nuxt-tour/props';
import {VTour} from '#components';
import {useGlobalStore} from '~/stores/useGlobalStore';
import type {TourKey} from "~/interfaces";

const props = defineProps<{ name: TourKey; steps: TourStep[] }>();
  const tourRef = ref<InstanceType<typeof VTour> | null>(null);
  const globalStore = useGlobalStore();
  const { registerTourRef} = globalStore;

  watch(
    () => tourRef.value,
    (value) => {
      registerTourRef(props.name, value);
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    registerTourRef(props.name, null);
  });
</script>

<template>
  <VTour
      highlight
      :backdrop="true"
      ref="tourRef"
      :name="props.name"
      :steps="props.steps"
      :trapFocus="false"
      :next-button="{ label: 'Siguiente' }"
      :skip-button="{ label: 'Salir' }"
      :prev-button="{label: 'Anterior'}"
      :finish-button="{label:'Finalizar'}"
  >
  </VTour>
</template>
<style scoped>

</style>
