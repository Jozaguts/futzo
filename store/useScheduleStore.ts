import {defineStore} from "pinia";
import type {Schedule} from "~/models/Schedule";


export const useScheduleStore = defineStore('scheduleStore', () => {
    const schedules = ref<Schedule[]>([]);
    const scheduleParams = ref<{leagueId: number, tournamentId: number}>({leagueId: null as number, tournamentId: null as number});

    const fetchSchedules = async () => {
        const client = useSanctumClient()
        schedules.value = await client('/api/v1/admin/schedules');
    };
    const generateSchedule = async (params : {leagueId: number, tournamentId: number}) => {

        const client = useSanctumClient()
        const response = await client('/api/v1/admin/schedules', {
            method: 'POST',
            body: JSON.stringify(params)
        });
        console.log(response);
    };
    return {
        schedules,
        fetchSchedules,
        generateSchedule,
        scheduleParams,
    };
});