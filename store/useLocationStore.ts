import {defineStore} from 'pinia';
import type {FormSteps, LocationAvailability, LocationCard, LocationStoreRequest} from '~/models/Location';
import {useApiError} from "~/composables/useApiError";
import type {IPagination} from "~/interfaces";
import {ref} from "vue";
import {DEFAULT_AVAILABILITY_HOURS, DEFAULT_LOCATION_AVAILABILITY, DEFAULT_POSITION} from "~/utils/constants";

export const useLocationStore = defineStore('locationStore', () => {
    const stepsCompleted = computed(() => {
        return locationStoreRequest.value.availability.filter((item) => item.isCompleted).length
    })
    const isAllStepsCompleted = computed(() => {
        return (locationStoreRequest.value.availability.every((item) => item.isCompleted) && locationStoreRequest.value.completed) ||
            formSteps.value.current === 'location' && locationStoreRequest.value.completed ||
            isEdition.value

    })
    const locations = ref<LocationCard[]>();
    const locationStoreRequest = ref<LocationStoreRequest>({
        name: '',
        city: '',
        address: '',
        autocomplete_prediction: {},
        tags: [] as string[],
        availability: [] as LocationAvailability[],
        fields_count: 0,
        position: DEFAULT_POSITION
    } as LocationStoreRequest);
    const locationDialog = ref(false);
    const isEdition = ref(false);
    const locationCard = ref<LocationCard>({} as LocationCard);
    const locationToDelete = ref<{ id: number | null, show: boolean }>({
        id: null,
        show: false
    });
    const pagination = ref<IPagination>({
        currentPage: 1,
        perPage: 8,
        lastPage: 1,
        total: 0,
        sort: "asc",
    });
    const formSteps = ref<FormSteps>({
        current: 'location',
        steps: [
            {
                step: "location",
                completed: false,
                label: "Ubicación",
            },
            {
                step: "availability",
                completed: false,
                label: "Disponibilidad",
            },
        ],
    })
    const $reset = () => {
        resetLocationStoreRequest();
        locationDialog.value = false;
        isEdition.value = false;
        locationCard.value = {} as LocationCard;
        locationToDelete.value = {id: null, show: false};
        pagination.value = {
            currentPage: 1,
            perPage: 8,
            lastPage: 1,
            total: 0,
            sort: "asc",
        };
        locations.value = []
    }

    async function reloadLocations() {
        pagination.value = {
            currentPage: 1,
            perPage: 8,
            lastPage: 1,
            total: 0,
            sort: "asc",
        }
        await getLocations()
    }

    function resetLocationStoreRequest() {
        locationStoreRequest.value = {
            name: '',
            city: '',
            address: '',
            autocomplete_prediction: {},
            tags: [],
            availability: [] as LocationAvailability[],
            fields_count: 0,
            position: DEFAULT_POSITION,
            completed: false,
        } as LocationStoreRequest
    }

    async function getLocations(search?: string): Promise<void> {
        const client = useSanctumClient();
        const url = `/api/v1/admin/locations?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`

        await client(url + (search ? `&search=${search}` : '')
        ).then(({data, meta}) => {
            pagination.value = {
                currentPage: meta.current_page,
                lastPage: meta.last_page,
                perPage: meta.per_page,
                total: meta.total,
                sort: pagination.value.sort
            }
            if (pagination.value.currentPage > 1) {
                locations.value = [...locations.value as LocationCard[], ...data];
            } else {
                locations.value = data;
            }
        });
    }

    async function storeLocation(): Promise<void> {
        const client = useSanctumClient();
        await client('/api/v1/admin/locations', {
            method: 'POST',
            body: locationStoreRequest.value,
        }).then(async (location: LocationCard) => {
            locations.value?.splice(0, 0, location);
            await reloadLocations()
            const {toast} = useToast();
            toast(
                'success',
                'Ubicación creada',
                'La  nueva ubicación se ha agregado exitosamente.'
            );
            locationDialog.value = false;
        })
            .catch((error) => {
                const {message} = useApiError(error);
                const {toast} = useToast();
                toast(
                    'error',
                    'Error al crear la ubicación',
                    message ?? 'Ocurrió un error al intentar crear la ubicación.'
                );
            });
    }

    async function updateLocation(): Promise<void> {
        const client = useSanctumClient();
        await client(`/api/v1/admin/locations/${locationCard.value?.id}`, {
            method: 'PUT',
            body: locationStoreRequest.value,
        }).then(async () => {
            await reloadLocations();
            const {toast} = useToast();
            toast(
                'success',
                'Ubicación actualizada',
                'La ubicación se ha actualizado exitosamente.'
            );
            locationDialog.value = false;
        });
    }

    async function deleteLocation(): Promise<void> {
        const client = useSanctumClient();
        await client(`/api/v1/admin/locations/${locationToDelete.value.id}`, {
            method: 'DELETE',
        }).then(async () => {
                await getLocations();
                const {toast} = useToast();
                toast(
                    'success',
                    'Ubicación eliminada',
                    'La ubicación se ha eliminado exitosamente.'
                );
                locations.value = locations.value?.filter((location) => location.id !== locationToDelete.value.id);
                locationToDelete.value.show = false;
                locationToDelete.value.id = null;
            }
        );
    }

    const noLocations = computed(
        () => !locations.value || locations.value.length === 0
    );
    onMounted(async () => {
        if (!locations.value) {
            await getLocations();
        }
    });
    return {
        locations,
        locationStoreRequest,
        locationDialog,
        noLocations,
        isEdition,
        locationCard,
        locationToDelete,
        pagination,
        formSteps,
        stepsCompleted,
        isAllStepsCompleted,
        deleteLocation,
        storeLocation,
        updateLocation,
        getLocations,
        resetLocationStoreRequest,
        reloadLocations,
        $reset
    };
});
