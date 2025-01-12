import {defineStore} from 'pinia';
import type {LocationCard, LocationStoreRequest} from '~/models/Location';
import {useApiError} from "~/composables/useApiError";

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

    async function getLocations(): Promise<void> {
        const client = useSanctumClient();
        await client('/api/v1/admin/locations').then((data) => {
            locations.value = data;
        });
    }

    async function storeLocation(): Promise<void> {
        const client = useSanctumClient();
        await client('/api/v1/admin/locations', {
            method: 'POST',
            body: locationStoreRequest.value,
        }).then(async () => {
            await getLocations();
            const {toast} = useToast();
            toast(
                'success',
                'Ubicación creada',
                'La  nueva ubicación se ha agregado exitosamente.'
            );
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
        storeLocation,
        updateLocation,
        getLocations,
    };
});
