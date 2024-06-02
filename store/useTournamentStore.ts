
import {defineStore} from "pinia";
import type {Tournament} from "~/models/tournament";
import type {Game} from "~/models/Game";
import {useGlobalStore} from "~/store/useGlobalStore";
export const useTournamentStore = defineStore('tournamentStore', () => {
    const tournament = ref<Tournament | null>(null);
    const tournaments = ref<Tournament[]>([]);
    const nextGames = ref<Game[]>([
        {
            id: 1,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: null,
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 2,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 3,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 4,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 5,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 6,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 7,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 8,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 9,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 10,
            away: {
                name: 'Cruz azul',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
    ]);
    const currentGames = ref<Game[]>([
        {
            id: 1,
            away: {
                name: 'Chivas',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Monterrey',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: null,
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 2,
            away: {
                name: 'Pachuca',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'Tigres',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 3,
            away: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'America',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 4,
            away: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'America',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 5,
            away: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'America',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        },
        {
            id: 6,
            away: {
                name: 'Santos',
                img: 'https://ui-avatars.com/api/?name=Cruz azul'
            },
            home: {
                name: 'America',
                img: 'https://ui-avatars.com/api/?name=Santos'
            },
            result: '1-0',
            schedule: {
                day:'Sab. 9/3',
                hour: '19:00',
            }
        }
    ]);
    const categories = ref([]);
    const teamsCount = ref(0)
    const roundsCount = ref(0)
    const matchesCount = ref(0)
    const matchesByRound = ref(0)
    const loading = ref(false)
    const tournamentTypes = ref()
    const dialog = ref(false)
    async function loadTournaments() {
        loading.value = true;
        const client = useSanctumClient();

        const data = await client('/api/v1/admin/tournaments');

        tournaments.value = data?.tournaments || [];
        tournament.value = tournaments.value[0] || null;
        categories.value = data?.categories || [];
        const timeout = setTimeout(() => {
            loading.value = false;
            }, 1000)
        return () => {
            clearTimeout(timeout)
        }

    }
    async function storeTournament(formData ) {
        const client = useSanctumClient();
        await useAsyncData('store-tournament', async () =>{
           return await client('api/v1/admin/tournaments', {
                method: 'POST',
                body: formData,

            });
        })
            .then(async () => {
                await loadTournaments();
                // todo agregar toast alert
            } )
    }
    async function storeCategory(formData) {
        const client = useSanctumClient();
        await useAsyncData('store-category', async () =>{
            return await client('api/v1/admin/categories', {
                method: 'POST',
                body: formData,
            });
        })
            .then(async () => {
                await loadTournaments();
                // todo add toast alert
            } )
    }
    async function fetchTournamentsByLeagueId  (id: number) {
        const client = useSanctumClient();
        const {data}  = await client(`/api/v1/admin/leagues/${id}/tournaments`);
        tournaments.value = data || [];
        // todo revisar la manera en la que contamos el teamcoutn y machesByRound
        // creo deberia ser un computed que se actualice cuando cambie el valor de tournaments

        // console.log({tournaments:tournaments.value })
        // teamsCount.value = data.teams_count || 0;
        // const test = teamsCount.value / 2 ;
        // matchesByRound.value = teamsCount.value / 2 ;
        // console.log( matchesByRound.value, 2222222)

    }

    async function getTournamentTypes(){
        const client = useSanctumClient();
        const response =  await client('/api/v1/admin/tournaments/types')
        tournamentTypes.value = response
    }
    return {
        tournaments,
        tournament,
        nextGames,
        categories,
        currentGames,
        teamsCount,
        roundsCount,
        matchesCount,
        matchesByRound,
        loadTournaments,
        storeTournament,
        storeCategory,
        fetchTournamentsByLeagueId,
        getTournamentTypes,
        loading,
        tournamentTypes,
        dialog
    }

})
