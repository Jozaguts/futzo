import {defineStore, skipHydrate} from 'pinia';
import type {
    All,
    Field,
    FormSteps,
    LocationCard,
    LocationPosition,
    LocationResponse,
    LocationStoreRequest,
    Windows,
} from '~/models/Location';
import {useApiError} from '~/composables/useApiError';
import type {IPagination} from '~/interfaces';
import {ref} from 'vue';
import {DEFAULT_POSITION} from '~/utils/constants';
import {useSanctumClient} from '#imports';
import type {TourStep} from '#nuxt-tour/props';
import {useTourController} from '~/composables/useTourController';

function sanitizeWindows(windows: Windows): Windows {
  const keys: (keyof Windows)[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'all'];
  const out: Windows = {};
  for (const key of keys) {
    if (!windows || !windows[key]) continue;
    const arr = (windows[key] as All[]) || [];
    // keep only enabled windows and strip the enabled flag before sending
    const enabled = arr.filter((w) => w && w.enabled === true).map((w) => ({ start: w.start, end: w.end })) as any;
    // If none enabled, send empty array to signal no availability for that day
    (out as any)[key] = enabled;
  }
  return out;
}

function sanitizeLocationPayload(payload: LocationStoreRequest): LocationStoreRequest {
  const copy = JSON.parse(JSON.stringify(payload)) as LocationStoreRequest;
  if (Array.isArray(copy.fields)) {
    copy.fields = copy.fields.map((f) => ({
      ...f,
      windows: sanitizeWindows(f.windows as Windows),
    }));
  }
  return copy;
}

export const useLocationStore = defineStore('locationStore', () => {
  const { registerTourRef, startTour, resetTour, recalculateTour } = useTourController();
  const INIT_STEPS: FormSteps = {
    current: 'location',
    steps: {
      location: {
        number: 1,
        completed: false,
        label: 'Ubicación',
        disable: true,
        back_step: 'close',
        next_step: 'availability',
        back_label: 'Cancelar',
        next_label: 'Siguiente',
      },
      availability: {
        number: 2,
        completed: false,
        label: 'Disponibilidad',
        disable: true,
        back_step: 'location',
        next_step: 'save',
        back_label: 'Anterior',
        next_label: 'Crear ubicación',
      },
    },
  };
  const stepsCompleted = computed(() => {
    const steps = locationStoreRequest.value?.steps;
    if (!steps) return 0;
    return Number(!!steps.location?.completed) + Number(!!steps.fields?.completed);
  });
  const isAllStepsCompleted = computed(() => {
    const steps = locationStoreRequest.value?.steps;
    return (!!steps?.location?.completed && !!steps?.fields?.completed) || isEdition.value;
  });
  const locations = ref<LocationCard[]>();
  const locationStoreRequest = ref<LocationStoreRequest>({
    name: '',
    address: '',
    place_id: '',
    position: { lat: 16.8639515, lng: -99.8822807 } as LocationPosition,
    tags: [] as string[],
    fields: [] as Field[],
    fields_count: 1,
    steps: {
      location: {
        completed: false,
      },
      fields: {
        completed: false,
      },
    },
  });
  const locationDialog = ref(false);
  const isEdition = ref(false);
  const locationCard = ref<LocationCard>({} as LocationCard);
  const locationToDelete = ref<{ id: number | null; show: boolean }>({
    id: null,
    show: false,
  });
  const pagination = ref<IPagination>({
    current_page: 1,
    per_page: 8,
    last_page: 1,
    total: 0,
    sort: 'asc',
  });
  const search = ref('');
  const formSteps = ref<FormSteps>(INIT_STEPS);
  const tourSteps = ref<TourStep[]>([
    {
      title: 'Registra ubicaciones y campos',
      subText:
        'Este paso es opcional. Si lo configuras, Futzo podrá programar partidos automáticamente según la disponibilidad.',
      slot: 'ubicaciones',
      target: '.locations-primary-btn',
      onNext: () => {
        locationDialog.value = true;
        formSteps.value.current = 'location';
      },
      onPrev:() =>{
        locationDialog.value = false
      },
    },
    {
      title: 'Registrar una ubicación',
      subText:
        'Agrega dirección, nombre, cantidad de campos y etiquetas. Estos campos estarán disponibles para toda la liga.',
      slot: 'ubicaciones',
      target: '#location-step-1',
      onNext: () => {
        formSteps.value.current = 'availability';
      },
    },
    {
      title: 'Configura campos y disponibilidad',
      subText:
        'Define nombre del campo y horarios. Futzo usará esta info para programar partidos sin conflictos.',
      slot: 'ubicaciones',
      target: '#location-step-2',
      onNext: () => {
        locationDialog.value = false;
      },
    },
  ]);
  const $reset = () => {
    resetLocationStoreRequest();
    locationDialog.value = false;
    isEdition.value = false;
    locationCard.value = {} as LocationCard;
    locationToDelete.value = { id: null, show: false };
    pagination.value = {
      current_page: 1,
      per_page: 8,
      last_page: 1,
      total: 0,
      sort: 'asc',
    };
    locations.value = [];
  };

  async function reloadLocations() {
    pagination.value = {
      current_page: 1,
      per_page: 8,
      last_page: 1,
      total: 0,
      sort: 'asc',
    };
    await getLocations(undefined, false);
  }

  function resetLocationStoreRequest() {
    locationStoreRequest.value = {
      name: '',
      address: '',
      tags: [],
      place_id: '',
      fields: [] as Field[],
      fields_count: 0,
      position: DEFAULT_POSITION,
      steps: {
        location: { completed: false },
        fields: { completed: false },
      },
      completed: false,
    } as LocationStoreRequest;
  }

  async function getLocations(searchValue?: string, append = false): Promise<void> {
    const client = useSanctumClient();
    if (typeof searchValue === 'string') {
      search.value = searchValue.trim();
    }
    const url = `/api/v1/admin/locations?per_page=${pagination.value.per_page}&page=${pagination.value.current_page}&sort=${pagination.value.sort}`;
    const query = search.value ? `&search=${encodeURIComponent(search.value)}` : '';

    await client<LocationResponse>(url + query).then(({ data, meta }) => {
      pagination.value = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        per_page: meta.per_page,
        total: meta.total,
        sort: pagination.value.sort,
      };
      if (append && pagination.value.current_page > 1) {
        locations.value = [...(locations.value as LocationCard[]), ...data];
      } else {
        locations.value = data;
      }
    });
  }

  async function storeLocation(): Promise<void> {
    const client = useSanctumClient();
    const body = sanitizeLocationPayload(locationStoreRequest.value);
    await client<LocationCard>('/api/v1/admin/locations', {
      method: 'POST',
      body,
    })
      .then(async () => {
        await Promise.all([reloadLocations(), useOnboardingStore().refresh(), useSanctumAuth().refreshIdentity()]);
        const { toast } = useToast();
        toast({
          type: 'success',
          msg: 'Ubicación creada',
          description: 'La  nueva ubicación se ha agregado exitosamente.',
        });
        locationDialog.value = false;
      })
      .catch((error) => {
        const { message } = useApiError(error);
        const { toast } = useToast();
        toast({
          type: 'error',
          msg: 'Error al crear la ubicación',
          description: message ?? 'Ocurrió un error al intentar crear la ubicación.',
        });
      });
  }

  async function updateLocation(): Promise<void> {
    const client = useSanctumClient();
    const body = sanitizeLocationPayload(locationStoreRequest.value);
    await client(`/api/v1/admin/locations/${locationCard.value?.id}`, {
      method: 'PUT',
      body,
    }).then(async () => {
      await Promise.all([reloadLocations(), useOnboardingStore().refresh()]);
      const { toast } = useToast();
      toast({
        type: 'success',
        msg: 'Ubicación actualizada',
        description: 'La ubicación se ha actualizado exitosamente.',
      });
      locationDialog.value = false;
    });
  }

  async function deleteLocation(): Promise<void> {
    const client = useSanctumClient();
    await client(`/api/v1/admin/locations/${locationToDelete.value.id}`, {
      method: 'DELETE',
    }).then(async () => {
      await Promise.all([reloadLocations(), useOnboardingStore().refresh()]);
      const { toast } = useToast();
      toast({ type: 'success', msg: 'Ubicación eliminada', description: 'La ubicación se ha eliminado exitosamente.' });
      locations.value = locations.value?.filter((location) => location.id !== locationToDelete.value.id);
      locationToDelete.value.show = false;
      locationToDelete.value.id = null;
    });
  }

  const noLocations = computed(() => !locations.value || locations.value.length === 0);
  return {
    registerTourRef,
    startTour,
    resetTour,
    recalculateTour,
    locations,
    locationStoreRequest,
    locationDialog,
    noLocations,
    isEdition,
    locationCard,
    locationToDelete,
    pagination,
    search,
    formSteps,
    tourSteps: skipHydrate(tourSteps),
    stepsCompleted,
    isAllStepsCompleted,
    deleteLocation,
    storeLocation,
    updateLocation,
    getLocations,
    resetLocationStoreRequest,
    reloadLocations,
    $reset,
  };
});
