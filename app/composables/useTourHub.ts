import type {VTour} from '#components';

export type TourController = {
  registerTourRef: (value: InstanceType<typeof VTour> | null) => void;
  startTour: () => void | Promise<void>;
  resetTour: () => void | Promise<void>;
  recalculateTour: () => void | Promise<void>;
};

export const useTourHub = () => {
  const activeController = useState<TourController | null>('tourHub:active', () => null);

  const setActiveController = (controller: TourController | null) => {
    activeController.value = controller;
  };
  const clearActiveController = (controller: TourController | null) => {
    if (!controller || activeController.value !== controller) return;
    activeController.value = null;
  };

  const startTour = () => activeController.value?.startTour();
  const resetTour = () => activeController.value?.resetTour();
  const recalculateTour = () => activeController.value?.recalculateTour();

  return {
    activeController,
    setActiveController,
    clearActiveController,
    startTour,
    resetTour,
    recalculateTour,
  };
};
