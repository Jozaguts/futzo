import {defineStore} from 'pinia';
import type {FormSteps, LocationCard, LocationStoreRequest} from '~/models/Location';
import {useApiError} from "~/composables/useApiError";
import type {IPagination} from "~/interfaces";
import {ref} from "vue";

export const useLocationStore = defineStore('locationStore', () => {
    const locations = ref<LocationCard[]>();
    const locationStoreRequest = ref<LocationStoreRequest>();
    const locationDialog = ref(false);
    const isEdition = ref(false);
    const toUpdate = ref<LocationCard>();
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

    async function getLocations(): Promise<void> {
        const client = useSanctumClient();
        await client(
            `/api/v1/admin/locations?per_page=${pagination.value.perPage}&page=${pagination.value.currentPage}&sort=${pagination.value.sort}`,
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
        await client(`/api/v1/admin/locations/${toUpdate.value?.id}`, {
            method: 'PUT',
            body: locationStoreRequest.value,
        }).then(async () => {
            await getLocations();
            const {toast} = useToast();
            toast(
                'success',
                'Ubicación actualizada',
                'La ubicación se ha actualizado exitosamente.'
            );
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
        toUpdate,
        locationToDelete,
        pagination,
        formSteps,
        deleteLocation,
        storeLocation,
        updateLocation,
        getLocations,
    };
});
