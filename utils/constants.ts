import type {LocationAvailability} from "~/models/Location";
import type {ScheduleLocationAvailability} from "~/models/Schedule";

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
    renderingType: 'VECTOR',
    mapId: '55d361dbe66ff806'
}
export const DEFAULT_AVAILABILITY_HOURS: ScheduleLocationAvailability[] = [
    {
        id: 1,
        name: 'Campo 1',
        isCompleted: false,
        monday: {enabled: false, available_range: '00:00-23:59', intervals: [{value: '*', text: 'Todo el dia', selected: false,}], label: 'Lunes'},
        tuesday: {enabled: false, available_range: '00:00-23:59', intervals: [{value: '*', text: 'Todo el dia', selected: false,}], label: 'Martes'},
        wednesday: {enabled: false, available_range: '00:00-23:59', intervals: [{value: '*', text: 'Todo el dia', selected: false,}], label: 'Miércoles'},
        thursday: {enabled: false, available_range: '00:00-23:59', intervals: [{value: '*', text: 'Todo el dia', selected: false,}], label: 'Jueves'},
        friday: {enabled: false, available_range: '00:00-23:59', intervals: [{value: '*', text: 'Todo el dia', selected: false,}], label: 'Viernes'},
        saturday: {enabled: false, available_range: '00:00-23:59', intervals: [{value: '*', text: 'Todo el dia', selected: false,}], label: 'Sábado'},
        sunday: {enabled: false, available_range: '00:00-23:59', intervals: [{value: '*', text: 'Todo el dia', selected: false,}], label: 'Domingo'},
    }
]
export const DEFAULT_LOCATION_AVAILABILITY: LocationAvailability = {
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
export const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const phoneRegex = /^\d{10}$/;
