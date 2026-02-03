import type {VTour} from '#components';

// @ts-ignore
export const useTourController = () => {
  const tourRef = ref<InstanceType<typeof VTour> | null>(null);

  const registerTourRef = (value: InstanceType<typeof VTour> | null) => {
    tourRef.value = value;
  };
  const startTour = async () => {
    await nextTick();
    tourRef.value?.startTour();
  };
  const resetTour = async () => {
    await nextTick();
    tourRef.value?.resetTour();
  };
  const recalculateTour = async () => {
    await nextTick();
    tourRef.value?.recalculatePopper();
  };

  return {
    tourRef,
    registerTourRef,
    startTour,
    resetTour,
    recalculateTour,
  };
};
