
import {defineStore} from "pinia";
import type {Tournament} from "~/models/tournament";
import {useGlobalStore} from "~/store/useGlobalStore";
export const useTournamentStore = defineStore('tournamentStore', () => {
    const tournament = ref<Tournament | null>(null);
    const tournaments = ref<Tournament[]>([]);
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

    return { tournaments,tournament,categories, loadTournaments,storeTournament, storeCategory };

})
