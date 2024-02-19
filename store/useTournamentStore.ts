
import {defineStore} from "pinia";
import type {Tournament} from "~/models/tournament";
import {useGlobalStore} from "~/store/useGlobalStore";
export const useTournamentStore = defineStore('tournamentStore', () => {
    const tournament = ref<Tournament | null>(null);
    const tournaments = ref<Tournament[]>([]);
    async function loadTournaments() {
        const client = useSanctumClient();


        const data = await client('/api/v1/admin/tournaments');
        console.log(data)
        tournaments.value = data || [];
        tournament.value = tournaments.value[0] || null;
        console.log('refTournaments',tournaments.value)
        console.log('data' ,data)
        console.log('Tournaments loaded')
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

    return { tournaments,tournament, loadTournaments,storeTournament };

})
