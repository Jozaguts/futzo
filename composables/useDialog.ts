type Steps = {
  current: string;
  steps: Array<{ step: string; completed: boolean }>;
};
type StepRef = { validate: Function; handleSubmit: Function };

export const useDialog = (steps: Ref<Steps>, dialog: Ref<boolean>) => {
  const settings = ref({});
  const stepRef = ref<StepRef>({
    validate: Function,
    handleSubmit: Function,
  });
  const lastItem = steps.value.steps[steps.value.steps.length - 1];
  const firstItem = steps.value.steps[0];
  const stepsOrder = steps.value.steps
    .map((step) => step.step)
    .join(',')
    .split(',');
  const secondaryTextBtn = computed(() => {
    return steps.value.current === firstItem.step ? 'Cancelar' : 'Regresar';
  });
  const primaryTextBtn = computed(() => {
    return steps.value.current === lastItem.step ? 'Crear' : 'Siguiente';
  });
  const backHandler = () => {
    if (steps.value.current === firstItem.step) {
      dialog.value = false;
      return;
    }
    // const stepsOrder: CurrentCalendarStep[] = [
    //   "general",
    //   "regular",
    //   "elimination",
    // ];
    const currentStepIndex = stepsOrder.indexOf(steps.value.current);
    steps.value.steps.forEach((step, index) => {
      if (currentStepIndex < index + 1) {
        step.completed = false;
      }
    });
    steps.value.current = stepsOrder[currentStepIndex - 1];
  };
  const nextHandler = async () => {
    const statusForm = await stepRef.value.validate();
    const formValues = stepRef.value.handleSubmit((values: any) => values);
    const teamStoreRequestValues = await formValues();
    console.log(teamStoreRequestValues);
    if (statusForm.valid) {
      // const calendarStoreRequestValues = await getFormValues();
      // fillTournamentStoreRequest(calendarStoreRequestValues);
      //
      // const currentStepIndex = stepsOrder.indexOf(steps.value.current);
      // if (!steps.value.steps[currentStepIndex].completed) {
      //   steps.value.steps[currentStepIndex].completed = true;
      // }
      // const isLastStep = currentStepIndex === stepsOrder.length - 1;
      // isLastStep
      //   ? await saveHandler()
      //   : (calendarSteps.value.current = stepsOrder[currentStepIndex + 1]);
    }
  };

  return {
    settings,
    secondaryTextBtn,
    primaryTextBtn,
    stepRef,
    backHandler,
    nextHandler,
  };
};
