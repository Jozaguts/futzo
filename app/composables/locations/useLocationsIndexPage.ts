type LocationsQuickActionId = 'new_location'

type LocationsQuickAction = {
  id: LocationsQuickActionId
  label: string
  icon: string
  className?: string
  testId: string
}

export const useLocationsIndexPage = () => {
  const locationStore = useLocationStore()
  const { isEdition, locationDialog, locationToDelete, locations, tourSteps, pagination } = storeToRefs(locationStore)
  const { registerTourRef, startTour, resetTour, recalculateTour } = locationStore
  const { setActiveController, clearActiveController } = useTourHub()
  const tourController = { registerTourRef, startTour, resetTour, recalculateTour }
  const isLoading = ref(false)

  const quickActions = computed<LocationsQuickAction[]>(() => [
    {
      id: 'new_location',
      label: 'Nueva ubicación',
      icon: 'lucide:map-pin-plus',
      className: 'locations-primary-btn',
      testId: 'ubicaciones-new-location-btn',
    },
  ])

  const openCreateLocation = () => {
    isEdition.value = false
    locationDialog.value = true
  }

  const handleQuickAction = (actionId: string) => {
    switch (actionId as LocationsQuickActionId) {
      case 'new_location':
        openCreateLocation()
    }
  }

  const deleteLocationHandler = () => {
    isLoading.value = true
    locationStore.deleteLocation().finally(() => {
      isLoading.value = false
    })
  }

  const searchLocationHandler = useDebounceFn((value: string) => {
    pagination.value.current_page = 1
    locationStore.getLocations(value)
  }, 500)

  const initializePage = async () => {
    if (!locations.value?.length) {
      await locationStore.getLocations()
    }
    setActiveController(tourController)
  }

  const disposePage = () => {
    clearActiveController(tourController)
  }

  return {
    locationToDelete,
    locations,
    pagination,
    tourSteps,
    isLoading,
    quickActions,
    registerTourRef,
    handleQuickAction,
    deleteLocationHandler,
    searchLocationHandler,
    initializePage,
    disposePage,
  }
}
