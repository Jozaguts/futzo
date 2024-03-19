import {defineStore} from "pinia";
import {NitroFetchOptions} from "nitropack";
interface GooglePlace {
    places:{
        displayName: {
            text: string;
        };
        formattedAddress: string;
    }[];
}
interface Location {
    name: string;
    address: string;
}


export const useTeamStore = defineStore('teamStore', () => {

    const teams = ref([])
    const team = ref({})
    const categories = ref([])
    const tournaments = ref([])
    const locations = ref<Location[]>()

    const availableDays = ref<object[]>([
        {
            name: 'Lunes',
            value: false,
            open: '',
            close: '',
            error: false,
        },
        {
            name: 'Martes',
            saved: false,
            open: '',
            close: '',
            error: false,
        },
        {
            name: 'Miercoles',
            saved: false,
            open: '',
            close: '',
            error: false,
        },
        {
            name: 'Jueves',
            saved: false,
            open: '',
            close: '',
            error: false,
        },
        {
            name: 'Viernes',
            saved: false,
            open: '',
            close: '',
            error: false,
        },
        {
            name: 'Sabado',
            saved: false,
            open: '',
            close: '',
            error: false,
        },
        {
            name: 'Domingo',
            saved: false,
            open: '',
            close: '',
            error: false,
        }
    ]);
    const locationModel =  reactive({
        name: '',
        address: '',
        availableDays: []
    })
    const lastSearch = ref('')
    const client = useSanctumClient()

    const getTeams = async () => {
        try {
            const data = await client('/api/v1/admin/teams')
            teams.value = data.teams
            categories.value = data.categories
            tournaments.value = data.tournaments
            locations.value = data?.locations ?? [{id: 1, name: 'Lagos'}, {id: 2, name: 'Abuja'}]
        } catch (error) {
            console.log(error)
        }
    }
    const searchLocation = useDebounceFn(async (place: string) => {
        console.log(place, lastSearch.value)
        console.log(place.toUpperCase(), lastSearch.value.toUpperCase())
            if (!place || lastSearch.value.toUpperCase() === place.toUpperCase()){ return}
            else {
                lastSearch.value = place
                const options = {
                    method: 'POST',
                    headers: {
                        // todo add api key to env
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": 'AIzaSyCEQ_vXTkXUIxE-exwES14KvkoGaAHOGFQ',
                        "X-Goog-FieldMask": "places.displayName,places.formattedAddress"
                    },
                    body: JSON.stringify({text_query: place })
                }
                const response = await $fetch<GooglePlace>(`https://places.googleapis.com/v1/places:searchText`, options as NitroFetchOptions)
                if (response.places.length) {
                    locations.value = response.places.map((p: any) => {
                        return  {
                            name: p.displayName.text,
                            address: p.formattedAddress
                        }
                    })
                }
            }

        },400);
    const createTeam = async (team) => {
        try {
            await client('/api/v1/admin/teams', {
                method: 'POST',
                body: team
            })
            await getTeams()
        } catch (error) {
            console.log(error)
        }
    }
    const storeField = async () => {
        try {

            const body ={
                name: locationModel.name,
                address: locationModel.address,
                availability: availableDays.value
            }
            locationModel.availableDays = availableDays.value
            await client('/api/v1/admin/locations', {
                method: 'POST',
                body
            })
            locationModel.name = ''
            locationModel.address = ''
            availableDays.value = availableDays.value.map((day: any) => {
                return {
                    ...day,
                    saved: false
                }
            })
            await getLocations()
        }catch (error) {
            console.error(error)
        }
    }
    const getLocations = async () => {
        try {
            locations.value = await client('/api/v1/admin/locations')

        } catch (error) {
            console.log(error)
        }

    }
    onMounted(async () => {
        await getLocations()

    }   )
    return {
        teams,
        team,
        locationModel,
        tournaments,
        categories,
        locations,
        availableDays,
        getTeams,
        createTeam,
        searchLocation,
        storeField,
        getLocations,
    }


})