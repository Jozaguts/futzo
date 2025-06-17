import { u as useDebounceFn } from './index-DU0YTrEL.mjs';

let sessionToken = null;
const getSessionToken = async () => {
  if (!sessionToken) {
    const { AutocompleteSessionToken } = await google.maps.importLibrary("places");
    sessionToken = new AutocompleteSessionToken();
  }
  return sessionToken;
};
const usePlaceSearch = () => {
  const search = useDebounceFn(async (input) => {
    var _a, _b, _c;
    try {
      const { AutocompleteSuggestion } = await google.maps.importLibrary("places");
      const sessionToken2 = await getSessionToken();
      const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input,
        sessionToken: sessionToken2,
        language: "es",
        region: "mx"
      });
      return suggestions.map((s) => {
        var _a2, _b2, _c2, _d;
        return {
          description: s.placePrediction.text.text || "",
          matched_substrings: [],
          place_id: ((_a2 = s.placePrediction) == null ? void 0 : _a2.placeId) || "",
          reference: ((_b2 = s.placePrediction) == null ? void 0 : _b2.placeId) || "",
          structured_formatting: {
            main_text: s.placePrediction.mainText.text || "",
            secondary_text: ((_c2 = s.placePrediction.secondaryText) == null ? void 0 : _c2.text) || "",
            main_text_matched_substrings: s.placePrediction.mainText.matches
          },
          terms: [],
          types: ((_d = s.placePrediction) == null ? void 0 : _d.types) || []
        };
      });
    } catch (error) {
      console.warn("Fallo AutocompleteSuggestion, usando fallback:", error);
      if (!((_c = (_b = (_a = (void 0).google) == null ? void 0 : _a.maps) == null ? void 0 : _b.places) == null ? void 0 : _c.AutocompleteService)) return [];
      return new Promise((resolve) => {
        const service = new google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input }, (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
            console.error("Error con AutocompleteService:", status);
            resolve([]);
          } else {
            resolve(predictions);
          }
        });
      });
    }
  }, 400);
  return { search };
};
const getPlaceDetails = async (placeId) => {
  var _a, _b, _c, _d;
  if (!((_b = (_a = (void 0).google) == null ? void 0 : _a.maps) == null ? void 0 : _b.importLibrary)) {
    console.error("Google Maps API no est\xE1 disponible.");
    return null;
  }
  try {
    const { Place } = await google.maps.importLibrary("places");
    const place = new Place({ id: placeId, requestedLanguage: "es" });
    await place.fetchFields({
      fields: ["displayName", "formattedAddress", "location"]
    });
    return {
      name: place.displayName,
      address: place.formattedAddress,
      lat: (_c = place.location) == null ? void 0 : _c.lat(),
      lng: (_d = place.location) == null ? void 0 : _d.lng()
    };
  } catch (error) {
    console.error("Error al obtener detalles del lugar:", error);
    return null;
  }
};

export { getPlaceDetails as g, usePlaceSearch as u };
//# sourceMappingURL=googleSearch-Dzva-T1R.mjs.map
