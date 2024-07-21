import { ref, reactive, computed } from 'vue';
import { j as defineStore, i as useSanctumClient } from './server.mjs';
import { u as useDebounceFn } from './index-pTp1Ji9-.mjs';

const useTeamStore = defineStore("teamStore", () => {
  const teams = ref([]);
  const team = ref({});
  const categories = ref([]);
  const tournaments = ref([]);
  const locations = ref();
  const availableDays = ref([
    {
      name: "Lunes",
      value: false,
      open: "",
      close: "",
      error: false
    },
    {
      name: "Martes",
      saved: false,
      open: "",
      close: "",
      error: false
    },
    {
      name: "Miercoles",
      saved: false,
      open: "",
      close: "",
      error: false
    },
    {
      name: "Jueves",
      saved: false,
      open: "",
      close: "",
      error: false
    },
    {
      name: "Viernes",
      saved: false,
      open: "",
      close: "",
      error: false
    },
    {
      name: "Sabado",
      saved: false,
      open: "",
      close: "",
      error: false
    },
    {
      name: "Domingo",
      saved: false,
      open: "",
      close: "",
      error: false
    }
  ]);
  const locationModel = reactive({
    name: "",
    address: "",
    availableDays: []
  });
  const lastSearch = ref("");
  const googleSearchLocations = ref([]);
  const client = useSanctumClient();
  const getTeams = async () => {
    var _a;
    try {
      const data = await client("/api/v1/admin/teams");
      teams.value = data.teams;
      categories.value = data.categories;
      tournaments.value = data.tournaments;
      locations.value = (_a = data == null ? void 0 : data.locations) != null ? _a : [{ id: 1, name: "Lagos" }, { id: 2, name: "Abuja" }];
    } catch (error) {
      console.log(error);
    }
  };
  const searchLocation = useDebounceFn(async (place) => {
    if (!place || lastSearch.value.toUpperCase() === place.toUpperCase()) {
      return;
    }
    const autocompleteService = new (void 0).google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input: place }, (predictions, status) => {
      if (status !== (void 0).google.maps.places.PlacesServiceStatus.OK) {
        googleSearchLocations.value = [];
        return;
      }
      return googleSearchLocations.value = predictions.map((p) => {
        return {
          name: p.structured_formatting.main_text,
          address: p.structured_formatting.secondary_text,
          formatAddress: p.description,
          place_id: p.place_id
        };
      });
    });
    lastSearch.value = place;
  }, 400);
  const createTeam = async (team2) => {
    try {
      await client("/api/v1/admin/teams", {
        method: "POST",
        body: team2
      });
      await getTeams();
    } catch (error) {
      console.log(error);
    }
  };
  const storeField = async () => {
    try {
      const body = {
        name: locationModel.name,
        address: locationModel.address,
        availability: availableDays.value
      };
      locationModel.availableDays = availableDays.value;
      await client("/api/v1/admin/locations", {
        method: "POST",
        body
      });
      locationModel.name = "";
      locationModel.address = "";
      availableDays.value = availableDays.value.map((day) => {
        return {
          ...day,
          saved: false
        };
      });
      await getLocations();
    } catch (error) {
      console.error(error);
    }
  };
  const getLocations = async () => {
    try {
      locations.value = await client("/api/v1/admin/locations");
    } catch (error) {
      console.log(error);
    }
  };
  computed(() => {
  });
  return {
    teams,
    team,
    locationModel,
    tournaments,
    categories,
    locations,
    availableDays,
    googleSearchLocations,
    getTeams,
    createTeam,
    searchLocation,
    storeField,
    getLocations
  };
});

export { useTeamStore as u };
//# sourceMappingURL=useTeamStore-v88rBx6j.mjs.map
