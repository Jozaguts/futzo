import { defineStore } from "pinia";
import type { Location } from "~/models/Location";

export const useLocationStore = defineStore("locationStore", () => {
  const locations = ref<Location[]>();
  const locationStoreRequest = ref<Location>();
  const locationDialog = ref(false);

  function getLocations(): void {
    const client = useSanctumClient();
    client("/api/v1/admin/locations").then(({ data }) => {
      locations.value = data;
    });
  }

  function storeLocation(): void {
    const client = useSanctumClient();
    client("/api/v1/admin/locations", {
      method: "POST",
      body: locationStoreRequest.value,
    }).then(() => {
      getLocations();
    });
  }

  return {
    locations,
    locationStoreRequest,
    locationDialog,
    storeLocation,
    getLocations,
  };
});
