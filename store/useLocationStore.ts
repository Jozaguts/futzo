import {defineStore} from 'pinia';
import type {Location, LocationStoreRequest} from '~/models/Location';

export const useLocationStore = defineStore('locationStore', () => {
    const locations = ref<Location[]>();
    const locationStoreRequest = ref<LocationStoreRequest>();
    const locationDialog = ref(false);
    const isEdition = ref(false);

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
        });
    }

    const noLocations = computed(
        () => !locations.value || locations.value.length === 0
    );

    return {
        locations,
        locationStoreRequest,
        locationDialog,
        noLocations,
        isEdition,
        storeLocation,
        getLocations,
    };
});
