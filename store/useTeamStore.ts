import {defineStore} from "pinia";

export const useTeamStore = defineStore('teamStore', () => {

    const teams = ref([])
    const team = ref({})
    const categories = ref([])
    const tournaments = ref([])
    const client = useSanctumClient()

    const getTeams = async () => {
        try {
            const data = await client('/api/v1/admin/teams')
            teams.value = data.teams
            categories.value = data.categories
            tournaments.value = data.tournaments
        } catch (error) {
            console.log(error)
        }
    }

    // create team
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
    return { teams, team, getTeams, createTeam, categories, tournaments }


})