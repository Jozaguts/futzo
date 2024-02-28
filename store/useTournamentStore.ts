
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
    async function loadTournaments() {
        const client = useSanctumClient();

        const data = await client('/api/v1/admin/tournaments');
        tournaments.value = data?.tournaments || [];
        tournament.value = tournaments.value[0] || null;
        categories.value = data?.categories || [];
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
                const globalStore = useGlobalStore();
                globalStore.setAlert('success', {message: 'Tournament created successfully', code: 200})
                setTimeout(() => {
                    globalStore.resetAlert()
                }   , 5000)
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
                const globalStore = useGlobalStore();
                globalStore.setAlert('success', {message: 'Category created successfully', code: 200})
                setTimeout(() => {
                    globalStore.resetAlert()
                }   , 5000)
            } )
    }

    return { tournaments,tournament,categories, loadTournaments,storeTournament, storeCategory,nextGames, currentGames }

})
