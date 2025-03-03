import type {LocationAvailability} from "~/models/Location";

export const MAIN_PADDING_TOP = 48;
export const MAIN_PADDING_BOTTOM = 64;
export const FUTBOL_11_ID = 1;
export const MAX_SIZE = 2.0;
export const MIN_TEAMS = 8;
export const MAX_TEAMS = 32;
export const DEFAULT_POSITION = {lat: 16.8639515, lng: -99.8822807};
export const GOOGLE_MAPS_OPTIONS = {
    colorScheme: 'LIGHT',
    center: DEFAULT_POSITION,
    zoom: 15,
    mapTypeId: 'roadmap',
    zoomControl: true,
    cameraControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    gestureHandling: "cooperative",
    renderingType: 'VECTOR'
}
export const DEFAULT_AVAILABILITY_HOURS: LocationAvailability[] = [
    {
        id: 1,
        name: 'Campo 1',
        isCompleted: false,
        monday: {enabled: false, start: {hours: '09', minutes: '00'}, end: {hours: '17', minutes: '00'}},
        tuesday: {enabled: false, start: {hours: '09', minutes: '00'}, end: {hours: '17', minutes: '00'}},
        wednesday: {enabled: false, start: {hours: '09', minutes: '00'}, end: {hours: '17', minutes: '00'}},
        thursday: {enabled: false, start: {hours: '09', minutes: '00'}, end: {hours: '17', minutes: '00'}},
        friday: {enabled: true, start: {hours: '09', minutes: '00'}, end: {hours: '17', minutes: '00'}},
        saturday: {enabled: true, start: {hours: '09', minutes: '00'}, end: {hours: '17', minutes: '00'}},
        sunday: {enabled: true, start: {hours: '09', minutes: '00'}, end: {hours: '17', minutes: '00'}},
    }
]
