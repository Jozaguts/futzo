const search = useDebounceFn(async (place: string) => {
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error("Google Maps JavaScript API library is not loaded.");
    return [];
  }
  const autocompleteService =
    new window.google.maps.places.AutocompleteService();
  return new Promise((resolve) => {
    autocompleteService.getPlacePredictions(
      { input: place },
      (predictions: PromiseLike<void>, status: string) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          console.error("Error fetching place predictions:", status);
          return;
        }
        resolve(predictions);
      },
    );
  });
}, 400);
export default search;
