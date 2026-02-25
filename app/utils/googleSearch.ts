import { useDebounceFn } from '@vueuse/core';
import {ensureGoogleMapsApiLoaded} from '~/utils/googleMapsApiLoader'

let sessionToken: google.maps.places.AutocompleteSessionToken | null = null;
export const getSessionToken = async () => {
  const isLoaded = await ensureGoogleMapsApiLoaded()
  if (!isLoaded) return null

  if (!sessionToken) {
    const { AutocompleteSessionToken } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
    sessionToken = new AutocompleteSessionToken();
  }
  return sessionToken;
};

export const refreshSessionToken = async () => {
  const isLoaded = await ensureGoogleMapsApiLoaded()
  if (!isLoaded) return null

  const { AutocompleteSessionToken } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
  sessionToken = new AutocompleteSessionToken();
  return sessionToken;
};

export const usePlaceSearch = () => {
  const search = useDebounceFn(async (input: string) => {
    const isLoaded = await ensureGoogleMapsApiLoaded()
    if (!isLoaded) return []

    try {
      const { AutocompleteSuggestion } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;

      const sessionToken = await getSessionToken();
      if (!sessionToken) return []

      const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input,
        sessionToken,
        language: 'es',
        region: 'mx',
      });

      return suggestions.map((s: any) => {
        return {
          description: s.placePrediction.text.text || '',
          matched_substrings: [],
          place_id: s.placePrediction?.placeId || '',
          reference: s.placePrediction?.placeId || '',
          structured_formatting: {
            main_text: s.placePrediction.mainText.text || '',
            secondary_text: s.placePrediction.secondaryText?.text || '',
            main_text_matched_substrings: s.placePrediction.mainText.matches,
          },
          terms: [],
          types: s.placePrediction?.types || [],
        };
      });
    } catch (error) {
      console.warn('Fallo AutocompleteSuggestion, usando fallback:', error);

      if (!window.google?.maps?.places?.AutocompleteService) return [];

      return new Promise((resolve) => {
        const service = new google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input }, (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
            console.error('Error con AutocompleteService:', status);
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

export const getPlaceDetails = async (placeId: string) => {
  const isLoaded = await ensureGoogleMapsApiLoaded()
  if (!isLoaded) {
    console.error('Google Maps API no está disponible.');
    return null;
  }

  if (!window.google?.maps?.importLibrary) {
    console.error('Google Maps API no está disponible.');
    return null;
  }

  try {
    const { Place } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
    const place = new Place({ id: placeId, requestedLanguage: 'es' });
    await place.fetchFields({
      fields: ['displayName', 'formattedAddress', 'location'],
    });
    return {
      name: place.displayName,
      address: place.formattedAddress,
      lat: place.location?.lat(),
      lng: place.location?.lng(),
    };
  } catch (error) {
    console.error('Error al obtener detalles del lugar:', error);
    return null;
  }
};
