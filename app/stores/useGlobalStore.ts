import {defineStore} from 'pinia';
import {useDisplay} from 'vuetify';
import type {VTour} from '#components';
import type {Tour, TourKey} from "~/interfaces";

export const useGlobalStore = defineStore('global', () => {
  const { mobile } = useDisplay();

  const isMobile = computed(() => mobile.value);
  const isLoading = ref(true);
  const appName = ref(useNuxtApp().$config.public.appName);
  const rail = ref(false);
  const drawerWidth = ref<number>(0);
  const showFooter = ref(true);
  const toastDuration = ref(5000);
  const toastId = ref();
  const showSupportButton = ref(true);
  const openMessageSupportBox = ref(false);

  const drawer = ref(true);
  // @ts-ignore
  const toursSteps = ref<Tour>({
    dashboard: {
      steps: [
        {
        title: "Crea tu torneo",
        subText: "Al crear un torneo, Futzo genera un <span class='font-weight-bold mb-2'>link </span> y un <span class='font-weight-bold mb-2'>código QR</span> para que los equipos se registren automáticamente y puedas generar el calendario.",
          slot: "dashboard",
          target: '#Torneos-tour',
        },
        {
          title: "Registra tus equipos",
          subText: "Puedes registrarlos manualmente o compartir el acceso del torneo (link o QR) para que los equipos se inscriban solos, sin trabajo extra.",
          slot: "dashboard",
          target: '#Equipos-tour',
        },
        {
          title: "Registra a tus jugadores",
          subText: "Puedes agregarlos <b>uno por uno </b>o compartir el acceso del equipo para que los jugadores se registren automáticamente y generar <b>estadísticas de goles, tarjetas y rendimiento</b>.",
          slot: "dashboard",
          target: '#Jugadores-tour',
        },
        {
          title: "Configura las ubicaciones",
          subText: "Las ubicaciones son opcionales, pero te permiten un <b>mejor control y automatización</b> del rol de juegos, horarios y sedes.",
          slot: "dashboard",
          target: '#Ubicaciones-tour',
        },
      ],
      show: false,
      ref: null,
    },
    torneos:{
      steps: [
        {
          title: "Crea tu torneo",
          subText: "Al crear un torneo, Futzo genera un <span class='font-weight-bold mb-2'>link </span> y un <span class='font-weight-bold mb-2'>código QR</span> para que los equipos se registren automáticamente y puedas generar el calendario.",
          slot: "torneos",
          target: '#Torneos-tour',
        },
        {
          title: "Registra tus equipos",
          subText: "Puedes registrarlos manualmente o compartir el acceso del torneo (link o QR) para que los equipos se inscriban solos, sin trabajo extra.",
          slot: "torneos",
          target: '#Equipos-tour',
        },
        {
          title: "Registra a tus jugadores",
          subText: "Puedes agregarlos <b>uno por uno </b>o compartir el acceso del equipo para que los jugadores se registren automáticamente y generar <b>estadísticas de goles, tarjetas y rendimiento</b>.",
          slot: "torneos",
          target: '#Jugadores-tour',
        },
        {
          title: "Configura las ubicaciones",
          subText: "Las ubicaciones son opcionales, pero te permiten un <b>mejor control y automatización</b> del rol de juegos, horarios y sedes.",
          slot: "torneos",
          target: '#Ubicaciones-tour',
        },
      ],
      show: false,
      ref: null,
    },
    equipos:{
      steps: [
        {
          title: "Crea tu torneo",
          subText: "Al crear un torneo, Futzo genera un <span class='font-weight-bold mb-2'>link </span> y un <span class='font-weight-bold mb-2'>código QR</span> para que los equipos se registren automáticamente y puedas generar el calendario.",
          slot: "equipos",
          target: '#Torneos-tour',
        },
        {
          title: "Registra tus equipos",
          subText: "Puedes registrarlos manualmente o compartir el acceso del torneo (link o QR) para que los equipos se inscriban solos, sin trabajo extra.",
          slot: "equipos",
          target: '#Equipos-tour',
        },
        {
          title: "Registra a tus jugadores",
          subText: "Puedes agregarlos <b>uno por uno </b>o compartir el acceso del equipo para que los jugadores se registren automáticamente y generar <b>estadísticas de goles, tarjetas y rendimiento</b>.",
          slot: "equipos",
          target: '#Jugadores-tour',
        },
        {
          title: "Configura las ubicaciones",
          subText: "Las ubicaciones son opcionales, pero te permiten un <b>mejor control y automatización</b> del rol de juegos, horarios y sedes.",
          slot: "equipos",
          target: '#Ubicaciones-tour',
        },
      ],
      show: false,
      ref: null,
    },
    // jugadores: {
    //   steps: [],
    //   show: false,
    //   ref: null,
    // },
    // ubicaciones: {
    //   steps: [],
    //   show: false,
    //   ref: null,
    // }
  });
  const availableTours: ComputedRef<string[]> = computed(() => Object.keys(toursSteps.value) ?? [])
  const activeTourKey = ref<TourKey | null>(null);
  const getTourSteps = (tourName: TourKey) => toursSteps.value[tourName];
  // @ts-ignore
  const registerTourRef = (tourName: TourKey, value: InstanceType<typeof VTour> | null) => {
    const tour = toursSteps.value[tourName];
    if (tour) {
      tour.ref = value;
    }
  };
  const startTour = (tourName: TourKey) => toursSteps.value[tourName]?.ref?.startTour();
  const resetTour = (tourName: TourKey) => toursSteps.value[tourName]?.ref?.resetTour();
  const recalculateTour = (tourName: TourKey) =>
    toursSteps.value[tourName]?.ref?.recalculatePopper();

  return {
    isLoading,
    drawer,
    appName,
    isMobile,
    rail,
    drawerWidth,
    showFooter,
    toastDuration,
    toastId,
    showSupportButton,
    openMessageSupportBox,
    getTourSteps,
    toursSteps,
    registerTourRef,
    startTour,
    resetTour,
    recalculateTour,
  };
});
